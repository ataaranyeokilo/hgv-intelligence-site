import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReportEditor } from "@/components/admin/ReportEditor";
import { getAdminReport } from "@/lib/admin/reports";
import { kindFromRow, isReportStatus } from "@/lib/reports/types";

type EditIntelligencePageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Admin — Edit intelligence",
  robots: { index: false, follow: false },
};

export default async function AdminEditIntelligencePage({
  params,
}: EditIntelligencePageProps) {
  const { id } = await params;
  const report = await getAdminReport(id);
  if (!report || kindFromRow(report.kind, report.category) !== "intelligence") {
    notFound();
  }

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        Admin
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
        Edit intelligence
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
        Saving keeps the card on the Intelligence admin page. Go live or Take
        down from the card list.
      </p>
      <p className="mt-4">
        <Link
          href="/admin/intelligence"
          className="text-sm font-medium text-neutral-900 hover:text-neutral-600"
        >
          ← All intelligence
        </Link>
      </p>
      <div className="mt-10">
        <ReportEditor
          reportId={id}
          kind="intelligence"
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
            kind: "intelligence",
            introduction: "",
            keyFindings: [""],
            downloadStoragePath: report.download_storage_path ?? "",
            heroImagePath: report.hero_image_path ?? "",
          }}
        />
      </div>
    </>
  );
}
