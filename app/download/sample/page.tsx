import type { Metadata } from "next";

import { verifySampleDownloadToken } from "@/lib/leads/verify-sample-download-token";

export const metadata: Metadata = {
  title: "Sample Download",
};

type SampleDownloadPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function SampleDownloadPage({
  searchParams,
}: SampleDownloadPageProps) {
  const { token } = await searchParams;
  const result = await verifySampleDownloadToken(token);

  if (result === "success") {
    return (
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            Email verified
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Your email has been verified. Sample report download comes next.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Link unavailable
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
          This download link is invalid or has expired.
        </p>
      </div>
    </section>
  );
}
