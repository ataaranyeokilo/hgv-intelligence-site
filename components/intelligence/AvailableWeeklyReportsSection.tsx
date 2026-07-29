import { ReportCard } from "@/components/reports/ReportCard";
import { WeeklyReportPlaceholderCard } from "@/components/reports/WeeklyReportPlaceholderCard";
import { pageContainerClass } from "@/lib/layout";
import type { IntelligenceReportListItem } from "@/lib/reports/types";

/** Shown when no published reports yet; replaced automatically once admin publishes. */
export const weeklyReportPlaceholders = [
  {
    title: "12 May – 18 May 2025",
    summary:
      "142 new operator registrations across the UK. Highest activity in the West Midlands.",
  },
  {
    title: "5 May – 11 May 2025",
    summary:
      "128 new operator registrations across the UK. Strong growth in Yorkshire and the North West.",
  },
  {
    title: "28 Apr – 4 May 2025",
    summary:
      "119 new operator registrations across the UK. Steady activity across England and Wales.",
  },
] as const;

type AvailableWeeklyReportsSectionProps = {
  reports: IntelligenceReportListItem[];
};

export function AvailableWeeklyReportsSection({
  reports,
}: AvailableWeeklyReportsSectionProps) {
  const showPlaceholders = reports.length === 0;

  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} py-12 sm:py-14`}>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Available weekly reports
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-neutral-600 sm:text-base">
          Browse the latest published intelligence reports.
        </p>
        {showPlaceholders ? (
          <p className="mt-2 text-xs text-neutral-500">
            Placeholder previews below — live reports will replace these when
            published.
          </p>
        ) : null}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {showPlaceholders
            ? weeklyReportPlaceholders.map((item) => (
                <WeeklyReportPlaceholderCard
                  key={item.title}
                  title={item.title}
                  summary={item.summary}
                />
              ))
            : reports.map((report) => (
                <ReportCard key={report.id} report={report} variant="library" />
              ))}
        </div>
      </div>
    </section>
  );
}
