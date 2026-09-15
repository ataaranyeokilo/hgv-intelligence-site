import type { Metadata } from "next";
import Link from "next/link";

import { AdminReportsLibrary } from "@/components/admin/AdminReportsLibrary";

export const metadata: Metadata = {
  title: "Admin — Reports",
  robots: { index: false, follow: false },
};

export default function AdminReportsPage() {
  return (
    <>
      <p className="mb-8">
        <Link
          href="/admin/reports/new"
          className="text-sm font-medium text-neutral-900 hover:text-neutral-600"
        >
          New report
        </Link>
      </p>
      <AdminReportsLibrary />
    </>
  );
}
