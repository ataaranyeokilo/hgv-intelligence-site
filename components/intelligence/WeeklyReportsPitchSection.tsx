"use client";

import { Button } from "@/components/ui/Button";
import { useIntelligenceDownload } from "@/components/intelligence/IntelligenceDownloadProvider";
import { pageContainerClass } from "@/lib/layout";
import { formatReportMonthYear } from "@/lib/reports/format";
import type { IntelligenceReportListItem } from "@/lib/reports/types";

const PLACEHOLDER_TITLE = "12 May – 18 May 2026";
const PLACEHOLDER_SUMMARY =
  "142 new operator registrations across the UK, with the highest activity in the West Midlands.";

type WeeklyReportsPitchSectionProps = {
  latestWeekly: IntelligenceReportListItem | null;
};

export function WeeklyReportsPitchSection({
  latestWeekly,
}: WeeklyReportsPitchSectionProps) {
  const { openReportDownload } = useIntelligenceDownload();

  return (
    <section
      id="weekly-reports"
      className="scroll-mt-20 border-b border-neutral-200"
    >
      <div className={`${pageContainerClass} py-12 sm:py-14`}>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Weekly HGV operator reports
        </h2>
        <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
          <p>
            Each week we publish a structured Excel report of newly registered
            HGV operators from the previous seven days — companies whose operator
            licence applications have been approved, enriched with contact details
            where available so your team can reach them directly.
          </p>
          <p>
            We source the information through our data pipelines, organise it
            consistently, and deliver it weekly to businesses that need fresh
            operator intelligence — ready for outreach without manual research.
          </p>
        </div>
        <div className="mt-8 max-w-xl rounded-sm border border-neutral-200 bg-white p-6">
          <span className="inline-flex rounded-sm border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
            Latest weekly report
          </span>
          <h3 className="mt-4 text-xl font-semibold text-neutral-900">
            {latestWeekly?.title ?? PLACEHOLDER_TITLE}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            {latestWeekly?.summary ?? PLACEHOLDER_SUMMARY}
          </p>
          {latestWeekly ? (
            <p className="mt-3 text-xs text-neutral-500">
              {formatReportMonthYear(latestWeekly.published_at)}
            </p>
          ) : (
            <p className="mt-3 text-xs text-neutral-500">Preview</p>
          )}
          {latestWeekly ? (
            <div className="mt-8">
              <Button
                type="button"
                className="w-full sm:w-auto"
                onClick={() =>
                  openReportDownload({
                    reportId: latestWeekly.id,
                    title: latestWeekly.title,
                  })
                }
              >
                View report →
              </Button>
            </div>
          ) : (
            <p className="mt-8 text-xs text-neutral-500">
              Publish a report with category containing &quot;weekly&quot; to
              link a live weekly report here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
