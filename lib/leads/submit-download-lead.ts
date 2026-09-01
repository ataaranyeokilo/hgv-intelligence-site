"use server";

import { hasSupabaseEnv } from "@/lib/env";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export type SubmitDownloadLeadResult = "success" | "error";

function generateDownloadToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function submitDownloadLead(input: {
  email: string;
  source: "weekly_sample" | "intelligence_report" | "sample_download";
  reportId?: string;
  emailSubject: string;
}): Promise<SubmitDownloadLeadResult> {
  try {
    if (!hasSupabaseEnv()) {
      console.error("[submitDownloadLead] Missing Supabase environment variables");
      return "error";
    }

    const { createClient } = await import("@/lib/supabase/server");
    const {
      buildVerificationUrl,
      logDevVerificationLink,
      sendVerificationEmail,
    } = await import("@/lib/email/send-verification-email");

    const supabase = await createClient();
    const normalizedEmail = input.email.trim().toLowerCase();
    const downloadToken = generateDownloadToken();
    const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

    const { error } = await supabase.rpc("upsert_download_lead", {
      p_email: normalizedEmail,
      p_token: downloadToken,
      p_expires_at: tokenExpiresAt,
      p_source: input.source,
      p_report_id: input.reportId ?? null,
    });

    if (error) {
      console.error("[submitDownloadLead] upsert_download_lead:", error.message);
      return "error";
    }

    const verifyUrl = buildVerificationUrl(downloadToken);
    logDevVerificationLink(verifyUrl);

    const emailed = await sendVerificationEmail({
      to: normalizedEmail,
      verifyUrl,
      subject: input.emailSubject,
    });

    if (!emailed && process.env.NODE_ENV !== "development") {
      return "error";
    }

    if (input.source === "intelligence_report" && input.reportId) {
      const { recordReportEvent } = await import("@/lib/reports/events");
      await recordReportEvent(input.reportId, "download_started");
    }

    return "success";
  } catch (cause) {
    console.error("[submitDownloadLead] uncaught:", cause);
    return "error";
  }
}
