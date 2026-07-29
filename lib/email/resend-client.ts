export type ResendConfig = {
  apiKey: string;
  from: string;
};

export function getResendConfig(): ResendConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();

  if (!apiKey || !from) {
    return null;
  }

  return { apiKey, from };
}

export function hasResendEnv(): boolean {
  return getResendConfig() !== null;
}

export type SendResendEmailInput = {
  to: string;
  subject: string;
  html?: string;
  text?: string;
};

export async function sendResendEmail(
  input: SendResendEmailInput,
): Promise<boolean> {
  const config = getResendConfig();
  if (!config) {
    return false;
  }

  if (!input.html && !input.text) {
    return false;
  }

  const body: Record<string, unknown> = {
    from: config.from,
    to: [input.to],
    subject: input.subject,
  };

  if (input.html) {
    body.html = input.html;
  }
  if (input.text) {
    body.text = input.text;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(
        "[sendResendEmail] Resend API error:",
        response.status,
        await response.text().catch(() => ""),
      );
    }

    return response.ok;
  } catch (cause) {
    console.error("[sendResendEmail] fetch failed:", cause);
    return false;
  }
}
