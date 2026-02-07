import { NextRequest, NextResponse } from 'next/server';

import { hasTrustedOrigin, toRequestUrl } from '@/lib/admin/http';
import { adminSessionCookieConfig } from '@/lib/admin/session';

function redirectToRelative(request: NextRequest, target: string): NextResponse {
  const response = NextResponse.redirect(toRequestUrl(request, target));
  response.headers.set('Location', target);
  return response;
}

export async function POST(request: NextRequest) {
  if (!hasTrustedOrigin(request)) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }

  const cookie = adminSessionCookieConfig();
  const response = redirectToRelative(request, '/admin/login');

  response.cookies.set(cookie.name, '', {
    ...cookie.options,
    maxAge: 0
  });

  response.headers.set('Cache-Control', 'no-store');

  return response;
}
