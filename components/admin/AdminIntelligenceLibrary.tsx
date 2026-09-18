import { AdminLibraryCards } from "@/components/admin/AdminLibraryCards";
import { AdminLibraryIntro } from "@/components/admin/AdminLibraryIntro";
import type { AdminReportListItem } from "@/lib/admin/reports";

type AdminIntelligenceLibraryProps = {
  items: AdminReportListItem[];
  preview?: boolean;
  newHref?: string;
};

export function AdminIntelligenceLibrary({
  items,
  preview = false,
  newHref = "/admin/intelligence/new",
}: AdminIntelligenceLibraryProps) {
  return (
    <>
      <AdminLibraryIntro
        heading="Intelligence"
        description="Paid Intelligence cards. Save one, then use Go live to show it on Research with a Subscribe pill that sends visitors to request a quote."
        newHref={newHref}
        newLabel="New intelligence"
      />
      <AdminLibraryCards
        items={items}
        kind="intelligence"
        preview={preview}
        newHref={newHref}
      />
    </>
  );
}
