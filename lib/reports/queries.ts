import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/env";

import type {
  IntelligenceReport,
  IntelligenceReportListItem,
} from "./types";

function mapReportRow(row: Record<string, unknown>): IntelligenceReport {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    category: String(row.category),
    summary: String(row.summary),
    reading_time_minutes: Number(row.reading_time_minutes),
    published_at: String(row.published_at),
    published: Boolean(row.published),
    content: (row.content ?? {}) as IntelligenceReport["content"],
    hero_image_path: row.hero_image_path ? String(row.hero_image_path) : null,
    download_storage_path: row.download_storage_path
      ? String(row.download_storage_path)
      : null,
  };
}

export async function listPublishedReports(): Promise<
  IntelligenceReportListItem[]
> {
  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("intelligence_reports")
    .select(
      "id, slug, title, category, summary, reading_time_minutes, published_at",
    )
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as IntelligenceReportListItem[];
}

export async function getPublishedReportBySlug(
  slug: string,
): Promise<IntelligenceReport | null> {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("intelligence_reports")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapReportRow(data as Record<string, unknown>);
}

export async function listLatestPublishedReports(
  limit: number,
): Promise<IntelligenceReportListItem[]> {
  const reports = await listPublishedReports();
  return reports.slice(0, limit);
}
