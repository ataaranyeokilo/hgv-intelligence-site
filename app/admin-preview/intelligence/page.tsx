import type { Metadata } from "next";

import { AdminIntelligenceLibrary } from "@/components/admin/AdminIntelligenceLibrary";
import { adminPreviewIntelligenceItems } from "@/lib/admin/preview";

export const metadata: Metadata = {
  title: "Admin preview — Intelligence",
  robots: { index: false, follow: false },
};

export default function AdminPreviewIntelligencePage() {
  return (
    <AdminIntelligenceLibrary
      items={adminPreviewIntelligenceItems}
      preview
      newHref="/admin/intelligence/new"
    />
  );
}
