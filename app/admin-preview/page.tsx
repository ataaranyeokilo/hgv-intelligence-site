import type { Metadata } from "next";

import { AdminOverview } from "@/components/admin/AdminOverview";
import { adminPreviewMetrics } from "@/lib/admin/preview";

export const metadata: Metadata = {
  title: "Admin preview",
  robots: { index: false, follow: false },
};

export default function AdminPreviewOverviewPage() {
  return <AdminOverview metrics={adminPreviewMetrics} />;
}
