import type { Metadata } from "next";

import { MarketSnapshotAdminForm } from "@/components/admin/MarketSnapshotAdminForm";

export const metadata: Metadata = {
  title: "Admin — Market snapshot",
  robots: { index: false, follow: false },
};

export default function AdminMarketSnapshotPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-neutral-900">
        Homepage market snapshot
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        These four stats appear on the homepage hero section.
      </p>
      <div className="mt-10 max-w-2xl">
        <MarketSnapshotAdminForm />
      </div>
    </>
  );
}
