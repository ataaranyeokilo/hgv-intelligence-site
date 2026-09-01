import type { Metadata } from "next";

import { AdminOverview } from "@/components/admin/AdminOverview";
import { getAdminOverviewMetrics } from "@/lib/admin/metrics";
import { adminPreviewMetrics, isAdminUiPreview } from "@/lib/admin/preview";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const metrics = isAdminUiPreview()
    ? adminPreviewMetrics
    : await getAdminOverviewMetrics();

  return <AdminOverview metrics={metrics} />;
}
