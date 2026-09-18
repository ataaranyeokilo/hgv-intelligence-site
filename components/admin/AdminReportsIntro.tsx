import { AdminLibraryIntro } from "@/components/admin/AdminLibraryIntro";

type AdminReportsIntroProps = {
  newReportHref: string;
};

export function AdminReportsIntro({ newReportHref }: AdminReportsIntroProps) {
  return (
    <AdminLibraryIntro
      heading="Reports"
      description="Research reports on the website. Create a report, attach the file, then use Go live to add a card on Research."
      newHref={newReportHref}
      newLabel="New report"
    />
  );
}
