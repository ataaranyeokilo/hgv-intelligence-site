import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminUser } from "@/lib/admin/auth";
import { isAdminUiPreview } from "@/lib/admin/preview";
import {
  hasSupabaseEnv,
  isAdminEmailConfigured,
  isConfiguredAdminEmail,
} from "@/lib/env";
import { pageContainerClass } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

type AdminLoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const errorMessages: Record<string, string> = {
  config:
    "Admin access is not configured. Set ADMIN_EMAIL on the server and redeploy.",
  unauthorized:
    "That account is not authorised for admin access. Sign in with the configured administrator email.",
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  if (hasSupabaseEnv() && isAdminEmailConfigured()) {
    const user = await getAdminUser();
    if (user && isConfiguredAdminEmail(user.email)) {
      redirect("/admin");
    }
  }

  const { error } = await searchParams;
  const showConfigError = error === "config" && !isAdminUiPreview();
  const message = showConfigError
    ? errorMessages.config
    : error && error !== "config"
      ? errorMessages[error]
      : null;

  return (
    <div className="min-h-screen bg-white">
      <div className={`${pageContainerClass} py-16 sm:py-24`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Fleet Signal
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Admin login
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base">
          Sign in to manage the reports that appear on the website.
        </p>
        {message ? (
          <p className="mt-6 text-sm text-red-600" role="alert">
            {message}
          </p>
        ) : null}
        <div className="mt-10 max-w-sm">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
