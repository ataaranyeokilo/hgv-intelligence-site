import { createClient } from "@/lib/supabase/server";

export type VerifySampleDownloadTokenResult = "success" | "invalid";

export async function verifySampleDownloadToken(
  token: string | undefined,
): Promise<VerifySampleDownloadTokenResult> {
  const trimmedToken = token?.trim();

  if (!trimmedToken) {
    return "invalid";
  }

  const supabase = await createClient();

  const { data, error } = await supabase.rpc("verify_sample_download_token", {
    p_token: trimmedToken,
  });

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[dev] verify_sample_download_token failed:", error);
    }
    return "invalid";
  }

  return data === true ? "success" : "invalid";
}
