import { ButtonLink } from "@/components/ui/Button";
import { IconShield } from "@/components/ui/icons";
import { LockedSampleSpreadsheetPreview } from "@/components/intelligence/LockedSampleSpreadsheetPreview";
import { pageContainerClass } from "@/lib/layout";

export function IntelligenceHero() {
  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} py-10 sm:py-12 lg:py-14`}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fleetSignal">
              Paid product
            </p>
            <h1 className="mt-3 max-w-xl text-3xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-4xl">
              Newly licensed operators — and the people to call
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              Fleet Signal Intelligence is a structured Excel file of new UK HGV
              operators, enriched with direct contact details so commercial
              teams can reach the right people sooner.
            </p>
            <div className="mt-6">
              <ButtonLink
                href="/contact"
                className="w-full !bg-fleetSignal !text-white shadow-soft hover:!bg-blue-700 sm:w-auto"
              >
                Request a quote
              </ButtonLink>
            </div>
            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-neutral-500 sm:text-sm">
              <IconShield className="mt-0.5 h-4 w-4 shrink-0 text-fleetSignal" />
              Sourced from public UK operator licence records. GDPR-conscious
              B2B contact data.
            </p>
          </div>
          <LockedSampleSpreadsheetPreview />
        </div>
      </div>
    </section>
  );
}
