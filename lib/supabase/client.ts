import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseEnv, hasSupabaseEnv } from "@/lib/env";

export function createClient() {
  if (!hasSupabaseEnv()) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  const { url, anonKey } = getSupabaseEnv();

  return createBrowserClient(url, anonKey);
}

/** Safe for client UI; returns null when public Supabase env is missing. */
export function tryCreateClient() {
  if (!hasSupabaseEnv()) {
    return null;
  }
  return createClient();
}
