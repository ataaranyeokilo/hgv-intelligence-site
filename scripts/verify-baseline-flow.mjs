/**
 * Baseline check: Supabase RPC path used by download lead flows.
 * Run: node --env-file=.env.local scripts/verify-baseline-flow.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto"; // Node-only script; app uses Web Crypto

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(url, anonKey);
const testEmail = `baseline-${Date.now()}@example.com`;
const token = randomBytes(32).toString("base64url");
const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

const { error: upsertError } = await supabase.rpc("upsert_download_lead", {
  p_email: testEmail,
  p_token: token,
  p_expires_at: expiresAt,
  p_source: "weekly_sample",
  p_report_id: null,
});

if (upsertError) {
  console.error("upsert_download_lead failed:", upsertError.message);
  process.exit(1);
}

const { data: verifyData, error: verifyError } = await supabase.rpc(
  "verify_download_token",
  { p_token: token },
);

if (verifyError) {
  console.error("verify_download_token failed:", verifyError.message);
  process.exit(1);
}

const row = Array.isArray(verifyData) ? verifyData[0] : null;
if (!row?.success) {
  console.error("verify_download_token returned:", verifyData);
  process.exit(1);
}

console.log("Baseline flow OK: upsert_download_lead → verify_download_token");
