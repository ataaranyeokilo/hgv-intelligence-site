import { pageContainerClass } from "@/lib/layout";

const barGradient = [
  "radial-gradient(60% 180% at 100% 0%, rgba(30,111,240,0.7) 0%, rgba(1,72,206,0.4) 32%, rgba(1,35,119,0.14) 55%, transparent 72%)",
  "linear-gradient(90deg, #010512 0%, #010719 45%, #001240 72%, #012377 88%, #0033A1 100%)",
].join(", ");

export function QuoteHero() {
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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fleetSignal">
          Fleet Signal Intelligence
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          Request a quote
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white sm:text-lg">
          Tell us who you sell to and where you work. We will price a weekly
          operator list that matches your market — with the people to call.
        </p>
      </div>
    </section>
  );
}
