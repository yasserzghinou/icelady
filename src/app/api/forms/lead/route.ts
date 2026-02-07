import { NextRequest, NextResponse } from 'next/server';

import { sendLeadSubmissionEmail } from '@/lib/admin/email';
import { getClientIp } from '@/lib/admin/http';
import { enforceRateLimit } from '@/lib/admin/rate-limit';
import {
  getAdminSettings,
  markLeadSubmissionStatus,
  recordLeadSubmission
} from '@/lib/admin/store';

function validatePhone(value: string): boolean {
  return /^\+?[0-9()\s-]{8,}$/.test(value.trim());
}

function validateText(value: string, minLength: number): boolean {
  return value.trim().length >= minLength;
}

function isSuspiciousOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) {
    return false;
  }

  const host = request.headers.get('host');
  if (!host) {
    return true;
  }

  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

export async function POST(request: NextRequest) {
  if (isSuspiciousOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden origin' }, { status: 403 });
  }

  let body: {
    name?: string;
    phone?: string;
    slot?: string;
    zone?: string;
    contactPreference?: string;
    locale?: string;
    sourcePath?: string;
    website?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name || '').trim();
  const phone = String(body.phone || '').trim();
  const slot = String(body.slot || '').trim();
  const zone = String(body.zone || '').trim();
  const contactPreference = String(body.contactPreference || '').trim();

  if (!validateText(name, 2) || !validatePhone(phone) || !validateText(slot, 2)) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
  }

  if (
    (zone && !validateText(zone, 2)) ||
    (contactPreference && !validateText(contactPreference, 2))
  ) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
  }

  const ip = getClientIp(request);
  const limit = enforceRateLimit(`lead-form:${ip}`, {
    maxAttempts: 8,
    windowMs: 10 * 60 * 1000,
    blockMs: 30 * 60 * 1000
  });

  if (!limit.allowed) {
    const response = NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    if (limit.retryAfterSeconds) {
      response.headers.set('Retry-After', String(limit.retryAfterSeconds));
    }
    return response;
  }

  const settings = getAdminSettings();
  const submission = recordLeadSubmission({
    name,
    phone,
    slot,
    zone,
    contactPreference,
    locale: body.locale,
    sourcePath: body.sourcePath,
    recipientEmail: settings.formRecipientEmail
  });

  if (process.env.RESEND_API_KEY) {
    try {
      await sendLeadSubmissionEmail({
        recipientEmail: settings.formRecipientEmail,
        fromEmail: settings.resendFromEmail,
        fromName: settings.resendFromName,
        submission
      });
      markLeadSubmissionStatus(submission.id, 'emailed');
    } catch (error) {
      markLeadSubmissionStatus(
        submission.id,
        'email_failed',
        error instanceof Error ? error.message : 'Unknown email provider error'
      );
    }
  }

  const response = NextResponse.json({ ok: true });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
