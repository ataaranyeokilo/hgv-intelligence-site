import type { Metadata } from "next";

import { WeeklySampleUploadForm } from "@/components/admin/WeeklySampleUploadForm";

export const metadata: Metadata = {
  title: "Admin — Weekly sample",
  robots: { index: false, follow: false },
};

export default function AdminWeeklyPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-neutral-900">
        Weekly sample upload
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        Upload the Excel file used for verified sample downloads.
      </p>
      <div className="mt-10">
        <WeeklySampleUploadForm />
      </div>
    </>
  );
}
