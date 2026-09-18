import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/env";

import {
  isReportStatus,
  kindFromRow,
  type IntelligenceReport,
  type IntelligenceReportListItem,
  type ReportKind,
} from "./types";
import {
  DEV_MASTER_REPORT_SLUG,
  devMasterReport,
  isDevMasterReportEnabled,
  withDevMasterReport,
} from "./dev-master-report";

const PUBLISHED_SELECT =
  "id, slug, title, category, summary, reading_time_minutes, published_at, kind";
const PUBLISHED_SELECT_LEGACY =
  "id, slug, title, category, summary, reading_time_minutes, published_at";

function mapReportListItem(
  row: Record<string, unknown>,
): IntelligenceReportListItem {
  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    title: String(row.title ?? ""),
    category: String(row.category ?? ""),
    summary: String(row.summary ?? ""),
    reading_time_minutes: Number(row.reading_time_minutes ?? 0),
    published_at: String(row.published_at ?? ""),
    kind: kindFromRow(row.kind, row.category),
  };
}

function mapReportRow(row: Record<string, unknown>): IntelligenceReport {
  const statusValue = String(row.status ?? "");
  const published = Boolean(row.published) || statusValue === "published";

  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    title: String(row.title ?? ""),
    category: String(row.category ?? ""),
    summary: String(row.summary ?? ""),
    reading_time_minutes: Number(row.reading_time_minutes ?? 0),
    published_at: String(row.published_at ?? ""),
    published,
    status: isReportStatus(statusValue)
      ? statusValue
      : published
        ? "published"
        : "draft",
    kind: kindFromRow(row.kind, row.category),
    content: (row.content ?? {}) as IntelligenceReport["content"],
    hero_image_path: row.hero_image_path ? String(row.hero_image_path) : null,
    download_storage_path: row.download_storage_path
      ? String(row.download_storage_path)
      : null,
  };
}

function filterByKind(
  reports: IntelligenceReportListItem[],
  kind: ReportKind | "all",
): IntelligenceReportListItem[] {
  if (kind === "all") return reports;
  return reports.filter((report) => report.kind === kind);
}

export async function listPublishedReports(options?: {
  kind?: ReportKind | "all";
}): Promise<IntelligenceReportListItem[]> {
  const kind = options?.kind ?? "all";

  if (!hasSupabaseEnv()) {
    return filterByKind(withDevMasterReport([]), kind);
  }

  const supabase = await createClient();

  const byStatus = await supabase
    .from("intelligence_reports")
    .select(PUBLISHED_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (!byStatus.error && byStatus.data) {
    return filterByKind(
      withDevMasterReport(
        (byStatus.data as Record<string, unknown>[]).map(mapReportListItem),
      ),
      kind,
    );
  }

  const { data, error } = await supabase
    .from("intelligence_reports")
    .select(PUBLISHED_SELECT_LEGACY)
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error || !data) {
    return filterByKind(withDevMasterReport([]), kind);
  }

  return filterByKind(
    withDevMasterReport(
      (data as Record<string, unknown>[]).map(mapReportListItem),
    ),
    kind,
  );
}

export async function getPublishedReportBySlug(
  slug: string,
): Promise<IntelligenceReport | null> {
  if (!hasSupabaseEnv()) {
    if (isDevMasterReportEnabled() && slug === DEV_MASTER_REPORT_SLUG) {
      return devMasterReport;
    }
    return null;
  }

  const supabase = await createClient();

  const byStatus = await supabase
    .from("intelligence_reports")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  const resolved = !byStatus.error
    ? byStatus
    : await supabase
        .from("intelligence_reports")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

  const { data, error } = resolved;

  if (error || !data) {
    if (isDevMasterReportEnabled() && slug === DEV_MASTER_REPORT_SLUG) {
      return devMasterReport;
    }
    return null;
  }

  const report = mapReportRow(data as Record<string, unknown>);
  if (report.kind === "intelligence") {
    return null;
  }
  return report;
}

export async function listLatestPublishedReports(
  limit: number,
): Promise<IntelligenceReportListItem[]> {
  const reports = await listPublishedReports({ kind: "research" });
  return reports.slice(0, limit);
}
