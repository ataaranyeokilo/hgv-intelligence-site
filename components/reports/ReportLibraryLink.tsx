"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { trackReportClick } from "@/lib/reports/events";

type ReportLibraryLinkProps = {
  reportId: string;
  slug: string;
  children?: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function ReportLibraryLink({
  reportId,
  slug,
  children,
  className,
  "aria-label": ariaLabel,
}: ReportLibraryLinkProps) {
  return (
    <Link
      href={`/intelligence/${slug}`}
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        void trackReportClick(reportId);
      }}
    >
      {children}
    </Link>
  );
}
