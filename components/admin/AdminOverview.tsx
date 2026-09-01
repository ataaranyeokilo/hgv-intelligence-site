import { Card } from "@/components/ui/Card";
import type { AdminOverviewMetrics } from "@/lib/admin/metrics";

export function AdminOverview({ metrics }: { metrics: AdminOverviewMetrics }) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        Admin
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
        Overview
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
        How reports have been used in the last 7 days, and what is live on the
        website now.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <MetricCard
          value={String(metrics.downloadsLast7Days)}
          label="Downloads this week"
        />
        <MetricCard
          value={String(metrics.clicksLast7Days)}
          label="Report clicks this week"
        />
        <MetricCard
          value={String(metrics.publishedCount)}
          label="Live on the website"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <HighlightCard
          label="Most clicked"
          value={metrics.mostClickedTitle ?? "No clicks yet"}
        />
        <HighlightCard
          label="Most downloaded"
          value={metrics.mostDownloadedTitle ?? "No downloads yet"}
        />
      </div>
    </>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <Card>
      <p className="text-3xl font-semibold tracking-tight text-neutral-900">
        {value}
      </p>
      <p className="mt-2 text-sm text-neutral-500">{label}</p>
    </Card>
  );
}

function HighlightCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </p>
      <p className="mt-3 text-base font-semibold leading-snug text-neutral-900">
        {value}
      </p>
    </Card>
  );
}
