import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/env";

export type VerifyDownloadTokenResult =
  | { status: "invalid" }
  | {
      status: "success";
      storagePath: string;
      source: string;
    };

export async function verifyDownloadToken(
  token: string | undefined,
): Promise<VerifyDownloadTokenResult> {
  if (!token?.trim()) {
    return { status: "invalid" };
  }

  if (!hasSupabaseEnv()) {
    console.error("[verifyDownloadToken] Missing Supabase environment variables");
    return { status: "invalid" };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("verify_download_token", {
      p_token: token.trim(),
    });

    if (error) {
      console.error("[verifyDownloadToken] RPC error:", error.message);
      return { status: "invalid" };
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      return { status: "invalid" };
    }

    const row = data[0] as {
      success?: boolean;
      storage_path?: string | null;
      lead_source?: string | null;
    };

    if (!row.success || !row.storage_path) {
      return { status: "invalid" };
    }

    return {
      status: "success",
      storagePath: row.storage_path,
      source: row.lead_source ?? "unknown",
    };
  } catch (cause) {
    console.error("[verifyDownloadToken] uncaught:", cause);
    return { status: "invalid" };
  }
}
