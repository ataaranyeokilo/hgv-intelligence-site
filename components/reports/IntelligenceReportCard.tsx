import Link from "next/link";
import type { ComponentType } from "react";

import {
  IconBuilding,
  IconChart,
  IconClock,
  IconDatabase,
  IconFile,
  IconTruck,
} from "@/components/ui/icons";
import {
  formatReportCategoryBadge,
  formatReportMonthYear,
  reportCategoryIconKey,
  type ReportCategoryIconKey,
} from "@/lib/reports/format";
import type { IntelligenceReportListItem } from "@/lib/reports/types";

const iconByKey: Record<
  ReportCategoryIconKey,
  ComponentType<{ className?: string }>
> = {
  chart: IconChart,
  database: IconDatabase,
  truck: IconTruck,
  building: IconBuilding,
  file: IconFile,
  clock: IconClock,
};

type IntelligenceReportCardProps = {
  report: IntelligenceReportListItem;
};

export function IntelligenceReportCard({ report }: IntelligenceReportCardProps) {
  const iconKey = reportCategoryIconKey(report.category);
  const Icon = iconByKey[iconKey];
  const badge = formatReportCategoryBadge(report.category);

  return (
    <article className="flex h-full flex-col rounded-sm border border-neutral-200 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-sm border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-600 shadow-soft">
          {badge}
        </span>
        <Icon className="h-5 w-5 shrink-0 text-neutral-600" aria-hidden />
      </div>
      <h2 className="mt-4 text-base font-semibold leading-snug text-neutral-900">
        {report.title}
      </h2>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
        {report.summary}
      </p>
      <p className="mt-4 text-xs text-neutral-500">
        {formatReportMonthYear(report.published_at)}
      </p>
      <Link
        href={`/intelligence/${report.slug}`}
        className="mt-6 text-sm font-medium text-neutral-900 hover:text-neutral-600"
      >
        View report →
      </Link>
    </article>
  );
}
