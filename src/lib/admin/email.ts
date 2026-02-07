import type { LeadSubmission } from '@/lib/admin/store';

interface SendLeadEmailInput {
  recipientEmail: string;
  fromEmail: string;
  fromName: string;
  submission: LeadSubmission;
}

async function sendViaResend(input: {
  apiKey: string;
  recipientEmail: string;
  fromEmail: string;
  fromName: string;
  subject: string;
  text: string;
}) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${input.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: `${input.fromName} <${input.fromEmail}>`,
      to: [input.recipientEmail],
      subject: input.subject,
      text: input.text
    })
  });
}

export async function sendLeadSubmissionEmail(input: SendLeadEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return;
  }

  const { recipientEmail, fromEmail, fromName, submission } = input;

  const lines = [
    `New lead received from Ice Lady website.`,
    '',
    `Name: ${submission.name}`,
    `Phone: ${submission.phone}`,
    `Preferred slot: ${submission.slot}`,
    `Zone: ${submission.zone || 'n/a'}`,
    `Preferred contact channel: ${submission.contactPreference || 'n/a'}`,
    `Locale: ${submission.locale || 'n/a'}`,
    `Source path: ${submission.sourcePath || 'n/a'}`,
    `Submitted at: ${submission.submittedAt}`,
    `Submission ID: ${submission.id}`
  ];

  const subject = `New lead request - ${submission.name}`;
  const text = lines.join('\n');

  let response = await sendViaResend({
    apiKey,
    recipientEmail,
    fromEmail,
    fromName,
    subject,
    text
  });

  if (!response.ok) {
    const errorBody = await response.text();
    const domainNotVerified =
      response.status === 403 && errorBody.toLowerCase().includes('domain is not verified');

    if (domainNotVerified && fromEmail !== 'onboarding@resend.dev') {
      response = await sendViaResend({
        apiKey,
        recipientEmail,
        fromEmail: 'onboarding@resend.dev',
        fromName,
        subject,
        text
      });

      if (response.ok) {
        return;
      }

      const fallbackErrorBody = await response.text();
      throw new Error(
        `Failed to send email (${response.status}): ${fallbackErrorBody.slice(0, 200)}`
      );
    }

    throw new Error(`Failed to send email (${response.status}): ${errorBody.slice(0, 200)}`);
  }
}
