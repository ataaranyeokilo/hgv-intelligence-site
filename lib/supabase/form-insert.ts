import { createClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/env";
import { createServiceClient, hasServiceRoleKey } from "@/lib/supabase/service";

/** Cookie-less client for public forms so an admin login cannot block inserts. */
export function createFormInsertClient() {
  if (hasServiceRoleKey()) {
    return createServiceClient();
  }

  const { url, anonKey } = getSupabaseEnv();
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
