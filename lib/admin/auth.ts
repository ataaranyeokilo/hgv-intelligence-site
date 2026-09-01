import { redirect } from "next/navigation";

import {
  getConfiguredAdminEmail,
  isAdminEmailConfigured,
  isConfiguredAdminEmail,
} from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function requireAdminUser() {
  if (!isAdminEmailConfigured()) {
    throw new Error("Admin email is not configured.");
  }

  const user = await getAdminUser();
  if (!user || !isConfiguredAdminEmail(user.email)) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function assertAdminAccessOrRedirect() {
  if (process.env.NODE_ENV === "development") {
    return null;
  }

  if (!isAdminEmailConfigured()) {
    redirect("/admin/login?error=config");
  }

  const user = await getAdminUser();
  if (!user) {
    redirect("/admin/login");
  }

  if (!isConfiguredAdminEmail(user.email)) {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }

  return user;
}

export function getAdminEmailForDisplay(): string | null {
  return getConfiguredAdminEmail();
}
