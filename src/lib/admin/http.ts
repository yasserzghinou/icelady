import type { NextRequest } from 'next/server';

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

export function getRequestOrigin(request: NextRequest): string {
  const protoHeader = request.headers.get('x-forwarded-proto');
  const hostHeader = request.headers.get('x-forwarded-host') || request.headers.get('host');

  const protocol = (protoHeader || request.nextUrl.protocol.replace(':', '') || 'http').split(',')[0].trim();
  const host = (hostHeader || request.nextUrl.host).split(',')[0].trim();

  if (!host) {
    return request.nextUrl.origin;
  }

  return `${protocol}://${host}`;
}

export function toRequestUrl(request: NextRequest, pathname: string): URL {
  return new URL(pathname, getRequestOrigin(request));
}

export function buildRelativeRedirectPath(
  pathWithQuery: string,
  updates: Record<string, string | undefined> = {}
): string {
  const [pathname, query = ''] = pathWithQuery.split('?');
  const searchParams = new URLSearchParams(query);

  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined) {
      searchParams.delete(key);
      continue;
    }

    searchParams.set(key, value);
  }

  const nextQuery = searchParams.toString();
  return nextQuery ? `${pathname}?${nextQuery}` : pathname;
}

export function hasTrustedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) {
    return false;
  }

  const host = request.headers.get('host');
  if (!host) {
    return false;
  }

  try {
    const originUrl = new URL(origin);
    return originUrl.host === host;
  } catch {
    return false;
  }
}

export function getSafeReturnTo(value: FormDataEntryValue | null): string {
  if (typeof value !== 'string' || value.length === 0) {
    return '/admin';
  }

  if (!value.startsWith('/')) {
    return '/admin';
  }

  if (value.startsWith('//') || value.startsWith('/\\')) {
    return '/admin';
  }

  return value;
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
