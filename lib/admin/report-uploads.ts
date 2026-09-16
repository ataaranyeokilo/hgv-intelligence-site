"use server";

import { requireAdminUser } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/service";

const INTELLIGENCE_BUCKET = "intelligence-downloads";
const MAX_DOWNLOAD_BYTES = 20 * 1024 * 1024;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const DOWNLOAD_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "application/csv",
]);
const DOWNLOAD_EXTENSIONS = new Set([
  "pdf",
  "doc",
  "docx",
  "xlsx",
  "xls",
  "csv",
]);
const IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif"]);

function sanitizeFileName(name: string): string {
  return name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
}

function actionErrorMessage(cause: unknown, fallback: string): string {
  if (cause instanceof Error && cause.message.trim()) {
    return cause.message;
  }
  return fallback;
}

function fileExtension(name: string): string {
  const parts = sanitizeFileName(name).split(".");
  return parts.length > 1 ? (parts.pop() ?? "").toLowerCase() : "";
}

function validateDownloadFile(file: File): string | null {
  if (file.size === 0) {
    return "Choose a download file to upload.";
  }
  if (file.size > MAX_DOWNLOAD_BYTES) {
    return "Download files must be 20MB or smaller.";
  }
  const extension = fileExtension(file.name);
  const mimeOk = !file.type || DOWNLOAD_MIME_TYPES.has(file.type);
  const extensionOk = DOWNLOAD_EXTENSIONS.has(extension);
  if (!mimeOk && !extensionOk) {
    return "Upload a PDF, Word, Excel, or CSV file.";
  }
  return null;
}

function validateHeroImage(file: File): string | null {
  if (file.size === 0) {
    return "Choose a hero image to upload.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return "Hero images must be 5MB or smaller.";
  }
  const extension = fileExtension(file.name);
  const mimeOk = !file.type || IMAGE_MIME_TYPES.has(file.type);
  const extensionOk = IMAGE_EXTENSIONS.has(extension);
  if (!mimeOk && !extensionOk) {
    return "Upload a JPG, PNG, WEBP, or GIF image.";
  }
  return null;
}

export async function uploadIntelligenceDownloadFile(
  formData: FormData,
): Promise<{ ok: true; path: string } | { ok: false; message: string }> {
  try {
    await requireAdminUser();

    const file = formData.get("file");
    const slug = String(formData.get("slug") ?? "").trim();

    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, message: "Choose a download file to upload." };
    }

    const validationError = validateDownloadFile(file);
    if (validationError) {
      return { ok: false, message: validationError };
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
  } catch (cause) {
    return {
      ok: false,
      message: actionErrorMessage(cause, "Could not upload the report file."),
    };
  }
}

export async function uploadIntelligenceHeroImage(
  formData: FormData,
): Promise<{ ok: true; path: string } | { ok: false; message: string }> {
  try {
    await requireAdminUser();

    const file = formData.get("file");
    const slug = String(formData.get("slug") ?? "").trim();

    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, message: "Choose a hero image to upload." };
    }

    const validationError = validateHeroImage(file);
    if (validationError) {
      return { ok: false, message: validationError };
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
  } catch (cause) {
    return {
      ok: false,
      message: actionErrorMessage(cause, "Could not upload the hero image."),
    };
  }
}
