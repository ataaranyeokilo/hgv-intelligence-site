"use server";

import { getNotifyEmail } from "@/lib/env";
import { sendResendEmail } from "@/lib/email/resend-client";
import { createFormInsertClient } from "@/lib/supabase/form-insert";

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
  try {
    const fullName = input.fullName.trim();
    const email = input.email.trim().toLowerCase();
    const company = input.company.trim();
    const phone = input.phone.trim();
    const role = input.role.trim();
    const sector = input.sector.trim() || "Not specified";
    const region = input.region.trim() || "Not specified";
    const volume = input.volume.trim() || "Not specified";
    const notes = input.notes.trim();
    const interest = input.interest.trim();

    if (!fullName || !email || !company) {
      return "error";
    }

    const supabase = createFormInsertClient();
    const extraNotes = [
      interest ? `Interest: ${interest}` : null,
      role ? `Role: ${role}` : null,
      phone ? `Phone: ${phone}` : null,
      notes || null,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const { error: quoteError } = await supabase.from("quote_enquiries").insert({
      full_name: fullName,
      work_email: email,
      company,
      industry: sector,
      regions_of_interest: region,
      reports_required: volume,
      additional_information: extraNotes || null,
    });

    const message = [
      "Quote request — Fleet Signal Intelligence",
      interest ? `Interest: ${interest}` : null,
      `Company: ${company}`,
      role ? `Role: ${role}` : null,
      `Sector: ${sector}`,
      `Coverage: ${region}`,
      `Volume: ${volume}`,
      phone ? `Phone: ${phone}` : null,
      "",
      notes || "No extra notes.",
    ]
      .filter((line) => line !== null)
      .join("\n");

    const { error: contactError } = await supabase.from("contact_messages").insert({
      full_name: fullName,
      email,
      message,
    });

    if (quoteError) {
      console.error("[submitQuoteRequest] quote_enquiries:", quoteError.message);
    }
    if (contactError) {
      console.error("[submitQuoteRequest] contact_messages:", contactError.message);
    }
    if (quoteError && contactError) {
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
  } catch (cause) {
    console.error("[submitQuoteRequest] uncaught:", cause);
    return "error";
  }
}
