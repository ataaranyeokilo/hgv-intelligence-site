import { hasSupabaseEnv } from "@/lib/env";
import {
  createSignedDownloadUrl,
  createServiceClient,
  hasServiceRoleKey,
} from "@/lib/supabase/service";

export type DownloadSource =
  | "weekly_sample"
  | "intelligence_report"
  | "sample_download";

export type DownloadTarget = {
  storagePath: string;
  /** Report title, or null for the weekly sample. */
  title: string | null;
  /** Report slug, or null for the weekly sample. */
  slug: string | null;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const SAMPLE_FALLBACK_PATH = "weekly-reports/sample.xlsx";

export function asReportUuid(reportId: string | undefined): string | null {
  if (!reportId) {
    return null;
  }
  return UUID_RE.test(reportId) ? reportId : null;
}

export async function resolveDownloadTarget(
  source: DownloadSource,
  reportId: string | undefined,
): Promise<DownloadTarget | null> {
  if (source === "weekly_sample" || source === "sample_download") {
    return { storagePath: await getSampleStoragePath(), title: null, slug: null };
  }

  if (!reportId || !UUID_RE.test(reportId) || !hasSupabaseEnv()) {
    return null;
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("intelligence_reports")
    .select("download_storage_path, kind, status, title, slug")
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
  if (!path) {
    return null;
  }

  return {
    storagePath: path,
    title: data.title ? String(data.title) : null,
    slug: data.slug ? String(data.slug) : null,
  };
}

/** Signed Storage URL, or the dev CSV when running locally without a service key. */
export async function createDownloadHref(
  storagePath: string,
): Promise<string | null> {
  if (hasServiceRoleKey()) {
    return createSignedDownloadUrl(storagePath);
  }
  return process.env.NODE_ENV === "development" ? "/download/dev-sample" : null;
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
