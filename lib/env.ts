const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabaseEnv() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase env vars. Copy .env.local.example to .env.local and add your project credentials.",
    );
  }

  return {
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
  };
}

export function hasSupabaseEnv(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getConfiguredAdminEmail(): string | null {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return email || null;
}

export function isAdminEmailConfigured(): boolean {
  return Boolean(getConfiguredAdminEmail());
}

export function isConfiguredAdminEmail(email: string | undefined | null): boolean {
  const configured = getConfiguredAdminEmail();
  if (!configured || !email) {
    return false;
  }
  return email.trim().toLowerCase() === configured;
}
