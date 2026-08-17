import { ButtonLink } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/icons";
import { WeeklySampleSpreadsheetPreview } from "@/components/reports/WeeklySampleSpreadsheetPreview";
import { pageContainerClass } from "@/lib/layout";

const checklistItems = [
  "Company details",
  "Trading style",
  "Operator licence information",
  "Registration dates",
  "Fleet size",
  "Region & postcode",
  "Contact details where available",
  "Excel format",
];

export function AboutCustomersReceiveSection() {
  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} py-14 sm:py-16`}>
        <h2 className="text-xl font-semibold text-neutral-900">
          What customers receive
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,0.75fr)] lg:items-start lg:gap-8">
          <div>
            <ul className="space-y-4">
              {checklistItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-neutral-800">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white">
                    <IconCheck className="h-3 w-3 text-fleetSignal" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <WeeklySampleSpreadsheetPreview className="min-w-0" />

          <div className="rounded-sm border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h3 className="text-lg font-semibold text-neutral-900">
              See the data for yourself
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Browse the latest intelligence or download a redacted sample
              report.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink
                href="/intelligence"
                className="w-full !bg-fleetSignal text-center !text-white shadow-soft hover:!bg-blue-700"
              >
                View Intelligence
              </ButtonLink>
              <ButtonLink
                href="#weekly-reports"
                variant="secondary"
                className="w-full text-center shadow-soft"
              >
                Download Sample Report
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
