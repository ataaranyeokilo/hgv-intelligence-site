export type ReportContent = {
  introduction?: string;
  key_findings?: string[];
  charts?: { title: string; description?: string }[];
};

export type IntelligenceReport = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  reading_time_minutes: number;
  published_at: string;
  published: boolean;
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
