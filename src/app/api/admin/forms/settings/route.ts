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
import { updateAdminSettingsAsync } from '@/lib/admin/store';

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

  const formRecipientEmail = normalizeEmail(String(formData.get('formRecipientEmail') || ''));
  const resendFromEmail = normalizeEmail(String(formData.get('resendFromEmail') || ''));

  if (!isValidEmail(formRecipientEmail) || !isValidEmail(resendFromEmail)) {
    return redirectWithStatus(request, returnTo, 'forms-invalid-email');
  }

  await updateAdminSettingsAsync({
    formRecipientEmail,
    resendFromEmail,
    resendFromName: String(formData.get('resendFromName') || '')
  });

  return redirectWithStatus(request, returnTo, 'forms-saved');
}
