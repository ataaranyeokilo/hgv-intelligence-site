"use server";

import { randomBytes } from "node:crypto";

import { createClient } from "@/lib/supabase/server";

export type SubmitSampleLeadResult = "success" | "error";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

function generateDownloadToken(): string {
  return randomBytes(32).toString("base64url");
}

function logDevDownloadLink(token: string): void {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  console.log(`[dev] Sample download link: ${baseUrl}/download/sample?token=${token}`);
}

function devLog(label: string, value: unknown): void {
  if (process.env.NODE_ENV === "development") {
    console.log(label, value);
  }
}

export async function submitSampleLead(
  email: string,
): Promise<SubmitSampleLeadResult> {
  devLog("[dev] submitSampleLead called with email:", email);
  devLog("[dev] NODE_ENV:", process.env.NODE_ENV);
  devLog(
    "[dev] Supabase env present:",
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  );

  try {
    const supabase = await createClient();
    const normalizedEmail = email.trim().toLowerCase();
    const downloadToken = generateDownloadToken();
    const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

    const rpcName = "upsert_sample_lead";
    const rpcArgs = {
      p_email: normalizedEmail,
      p_token: downloadToken,
      p_expires_at: tokenExpiresAt,
    };

    const response = await supabase.rpc(rpcName, rpcArgs);
    const { data, error } = response;

    devLog("[dev] RPC name:", rpcName);
    devLog("[dev] RPC arguments:", rpcArgs);
    devLog("[dev] Full Supabase response:", response);
    devLog("[dev] error.code:", error?.code ?? null);
    devLog("[dev] error.message:", error?.message ?? null);
    devLog("[dev] error.details:", error?.details ?? null);
    devLog("[dev] error.hint:", error?.hint ?? null);
    devLog("[dev] RPC data:", data);

    if (error) {
      return "error";
    }

    logDevDownloadLink(downloadToken);
    return "success";
  } catch (err) {
    devLog("[dev] submitSampleLead threw:", err);
    throw err;
  }
}
