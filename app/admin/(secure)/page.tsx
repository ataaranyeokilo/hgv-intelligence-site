import type { Metadata } from "next";
import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { signOutAdmin } from "@/lib/admin/reports";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
        <form action={signOutAdmin}>
          <button
            type="submit"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
          >
            Sign out
          </button>
        </form>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Card>
          <h2 className="font-semibold text-neutral-900">Intelligence reports</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Upload, edit, and publish free reports.
          </p>
          <Link
            href="/admin/reports"
            className="mt-4 inline-block text-sm font-medium text-neutral-900"
          >
            Manage reports →
          </Link>
        </Card>
        <Card>
          <h2 className="font-semibold text-neutral-900">Weekly sample file</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Update the Excel sample used on Weekly Reports.
          </p>
          <Link
            href="/admin/weekly"
            className="mt-4 inline-block text-sm font-medium text-neutral-900"
          >
            Upload sample →
          </Link>
        </Card>
        <Card>
          <h2 className="font-semibold text-neutral-900">Market snapshot</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Edit homepage statistics.
          </p>
          <Link
            href="/admin/market-snapshot"
            className="mt-4 inline-block text-sm font-medium text-neutral-900"
          >
            Edit stats →
          </Link>
        </Card>
      </div>
    </>
  );
}
