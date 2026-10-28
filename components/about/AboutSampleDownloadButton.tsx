"use client";

import {
  IntelligenceDownloadProvider,
  useIntelligenceDownload,
} from "@/components/intelligence/IntelligenceDownloadProvider";
import { Button } from "@/components/ui/Button";

type LatestReport = { id: string; title: string } | null;

function DownloadButton({ latestReport }: { latestReport: LatestReport }) {
  const { openReportDownload, openWeeklySample } = useIntelligenceDownload();

  return (
    <Button
      type="button"
      variant="secondary"
      className="w-full text-center shadow-soft"
      onClick={() =>
        latestReport
          ? openReportDownload({
              reportId: latestReport.id,
              title: latestReport.title,
            })
          : openWeeklySample()
      }
    >
      Download Sample Report
    </Button>
  );
}

/** Downloads the latest published report, or the weekly sample when none is published. */
export function AboutSampleDownloadButton({
  latestReport,
}: {
  latestReport: LatestReport;
}) {
  return (
    <IntelligenceDownloadProvider>
      <DownloadButton latestReport={latestReport} />
    </IntelligenceDownloadProvider>
  );
}
