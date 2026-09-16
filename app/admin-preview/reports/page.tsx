import type { Metadata } from "next";

import { AdminReportsIntro } from "@/components/admin/AdminReportsIntro";

export const metadata: Metadata = {
  title: "Admin preview — Reports",
  robots: { index: false, follow: false },
};

export default function AdminPreviewReportsPage() {
  return <AdminReportsIntro newReportHref="/admin/reports/new" />;
}
