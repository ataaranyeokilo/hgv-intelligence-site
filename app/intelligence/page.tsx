import type { Metadata } from "next";

import { IntelligencePageWithDownload } from "@/components/intelligence/IntelligencePageWithDownload";
import { partitionPublishedReports } from "@/lib/reports/classify";
import { listPublishedReports } from "@/lib/reports/queries";

export const metadata: Metadata = {
  title: "Intelligence",
  description:
    "Browse published HGV intelligence reports and download a redacted sample of weekly operator data.",
};

export default async function IntelligencePage() {
  const reports = await listPublishedReports();
  const { general, weekly } = partitionPublishedReports(reports);
  const showPlaceholders = reports.length === 0;

  return (
    <IntelligencePageWithDownload
      generalReports={general}
      weeklyLatest={weekly[0] ?? null}
      showPlaceholders={showPlaceholders}
    />
  );
}
