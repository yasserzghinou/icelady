const encoder = new TextEncoder();

export const ADMIN_SESSION_COOKIE = 'icelady_admin_session';

const SESSION_DURATION_SECONDS = 60 * 60 * 12;
let devSessionSecret: string | null = null;

type SessionPayload = {
  sub: 'admin';
  iat: number;
  exp: number;
};

function toBase64(value: Uint8Array): string {
  if (typeof btoa === 'function') {
    let binary = '';
    for (const byte of value) {
      binary += String.fromCharCode(byte);
    }

    return btoa(binary);
  }

  return Buffer.from(value).toString('base64');
}

function fromBase64(value: string): Uint8Array {
  if (typeof atob === 'function') {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
  }

  return new Uint8Array(Buffer.from(value, 'base64'));
}

function encodeBase64Url(value: Uint8Array): string {
  return toBase64(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (normalized.length % 4 || 4)) % 4);
  return fromBase64(`${normalized}${padding}`);
}

function textToBase64Url(value: string): string {
  return encodeBase64Url(encoder.encode(value));
}

function base64UrlToText(value: string): string {
  return new TextDecoder().decode(decodeBase64Url(value));
}

function getSessionSecret(): string {
  const configured = process.env.ADMIN_SESSION_SECRET?.trim();
  if (configured) {
    return configured;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('ADMIN_SESSION_SECRET must be configured in production');
  }

  if (!devSessionSecret) {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    devSessionSecret = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  return devSessionSecret;
}

async function hmac(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSessionSecret()),
    {
      name: 'HMAC',
      hash: 'SHA-256'
    },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return encodeBase64Url(new Uint8Array(signature));
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}

export async function createAdminSessionToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: 'admin',
    iat: now,
    exp: now + SESSION_DURATION_SECONDS
  };

  const payloadEncoded = textToBase64Url(JSON.stringify(payload));
  const signature = await hmac(payloadEncoded);

  return `${payloadEncoded}.${signature}`;
}

export async function verifyAdminSessionToken(token?: string): Promise<boolean> {
  if (!token) {
    return false;
  }

  const [payloadEncoded, signature] = token.split('.');

  if (!payloadEncoded || !signature) {
    return false;
  }

  const expected = await hmac(payloadEncoded);
  if (!safeEqual(expected, signature)) {
    return false;
  }

  try {
    const payload = JSON.parse(base64UrlToText(payloadEncoded)) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);

    return payload.sub === 'admin' && payload.exp > now;
  } catch {
    return false;
  }
}

export function adminSessionCookieConfig() {
  return {
    name: ADMIN_SESSION_COOKIE,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: SESSION_DURATION_SECONDS
    }
  };
}
