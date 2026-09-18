"use server";

import { hasSupabaseEnv } from "@/lib/env";
import {
  readDownloadVerifiedCookie,
  writeDownloadVerifiedCookie,
} from "@/lib/download/verified-cookie";
import { verifyDownloadToken } from "@/lib/leads/verify-download-token";
import {
  createSignedDownloadUrl,
  createServiceClient,
  hasServiceRoleKey,
} from "@/lib/supabase/service";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const SAMPLE_FALLBACK_PATH = "weekly-reports/sample.xlsx";

export type RememberedDownloadSource =
  | "weekly_sample"
  | "intelligence_report"
  | "sample_download";

export type StartRememberedDownloadResult =
  | { status: "ready"; url: string }
  | { status: "needs_email" }
  | { status: "error" };

export async function hasRememberedDownload(): Promise<boolean> {
  return readDownloadVerifiedCookie();
}

export async function rememberVerifiedDownload(token: string): Promise<void> {
  const result = await verifyDownloadToken(token);
  if (result.status !== "success") {
    return;
  }
  await writeDownloadVerifiedCookie();
}

export async function startRememberedDownload(input: {
  source: RememberedDownloadSource;
  reportId?: string;
}): Promise<StartRememberedDownloadResult> {
  try {
    if (!(await readDownloadVerifiedCookie())) {
      return { status: "needs_email" };
    }

    const storagePath = await resolveStoragePath(input.source, input.reportId);
    if (!storagePath) {
      return { status: "error" };
    }

    const url = hasServiceRoleKey()
      ? await createSignedDownloadUrl(storagePath)
      : process.env.NODE_ENV === "development"
        ? "/download/dev-sample"
        : null;

    if (!url) {
      return { status: "error" };
    }

    if (input.source === "intelligence_report" && input.reportId) {
      const { recordReportEvent } = await import("@/lib/reports/events");
      await recordReportEvent(input.reportId, "download_started");
    }

    return { status: "ready", url };
  } catch (cause) {
    console.error("[startRememberedDownload] uncaught:", cause);
    return { status: "error" };
  }
}

async function resolveStoragePath(
  source: RememberedDownloadSource,
  reportId: string | undefined,
): Promise<string | null> {
  if (source === "weekly_sample" || source === "sample_download") {
    return getSampleStoragePath();
  }

  if (!reportId || !UUID_RE.test(reportId) || !hasSupabaseEnv()) {
    return null;
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("intelligence_reports")
    .select("download_storage_path, kind, status")
    .eq("id", reportId)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  if (String(data.kind ?? "research") === "intelligence") {
    return null;
  }

  const path = data.download_storage_path
    ? String(data.download_storage_path)
    : "";
  return path || null;
}

async function getSampleStoragePath(): Promise<string> {
  if (!hasServiceRoleKey()) {
    return SAMPLE_FALLBACK_PATH;
  }

  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("weekly_report_files")
      .select("storage_path")
      .eq("kind", "sample")
      .maybeSingle();
    return data?.storage_path ? String(data.storage_path) : SAMPLE_FALLBACK_PATH;
  } catch {
    return SAMPLE_FALLBACK_PATH;
  }
}
