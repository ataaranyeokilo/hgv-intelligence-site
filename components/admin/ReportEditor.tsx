"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/Button";
import {
  uploadIntelligenceDownloadFile,
} from "@/lib/admin/report-uploads";
import {
  saveAdminReport,
  type AdminReportInput,
} from "@/lib/admin/reports";
import { isAdminUiPreview } from "@/lib/admin/preview";
import type { ReportStatus } from "@/lib/reports/types";

type ReportEditorProps = {
  reportId?: string;
  initial?: Partial<AdminReportInput> & { fileName?: string };
};

function slugFromTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function toMonthValue(isoDate: string): string {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate.slice(0, 7);
  return date.toISOString().slice(0, 7);
}

export function ReportEditor({ reportId, initial }: ReportEditorProps) {
  const router = useRouter();
  const preview = isAdminUiPreview();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [period, setPeriod] = useState(toMonthValue(initial?.publishedAt ?? ""));
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [fileName, setFileName] = useState(initial?.fileName ?? "");
  const [downloadFile, setDownloadFile] = useState<File | null>(null);
  const [downloadStoragePath, setDownloadStoragePath] = useState(
    initial?.downloadStoragePath ?? "",
  );
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const inputClass =
    "mt-2 w-full rounded-sm border border-neutral-300 px-4 py-3 text-sm text-neutral-900";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const submitter = (event.nativeEvent as SubmitEvent).submitter as
      | HTMLButtonElement
      | null;
    const status: ReportStatus =
      submitter?.value === "published" ? "published" : "draft";

    if (preview) {
      setNotice(
        status === "published"
          ? "Publish will put this report on the Research page once saving is connected."
          : "Save as draft will keep this report off the website once saving is connected.",
      );
      return;
    }

    startTransition(async () => {
      const slug = initial?.slug?.trim() || slugFromTitle(title);
      let storagePath = downloadStoragePath;

      if (downloadFile) {
        const payload = new FormData();
        payload.set("file", downloadFile);
        payload.set("slug", slug);
        const upload = await uploadIntelligenceDownloadFile(payload);
        if (!upload.ok) {
          setError(upload.message);
          return;
        }
        storagePath = upload.path;
        setDownloadStoragePath(upload.path);
      }

      const publishedAt = period
        ? new Date(`${period}-01T09:00:00.000Z`).toISOString()
        : new Date().toISOString();

      const result = await saveAdminReport(
        {
          slug,
          title: title.trim(),
          category: initial?.category?.trim() || "Market outlook",
          summary: summary.trim(),
          readingTimeMinutes: initial?.readingTimeMinutes ?? 5,
          publishedAt,
          status,
          introduction: initial?.introduction ?? summary.trim(),
          keyFindings: initial?.keyFindings?.length
            ? initial.keyFindings
            : [""],
          downloadStoragePath: storagePath,
          heroImagePath: initial?.heroImagePath ?? "",
        },
        reportId,
      );

      if (!result.ok) {
        setError(result.message);
        return;
      }

      router.push("/admin/reports");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-8">
      <Field
        label="Title"
        hint="The name visitors see on the Research page."
      >
        <input
          className={inputClass}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </Field>
      <Field
        label="Reporting period"
        hint="The month this report covers, for example July 2026."
      >
        <input
          type="month"
          className={inputClass}
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          required
        />
      </Field>
      <Field
        label="Short description"
        hint="One or two sentences shown on the report card."
      >
        <textarea
          className={inputClass}
          rows={4}
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          required
        />
      </Field>
      <Field
        label="Report file"
        hint="PDF or Word file. Visitors download this after verifying their email."
      >
        {fileName || downloadStoragePath ? (
          <p className="mt-2 text-sm text-neutral-500">
            Current file: {fileName || downloadStoragePath}
          </p>
        ) : null}
        <input
          type="file"
          className={`${inputClass} file:mr-4 file:rounded-sm file:border-0 file:bg-neutral-100 file:px-3 file:py-2 file:text-sm`}
          accept=".pdf,.doc,.docx,application/pdf"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            setDownloadFile(file);
            if (file) setFileName(file.name);
          }}
        />
      </Field>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {notice ? (
        <p className="text-sm text-neutral-600" role="status">
          {notice}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          name="intent"
          value="draft"
          variant="secondary"
          disabled={isPending}
        >
          {isPending ? "Saving…" : "Save as draft"}
        </Button>
        <Button
          type="submit"
          name="intent"
          value="published"
          className="!bg-fleetSignal hover:!bg-blue-700"
          disabled={isPending}
        >
          {isPending ? "Saving…" : "Publish"}
        </Button>
      </div>
      <p className="text-xs leading-relaxed text-neutral-500">
        Draft stays private. Publish puts it on the Research page. Archive is
        available from the reports list if you need to take it down later.
      </p>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-900">{label}</span>
      <span className="mt-1 block text-sm text-neutral-500">{hint}</span>
      {children}
    </label>
  );
}
