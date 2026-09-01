export type ReportContent = {
  introduction?: string;
  key_findings?: string[];
  charts?: { title: string; description?: string }[];
};

export const REPORT_STATUSES = ["draft", "published", "archived"] as const;

export type ReportStatus = (typeof REPORT_STATUSES)[number];

export function isReportStatus(value: string): value is ReportStatus {
  return (REPORT_STATUSES as readonly string[]).includes(value);
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
>;

export type ReportEventType = "viewed" | "clicked" | "download_started";
