"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type ComponentType } from "react";

import { ReportStatusBadge } from "@/components/admin/ReportStatusBadge";
import { subscribePillClassName } from "@/components/reports/IntelligenceSubscribeCard";
import {
  IconBuilding,
  IconChart,
  IconClock,
  IconDatabase,
  IconFile,
  IconTruck,
} from "@/components/ui/icons";
import {
  setAdminReportStatus,
  type AdminReportListItem,
} from "@/lib/admin/reports";
import {
  formatReportCategoryBadge,
  formatReportMonthYear,
  reportCategoryIconKey,
  type ReportCategoryIconKey,
} from "@/lib/reports/format";
import type { ReportKind, ReportStatus } from "@/lib/reports/types";

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

type AdminLibraryCardsProps = {
  items: AdminReportListItem[];
  kind: ReportKind;
  preview?: boolean;
  newHref: string;
};

export function AdminLibraryCards({
  items,
  kind,
  preview = false,
  newHref,
}: AdminLibraryCardsProps) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isIntelligence = kind === "intelligence";

  function run(item: AdminReportListItem, status: ReportStatus, label: string) {
    setMessage(null);
    if (preview) {
      setMessage(`${label} will be connected when saving is switched on.`);
      return;
    }
    setPendingId(item.id);
    startTransition(async () => {
      const result = await setAdminReportStatus(item.id, status);
      setPendingId(null);
      if (!result.ok) {
        setMessage(result.message);
        return;
      }
      router.refresh();
    });
  }

  if (items.length === 0) {
    return (
      <p className="mt-10 text-sm text-neutral-600">
        No {isIntelligence ? "Intelligence items" : "reports"} yet.{" "}
        <Link href={newHref} className="font-medium text-neutral-900">
          Add {isIntelligence ? "intelligence" : "a report"}
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="mt-14">
      {message ? (
        <p className="mb-4 text-sm text-neutral-600" role="status">
          {message}
        </p>
      ) : null}
      <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
        {isIntelligence ? "Intelligence cards" : "Research cards"}
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const busy = isPending && pendingId === item.id;
          const live = item.status === "published";
          const Icon =
            iconByKey[reportCategoryIconKey(item.category)] ?? IconFile;
          const editHref = isIntelligence
            ? `/admin/intelligence/${item.id}/edit`
            : `/admin/reports/${item.id}/edit`;

          return (
            <article
              key={item.id}
              className="flex h-full flex-col rounded-sm border border-neutral-200 bg-white p-5 shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                {isIntelligence ? (
                  <span className={subscribePillClassName}>Subscribe</span>
                ) : (
                  <span className="inline-flex rounded-sm border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-600 shadow-soft">
                    {formatReportCategoryBadge(item.category)}
                  </span>
                )}
                <Icon className="h-5 w-5 shrink-0 text-neutral-600" aria-hidden />
              </div>
              <div className="mt-3">
                <ReportStatusBadge status={item.status} />
              </div>
              <h2 className="mt-4 text-base font-semibold leading-snug text-neutral-900">
                {item.title}
              </h2>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
                {item.summary}
              </p>
              <p className="mt-4 text-xs text-neutral-500">
                {formatReportMonthYear(item.published_at)}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
                <Link
                  href={editHref}
                  className="text-neutral-900 hover:text-neutral-600"
                >
                  Edit
                </Link>
                {live ? (
                  <button
                    type="button"
                    className="text-neutral-900 hover:text-neutral-600 disabled:text-neutral-400"
                    disabled={busy}
                    onClick={() => run(item, "draft", "Take down")}
                  >
                    Take down
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-fleetSignal hover:text-blue-700 disabled:text-neutral-400"
                    disabled={busy}
                    onClick={() => run(item, "published", "Go live")}
                  >
                    Go live
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
