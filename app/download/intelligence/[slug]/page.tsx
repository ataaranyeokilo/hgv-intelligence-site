import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { DownloadEmailForm } from "@/components/download/DownloadEmailForm";
import { getPublishedReportBySlug } from "@/lib/reports/queries";

type IntelligenceDownloadPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: IntelligenceDownloadPageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = await getPublishedReportBySlug(slug);

  return {
    title: report ? `Download — ${report.title}` : "Download report",
  };
}

export default async function IntelligenceDownloadPage({
  params,
}: IntelligenceDownloadPageProps) {
  const { slug } = await params;
  const report = await getPublishedReportBySlug(slug);

  if (!report) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title="Download full report"
        description={`Enter your work email to receive a verification link for “${report.title}”.`}
      />
      <Section bordered={false}>
        <div className="max-w-md">
          <DownloadEmailForm
            source="intelligence_report"
            reportId={report.id}
            emailSubject={`Verify your email — ${report.title}`}
            submitLabel="Send verification email"
          />
        </div>
      </Section>
    </>
  );
}
