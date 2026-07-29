import type { Metadata } from "next";
import Link from "next/link";

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

  return (
    <>
      <PageHeader
        title="Email verified"
        description="Your email is confirmed. You can download your file below."
      />
      <Section bordered={false}>
        {signedUrl ? (
          <ButtonLink href={signedUrl}>Download now</ButtonLink>
        ) : (
          <p className="text-sm leading-relaxed text-neutral-600">
            Your email is verified. File delivery requires storage configuration
            (`SUPABASE_SERVICE_ROLE_KEY` and uploaded files in Supabase
            Storage). Contact support if you need assistance.
          </p>
        )}
        <p className="mt-6 text-sm text-neutral-500">
          <Link href="/intelligence#sample-download" className="hover:text-neutral-900">
            Explore weekly reports →
          </Link>
        </p>
      </Section>
    </>
  );
}
