"use client";

import { useEffect, useRef } from "react";

import {
  IntelligenceDownloadProvider,
  useIntelligenceDownload,
} from "@/components/intelligence/IntelligenceDownloadProvider";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/Button";

type ReportDownloadControlsProps = {
  reportId: string;
  title: string;
  autoOpenDownload: boolean;
};

function ReportDownloadControls({
  reportId,
  title,
  autoOpenDownload,
}: ReportDownloadControlsProps) {
  const { openReportDownload } = useIntelligenceDownload();
  const didAutoOpen = useRef(false);

  useEffect(() => {
    if (!autoOpenDownload || didAutoOpen.current) return;
    didAutoOpen.current = true;
    openReportDownload({ reportId, title });
  }, [autoOpenDownload, openReportDownload, reportId, title]);

  return (
    <div className="mt-12 flex flex-wrap gap-4">
      <Button
        type="button"
        onClick={() => openReportDownload({ reportId, title })}
      >
        Download full report
      </Button>
      <ButtonLink href="/intelligence" variant="secondary">
        Back to Intelligence
      </ButtonLink>
    </div>
  );
}

type IntelligenceReportDownloadActionsProps = {
  reportId: string;
  title: string;
  autoOpenDownload?: boolean;
};

export function IntelligenceReportDownloadActions({
  reportId,
  title,
  autoOpenDownload = false,
}: IntelligenceReportDownloadActionsProps) {
  return (
    <IntelligenceDownloadProvider>
      <ReportDownloadControls
        reportId={reportId}
        title={title}
        autoOpenDownload={autoOpenDownload}
      />
    </IntelligenceDownloadProvider>
  );
}
