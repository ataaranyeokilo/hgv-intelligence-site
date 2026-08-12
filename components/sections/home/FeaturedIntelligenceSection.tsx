import Link from "next/link";

import { IntelligenceDownloadProvider } from "@/components/intelligence/IntelligenceDownloadProvider";
import { FeaturedReportsScroller } from "@/components/sections/home/FeaturedReportsScroller";
import { IntelligenceReportCard } from "@/components/reports/IntelligenceReportCard";
import { IntelligenceReportPlaceholderCard } from "@/components/reports/IntelligenceReportPlaceholderCard";
import { reportLibraryPlaceholders } from "@/lib/intelligence/report-library-placeholders";
import { pageContainerClass } from "@/lib/layout";
import { listPublishedReports } from "@/lib/reports/queries";
import { selectFeaturedReports } from "@/lib/reports/select-featured-reports";

export async function FeaturedIntelligenceSection() {
  const reports = await listPublishedReports();
  const showPlaceholders = reports.length === 0;
  const featuredReports = selectFeaturedReports(reports);
  const itemCount = showPlaceholders
    ? reportLibraryPlaceholders.length
    : featuredReports.length;

  if (itemCount === 0) return null;

  return (
    <section className="border-b border-neutral-200 bg-neutral-50/50">
      <div className={`${pageContainerClass} py-10 sm:py-12`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Explore our intelligence
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-neutral-600 sm:text-base">
              Browse the latest published reports across different categories.
            </p>
          </div>
          <Link
            href="/intelligence"
            className="shrink-0 text-sm font-medium text-neutral-900 hover:text-neutral-600"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8">
          <IntelligenceDownloadProvider>
            <FeaturedReportsScroller itemCount={itemCount}>
              {showPlaceholders
                ? reportLibraryPlaceholders.map((item) => (
                    <IntelligenceReportPlaceholderCard
                      key={item.title}
                      item={item}
                    />
                  ))
                : featuredReports.map((report) => (
                    <IntelligenceReportCard key={report.id} report={report} />
                  ))}
            </FeaturedReportsScroller>
          </IntelligenceDownloadProvider>
        </div>
      </div>
    </section>
  );
}
