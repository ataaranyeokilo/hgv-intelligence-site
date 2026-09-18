"use server";

import { redirect } from "next/navigation";

import { requireAdminUser } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/service";
import {
  asReportKind,
  isReportStatus,
  kindFromRow,
  type ReportKind,
  type ReportStatus,
  type SpreadsheetPreview,
} from "@/lib/reports/types";

export type AdminReportInput = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  readingTimeMinutes: number;
  publishedAt: string;
  status: ReportStatus;
  kind: ReportKind;
  introduction: string;
  keyFindings: string[];
  downloadStoragePath: string;
  heroImagePath: string;
  spreadsheetPreview?: SpreadsheetPreview | null;
};

export type AdminReportListItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  kind: ReportKind;
  status: ReportStatus;
  published_at: string;
  updated_at: string;
  views: number;
  clicks: number;
  downloads: number;
};

type EventCountRow = {
  report_id: string;
  event_type: string;
};

function emptyCounts() {
  return { views: 0, clicks: 0, downloads: 0 };
}

function addEventCount(
  counts: ReturnType<typeof emptyCounts>,
  eventType: string,
) {
  if (eventType === "viewed") counts.views += 1;
  if (eventType === "clicked") counts.clicks += 1;
  if (eventType === "download_started") counts.downloads += 1;
}

function mapAdminStatus(row: {
  status?: string | null;
  published?: boolean | null;
}): ReportStatus {
  if (row.status && isReportStatus(row.status)) {
    return row.status;
  }
  return row.published ? "published" : "draft";
}

async function loadEventCounts(
  supabase: ReturnType<typeof createServiceClient>,
): Promise<Map<string, ReturnType<typeof emptyCounts>>> {
  const { data, error } = await supabase
    .from("report_events")
    .select("report_id, event_type");

  const countsByReport = new Map<string, ReturnType<typeof emptyCounts>>();

  if (error || !data) {
    return countsByReport;
  }

  for (const row of data as EventCountRow[]) {
    const current = countsByReport.get(row.report_id) ?? emptyCounts();
    addEventCount(current, row.event_type);
    countsByReport.set(row.report_id, current);
  }

  return countsByReport;
}

export async function listAdminReports(
  kind?: ReportKind,
): Promise<AdminReportListItem[]> {
  await requireAdminUser();
  const supabase = createServiceClient();
  const selectWithKind =
    "id, slug, title, category, summary, published, published_at, status, updated_at, kind";
  const selectLegacy =
    "id, slug, title, category, summary, published, published_at, status, updated_at";

  let query = supabase
    .from("intelligence_reports")
    .select(selectWithKind)
    .order("updated_at", { ascending: false });
  if (kind) {
    query = query.eq("kind", kind);
  }

  const { data, error: queryError } = await query;
  let error = queryError;
  let rows = (data ?? null) as Record<string, unknown>[] | null;

  if (error) {
    const fallback = await supabase
      .from("intelligence_reports")
      .select(selectLegacy)
      .order("updated_at", { ascending: false });
    rows = (fallback.data ?? null) as Record<string, unknown>[] | null;
    error = fallback.error;
  }

  if (error || !rows) {
    return [];
  }

  const countsByReport = await loadEventCounts(supabase);

  return rows
    .map((report) => {
      const id = String(report.id ?? "");
      const counts = countsByReport.get(id) ?? emptyCounts();
      return {
        id,
        slug: String(report.slug ?? ""),
        title: String(report.title ?? ""),
        summary: String(report.summary ?? ""),
        category: String(report.category ?? ""),
        kind: kindFromRow(report.kind, report.category),
        status: mapAdminStatus(report),
        published_at: String(report.published_at ?? ""),
        updated_at: String(report.updated_at ?? ""),
        ...counts,
      };
    })
    .filter((report) => (kind ? report.kind === kind : true));
}

export async function getAdminReport(id: string) {
  await requireAdminUser();
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("intelligence_reports")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data;
}

export async function saveAdminReport(
  input: AdminReportInput,
  id?: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    await requireAdminUser();
    const supabase = createServiceClient();

    const status = input.status;
    const kind = asReportKind(input.kind);
    const downloadStoragePath = input.downloadStoragePath.trim() || null;

    if (status === "published" && kind === "research" && !downloadStoragePath) {
      return {
        ok: false,
        message: "Upload a download file before publishing this report.",
      };
    }

    const payloadWithoutKind = {
      slug: input.slug.trim(),
      title: input.title.trim(),
      category: input.category.trim(),
      summary: input.summary.trim(),
      reading_time_minutes: input.readingTimeMinutes,
      published_at: input.publishedAt,
      status,
      published: status === "published",
      download_storage_path: downloadStoragePath,
      hero_image_path: input.heroImagePath.trim() || null,
      content: {
        introduction: input.introduction.trim(),
        key_findings: input.keyFindings.filter(Boolean),
        charts: [],
        spreadsheet_preview: input.spreadsheetPreview ?? null,
      },
      updated_at: new Date().toISOString(),
    };
    const payload = { ...payloadWithoutKind, kind };

    async function write(
      body: typeof payload | typeof payloadWithoutKind,
    ): Promise<{ ok: true } | { ok: false; message: string }> {
      if (id) {
        const { error } = await supabase
          .from("intelligence_reports")
          .update(body)
          .eq("id", id);
        if (error) {
          return { ok: false, message: error.message };
        }
      } else {
        const { error } = await supabase
          .from("intelligence_reports")
          .insert(body);
        if (error) {
          return { ok: false, message: error.message };
        }
      }
      return { ok: true };
    }

    const result = await write(payload);
    if (
      !result.ok &&
      result.message.toLowerCase().includes("kind")
    ) {
      return write(payloadWithoutKind);
    }
    return result;
  } catch (cause) {
    return {
      ok: false,
      message:
        cause instanceof Error && cause.message.trim()
          ? cause.message
          : "Could not save this report.",
    };
  }
}

export async function setAdminReportStatus(
  id: string,
  status: ReportStatus,
): Promise<{ ok: true } | { ok: false; message: string }> {
  await requireAdminUser();
  const supabase = createServiceClient();

  if (status === "published") {
    const withKind = await supabase
      .from("intelligence_reports")
      .select("download_storage_path, kind, category")
      .eq("id", id)
      .maybeSingle();
    const report = !withKind.error
      ? withKind.data
      : (
          await supabase
            .from("intelligence_reports")
            .select("download_storage_path, category")
            .eq("id", id)
            .maybeSingle()
        ).data;

    const kind = kindFromRow(
      report && "kind" in report ? report.kind : undefined,
      report?.category,
    );

    if (kind === "research" && !report?.download_storage_path) {
      return {
        ok: false,
        message: "Upload a download file before publishing this report.",
      };
    }
  }

  const { error } = await supabase
    .from("intelligence_reports")
    .update({
      status,
      published: status === "published",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true };
}

export async function signOutAdmin() {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
