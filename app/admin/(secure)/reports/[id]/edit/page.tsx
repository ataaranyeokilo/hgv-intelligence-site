import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReportEditor } from "@/components/admin/ReportEditor";
import {
  getAdminPreviewReport,
  isAdminUiPreview,
} from "@/lib/admin/preview";
import { getAdminReport } from "@/lib/admin/reports";
import { isReportStatus } from "@/lib/reports/types";

type EditReportPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Admin — Edit report",
  robots: { index: false, follow: false },
};

export default async function AdminEditReportPage({ params }: EditReportPageProps) {
  const { id } = await params;

  if (isAdminUiPreview()) {
    const previewReport = getAdminPreviewReport(id);
    if (!previewReport) {
      notFound();
    }

    return (
      <EditReportLayout>
        <ReportEditor
          reportId={id}
          initial={{
            title: previewReport.title,
            summary: previewReport.summary,
            publishedAt: previewReport.published_at,
            status: previewReport.status,
            downloadStoragePath: previewReport.fileName ?? "",
            fileName: previewReport.fileName ?? undefined,
          }}
        />
      </EditReportLayout>
    );
  }

  const report = await getAdminReport(id);
  if (!report) {
    notFound();
  }

  const content = (report.content ?? {}) as {
    introduction?: string;
    key_findings?: string[];
  };

  return (
    <EditReportLayout>
      <ReportEditor
        reportId={id}
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
          introduction: content.introduction ?? "",
          keyFindings: content.key_findings ?? [""],
          downloadStoragePath: report.download_storage_path ?? "",
          heroImagePath: report.hero_image_path ?? "",
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
        Changes only appear on the website after you publish.
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
