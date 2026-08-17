"use client";

import type { ComponentType } from "react";

import { Button } from "@/components/ui/Button";
import {
  IconBuilding,
  IconChart,
  IconDatabase,
  IconTruck,
} from "@/components/ui/icons";
import { useIntelligenceDownload } from "@/components/intelligence/IntelligenceDownloadProvider";
import type { ReportLibraryPlaceholder } from "@/lib/intelligence/report-library-placeholders";
import {
  reportCategoryIconKey,
  type ReportCategoryIconKey,
} from "@/lib/reports/format";

const iconByKey: Record<
  ReportCategoryIconKey,
  ComponentType<{ className?: string }>
> = {
  chart: IconChart,
  database: IconDatabase,
  truck: IconTruck,
  building: IconBuilding,
  file: IconChart,
  clock: IconChart,
};

type IntelligenceReportPlaceholderCardProps = {
  item: ReportLibraryPlaceholder;
};

export function IntelligenceReportPlaceholderCard({
  item,
}: IntelligenceReportPlaceholderCardProps) {
  const { openWeeklySample } = useIntelligenceDownload();
  const iconKey = reportCategoryIconKey(item.badge);
  const Icon = iconByKey[iconKey] ?? IconChart;

  return (
    <article className="flex h-full flex-col rounded-sm border border-neutral-200 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-sm border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-600 shadow-soft">
          Preview
        </span>
        <Icon className="h-5 w-5 shrink-0 text-neutral-600" aria-hidden />
      </div>
      <p className="mt-3 inline-flex self-start rounded-sm border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-500 shadow-soft">
        {item.badge}
      </p>
      <h2 className="mt-2 text-base font-semibold leading-snug text-neutral-900">
        {item.title}
      </h2>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
        {item.summary}
      </p>
      <p className="mt-4 text-xs text-neutral-500">{item.dateLabel}</p>
      <Button
        type="button"
        variant="secondary"
        className="mt-6 w-full text-sm"
        onClick={openWeeklySample}
      >
        Download sample
      </Button>
    </article>
  );
}
