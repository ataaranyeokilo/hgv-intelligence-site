import type { Metadata } from "next";
import Link from "next/link";

import { AutoStartDownload } from "@/components/download/AutoStartDownload";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { createSignedDownloadUrl, hasServiceRoleKey } from "@/lib/supabase/service";
import { verifyDownloadToken } from "@/lib/leads/verify-download-token";

export const metadata: Metadata = {
  title: "Verify download",
};

type VerifyDownloadPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function VerifyDownloadPage({
  searchParams,
}: VerifyDownloadPageProps) {
  const { token } = await searchParams;
  const result = await verifyDownloadToken(token);

  if (result.status === "invalid") {
    return (
      <>
        <PageHeader
          title="Link unavailable"
          description="This download link is invalid or has expired."
        />
        <Section bordered={false}>
          <ButtonLink href="/intelligence" variant="secondary">
            Browse Intelligence
          </ButtonLink>
        </Section>
      </>
    );
  }

  const signedUrl = hasServiceRoleKey()
    ? await createSignedDownloadUrl(result.storagePath)
    : null;
  const downloadHref =
    signedUrl ??
    (process.env.NODE_ENV === "development" ? "/download/dev-sample" : null);

  return (
    <>
      <PageHeader
        title="Email verified"
        description="Your email is confirmed. Your download has started."
      />
      <Section bordered={false}>
        {downloadHref ? <AutoStartDownload href={downloadHref} /> : null}
        <p className="mt-6 text-sm text-neutral-500">
          <Link href="/intelligence#sample-download" className="hover:text-neutral-900">
            Explore weekly reports →
          </Link>
        </p>
      </Section>
    </>
  );
}
