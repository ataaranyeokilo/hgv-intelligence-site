"use server";

export async function submitReportNotify(
  email: string,
): Promise<"success" | "error"> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) {
    return "error";
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.NOTIFY_EMAIL ?? "hello@hgvintelligence.co.uk";

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[dev] Report notify signup: ${normalized}`);
      return "success";
    }
    return "error";
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
      subject: "Intelligence report notify signup",
      text: `${normalized} asked to be notified when new intelligence reports are published.`,
    }),
  });

  return response.ok ? "success" : "error";
}
