"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { trackReportClick } from "@/lib/reports/events";

type ReportLibraryLinkProps = {
  reportId: string;
  slug: string;
  children: ReactNode;
  className?: string;
};

export function ReportLibraryLink({
  reportId,
  slug,
  children,
  className,
}: ReportLibraryLinkProps) {
  return (
    <Link
      href={`/intelligence/${slug}`}
      className={className}
      onClick={() => {
        void trackReportClick(reportId);
      }}
    >
      {children}
    </Link>
  );
}
