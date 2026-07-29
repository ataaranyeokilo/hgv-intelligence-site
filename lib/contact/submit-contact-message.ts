"use server";

import { createClient } from "@/lib/supabase/server";

export type SubmitContactMessageResult = "success" | "error";

export async function submitContactMessage(input: {
  fullName: string;
  email: string;
  message: string;
}): Promise<SubmitContactMessageResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("contact_messages").insert({
    full_name: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    message: input.message.trim(),
  });

  if (error) {
    return "error";
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.NOTIFY_EMAIL ?? "hello@hgvintelligence.co.uk";

  if (apiKey && from) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: "New contact message — HGV Intelligence",
        text: `From: ${input.fullName} <${input.email}>\n\n${input.message}`,
      }),
    });
  }

  return "success";
}
