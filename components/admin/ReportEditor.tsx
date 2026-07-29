"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/Button";
import {
  uploadIntelligenceDownloadFile,
  uploadIntelligenceHeroImage,
} from "@/lib/admin/report-uploads";
import {
  deleteAdminReport,
  saveAdminReport,
  type AdminReportInput,
} from "@/lib/admin/reports";

type ReportEditorProps = {
  reportId?: string;
  initial?: Partial<AdminReportInput>;
};

const defaultValues: AdminReportInput = {
  slug: "",
  title: "",
  category: "",
  summary: "",
  readingTimeMinutes: 5,
  publishedAt: new Date().toISOString().slice(0, 16),
  published: false,
  introduction: "",
  keyFindings: [""],
  downloadStoragePath: "",
  heroImagePath: "",
};

export function ReportEditor({ reportId, initial }: ReportEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState<AdminReportInput>({
    ...defaultValues,
    ...initial,
    keyFindings: initial?.keyFindings?.length
      ? initial.keyFindings
      : defaultValues.keyFindings,
  });
  const [downloadFile, setDownloadFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateField<K extends keyof AdminReportInput>(
    key: K,
    value: AdminReportInput[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      let nextForm = { ...form };

      if (downloadFile) {
        const payload = new FormData();
        payload.set("file", downloadFile);
        payload.set("slug", nextForm.slug);
        const upload = await uploadIntelligenceDownloadFile(payload);
        if (!upload.ok) {
          setError(upload.message);
          return;
        }
        nextForm = { ...nextForm, downloadStoragePath: upload.path };
      }

      if (heroFile) {
        const payload = new FormData();
        payload.set("file", heroFile);
        payload.set("slug", nextForm.slug);
        const upload = await uploadIntelligenceHeroImage(payload);
        if (!upload.ok) {
          setError(upload.message);
          return;
        }
        nextForm = { ...nextForm, heroImagePath: upload.path };
      }

      if (nextForm.published && !nextForm.downloadStoragePath.trim()) {
        setError("Upload a download file before publishing this report.");
        return;
      }

      const result = await saveAdminReport(nextForm, reportId);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      router.push("/admin/reports");
      router.refresh();
    });
  }

  function handleDelete() {
    if (!reportId || !confirm("Delete this report?")) {
      return;
    }
    startTransition(async () => {
      await deleteAdminReport(reportId);
      router.push("/admin/reports");
      router.refresh();
    });
  }

  const inputClass =
    "mt-2 w-full rounded-sm border border-neutral-300 px-3 py-2 text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Field label="Title">
        <input
          className={inputClass}
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          required
        />
      </Field>
      <Field label="Slug">
        <input
          className={inputClass}
          value={form.slug}
          onChange={(e) => updateField("slug", e.target.value)}
          required
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Category">
          <input
            className={inputClass}
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            required
          />
        </Field>
        <Field label="Reading time (minutes)">
          <input
            type="number"
            min={1}
            className={inputClass}
            value={form.readingTimeMinutes}
            onChange={(e) =>
              updateField("readingTimeMinutes", Number(e.target.value))
            }
            required
          />
        </Field>
      </div>
      <Field label="Summary">
        <textarea
          className={inputClass}
          rows={3}
          value={form.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          required
        />
      </Field>
      <Field label="Introduction">
        <textarea
          className={inputClass}
          rows={4}
          value={form.introduction}
          onChange={(e) => updateField("introduction", e.target.value)}
          required
        />
      </Field>
      <div>
        <p className="text-sm font-medium text-neutral-800">Key findings</p>
        {form.keyFindings.map((finding, index) => (
          <input
            key={index}
            className={`${inputClass} mt-2`}
            value={finding}
            onChange={(e) => {
              const next = [...form.keyFindings];
              next[index] = e.target.value;
              updateField("keyFindings", next);
            }}
          />
        ))}
        <button
          type="button"
          className="mt-2 text-sm text-neutral-600"
          onClick={() => updateField("keyFindings", [...form.keyFindings, ""])}
        >
          + Add finding
        </button>
      </div>
      <Field label="Download file (PDF or similar)">
        {form.downloadStoragePath ? (
          <p className="mt-2 text-xs text-neutral-500">
            Current file: {form.downloadStoragePath}
          </p>
        ) : null}
        <input
          type="file"
          className={`${inputClass} file:mr-4 file:rounded-sm file:border-0 file:bg-neutral-100 file:px-3 file:py-2 file:text-sm`}
          accept=".pdf,.doc,.docx,application/pdf"
          onChange={(event) =>
            setDownloadFile(event.target.files?.[0] ?? null)
          }
        />
      </Field>
      <Field label="Hero image (optional)">
        {form.heroImagePath ? (
          <p className="mt-2 text-xs text-neutral-500">
            Current image: {form.heroImagePath}
          </p>
        ) : null}
        <input
          type="file"
          className={`${inputClass} file:mr-4 file:rounded-sm file:border-0 file:bg-neutral-100 file:px-3 file:py-2 file:text-sm`}
          accept="image/*"
          onChange={(event) => setHeroFile(event.target.files?.[0] ?? null)}
        />
      </Field>
      <Field label="Published at">
        <input
          type="datetime-local"
          className={inputClass}
          value={form.publishedAt.slice(0, 16)}
          onChange={(e) =>
            updateField("publishedAt", new Date(e.target.value).toISOString())
          }
        />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => updateField("published", e.target.checked)}
        />
        Published
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : "Save report"}
        </Button>
        {reportId ? (
          <Button type="button" variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-neutral-800">
      {label}
      {children}
    </label>
  );
}
