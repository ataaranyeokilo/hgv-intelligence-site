"use server";

import { redirect } from "next/navigation";

import { requireAdminUser } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/service";

export type AdminReportInput = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  readingTimeMinutes: number;
  publishedAt: string;
  published: boolean;
  introduction: string;
  keyFindings: string[];
  downloadStoragePath: string;
  heroImagePath: string;
};

export async function listAdminReports() {
  await requireAdminUser();
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("intelligence_reports")
    .select("id, slug, title, published, published_at")
    .order("published_at", { ascending: false });

  if (error) {
    return [];
  }
  return data;
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

  const payload = {
    slug: input.slug.trim(),
    title: input.title.trim(),
    category: input.category.trim(),
    summary: input.summary.trim(),
    reading_time_minutes: input.readingTimeMinutes,
    published_at: input.publishedAt,
    published: input.published,
    download_storage_path: input.downloadStoragePath.trim() || null,
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

export async function deleteAdminReport(id: string) {
  await requireAdminUser();
  const supabase = createServiceClient();
  await supabase.from("intelligence_reports").delete().eq("id", id);
}

export async function signOutAdmin() {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
