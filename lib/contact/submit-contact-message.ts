"use server";

import { getNotifyEmail } from "@/lib/env";
import { sendResendEmail } from "@/lib/email/resend-client";
import { createFormInsertClient } from "@/lib/supabase/form-insert";

export type SubmitContactMessageResult = "success" | "error";

export async function submitContactMessage(input: {
  fullName: string;
  email: string;
  message: string;
}): Promise<SubmitContactMessageResult> {
  try {
    const supabase = createFormInsertClient();

    const { error } = await supabase.from("contact_messages").insert({
      full_name: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      message: input.message.trim(),
    });

    if (error) {
      console.error("[submitContactMessage] insert:", error.message);
      return "error";
    }

    const notifyTo = getNotifyEmail();
    if (notifyTo) {
      await sendResendEmail({
        to: notifyTo,
        subject: "New contact message — HGV Intelligence",
        text: `From: ${input.fullName} <${input.email}>\n\n${input.message}`,
      });
    }

    return "success";
  } catch (cause) {
    console.error("[submitContactMessage] uncaught:", cause);
    return "error";
  }
}
