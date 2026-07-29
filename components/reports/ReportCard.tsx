import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { IconDocument } from "@/components/ui/icons";
import { categoryBadgeLabel } from "@/lib/layout";
import type { IntelligenceReportListItem } from "@/lib/reports/types";

type ReportCardProps = {
  report: IntelligenceReportListItem;
  variant?: "default" | "library";
};

export function ReportCard({ report, variant = "default" }: ReportCardProps) {
  if (variant === "library") {
    return (
      <article className="flex h-full flex-col rounded-sm border border-neutral-200 bg-white p-6">
        <span className="inline-flex w-fit rounded-sm border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
          Weekly report
        </span>
        <h2 className="mt-4 text-xl font-semibold leading-snug text-neutral-900">
          {report.title}
        </h2>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
          {report.summary}
        </p>
        <Link
          href={`/intelligence/${report.slug}`}
          className="mt-8 text-sm font-medium text-neutral-900 hover:text-neutral-600"
        >
          View report →
        </Link>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col rounded-sm border border-neutral-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="text-neutral-500">
          <IconDocument className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
          {categoryBadgeLabel(report.category)}
        </span>
      </div>
      <h2 className="mt-4 text-lg font-semibold leading-snug text-neutral-900">
        {report.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
        {report.summary}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/intelligence/${report.slug}`}
          className="text-sm font-medium text-neutral-900 hover:text-neutral-600"
        >
          View summary →
        </Link>
        <ButtonLink
          href={`/download/intelligence/${report.slug}`}
          className="px-4 py-2 text-xs sm:text-sm"
        >
          Download report
        </ButtonLink>
      </div>
    </article>
  );
}
