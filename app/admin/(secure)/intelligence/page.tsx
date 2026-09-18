import type { Metadata } from "next";

import { AdminIntelligenceLibrary } from "@/components/admin/AdminIntelligenceLibrary";
import { listAdminReports } from "@/lib/admin/reports";

export const metadata: Metadata = {
  title: "Admin — Intelligence",
  robots: { index: false, follow: false },
};

export default async function AdminIntelligencePage() {
  const items = await listAdminReports("intelligence");

  return <AdminIntelligenceLibrary items={items} />;
}
