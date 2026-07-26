"use server";

import { createClient } from "@/lib/supabase/server";

export type SubmitSampleLeadResult = "success" | "error";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

function generateDownloadToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function logDevDownloadLink(token: string): void {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  console.log(`[dev] Sample download link: ${baseUrl}/download/sample?token=${token}`);
}

export async function submitSampleLead(
  email: string,
): Promise<SubmitSampleLeadResult> {
  const supabase = await createClient();
  const normalizedEmail = email.trim().toLowerCase();
  const downloadToken = generateDownloadToken();
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

  const { error } = await supabase.rpc("upsert_sample_lead", {
    p_email: normalizedEmail,
    p_token: downloadToken,
    p_expires_at: tokenExpiresAt,
  });

  if (error) {
    return "error";
  }

  logDevDownloadLink(downloadToken);
  return "success";
}
