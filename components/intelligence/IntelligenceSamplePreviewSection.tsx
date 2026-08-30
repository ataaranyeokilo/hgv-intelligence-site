"use client";

import { Button } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/icons";
import { useIntelligenceDownload } from "@/components/intelligence/IntelligenceDownloadProvider";
import { WeeklySampleSpreadsheetPreview } from "@/components/reports/WeeklySampleSpreadsheetPreview";
import { pageContainerClass } from "@/lib/layout";

const bullets = [
  "Real operator registrations",
  "Deduplicated and organised records",
  "No customer portal required",
  "CRM-friendly format",
];

export function IntelligenceSamplePreviewSection() {
  const { openWeeklySample } = useIntelligenceDownload();

  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} py-12 sm:py-14`}>
        <div className="rounded-sm border border-neutral-200 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
            See the data for yourself
          </h2>
          <WeeklySampleSpreadsheetPreview className="mt-6 w-full" />
          <p className="mt-6 text-sm leading-relaxed text-neutral-600">
            Download a redacted sample of the weekly operator report to review
            the structure and level of detail.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-neutral-700">
            {bullets.map((item) => (
              <li key={item} className="flex gap-2">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-neutral-800" />
                {item}
              </li>
            ))}
          </ul>
          <Button
            type="button"
            className="mt-8"
            onClick={openWeeklySample}
          >
            Download sample report
          </Button>
          <p className="mt-4 text-xs leading-relaxed text-neutral-500">
            Sample data is redacted for privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
