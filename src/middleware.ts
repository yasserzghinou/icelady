import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin/session';

function addApiSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('Referrer-Policy', 'same-origin');
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  const isLoginApi = pathname === '/api/admin/login';
  if (isLoginApi) {
    return addApiSecurityHeaders(NextResponse.next());
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthenticated = await verifyAdminSessionToken(token);

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return addApiSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ['/api/admin/:path*']
};
