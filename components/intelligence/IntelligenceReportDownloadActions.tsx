"use client";

import { useEffect, useRef, type ReactNode } from "react";

import {
  IntelligenceDownloadProvider,
  useIntelligenceDownload,
} from "@/components/intelligence/IntelligenceDownloadProvider";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/Button";
import { pageContainerClass } from "@/lib/layout";

type ReportDownloadControlsProps = {
  reportId: string;
  title: string;
  autoOpenDownload: boolean;
  showHeaderDownload: boolean;
  contentClassName: string;
  children?: ReactNode;
};

function ReportDownloadControls({
  reportId,
  title,
  autoOpenDownload,
  showHeaderDownload,
  contentClassName,
  children,
}: ReportDownloadControlsProps) {
  const { openReportDownload } = useIntelligenceDownload();
  const didAutoOpen = useRef(false);

  useEffect(() => {
    if (!autoOpenDownload || didAutoOpen.current) return;
    didAutoOpen.current = true;
    openReportDownload({ reportId, title });
  }, [autoOpenDownload, openReportDownload, reportId, title]);

  return (
    <>
      {showHeaderDownload ? (
        <div className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
          <div
            className={`${pageContainerClass} flex items-center justify-between gap-4 py-3`}
          >
            <p className="truncate text-sm font-medium text-neutral-700">
              {title}
            </p>
            <Button
              type="button"
              className="shrink-0 px-4 py-2"
              onClick={() => openReportDownload({ reportId, title })}
            >
              Download
            </Button>
          </div>
        </div>
      ) : null}
      <div className={contentClassName}>
        {children}
        <div className="mt-12 flex flex-wrap gap-4">
          <Button
            type="button"
            onClick={() => openReportDownload({ reportId, title })}
          >
            Download full report
          </Button>
          <ButtonLink href="/research" variant="secondary">
            Back to Research
          </ButtonLink>
        </div>
      </div>
    </>
  );
}

type IntelligenceReportDownloadActionsProps = {
  reportId: string;
  title: string;
  autoOpenDownload?: boolean;
  showHeaderDownload?: boolean;
  contentClassName: string;
  children?: ReactNode;
};

export function IntelligenceReportDownloadActions({
  reportId,
  title,
  autoOpenDownload = false,
  showHeaderDownload = false,
  contentClassName,
  children,
}: IntelligenceReportDownloadActionsProps) {
  return (
    <IntelligenceDownloadProvider>
      <ReportDownloadControls
        reportId={reportId}
        title={title}
        autoOpenDownload={autoOpenDownload}
        showHeaderDownload={showHeaderDownload}
        contentClassName={contentClassName}
      >
        {children}
      </ReportDownloadControls>
    </IntelligenceDownloadProvider>
  );
}
