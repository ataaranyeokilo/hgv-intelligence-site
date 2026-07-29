import { WeeklySampleDownloadBlock } from "@/components/download/WeeklySampleDownloadBlock";
import { IconCheck } from "@/components/ui/icons";
import { WeeklySampleSpreadsheetPreview } from "@/components/reports/WeeklySampleSpreadsheetPreview";
import { pageContainerClass } from "@/lib/layout";

export function SampleDownloadPanel({ embedded = true }: { embedded?: boolean }) {
  return (
    <div
      id="sample-download"
      className={`scroll-mt-20 bg-neutral-50 px-4 py-8 sm:px-6 sm:py-10 ${embedded ? "border-t border-neutral-200" : ""}`}
    >
      <h2 className="text-lg font-semibold text-neutral-900">Sample download</h2>
      <p className="mt-2 text-sm text-neutral-600">
        Enter your work email. We&apos;ll send a verification link before your
        download begins.
      </p>
      <div className="mt-6 max-w-lg">
        <WeeklySampleDownloadBlock />
      </div>
    </div>
  );
}

export function WeeklyOperatorSampleSection() {
  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} py-14 lg:py-16`}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">
              See the data for yourself
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Our sample report uses real registration data with company names
              and contact details redacted. You&apos;ll see exactly what your
              team receives each Monday.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-700">
              <li className="flex gap-2">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-neutral-800" />
                Real operator registrations
              </li>
              <li className="flex gap-2">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-neutral-800" />
                Deduplicated and verified
              </li>
              <li className="flex gap-2">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-neutral-800" />
                No logins, no portals, no hassle
              </li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-neutral-500">
              Sample data is redacted for privacy. Fictional placeholder values
              are shown in the preview table.
            </p>
          </div>
          <div className="overflow-hidden rounded-sm border border-neutral-200 bg-white">
            <WeeklySampleSpreadsheetPreview className="border-0 rounded-none" />
            <SampleDownloadPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
