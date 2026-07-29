"use server";

import { createClient } from "@/lib/supabase/server";

export type SubmitQuoteEnquiryResult = "success" | "error";

export type QuoteEnquiryInput = {
  fullName: string;
  workEmail: string;
  company: string;
  industry: string;
  regionsOfInterest: string;
  reportsRequired: string;
  additionalInformation?: string;
};

export async function submitQuoteEnquiry(
  input: QuoteEnquiryInput,
): Promise<SubmitQuoteEnquiryResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("quote_enquiries").insert({
    full_name: input.fullName.trim(),
    work_email: input.workEmail.trim().toLowerCase(),
    company: input.company.trim(),
    industry: input.industry.trim(),
    regions_of_interest: input.regionsOfInterest.trim(),
    reports_required: input.reportsRequired.trim(),
    additional_information: input.additionalInformation?.trim() || null,
  });

  if (error) {
    return "error";
  }

  await notifyTeamByEmail({
    subject: "New quote enquiry — HGV Intelligence",
    body: [
      `Name: ${input.fullName}`,
      `Email: ${input.workEmail}`,
      `Company: ${input.company}`,
      `Industry: ${input.industry}`,
      `Regions: ${input.regionsOfInterest}`,
      `Reports required: ${input.reportsRequired}`,
      `Notes: ${input.additionalInformation ?? "—"}`,
    ].join("\n"),
  });

  return "success";
}

async function notifyTeamByEmail(input: {
  subject: string;
  body: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.NOTIFY_EMAIL ?? "hello@hgvintelligence.co.uk";

  if (!apiKey || !from) {
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: input.subject,
      text: input.body,
    }),
  });
}
