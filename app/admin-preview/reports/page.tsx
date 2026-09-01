import type { Metadata } from "next";

import { AdminReportsLibrary } from "@/components/admin/AdminReportsLibrary";

export const metadata: Metadata = {
  title: "Admin preview — Reports",
  robots: { index: false, follow: false },
};

export default function AdminPreviewReportsPage() {
  return <AdminReportsLibrary />;
}
