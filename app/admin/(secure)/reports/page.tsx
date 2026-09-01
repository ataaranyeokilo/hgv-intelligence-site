import type { Metadata } from "next";

import { AdminLibrarySection } from "@/components/admin/AdminLibrarySection";
import { reportLibraryPlaceholders } from "@/lib/intelligence/report-library-placeholders";

export const metadata: Metadata = {
  title: "Admin — Reports",
  robots: { index: false, follow: false },
};

const initialItems = reportLibraryPlaceholders.map((item) => ({
  id: item.title,
  badge: item.badge,
  title: item.title,
  summary: item.summary,
  dateLabel: item.dateLabel,
}));

export default function AdminReportsPage() {
  return (
    <AdminLibrarySection
      heading="Reports"
      description="Research reports on the website. Upload a file to add another card here. This is separate from Intelligence."
      gridHeading="On Research"
      currentLabel="Current file"
      currentHint="The last Research report file chosen on this page."
      chooseHint="PDF or Word. This does not appear in Intelligence."
      accept=".pdf,.doc,.docx,application/pdf"
      initialItems={initialItems}
      emptyMessage="No reports yet."
      uploadedBadge="Research report"
      uploadedSummary="Uploaded from Admin. It will appear on Research once saving is connected."
    />
  );
}
