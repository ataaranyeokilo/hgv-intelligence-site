"use server";

import { getNotifyEmail } from "@/lib/env";
import { sendResendEmail } from "@/lib/email/resend-client";
import { createClient } from "@/lib/supabase/server";

export type SubmitQuoteRequestResult = "success" | "error";

export async function submitQuoteRequest(input: {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  sector: string;
  region: string;
  volume: string;
  notes: string;
  interest: string;
}): Promise<SubmitQuoteRequestResult> {
  const supabase = await createClient();
  const fullName = input.fullName.trim();
  const email = input.email.trim().toLowerCase();
  const company = input.company.trim();

  if (!fullName || !email || !company) {
    return "error";
  }

  const message = [
    "Quote request — Fleet Signal Intelligence",
    input.interest.trim() ? `Interest: ${input.interest.trim()}` : null,
    `Company: ${company}`,
    input.role.trim() ? `Role: ${input.role.trim()}` : null,
    `Sector: ${input.sector.trim() || "Not specified"}`,
    `Coverage: ${input.region.trim() || "Not specified"}`,
    `Volume: ${input.volume.trim() || "Not specified"}`,
    input.phone.trim() ? `Phone: ${input.phone.trim()}` : null,
    "",
    input.notes.trim() || "No extra notes.",
  ]
    .filter((line) => line !== null)
    .join("\n");

  const { error } = await supabase.from("contact_messages").insert({
    full_name: fullName,
    email,
    message,
  });

  if (error) {
    return "error";
  }

  const notifyTo = getNotifyEmail();
  if (notifyTo) {
    await sendResendEmail({
      to: notifyTo,
      subject: `New quote request — ${company}`,
      text: `From: ${fullName} <${email}>\n\n${message}`,
    });
  }

  return "success";
}
