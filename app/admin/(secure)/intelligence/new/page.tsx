import type { Metadata } from "next";
import Link from "next/link";

import { ReportEditor } from "@/components/admin/ReportEditor";

export const metadata: Metadata = {
  title: "Admin — New intelligence",
  robots: { index: false, follow: false },
};

export default function AdminNewIntelligencePage() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        Admin
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
        New intelligence
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
        This creates a card on the Intelligence admin page. Go live to show it
        on Research. Visitors who press it request a quote.
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
        <ReportEditor kind="intelligence" />
      </div>
    </>
  );
}
