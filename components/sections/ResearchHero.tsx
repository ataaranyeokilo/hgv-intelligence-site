import { ButtonLink } from "@/components/ui/Button";
import { pageContainerClass } from "@/lib/layout";

const heroFade =
  "linear-gradient(to right, #ffffff 0%, #ffffff 36%, #f4f7fb 58%, #eef3f8 100%)";

export function ResearchHero() {
  return (
    <section
      className="relative flex min-h-[20rem] items-center overflow-hidden border-b border-neutral-200 bg-white sm:min-h-[24rem] lg:min-h-[28rem]"
      style={{ backgroundImage: heroFade }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[75%] sm:block lg:w-[70%]"
      >
        <div className="absolute inset-0 flex justify-end">
          <div
            className="relative aspect-[1024/576] h-full w-auto max-w-full"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 32%)",
              WebkitMaskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskImage: "linear-gradient(to right, transparent 0%, black 32%)",
              maskSize: "100% 100%",
              maskRepeat: "no-repeat",
            }}
          >
            <img
              src="/images/research-hero.jpg?v=1"
              alt=""
              className="h-full w-full object-contain object-right"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-white from-0% via-white/90 via-[18%] to-transparent to-[36%]"
              aria-hidden="true"
            />
          </div>
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-white from-0% via-[#f4f7fb] via-[32%] to-transparent to-[62%]"
          aria-hidden="true"
        />
      </div>
      <div className={`relative z-10 ${pageContainerClass} w-full py-10 lg:py-12`}>
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Research
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
            Where the market is growing and going
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-600 sm:text-base">
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
