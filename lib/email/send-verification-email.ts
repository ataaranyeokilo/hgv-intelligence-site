export type SendVerificationEmailInput = {
  to: string;
  verifyUrl: string;
  subject: string;
};

export async function sendVerificationEmail({
  to,
  verifyUrl,
  subject,
}: SendVerificationEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html: `<p>Confirm your email to download your report.</p><p><a href="${verifyUrl}">Verify and download</a></p>`,
    }),
  });

  return response.ok;
}

export function logDevVerificationLink(verifyUrl: string): void {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  console.log(`[dev] Verification link: ${verifyUrl}`);
}

export function buildVerificationUrl(token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${baseUrl}/download/verify?token=${encodeURIComponent(token)}`;
}
