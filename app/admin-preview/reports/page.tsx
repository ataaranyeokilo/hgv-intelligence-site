import type { Metadata } from "next";

import { AdminLibraryCards } from "@/components/admin/AdminLibraryCards";
import { AdminReportsIntro } from "@/components/admin/AdminReportsIntro";
import { adminPreviewReports } from "@/lib/admin/preview";

export const metadata: Metadata = {
  title: "Admin preview — Reports",
  robots: { index: false, follow: false },
};

export default function AdminPreviewReportsPage() {
  return (
    <>
      <AdminReportsIntro newReportHref="/admin/reports/new" />
      <AdminLibraryCards
        items={adminPreviewReports}
        kind="research"
        preview
        newHref="/admin/reports/new"
      />
    </>
  );
}
