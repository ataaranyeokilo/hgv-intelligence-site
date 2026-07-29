import type { Metadata } from "next";

import { ReportEditor } from "@/components/admin/ReportEditor";

export const metadata: Metadata = {
  title: "Admin — New report",
  robots: { index: false, follow: false },
};

export default function AdminNewReportPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-neutral-900">New report</h1>
      <div className="mt-10">
        <ReportEditor />
      </div>
    </>
  );
}
