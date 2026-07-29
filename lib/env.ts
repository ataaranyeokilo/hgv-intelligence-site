function readSupabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function readSupabaseAnonKey(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export function getSupabaseEnv() {
  const url = readSupabaseUrl();
  const anonKey = readSupabaseAnonKey();

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase env vars. Copy .env.local.example to .env.local and add your project credentials.",
    );
  }

  return {
    url,
    anonKey,
  };
}

export function hasSupabaseEnv(): boolean {
  return Boolean(readSupabaseUrl() && readSupabaseAnonKey());
}

export function getConfiguredAdminEmail(): string | null {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return email || null;
}

export function isAdminEmailConfigured(): boolean {
  return Boolean(getConfiguredAdminEmail());
}

export function getNotifyEmail(): string | null {
  const email = process.env.NOTIFY_EMAIL?.trim();
  return email || null;
}

export function isConfiguredAdminEmail(email: string | undefined | null): boolean {
  const configured = getConfiguredAdminEmail();
  if (!configured || !email) {
    return false;
  }
  return email.trim().toLowerCase() === configured;
}
