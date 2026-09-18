import type { Metadata } from "next";

import { AdminLibraryCards } from "@/components/admin/AdminLibraryCards";
import { AdminReportsIntro } from "@/components/admin/AdminReportsIntro";
import { listAdminReports } from "@/lib/admin/reports";

export const metadata: Metadata = {
  title: "Admin — Reports",
  robots: { index: false, follow: false },
};

export default async function AdminReportsPage() {
  const reports = await listAdminReports("research");

  return (
    <>
      <AdminReportsIntro newReportHref="/admin/reports/new" />
      <AdminLibraryCards
        items={reports}
        kind="research"
        newHref="/admin/reports/new"
      />
    </>
  );
}
