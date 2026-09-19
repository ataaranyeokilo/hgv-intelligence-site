import type { Metadata } from "next";

import { AdminLeadsList } from "@/components/admin/AdminLeadsList";
import { adminPreviewLeads } from "@/lib/admin/preview";

export const metadata: Metadata = {
  title: "Admin preview — Leads",
  robots: { index: false, follow: false },
};

export default function AdminPreviewLeadsPage() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        Admin
      </p>
      <h1 className="mt-3 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
        Leads
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        Emails from the website, with quote details where they asked for one.
      </p>
      <AdminLeadsList people={adminPreviewLeads} />
    </>
  );
}
