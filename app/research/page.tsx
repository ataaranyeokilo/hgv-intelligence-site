import type { Metadata } from "next";

import { ExploreAllIntelligenceReports } from "@/components/intelligence/ExploreAllIntelligenceReports";
import { IntelligenceDownloadProvider } from "@/components/intelligence/IntelligenceDownloadProvider";
import { ResearchHero } from "@/components/sections/ResearchHero";
import {
  isIntelligenceLibraryItem,
  isWeeklyReport,
} from "@/lib/reports/classify";
import { listPublishedReports } from "@/lib/reports/queries";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Browse the latest published HGV reports across different categories.",
};

export default async function ResearchPage() {
  const reports = await listPublishedReports();
  const items = reports.filter(
    (report) =>
      isIntelligenceLibraryItem(report) || !isWeeklyReport(report.category),
  );

  return (
    <>
      <ResearchHero />
      {items.length === 0 ? (
        <IntelligenceDownloadProvider>
          <ExploreAllIntelligenceReports
            items={items}
            headingAs="h2"
            showPlaceholders
          />
        </IntelligenceDownloadProvider>
      ) : (
        <ExploreAllIntelligenceReports
          items={items}
          headingAs="h2"
          showPlaceholders={false}
        />
      )}
    </>
  );
}
