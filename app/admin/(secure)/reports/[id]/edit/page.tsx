import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReportEditor } from "@/components/admin/ReportEditor";
import { getAdminReport } from "@/lib/admin/reports";

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

  if (!report) {
    notFound();
  }

  const content = (report.content ?? {}) as {
    introduction?: string;
    key_findings?: string[];
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-neutral-900">Edit report</h1>
      <div className="mt-10">
        <ReportEditor
          reportId={id}
          initial={{
            slug: report.slug,
            title: report.title,
            category: report.category,
            summary: report.summary,
            readingTimeMinutes: report.reading_time_minutes,
            publishedAt: report.published_at,
            published: report.published,
            introduction: content.introduction ?? "",
            keyFindings: content.key_findings ?? [""],
            downloadStoragePath: report.download_storage_path ?? "",
            heroImagePath: report.hero_image_path ?? "",
          }}
        />
      </div>
    </>
  );
}
