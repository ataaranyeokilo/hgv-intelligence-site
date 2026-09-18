import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReportEditor } from "@/components/admin/ReportEditor";
import { getAdminReport } from "@/lib/admin/reports";
import type { SpreadsheetPreview } from "@/lib/reports/spreadsheet-preview";
import { kindFromRow, isReportStatus } from "@/lib/reports/types";

type EditReportPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Admin — Edit report",
  robots: { index: false, follow: false },
};

export default async function AdminEditReportPage({ params }: EditReportPageProps) {
  const { id } = await params;
  const report = await getAdminReport(id);
  if (!report || kindFromRow(report.kind, report.category) !== "research") {
    notFound();
  }

  const content = (report.content ?? {}) as {
    introduction?: string;
    key_findings?: string[];
    spreadsheet_preview?: SpreadsheetPreview | null;
  };

  return (
    <EditReportLayout>
      <ReportEditor
        reportId={id}
        kind="research"
        initial={{
          slug: report.slug,
          title: report.title,
          category: report.category,
          summary: report.summary,
          readingTimeMinutes: report.reading_time_minutes,
          publishedAt: report.published_at,
          status: isReportStatus(String(report.status ?? ""))
            ? report.status
            : report.published
              ? "published"
              : "draft",
          kind: "research",
          introduction: content.introduction ?? "",
          keyFindings: content.key_findings ?? [""],
          downloadStoragePath: report.download_storage_path ?? "",
          heroImagePath: report.hero_image_path ?? "",
          spreadsheetPreview: content.spreadsheet_preview ?? null,
        }}
      />
    </EditReportLayout>
  );
}

function EditReportLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        Admin
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
        Edit report
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
        Changes only appear on the website after you publish or press Go live.
      </p>
      <p className="mt-4">
        <Link
          href="/admin/reports"
          className="text-sm font-medium text-neutral-900 hover:text-neutral-600"
        >
          ← All reports
        </Link>
      </p>
      <div className="mt-10">{children}</div>
    </>
  );
}
