import { createClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/env";

export function getServiceRoleKey(): string | null {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? null;
}

export function createServiceClient() {
  const serviceRoleKey = getServiceRoleKey();
  if (!serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY for storage signed URLs.",
    );
  }

  const { url } = getSupabaseEnv();
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function createSignedDownloadUrl(
  storagePath: string,
  expiresInSeconds = 300,
): Promise<string | null> {
  const slashIndex = storagePath.indexOf("/");
  if (slashIndex === -1) {
    return null;
  }

  const bucket = storagePath.slice(0, slashIndex);
  const objectPath = storagePath.slice(slashIndex + 1);

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(objectPath, expiresInSeconds);

    if (error || !data?.signedUrl) {
      return null;
    }

    return data.signedUrl;
  } catch {
    return null;
  }
}

export function hasServiceRoleKey(): boolean {
  return Boolean(getServiceRoleKey());
}
