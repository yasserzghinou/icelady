import { NextRequest, NextResponse } from 'next/server';

import { assertAdminSession } from '@/lib/admin/guard';
import {
  buildRelativeRedirectPath,
  getSafeReturnTo,
  hasTrustedOrigin,
  isValidEmail,
  normalizeEmail,
  toRequestUrl
} from '@/lib/admin/http';
import { revalidateBusinessContent } from '@/lib/admin/revalidate';
import { updateBusinessSettings } from '@/lib/admin/store';

function redirectToRelative(request: NextRequest, target: string): NextResponse {
  const response = NextResponse.redirect(toRequestUrl(request, target));
  response.headers.set('Location', target);
  return response;
}

function redirectWithStatus(request: NextRequest, returnTo: string, status: string) {
  const target = buildRelativeRedirectPath(returnTo, { status });
  return redirectToRelative(request, target);
}

export async function POST(request: NextRequest) {
  const unauthorized = await assertAdminSession(request);
  if (unauthorized) {
    return unauthorized;
  }

  if (!hasTrustedOrigin(request)) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }

  const formData = await request.formData();
  const returnTo = getSafeReturnTo(formData.get('returnTo'));

  const publicEmail = normalizeEmail(String(formData.get('publicEmail') || ''));
  if (!isValidEmail(publicEmail)) {
    return redirectWithStatus(request, returnTo, 'business-invalid-email');
  }

  const openingHoursText = String(formData.get('openingHours') || '');
  const openingHours = openingHoursText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  updateBusinessSettings({
    siteName: String(formData.get('siteName') || ''),
    description: String(formData.get('description') || ''),
    phone: String(formData.get('phone') || ''),
    whatsapp: String(formData.get('whatsapp') || ''),
    publicEmail,
    address: String(formData.get('address') || ''),
    mapProfileUrl: String(formData.get('mapProfileUrl') || ''),
    mapEmbedUrl: String(formData.get('mapEmbedUrl') || ''),
    openingHours
  });
  revalidateBusinessContent();

  return redirectWithStatus(request, returnTo, 'business-saved');
}
