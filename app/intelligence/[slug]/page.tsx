import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { IntelligenceReportDownloadActions } from "@/components/intelligence/IntelligenceReportDownloadActions";
import { categoryBadgeLabel, pageContainerClass } from "@/lib/layout";
import { getPublishedReportBySlug } from "@/lib/reports/queries";

type ReportPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ download?: string }>;
};

function formatPublishDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

export async function generateMetadata({
  params,
}: ReportPageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = await getPublishedReportBySlug(slug);

  if (!report) {
    return { title: "Report not found" };
  }

  return {
    title: report.title,
    description: report.summary,
  };
}

export default async function IntelligenceReportPage({
  params,
  searchParams,
}: ReportPageProps) {
  const { slug } = await params;
  const { download } = await searchParams;
  const report = await getPublishedReportBySlug(slug);

  if (!report) {
    notFound();
  }

  const keyFindings = report.content.key_findings ?? [];

  return (
    <>
      <article className="border-b border-neutral-200">
        <div className={`${pageContainerClass} max-w-3xl py-14 sm:py-20`}>
          <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
            {categoryBadgeLabel(report.category)}
          </span>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            {report.title}
          </h1>
          <p className="mt-4 text-sm text-neutral-500">
            {formatPublishDate(report.published_at)} ·{" "}
            {report.reading_time_minutes} min read
          </p>
          {report.content.introduction ? (
            <p className="mt-10 text-lg leading-relaxed text-neutral-700">
              {report.content.introduction}
            </p>
          ) : null}
          {keyFindings.length > 0 ? (
            <div className="mt-12 rounded-sm border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
                Key findings
              </h2>
              <ul className="mt-6 space-y-4">
                {keyFindings.map((finding) => (
                  <li
                    key={finding}
                    className="border-l-2 border-neutral-900 pl-4 text-neutral-800"
                  >
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <IntelligenceReportDownloadActions
            reportId={report.id}
            title={report.title}
            autoOpenDownload={download === "1"}
          />
        </div>
      </article>
      <div className={`${pageContainerClass} py-8`}>
        <Link
          href="/intelligence"
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          ← All reports
        </Link>
      </div>
    </>
  );
}
