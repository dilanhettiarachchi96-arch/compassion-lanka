import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY ?? 're_stub');

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_stub') {
    return { success: true, stub: true };
  }

  await resend.emails.send({
    from: 'Compassion Lanka <noreply@compassionlanka.org>',
    to,
    subject,
    html,
  });

  return { success: true, stub: false };
}
