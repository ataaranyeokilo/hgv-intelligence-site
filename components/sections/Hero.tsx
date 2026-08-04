import { ButtonLink } from "@/components/ui/Button";
import { WeeklySampleDownloadBlock } from "@/components/download/WeeklySampleDownloadBlock";
import { pageContainerClass } from "@/lib/layout";

export function Hero() {
  return (
    <section id="what-we-do" className="border-b border-neutral-200 scroll-mt-20">
      <div className={`${pageContainerClass} py-16 sm:py-24`}>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            UK Transport Industry Intelligence
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl">
            Where market signals become intelligence.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            We analyse regulatory activity, operator movements and industry
            trends to uncover the changes shaping the UK transport sector.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Our intelligence helps businesses understand the market earlier,
            make informed decisions and identify new opportunities with
            confidence.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/intelligence" className="w-full sm:w-auto">
              Explore Latest Intelligence →
            </ButtonLink>
            <ButtonLink
              href="/intelligence#sample-download"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              See Weekly Reports →
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
            Explore a sample intelligence report
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
            See how we track market activity, identify emerging trends, and
            present commercial insights in a clear, actionable format.
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
