"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { MonthYearPicker } from "@/components/admin/MonthYearPicker";
import { Button } from "@/components/ui/Button";
import { uploadIntelligenceDownloadFile } from "@/lib/admin/report-uploads";
import {
  saveAdminReport,
  type AdminReportInput,
} from "@/lib/admin/reports";
import {
  isSpreadsheetFileName,
  parseSpreadsheetPreviewFromFile,
  type SpreadsheetPreview,
} from "@/lib/reports/spreadsheet-preview";
import {
  asReportKind,
  type ReportKind,
  type ReportStatus,
} from "@/lib/reports/types";

type ReportEditorProps = {
  reportId?: string;
  kind?: ReportKind;
  initial?: Partial<AdminReportInput> & {
    fileName?: string;
    spreadsheetPreview?: SpreadsheetPreview | null;
  };
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

const PREVIEW_UNAVAILABLE_NOTICE =
  "This spreadsheet could not be previewed. You can still publish; visitors will not see the sample table.";
const PREVIEW_READY_NOTICE =
  "Public preview ready. Visitors will see a redacted 25-row sample before download.";
const PREVIEW_BUILDING_NOTICE = "Building the public spreadsheet preview…";

export function ReportEditor({
  reportId,
  kind: kindProp,
  initial,
}: ReportEditorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const preview = pathname?.startsWith("/admin-preview") ?? false;
  const kind = asReportKind(kindProp ?? initial?.kind);
  const isIntelligence = kind === "intelligence";
  const listHref = isIntelligence ? "/admin/intelligence" : "/admin/reports";
  const [title, setTitle] = useState(initial?.title ?? "");
  const [period, setPeriod] = useState(toMonthValue(initial?.publishedAt ?? ""));
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [fileName, setFileName] = useState(initial?.fileName ?? "");
  const [downloadFile, setDownloadFile] = useState<File | null>(null);
  const [downloadStoragePath, setDownloadStoragePath] = useState(
    initial?.downloadStoragePath ?? "",
  );
  const [spreadsheetPreview, setSpreadsheetPreview] =
    useState<SpreadsheetPreview | null>(initial?.spreadsheetPreview ?? null);
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
    const status: ReportStatus = isIntelligence
      ? reportId && initial?.status === "published"
        ? "published"
        : "draft"
      : submitter?.value === "published"
        ? "published"
        : "draft";

    if (!period) {
      setError("Choose a month and year.");
      return;
    }

    if (preview) {
      setNotice(
        isIntelligence
          ? "This is the UI preview. Open /admin/intelligence/new to save Intelligence cards."
          : status === "published"
            ? "This is the UI preview. Open /admin/reports/new to publish to the live Research page."
            : "This is the UI preview. Saving is only connected on /admin.",
      );
      return;
    }

    startTransition(async () => {
      const slug = initial?.slug?.trim() || slugFromTitle(title);
      let storagePath = downloadStoragePath;
      let previewForSave = spreadsheetPreview;

      if (downloadFile && isSpreadsheetFileName(downloadFile.name)) {
        try {
          previewForSave = await parseSpreadsheetPreviewFromFile(downloadFile);
        } catch {
          previewForSave = null;
        }
        setSpreadsheetPreview(previewForSave);
        if (!previewForSave && !isIntelligence) {
          setNotice(PREVIEW_UNAVAILABLE_NOTICE);
        }
      } else if (downloadFile) {
        previewForSave = null;
        setSpreadsheetPreview(null);
      }

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

      const publishedAt = new Date(`${period}-01T09:00:00.000Z`).toISOString();

      const result = await saveAdminReport(
        {
          slug,
          title: title.trim(),
          category:
            initial?.category?.trim() ||
            (isIntelligence ? "Intelligence" : "Market outlook"),
          summary: summary.trim(),
          readingTimeMinutes: initial?.readingTimeMinutes ?? 5,
          publishedAt,
          status,
          kind,
          introduction: initial?.introduction ?? summary.trim(),
          keyFindings: initial?.keyFindings?.length
            ? initial.keyFindings
            : [""],
          downloadStoragePath: storagePath,
          heroImagePath: initial?.heroImagePath ?? "",
          spreadsheetPreview: previewForSave,
        },
        reportId,
      );

      if (!result.ok) {
        setError(result.message);
        return;
      }

      router.push(listHref);
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
      <div>
        <span className="text-sm font-medium text-neutral-900">
          Reporting period
        </span>
        <span className="mt-1 block text-sm text-neutral-500">
          Choose the month and year this report covers.
        </span>
        <MonthYearPicker value={period} onChange={setPeriod} />
      </div>
      <Field
        label="Short description"
        hint="One or two sentences shown on the card."
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
        label={isIntelligence ? "File (optional)" : "Report file"}
        hint={
          isIntelligence
            ? "Optional. Intelligence cards on Research send visitors to request a quote, not to a download."
            : "PDF, Word, Excel, or CSV. Spreadsheets show a redacted 25-row preview on the public page. Visitors download the full file after verifying their email."
        }
      >
        {fileName || downloadStoragePath ? (
          <p className="mt-2 text-sm text-neutral-500">
            Current file: {fileName || downloadStoragePath}
          </p>
        ) : null}
        <input
          type="file"
          className={`${inputClass} file:mr-4 file:rounded-sm file:border-0 file:bg-neutral-100 file:px-3 file:py-2 file:text-sm`}
          accept=".pdf,.doc,.docx,.xlsx,.xls,.csv,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            setDownloadFile(file);
            setError(null);
            if (!file) {
              return;
            }
            setFileName(file.name);
            if (!isSpreadsheetFileName(file.name) || isIntelligence) {
              if (!isSpreadsheetFileName(file.name)) {
                setSpreadsheetPreview(null);
                setNotice(null);
              }
              return;
            }
            setNotice(PREVIEW_BUILDING_NOTICE);
            window.setTimeout(() => {
              void parseSpreadsheetPreviewFromFile(file)
                .then((parsed) => {
                  setSpreadsheetPreview(parsed);
                  setNotice(
                    parsed ? PREVIEW_READY_NOTICE : PREVIEW_UNAVAILABLE_NOTICE,
                  );
                })
                .catch(() => {
                  setSpreadsheetPreview(null);
                  setNotice(PREVIEW_UNAVAILABLE_NOTICE);
                });
            }, 0);
          }}
        />
      </Field>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {notice ? (
        <p className="text-sm text-neutral-600" role="status">
          {notice}
        </p>
      ) : null}
      {isIntelligence ? (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              type="submit"
              name="intent"
              value="draft"
              className="w-full !bg-fleetSignal hover:!bg-blue-700 sm:w-auto"
              disabled={isPending}
            >
              {isPending ? "Saving…" : "Save"}
            </Button>
          </div>
          <p className="text-xs leading-relaxed text-neutral-500">
            Saving adds the card on the Intelligence admin page. Use Go live
            there to show it on Research with a Subscribe pill.
          </p>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              type="submit"
              name="intent"
              value="draft"
              variant="secondary"
              className="w-full sm:w-auto"
              disabled={isPending}
            >
              {isPending ? "Saving…" : "Save as draft"}
            </Button>
            <Button
              type="submit"
              name="intent"
              value="published"
              className="w-full !bg-fleetSignal hover:!bg-blue-700 sm:w-auto"
              disabled={isPending}
            >
              {isPending ? "Saving…" : "Publish"}
            </Button>
          </div>
          <p className="text-xs leading-relaxed text-neutral-500">
            Draft stays private and still appears in the admin card grid. Publish
            or Go live puts it on the Research page. Take down removes it from
            the website without deleting it.
          </p>
        </>
      )}
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
