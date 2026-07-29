import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { ReportCard } from "@/components/reports/ReportCard";
import type { IntelligenceReportListItem } from "@/lib/reports/types";

type LatestIntelligenceProps = {
  reports: IntelligenceReportListItem[];
};

export function LatestIntelligence({ reports }: LatestIntelligenceProps) {
  const items = reports.slice(0, 3);

  return (
    <Section id="latest-intelligence" bordered={false}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">
            Latest intelligence
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Free industry reports on UK HGV operators — published when ready.
          </p>
        </div>
        <Link
          href="/intelligence"
          className="text-sm font-medium text-neutral-900 hover:text-neutral-600"
        >
          View all reports →
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="mt-6 text-neutral-600">
          New reports will appear here once published.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {items.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </Section>
  );
}
