import { IntelligenceReportCard } from "@/components/reports/IntelligenceReportCard";
import { IntelligenceReportPlaceholderCard } from "@/components/reports/IntelligenceReportPlaceholderCard";
import { reportLibraryPlaceholders } from "@/lib/intelligence/report-library-placeholders";
import { pageContainerClass } from "@/lib/layout";
import type { IntelligenceReportListItem } from "@/lib/reports/types";

type ExploreAllIntelligenceReportsProps = {
  generalReports: IntelligenceReportListItem[];
  headingAs?: "h1" | "h2";
  showPlaceholders: boolean;
};

export function ExploreAllIntelligenceReports({
  generalReports,
  headingAs: Heading = "h1",
  showPlaceholders,
}: ExploreAllIntelligenceReportsProps) {
  return (
    <section
      id="research-reports"
      className="scroll-mt-20 border-b border-neutral-200"
    >
      <div className={`${pageContainerClass} py-12 sm:py-14`}>
        <Heading className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Explore all research
        </Heading>
        <p className="mt-3 max-w-2xl text-sm text-neutral-600 sm:text-base">
          Browse the latest published reports across different categories.
        </p>
        {showPlaceholders ? (
          <p className="mt-2 text-xs text-neutral-500">
            Preview cards below — live reports will appear here once published.
          </p>
        ) : generalReports.length === 0 ? (
          <p className="mt-6 text-sm text-neutral-600">
            General intelligence reports will appear here when published. Weekly
            operator reports are described below.
          </p>
        ) : null}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {showPlaceholders
            ? reportLibraryPlaceholders.map((item) => (
                <IntelligenceReportPlaceholderCard key={item.title} item={item} />
              ))
            : generalReports.map((report) => (
                <IntelligenceReportCard key={report.id} report={report} />
              ))}
        </div>
      </div>
    </section>
  );
}
