import type { AdminLeadPerson } from "@/lib/admin/leads";
import type { AdminOverviewMetrics } from "@/lib/admin/metrics";
import type { AdminReportListItem } from "@/lib/admin/reports";
import type { ReportStatus } from "@/lib/reports/types";

export function isAdminUiPreview(): boolean {
  return process.env.NODE_ENV === "development";
}

export type AdminPreviewReport = AdminReportListItem & {
  fileName: string | null;
};

export const adminPreviewReports: AdminPreviewReport[] = [
  {
    id: "preview-outlook",
    slug: "uk-hgv-market-outlook-q2-2026",
    title: "UK HGV Market Outlook Q2 2026",
    summary:
      "Analysis of operator activity, registration trends and factors shaping the UK HGV market.",
    category: "Market outlook",
    kind: "research",
    status: "published",
    published_at: "2026-07-01T09:00:00.000Z",
    updated_at: "2026-07-02T09:00:00.000Z",
    views: 186,
    clicks: 74,
    downloads: 31,
    fileName: "uk-hgv-market-outlook-q2-2026.pdf",
  },
  {
    id: "preview-insights",
    slug: "uk-operator-insights-2026",
    title: "UK Operator Insights Report 2026",
    summary:
      "Key findings on operator demographics, licence types, fleet sizes and regional distribution.",
    category: "Operator insights",
    kind: "research",
    status: "published",
    published_at: "2026-06-12T09:00:00.000Z",
    updated_at: "2026-06-12T09:00:00.000Z",
    views: 142,
    clicks: 51,
    downloads: 22,
    fileName: "uk-operator-insights-2026.pdf",
  },
  {
    id: "preview-fleet",
    slug: "fleet-size-and-trends-2026",
    title: "Fleet Size and Trends Report 2026",
    summary:
      "Analysis of fleet-size changes, operator growth and commercial vehicle capacity across the UK.",
    category: "Fleet trends",
    kind: "research",
    status: "draft",
    published_at: "2026-05-20T09:00:00.000Z",
    updated_at: "2026-08-28T09:00:00.000Z",
    views: 0,
    clicks: 0,
    downloads: 0,
    fileName: "fleet-size-and-trends-2026.pdf",
  },
  {
    id: "preview-regional",
    slug: "regional-hgv-activity-q1-2026",
    title: "Regional HGV Activity Report Q1 2026",
    summary:
      "A quarterly breakdown of operator registrations and activity by UK region.",
    category: "Regional analysis",
    kind: "research",
    status: "archived",
    published_at: "2026-04-08T09:00:00.000Z",
    updated_at: "2026-08-01T09:00:00.000Z",
    views: 90,
    clicks: 28,
    downloads: 11,
    fileName: "regional-hgv-activity-q1-2026.pdf",
  },
];

export const adminPreviewIntelligenceItems: AdminPreviewReport[] = [
  {
    id: "preview-intel-midlands",
    slug: "midlands-operator-intelligence",
    title: "Midlands operator intelligence",
    summary:
      "Newly licensed operators in the Midlands with fleet size, licence type and enriched contacts.",
    category: "Intelligence",
    kind: "intelligence",
    status: "published",
    published_at: "2026-08-01T09:00:00.000Z",
    updated_at: "2026-08-04T09:00:00.000Z",
    views: 0,
    clicks: 0,
    downloads: 0,
    fileName: "midlands-operator-intelligence.xlsx",
  },
  {
    id: "preview-intel-north",
    slug: "north-west-operator-intelligence",
    title: "North West operator intelligence",
    summary:
      "Weekly new-operator leads for the North West, ready for CRM outreach.",
    category: "Intelligence",
    kind: "intelligence",
    status: "draft",
    published_at: "2026-09-01T09:00:00.000Z",
    updated_at: "2026-09-02T09:00:00.000Z",
    views: 0,
    clicks: 0,
    downloads: 0,
    fileName: null,
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

export const adminPreviewLeads: AdminLeadPerson[] = [
  {
    email: "alex@northfleetfuels.example",
    name: "Alex Taylor",
    lastSeenAt: "2026-09-18T22:10:00.000Z",
    sources: ["quote", "download"],
    quotes: [
      {
        createdAt: "2026-09-18T22:10:00.000Z",
        company: "North Fleet Fuels",
        role: "Sales director",
        sector: "Fuel suppliers",
        region: "North of England",
        volume: "50–200 new operators a week",
        phone: "0161 000 0000",
        interest: "New Operator Contact Enrichment",
        notes: "Looking at mixed fleets in Greater Manchester.",
      },
    ],
    latestContactMessage: null,
    downloadLabel: "Sample download (verified)",
  },
  {
    email: "sam@example.com",
    name: null,
    lastSeenAt: "2026-09-12T09:00:00.000Z",
    sources: ["download"],
    quotes: [],
    latestContactMessage: null,
    downloadLabel: "Sample download",
  },
];

export function getAdminPreviewReport(
  id: string,
): AdminPreviewReport | undefined {
  return adminPreviewReports.find((report) => report.id === id);
}

export function getAdminPreviewIntelligenceItem(
  id: string,
): AdminPreviewReport | undefined {
  return adminPreviewIntelligenceItems.find((item) => item.id === id);
}

export function statusLabel(status: ReportStatus): string {
  return status === "published" ? "Live" : "Not live";
}
