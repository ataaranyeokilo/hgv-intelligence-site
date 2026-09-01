import { ButtonLink } from "@/components/ui/Button";
import { IconShield } from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";

export function IntelligenceHero() {
  return (
    <section className="relative flex min-h-[20rem] items-center overflow-hidden border-b border-neutral-200 bg-[#010512] sm:min-h-[24rem] lg:min-h-[32rem]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[70%] sm:block lg:w-[64%]"
      >
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 50%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 50%)",
          }}
        >
          <img
            src="/images/intelligence-hero.jpg?v=3"
            alt=""
            className="h-full w-full object-contain object-right contrast-[1.08] saturate-[1.1]"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#010512] from-0% via-[#010512] via-[40%] to-transparent to-[70%]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#010512]/20 via-transparent to-[#010512]/10"
          aria-hidden="true"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-[#010512] from-20% via-[#010512]/90 via-50% to-transparent sm:w-[62%] lg:w-[56%]"
        aria-hidden="true"
      />
      <div
        className={`relative z-10 ${pageContainerClass} w-full py-10 sm:py-12 lg:py-14`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fleetSignal">
          Paid product
        </p>
        <h1 className="mt-3 max-w-xl text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl">
          Newly licensed operators — and the people to call
        </h1>
        <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-white sm:text-lg">
          Fleet Signal Intelligence — stay ahead of the market.
        </p>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-blue-100/85 sm:text-lg">
          Fleet Signal Intelligence is our trademark weekly enriched report
          of new and growing UK HGV operators, enriched with direct contact
          details so commercial teams can reach the right people sooner.
        </p>
        <div className="mt-6">
          <ButtonLink
            href="/contact"
            className="w-full !bg-fleetSignal !text-white shadow-soft hover:!bg-blue-700 sm:w-auto"
          >
            Request a quote
          </ButtonLink>
        </div>
        <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-white/70 sm:text-sm">
          <IconShield className="mt-0.5 h-4 w-4 shrink-0 text-fleetSignal" />
          Sourced from public UK operator licence records. GDPR-conscious
          B2B contact data.
        </p>
      </div>
    </section>
  );
}
