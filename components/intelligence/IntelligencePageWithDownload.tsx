"use client";

import type { IntelligenceReportListItem } from "@/lib/reports/types";

import { ExploreAllIntelligenceReports } from "@/components/intelligence/ExploreAllIntelligenceReports";
import { IntelligenceDownloadProvider } from "@/components/intelligence/IntelligenceDownloadProvider";
import { IntelligenceSamplePreviewSection } from "@/components/intelligence/IntelligenceSamplePreviewSection";
import { WeeklyReportsPitchSection } from "@/components/intelligence/WeeklyReportsPitchSection";
import { HomeSampleCta } from "@/components/sections/Hero";

type IntelligencePageWithDownloadProps = {
  generalReports: IntelligenceReportListItem[];
  weeklyLatest: IntelligenceReportListItem | null;
  showPlaceholders: boolean;
};

export function IntelligencePageWithDownload({
  generalReports,
  weeklyLatest,
  showPlaceholders,
}: IntelligencePageWithDownloadProps) {
  return (
    <IntelligenceDownloadProvider>
      <ExploreAllIntelligenceReports
        generalReports={generalReports}
        showPlaceholders={showPlaceholders}
      />
      <WeeklyReportsPitchSection latestWeekly={weeklyLatest} />
      <IntelligenceSamplePreviewSection />
      <HomeSampleCta sectionId="sample-download" />
    </IntelligenceDownloadProvider>
  );
}
