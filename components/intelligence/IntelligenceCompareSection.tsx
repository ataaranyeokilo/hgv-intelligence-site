import { ButtonLink } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";

/** Same near-black navy bloom as the Intelligence stats bar. */
const sectionGradient = [
  "radial-gradient(60% 180% at 100% 0%, rgba(30,111,240,0.7) 0%, rgba(1,72,206,0.4) 32%, rgba(1,35,119,0.14) 55%, transparent 72%)",
  "linear-gradient(90deg, #010512 0%, #010719 45%, #001240 72%, #012377 88%, #0033A1 100%)",
].join(", ");

const freeItems = [
  "Market-level trends and volumes",
  "Regional analysis and commentary",
  "Published on the Research page",
  "No operator contact details",
];

const paidItems = [
  "Company-level records, filtered to your market",
  "Direct email",
  "Direct phone number",
  "Corporate intelligence",
  "Excel-ready delivery",
];

export function IntelligenceCompareSection() {
  return (
    <section
      style={{ backgroundColor: "#010512", backgroundImage: sectionGradient }}
    >
      <div className={`${pageContainerClass} py-12 sm:py-14`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="flex flex-col rounded-sm border border-neutral-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Free
            </p>
            <h2 className="mt-3 text-xl font-semibold text-neutral-900">
              Research reports
            </h2>
            <ul className="mt-6 flex-1 space-y-3">
              {freeItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-neutral-700"
                >
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-neutral-800" />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/research" variant="secondary" className="mt-8 w-full">
              Explore free research
            </ButtonLink>
          </article>

          <article className="flex flex-col rounded-sm border border-fleetSignal bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fleetSignal">
              Quote based
            </p>
            <h2 className="mt-3 text-xl font-semibold text-neutral-900">
              Operator Intelligence
            </h2>
            <ul className="mt-6 flex-1 space-y-3">
              {paidItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-neutral-700"
                >
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-fleetSignal" />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink
              href="/contact"
              className="mt-8 w-full !bg-fleetSignal !text-white hover:!bg-blue-700"
            >
              Request a quote
            </ButtonLink>
          </article>
        </div>
      </div>
    </section>
  );
}
