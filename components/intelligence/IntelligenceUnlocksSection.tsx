import {
  IconBuilding,
  IconFile,
  IconPhone,
} from "@/components/ui/icons";
import { LockedSampleSpreadsheetPreview } from "@/components/intelligence/LockedSampleSpreadsheetPreview";
import { pageContainerClass } from "@/lib/layout";

const unlocks = [
  {
    title: "Direct phone number",
    description: "Landline and mobile where available, so calls actually connect.",
    Icon: IconPhone,
  },
  {
    title: "Corporate intelligence",
    description:
      "Fleet size, licence type, region, trading style and registration date.",
    Icon: IconBuilding,
  },
  {
    title: "CRM-friendly format",
    description:
      "A structured file you can import straight into CRM or dialling software.",
    Icon: IconFile,
  },
];

export function IntelligenceUnlocksSection() {
  return (
    <section id="what-you-unlock" className="scroll-mt-20 border-b border-neutral-200">
      <div className={`${pageContainerClass} py-16 sm:py-20`}>
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              What you unlock
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Everything the free reports leave out
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
              Research reports show where the market is moving. Intelligence gives
              you the operator records and contact details to act on it.
            </p>
          </div>
          <LockedSampleSpreadsheetPreview />
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {unlocks.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="rounded-sm border border-neutral-200 bg-white p-5 shadow-soft"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-neutral-200 bg-neutral-50 text-fleetSignal">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-neutral-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
