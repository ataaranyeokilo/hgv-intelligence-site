import type { Metadata } from "next";

import { AdminLibrarySection } from "@/components/admin/AdminLibrarySection";
import { adminPreviewIntelligenceSample } from "@/lib/admin/preview";

export const metadata: Metadata = {
  title: "Admin — Intelligence",
  robots: { index: false, follow: false },
};

export default function AdminIntelligencePage() {
  return (
    <AdminLibrarySection
      heading="Intelligence"
      description="Paid Intelligence files. This is separate from Research reports. Upload a file to add a card below."
      gridHeading="Uploaded files"
      currentLabel="Current sample"
      currentHint="This is the Excel file visitors receive after they verify their email."
      chooseHint="Excel or CSV only. This does not appear in Reports."
      accept=".xlsx,.xls,.csv"
      footerNote="Visitors still verify their work email before the download starts."
      initialFileName={adminPreviewIntelligenceSample.fileName}
      initialItems={[]}
      emptyMessage="No Intelligence files uploaded yet. Choose a file above to add one."
      uploadedBadge="Intelligence"
      uploadedSummary="Uploaded from Admin. This is a paid Intelligence file, not a Research report."
    />
  );
}
