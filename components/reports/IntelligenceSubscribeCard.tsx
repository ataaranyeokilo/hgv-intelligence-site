import Link from "next/link";

import { reportCardClassName, reportCardHitTargetClassName } from "@/components/reports/ReportCardExplore";
import { formatReportMonthYear } from "@/lib/reports/format";
import type { IntelligenceReportListItem } from "@/lib/reports/types";

export const subscribePillClassName =
  "inline-flex rounded-sm border border-amber-500 bg-amber-400 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-900 shadow-soft";

type IntelligenceSubscribeCardProps = {
  item: IntelligenceReportListItem;
};

export function IntelligenceSubscribeCard({
  item,
}: IntelligenceSubscribeCardProps) {
  return (
    <article className={reportCardClassName}>
      <div className="flex items-start justify-between gap-3">
        <span className={subscribePillClassName}>Subscribe</span>
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
      <span
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900"
        aria-hidden
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-200 ease-out group-hover:max-w-[9rem] group-hover:opacity-100 group-focus-within:max-w-[9rem] group-focus-within:opacity-100">
          Request a quote
        </span>
      </span>
      <Link
        href="/contact"
        className={reportCardHitTargetClassName}
        aria-label={`Request a quote for ${item.title}`}
      >
        <span className="sr-only">Request a quote for {item.title}</span>
      </Link>
    </article>
  );
}
