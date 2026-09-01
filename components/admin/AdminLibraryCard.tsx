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
  file: IconFile,
  clock: IconClock,
};

export type AdminLibraryCardItem = {
  id: string;
  badge: string;
  title: string;
  summary: string;
  dateLabel: string;
};

export function AdminLibraryCard({ item }: { item: AdminLibraryCardItem }) {
  const Icon = iconByKey[reportCategoryIconKey(item.badge)] ?? IconFile;

  return (
    <article className="flex h-full flex-col rounded-sm border border-neutral-200 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-sm border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-600 shadow-soft">
          {item.badge}
        </span>
        <Icon className="h-5 w-5 shrink-0 text-neutral-600" aria-hidden />
      </div>
      <h2 className="mt-4 text-base font-semibold leading-snug text-neutral-900">
        {item.title}
      </h2>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
        {item.summary}
      </p>
      <p className="mt-4 text-xs text-neutral-500">{item.dateLabel}</p>
    </article>
  );
}

export function AdminLibraryGrid({
  items,
  emptyMessage,
}: {
  items: AdminLibraryCardItem[];
  emptyMessage: string;
}) {
  if (items.length === 0) {
    return (
      <p className="mt-8 text-sm text-neutral-600">{emptyMessage}</p>
    );
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <AdminLibraryCard key={item.id} item={item} />
      ))}
    </div>
  );
}
