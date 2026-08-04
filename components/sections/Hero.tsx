import { ButtonLink } from "@/components/ui/Button";
import { WeeklySampleDownloadBlock } from "@/components/download/WeeklySampleDownloadBlock";
import { pageContainerClass } from "@/lib/layout";

export function Hero() {
  return (
    <section id="what-we-do" className="border-b border-neutral-200 scroll-mt-20">
      <div className={`${pageContainerClass} py-16 sm:py-24`}>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            UK HGV Operator Data
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl">
            Fresh weekly HGV operator leads, delivered in Excel
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            We compile newly registered operators into structured weekly Excel
            reports — built for transport sales teams who need consistent,
            actionable lead data without manual research.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/intelligence" className="w-full sm:w-auto">
              Browse Intelligence
            </ButtonLink>
            <ButtonLink
              href="/intelligence#weekly-reports"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              See Weekly Reports
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeSampleCta({
  sectionId = "weekly-reports",
}: {
  sectionId?: string;
}) {
  return (
    <section
      id={sectionId}
      className="scroll-mt-20 bg-neutral-900 text-white"
    >
      <div
        className={`${pageContainerClass} grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-16`}
      >
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            See the data before you subscribe
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
            Download a redacted sample Excel report to review fields, layout,
            and data quality before you request a quote.
          </p>
        </div>
        <div className="w-full max-w-md lg:max-w-none lg:justify-self-end">
          <WeeklySampleDownloadBlock
            variant="dark"
            layout="inline"
            submitLabel="Download sample"
            showDisclaimer
          />
        </div>
      </div>
    </section>
  );
}
