import { NextRequest, NextResponse } from 'next/server';

import {
  buildRelativeRedirectPath,
  getClientIp,
  getSafeReturnTo,
  hasTrustedOrigin,
  toRequestUrl
} from '@/lib/admin/http';
import { verifyAdminPassword } from '@/lib/admin/password';
import { enforceRateLimit, resetRateLimit } from '@/lib/admin/rate-limit';
import { adminSessionCookieConfig, createAdminSessionToken } from '@/lib/admin/session';

const LOGIN_WINDOW_MS = 10 * 60 * 1000;
const LOGIN_BLOCK_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;

function redirectToRelative(request: NextRequest, target: string): NextResponse {
  const response = NextResponse.redirect(toRequestUrl(request, target));
  response.headers.set('Location', target);
  return response;
}

function redirectToLogin(request: NextRequest, returnTo: string, errorCode: string) {
  const target = buildRelativeRedirectPath('/admin/login', {
    returnTo,
    error: errorCode
  });

  return redirectToRelative(request, target);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const returnTo = getSafeReturnTo(formData.get('returnTo'));

  if (!hasTrustedOrigin(request)) {
    return redirectToLogin(request, returnTo, 'origin');
  }

  const ip = getClientIp(request);
  const limit = enforceRateLimit(`admin-login:${ip}`, {
    maxAttempts: LOGIN_MAX_ATTEMPTS,
    windowMs: LOGIN_WINDOW_MS,
    blockMs: LOGIN_BLOCK_MS
  });

  if (!limit.allowed) {
    const response = redirectToLogin(request, returnTo, 'rate');
    if (limit.retryAfterSeconds) {
      response.headers.set('Retry-After', String(limit.retryAfterSeconds));
    }
    return response;
  }

  const password = String(formData.get('password') || '');
  const isValidPassword = verifyAdminPassword(password);

  if (!isValidPassword) {
    return redirectToLogin(request, returnTo, 'credentials');
  }

  resetRateLimit(`admin-login:${ip}`);

  const token = await createAdminSessionToken();
  const cookie = adminSessionCookieConfig();

  const response = redirectToRelative(request, returnTo);
  response.cookies.set(cookie.name, token, cookie.options);
  response.headers.set('Cache-Control', 'no-store');

  return response;
}
