import type { Metadata } from "next";

import { ExploreAllIntelligenceReports } from "@/components/intelligence/ExploreAllIntelligenceReports";
import { IntelligenceDownloadProvider } from "@/components/intelligence/IntelligenceDownloadProvider";
import { ResearchHero } from "@/components/sections/ResearchHero";
import { partitionPublishedReports } from "@/lib/reports/classify";
import { listPublishedReports } from "@/lib/reports/queries";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Browse the latest published HGV reports across different categories.",
};

export default async function ResearchPage() {
  const reports = await listPublishedReports();
  const { general } = partitionPublishedReports(reports);

  return (
    <>
      <ResearchHero />
      <IntelligenceDownloadProvider>
        <ExploreAllIntelligenceReports
          generalReports={general}
          headingAs="h2"
          showPlaceholders={reports.length === 0}
        />
      </IntelligenceDownloadProvider>
    </>
  );
}
