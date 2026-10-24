/**
 * Baseline check: Supabase RPC path used by one-step download flows.
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
const newToken = randomBytes(32).toString("base64url");

async function recordDownload(token) {
  const { data, error } = await supabase.rpc("record_download", {
    p_email: testEmail,
    p_new_token: token,
    p_source: "weekly_sample",
    p_report_id: null,
  });
  if (error) {
    console.error("record_download failed:", error.message);
    process.exit(1);
  }
  return Array.isArray(data) ? data[0] : null;
}

const first = await recordDownload(newToken);
if (!first?.is_new || first.token !== newToken) {
  console.error("record_download (new email) returned:", first);
  process.exit(1);
}

// A known email keeps its original token; the new one passed here is ignored.
const again = await recordDownload(randomBytes(32).toString("base64url"));
if (again?.is_new !== false || again.token !== newToken) {
  console.error("record_download (known email) returned:", again);
  process.exit(1);
}

const { data: email, error: rememberedError } = await supabase.rpc(
  "record_remembered_download",
  { p_token: newToken, p_source: "weekly_sample", p_report_id: null },
);
if (rememberedError || email !== testEmail) {
  console.error("record_remembered_download returned:", rememberedError?.message ?? email);
  process.exit(1);
}

const { data: known, error: knownError } = await supabase.rpc(
  "is_download_contact_token",
  { p_token: newToken },
);
if (knownError || known !== true) {
  console.error("is_download_contact_token returned:", knownError?.message ?? known);
  process.exit(1);
}

console.log(
  "Baseline flow OK: record_download (new → known) → record_remembered_download → is_download_contact_token",
);
