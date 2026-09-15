import preview from "@/lib/reports/fixtures/uk-hgv-operator-master-2025.preview.json";
import type {
  IntelligenceReport,
  IntelligenceReportListItem,
} from "@/lib/reports/types";
import type { SpreadsheetPreview } from "@/lib/reports/spreadsheet-preview";

export const DEV_MASTER_REPORT_SLUG = "uk-hgv-operator-master-2025";

const spreadsheetPreview = preview as SpreadsheetPreview;

export const devMasterReport: IntelligenceReport = {
  id: "dev-uk-hgv-operator-master-2025",
  slug: DEV_MASTER_REPORT_SLUG,
  title: "UK HGV Operator Master 2025",
  category: "Operator data",
  summary:
    "Newly licensed UK HGV operators from 2025, with fleet size, region and licence type. Company names, addresses and licence numbers are hidden until you verify your email.",
  reading_time_minutes: 5,
  published_at: "2025-12-01T09:00:00.000Z",
  published: true,
  status: "published",
  content: {
    spreadsheet_preview: spreadsheetPreview,
  },
  hero_image_path: null,
  download_storage_path: null,
};

export function isDevMasterReportEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}

export function withDevMasterReport(
  reports: IntelligenceReportListItem[],
): IntelligenceReportListItem[] {
  if (!isDevMasterReportEnabled()) {
    return reports;
  }
  if (reports.some((report) => report.slug === DEV_MASTER_REPORT_SLUG)) {
    return reports;
  }
  const { id, slug, title, category, summary, reading_time_minutes, published_at } =
    devMasterReport;
  return [
    { id, slug, title, category, summary, reading_time_minutes, published_at },
    ...reports,
  ];
}
