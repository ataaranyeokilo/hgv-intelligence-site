import { requireAdminUser } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/service";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export type AdminOverviewMetrics = {
  downloadsLast7Days: number;
  clicksLast7Days: number;
  viewsLast7Days: number;
  publishedCount: number;
  mostClickedTitle: string | null;
  mostDownloadedTitle: string | null;
};

function emptyWindowCounts() {
  return { views: 0, clicks: 0, downloads: 0 };
}

export async function getAdminOverviewMetrics(): Promise<AdminOverviewMetrics> {
  await requireAdminUser();
  const supabase = createServiceClient();
  const since = new Date(Date.now() - SEVEN_DAYS_MS).toISOString();

  const [{ count: publishedCount }, { data: events, error: eventsError }, { data: reportRows }] =
    await Promise.all([
      supabase
        .from("intelligence_reports")
        .select("id", { count: "exact", head: true })
        .eq("status", "published"),
      supabase
        .from("report_events")
        .select("report_id, event_type")
        .gte("created_at", since),
      supabase.from("intelligence_reports").select("id, title"),
    ]);

  const totals = emptyWindowCounts();
  const byReport = new Map<string, ReturnType<typeof emptyWindowCounts>>();

  if (!eventsError && events) {
    for (const event of events as { report_id: string; event_type: string }[]) {
      const current = byReport.get(event.report_id) ?? emptyWindowCounts();
      if (event.event_type === "viewed") {
        totals.views += 1;
        current.views += 1;
      } else if (event.event_type === "clicked") {
        totals.clicks += 1;
        current.clicks += 1;
      } else if (event.event_type === "download_started") {
        totals.downloads += 1;
        current.downloads += 1;
      }
      byReport.set(event.report_id, current);
    }
  }

  const reports = reportRows ?? [];
  const titleById = new Map(
    reports.map((report) => [report.id as string, report.title as string]),
  );

  function titleForMax(
    metric: "clicks" | "downloads",
  ): string | null {
    let bestId: string | null = null;
    let bestCount = 0;
    for (const [reportId, counts] of byReport) {
      if (counts[metric] > bestCount) {
        bestCount = counts[metric];
        bestId = reportId;
      }
    }
    if (!bestId || bestCount === 0) {
      return null;
    }
    return titleById.get(bestId) ?? "Unknown report";
  }

  return {
    downloadsLast7Days: totals.downloads,
    clicksLast7Days: totals.clicks,
    viewsLast7Days: totals.views,
    publishedCount: publishedCount ?? 0,
    mostClickedTitle: titleForMax("clicks"),
    mostDownloadedTitle: titleForMax("downloads"),
  };
}
