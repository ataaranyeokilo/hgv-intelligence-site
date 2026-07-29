"use server";

import { requireAdminUser } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/service";

export async function getWeeklySamplePath() {
  await requireAdminUser();
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("weekly_report_files")
    .select("storage_path")
    .eq("kind", "sample")
    .maybeSingle();
  return data?.storage_path ?? "weekly-reports/sample.xlsx";
}

export async function updateWeeklySamplePath(storagePath: string) {
  await requireAdminUser();
  const supabase = createServiceClient();
  const { error } = await supabase.from("weekly_report_files").upsert(
    {
      kind: "sample",
      storage_path: storagePath.trim(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "kind" },
  );
  return !error;
}

export async function uploadWeeklySampleFile(formData: FormData) {
  await requireAdminUser();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false as const, message: "Choose a file to upload." };
  }

  const storagePath = `weekly-reports/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const supabase = createServiceClient();
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("weekly-reports")
    .upload(storagePath.replace("weekly-reports/", ""), buffer, {
      upsert: true,
      contentType: file.type || "application/octet-stream",
    });

  if (uploadError) {
    return { ok: false as const, message: uploadError.message };
  }

  const fullPath = storagePath.startsWith("weekly-reports/")
    ? storagePath
    : `weekly-reports/${storagePath}`;

  await updateWeeklySamplePath(fullPath);
  return { ok: true as const, path: fullPath };
}
