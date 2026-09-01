"use server";

import { redirect } from "next/navigation";

import { requireAdminUser } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/service";
import {
  isReportStatus,
  type ReportStatus,
} from "@/lib/reports/types";

export type AdminReportInput = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  readingTimeMinutes: number;
  publishedAt: string;
  status: ReportStatus;
  introduction: string;
  keyFindings: string[];
  downloadStoragePath: string;
  heroImagePath: string;
};

export type AdminReportListItem = {
  id: string;
  slug: string;
  title: string;
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

export async function listAdminReports(): Promise<AdminReportListItem[]> {
  await requireAdminUser();
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("intelligence_reports")
    .select("id, slug, title, published, published_at, status, updated_at")
    .order("updated_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  const countsByReport = await loadEventCounts(supabase);

  return data.map((report) => {
    const counts = countsByReport.get(report.id) ?? emptyCounts();
    return {
      id: report.id,
      slug: report.slug,
      title: report.title,
      status: mapAdminStatus(report),
      published_at: report.published_at,
      updated_at: report.updated_at,
      ...counts,
    };
  });
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
  await requireAdminUser();
  const supabase = createServiceClient();

  const status = input.status;
  const downloadStoragePath = input.downloadStoragePath.trim() || null;

  if (status === "published" && !downloadStoragePath) {
    return {
      ok: false,
      message: "Upload a download file before publishing this report.",
    };
  }

  const payload = {
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
    },
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase
      .from("intelligence_reports")
      .update(payload)
      .eq("id", id);
    if (error) {
      return { ok: false, message: error.message };
    }
  } else {
    const { error } = await supabase.from("intelligence_reports").insert(payload);
    if (error) {
      return { ok: false, message: error.message };
    }
  }

  return { ok: true };
}

export async function setAdminReportStatus(
  id: string,
  status: ReportStatus,
): Promise<{ ok: true } | { ok: false; message: string }> {
  await requireAdminUser();
  const supabase = createServiceClient();

  if (status === "published") {
    const { data: report } = await supabase
      .from("intelligence_reports")
      .select("download_storage_path")
      .eq("id", id)
      .maybeSingle();

    if (!report?.download_storage_path) {
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
