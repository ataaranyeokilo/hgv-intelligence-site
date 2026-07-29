"use server";

import { requireAdminUser } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/service";

const INTELLIGENCE_BUCKET = "intelligence-downloads";

function sanitizeFileName(name: string): string {
  return name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
}

export async function uploadIntelligenceDownloadFile(
  formData: FormData,
): Promise<{ ok: true; path: string } | { ok: false; message: string }> {
  await requireAdminUser();

  const file = formData.get("file");
  const slug = String(formData.get("slug") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Choose a download file to upload." };
  }

  if (!slug) {
    return { ok: false, message: "Enter a slug before uploading the download file." };
  }

  const objectName = `${slug}/${Date.now()}-${sanitizeFileName(file.name)}`;
  const supabase = createServiceClient();
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(INTELLIGENCE_BUCKET)
    .upload(objectName, buffer, {
      upsert: true,
      contentType: file.type || "application/octet-stream",
    });

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true, path: `${INTELLIGENCE_BUCKET}/${objectName}` };
}

export async function uploadIntelligenceHeroImage(
  formData: FormData,
): Promise<{ ok: true; path: string } | { ok: false; message: string }> {
  await requireAdminUser();

  const file = formData.get("file");
  const slug = String(formData.get("slug") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Choose a hero image to upload." };
  }

  if (!slug) {
    return { ok: false, message: "Enter a slug before uploading the hero image." };
  }

  const extension = sanitizeFileName(file.name).includes(".")
    ? sanitizeFileName(file.name).split(".").pop()
    : "jpg";
  const objectName = `hero/${slug}.${extension}`;
  const supabase = createServiceClient();
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(INTELLIGENCE_BUCKET)
    .upload(objectName, buffer, {
      upsert: true,
      contentType: file.type || "image/jpeg",
    });

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true, path: `${INTELLIGENCE_BUCKET}/${objectName}` };
}
