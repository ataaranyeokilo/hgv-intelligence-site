import type { Metadata } from "next";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

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
  const { error } = await searchParams;
  const message = error ? errorMessages[error] : null;

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-2xl font-semibold text-neutral-900">Admin login</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Sign in with the configured administrator account to manage site
        content.
      </p>
      {message ? (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {message}
        </p>
      ) : null}
      <div className="mt-10">
        <AdminLoginForm />
      </div>
    </div>
  );
}
