import type { Metadata } from "next";

import { AdminReportsIntro } from "@/components/admin/AdminReportsIntro";

export const metadata: Metadata = {
  title: "Admin — Reports",
  robots: { index: false, follow: false },
};

export default function AdminReportsPage() {
  return <AdminReportsIntro newReportHref="/admin/reports/new" />;
}
