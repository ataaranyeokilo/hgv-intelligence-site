import type { SpreadsheetPreview } from "@/lib/reports/spreadsheet-preview";

export type { SpreadsheetPreview };

export type ReportContent = {
  introduction?: string;
  key_findings?: string[];
  charts?: { title: string; description?: string }[];
  spreadsheet_preview?: SpreadsheetPreview | null;
};

export const REPORT_STATUSES = ["draft", "published", "archived"] as const;

export type ReportStatus = (typeof REPORT_STATUSES)[number];

export function isReportStatus(value: string): value is ReportStatus {
  return (REPORT_STATUSES as readonly string[]).includes(value);
}

export const REPORT_KINDS = ["research", "intelligence"] as const;

export type ReportKind = (typeof REPORT_KINDS)[number];

export function isReportKind(value: string): value is ReportKind {
  return (REPORT_KINDS as readonly string[]).includes(value);
}

export function asReportKind(value: string | null | undefined): ReportKind {
  return value && isReportKind(value) ? value : "research";
}

export function kindFromRow(kind: unknown, category?: unknown): ReportKind {
  if (kind != null && String(kind).trim()) {
    return asReportKind(String(kind));
  }
  return String(category ?? "").trim().toLowerCase() === "intelligence"
    ? "intelligence"
    : "research";
}

export type IntelligenceReport = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  reading_time_minutes: number;
  published_at: string;
  published: boolean;
  status: ReportStatus;
  kind: ReportKind;
  content: ReportContent;
  hero_image_path: string | null;
  download_storage_path: string | null;
};

export type IntelligenceReportListItem = Pick<
  IntelligenceReport,
  | "id"
  | "slug"
  | "title"
  | "category"
  | "summary"
  | "reading_time_minutes"
  | "published_at"
  | "kind"
>;

export type ReportEventType = "viewed" | "clicked" | "download_started";
