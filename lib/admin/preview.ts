import type { AdminOverviewMetrics } from "@/lib/admin/metrics";
import type { AdminReportListItem } from "@/lib/admin/reports";
import type { ReportStatus } from "@/lib/reports/types";

export function isAdminUiPreview(): boolean {
  return process.env.NODE_ENV === "development";
}

export type AdminPreviewReport = AdminReportListItem & {
  summary: string;
  fileName: string | null;
};

export const adminPreviewReports: AdminPreviewReport[] = [
  {
    id: "preview-outlook",
    slug: "uk-hgv-market-outlook-q2-2026",
    title: "UK HGV Market Outlook Q2 2026",
    status: "published",
    published_at: "2026-07-01T09:00:00.000Z",
    updated_at: "2026-07-02T09:00:00.000Z",
    views: 186,
    clicks: 74,
    downloads: 31,
    summary:
      "Analysis of operator activity, registration trends and factors shaping the UK HGV market.",
    fileName: "uk-hgv-market-outlook-q2-2026.pdf",
  },
  {
    id: "preview-insights",
    slug: "uk-operator-insights-2026",
    title: "UK Operator Insights Report 2026",
    status: "published",
    published_at: "2026-06-12T09:00:00.000Z",
    updated_at: "2026-06-12T09:00:00.000Z",
    views: 142,
    clicks: 51,
    downloads: 22,
    summary:
      "Key findings on operator demographics, licence types, fleet sizes and regional distribution.",
    fileName: "uk-operator-insights-2026.pdf",
  },
  {
    id: "preview-fleet",
    slug: "fleet-size-and-trends-2026",
    title: "Fleet Size and Trends Report 2026",
    status: "draft",
    published_at: "2026-05-20T09:00:00.000Z",
    updated_at: "2026-08-28T09:00:00.000Z",
    views: 0,
    clicks: 0,
    downloads: 0,
    summary:
      "Analysis of fleet-size changes, operator growth and commercial vehicle capacity across the UK.",
    fileName: "fleet-size-and-trends-2026.pdf",
  },
  {
    id: "preview-regional",
    slug: "regional-hgv-activity-q1-2026",
    title: "Regional HGV Activity Report Q1 2026",
    status: "archived",
    published_at: "2026-04-08T09:00:00.000Z",
    updated_at: "2026-08-01T09:00:00.000Z",
    views: 90,
    clicks: 28,
    downloads: 11,
    summary:
      "A quarterly breakdown of operator registrations and activity by UK region.",
    fileName: "regional-hgv-activity-q1-2026.pdf",
  },
];

export const adminPreviewIntelligenceSample = {
  fileName: "fleet-signal-intelligence-sample.xlsx",
};

export const adminPreviewMetrics: AdminOverviewMetrics = {
  downloadsLast7Days: 24,
  clicksLast7Days: 61,
  viewsLast7Days: 118,
  publishedCount: 2,
  mostClickedTitle: "UK HGV Market Outlook Q2 2026",
  mostDownloadedTitle: "UK Operator Insights Report 2026",
};

export function getAdminPreviewReport(
  id: string,
): AdminPreviewReport | undefined {
  return adminPreviewReports.find((report) => report.id === id);
}

export function statusLabel(status: ReportStatus): string {
  if (status === "draft") return "Draft";
  if (status === "published") return "Published";
  return "Archived";
}
