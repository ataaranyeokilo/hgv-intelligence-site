import { IntelligenceReportCard } from "@/components/reports/IntelligenceReportCard";
import { IntelligenceReportPlaceholderCard } from "@/components/reports/IntelligenceReportPlaceholderCard";
import { IntelligenceSubscribeCard } from "@/components/reports/IntelligenceSubscribeCard";
import { reportLibraryPlaceholders } from "@/lib/intelligence/report-library-placeholders";
import { pageContainerClass } from "@/lib/layout";
import { isIntelligenceLibraryItem } from "@/lib/reports/classify";
import type { IntelligenceReportListItem } from "@/lib/reports/types";

type ExploreAllIntelligenceReportsProps = {
  items: IntelligenceReportListItem[];
  headingAs?: "h1" | "h2";
  showPlaceholders: boolean;
};

export function ExploreAllIntelligenceReports({
  items,
  headingAs: Heading = "h1",
  showPlaceholders,
}: ExploreAllIntelligenceReportsProps) {
  return (
    <section
      id="research-reports"
      className="scroll-mt-20 border-b border-neutral-200"
    >
      <div className={`${pageContainerClass} pt-6 pb-12 sm:pt-8 sm:pb-14`}>
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
        ) : items.length === 0 ? (
          <p className="mt-6 text-sm text-neutral-600">
            Reports and Intelligence cards will appear here when they are live.
          </p>
        ) : null}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {showPlaceholders
            ? reportLibraryPlaceholders.map((item) => (
                <IntelligenceReportPlaceholderCard key={item.title} item={item} />
              ))
            : items.map((item) =>
                isIntelligenceLibraryItem(item) ? (
                  <IntelligenceSubscribeCard key={item.id} item={item} />
                ) : (
                  <IntelligenceReportCard key={item.id} report={item} />
                ),
              )}
        </div>
      </div>
    </section>
  );
}
