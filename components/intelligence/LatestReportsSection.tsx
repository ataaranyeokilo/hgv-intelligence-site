import { ReportCard } from "@/components/reports/ReportCard";
import { pageContainerClass } from "@/lib/layout";
import type { IntelligenceReportListItem } from "@/lib/reports/types";

type LatestReportsSectionProps = {
  reports: IntelligenceReportListItem[];
};

export function LatestReportsSection({ reports }: LatestReportsSectionProps) {
  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} py-14 sm:py-16`}>
        <h2 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
          Intelligence
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600">
          Free industry reports on UK HGV operators — registration trends,
          regional insights, and market shifts.
        </p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-neutral-600">
          Enter your email on any report to receive the full PDF after
          verification.
        </p>
        <h3 className="mt-14 text-xl font-semibold text-neutral-900">
          Latest reports
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-neutral-600">
          Quarterly and annual reports based on the latest operator registration
          data across the UK haulage sector.
        </p>
        {reports.length === 0 ? (
          <p className="mt-10 text-neutral-600">
            Reports will appear here once published. You can still request a
            quote above.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
