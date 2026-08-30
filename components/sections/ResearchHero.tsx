import { ButtonLink } from "@/components/ui/Button";
import { pageContainerClass } from "@/lib/layout";

/** Same near-black navy bloom as the homepage intelligence highlights bar. */
const barGradient = [
  "radial-gradient(60% 180% at 100% 0%, rgba(30,111,240,0.7) 0%, rgba(1,72,206,0.4) 32%, rgba(1,35,119,0.14) 55%, transparent 72%)",
  "linear-gradient(90deg, #010512 0%, #010719 45%, #001240 72%, #012377 88%, #0033A1 100%)",
].join(", ");

export function ResearchHero() {
  return (
    <section
      className="relative flex min-h-[20rem] items-center overflow-hidden border-b border-neutral-200 sm:min-h-[24rem] lg:min-h-[28rem]"
      style={{ backgroundColor: "#010512", backgroundImage: barGradient }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[58%] max-w-2xl"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(59,130,246,0.55) 0.7px, transparent 0.9px)",
          backgroundSize: "10px 10px",
          backgroundPosition: "right top",
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 48%, transparent 86%)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 48%, transparent 86%)",
        }}
      />
      <div className={`relative z-10 ${pageContainerClass} w-full py-10 lg:py-12`}>
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Research
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            Where the market is growing and going
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
