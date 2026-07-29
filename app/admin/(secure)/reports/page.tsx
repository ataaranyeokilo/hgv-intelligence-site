import type { Metadata } from "next";
import Link from "next/link";

import { listAdminReports } from "@/lib/admin/reports";

export const metadata: Metadata = {
  title: "Admin — Reports",
  robots: { index: false, follow: false },
};

export default async function AdminReportsPage() {
  const reports = await listAdminReports();

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-neutral-900">Reports</h1>
        <Link
          href="/admin/reports/new"
          className="rounded-sm bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
        >
          New report
        </Link>
      </div>
      <ul className="mt-10 divide-y divide-neutral-200 rounded-sm border border-neutral-200 bg-white">
        {reports.map((report) => (
          <li
            key={report.id}
            className="flex items-center justify-between gap-4 px-4 py-4"
          >
            <div>
              <p className="font-medium text-neutral-900">{report.title}</p>
              <p className="text-sm text-neutral-500">
                {report.slug} · {report.published ? "Published" : "Draft"}
              </p>
            </div>
            <Link
              href={`/admin/reports/${report.id}/edit`}
              className="text-sm font-medium text-neutral-900"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
