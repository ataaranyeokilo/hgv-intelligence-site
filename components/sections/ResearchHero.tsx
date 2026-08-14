import { ButtonLink } from "@/components/ui/Button";
import { pageContainerClass } from "@/lib/layout";

export function ResearchHero() {
  return (
    <section
      className="relative flex min-h-[20rem] items-center border-b border-neutral-200 bg-cover bg-[70%_center] bg-no-repeat sm:min-h-[24rem] lg:min-h-[28rem]"
      style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent"
        aria-hidden="true"
      />
      <div className={`relative z-10 ${pageContainerClass} py-10 lg:py-12`}>
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Research
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            Free HGV industry reports
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white sm:text-base">
            Original statistics, regional analysis, and expert commentary on the
            UK transport market.
          </p>
          <div className="mt-6">
            <ButtonLink
              href="#research-reports"
              className="w-full !bg-fleetSignal !text-white hover:!bg-blue-700 sm:w-auto"
            >
              Browse reports
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
