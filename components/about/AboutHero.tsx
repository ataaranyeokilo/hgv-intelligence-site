import { ButtonLink } from "@/components/ui/Button";
import {
  IconBuilding,
  IconFile,
  IconShield,
  IconUsers,
} from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";

const barGradient = [
  "radial-gradient(60% 180% at 100% 0%, rgba(30,111,240,0.7) 0%, rgba(1,72,206,0.4) 32%, rgba(1,35,119,0.14) 55%, transparent 72%)",
  "linear-gradient(90deg, #010512 0%, #010719 45%, #001240 72%, #012377 88%, #0033A1 100%)",
].join(", ");

const sideFeatures = [
  {
    title: "Official UK operator data",
    description: "Based on publicly available operator licence information.",
    Icon: IconBuilding,
  },
  {
    title: "Accurate & enriched",
    description:
      "Direct-dial numbers where available, deduplicated records and consistent formatting.",
    Icon: IconShield,
  },
  {
    title: "CRM-friendly format",
    description:
      "Clean, structured files ready to import into CRM or dialling software.",
    Icon: IconFile,
  },
  {
    title: "Ideal for sales teams",
    description:
      "Designed to save time and help commercial teams focus on quality conversations.",
    Icon: IconUsers,
  },
];

export function AboutHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-neutral-200"
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
      <div className={`relative z-10 ${pageContainerClass} py-10 sm:py-12 lg:py-14`}>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              About us
            </p>
            <h1 className="mt-3 max-w-xl text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl">
              HGV operator data built for commercial teams
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-100/85 sm:text-lg">
              Fleet Signal turns official UK HGV operator information into
              structured enriched reports. Helping the people who need this
              information find it faster than the competition.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href="/intelligence"
                className="w-full !bg-fleetSignal !text-white hover:!bg-blue-700 sm:w-auto"
              >
                View Intelligence
              </ButtonLink>
              <ButtonLink
                href="/research"
                variant="secondary"
                className="w-full !border-white !bg-white !text-neutral-900 hover:!bg-neutral-100 sm:w-auto"
              >
                Explore Free Research
              </ButtonLink>
            </div>
          </div>
          <ul className="divide-y divide-white/15 border-t border-white/15 lg:border-l lg:border-t-0 lg:pl-10">
            {sideFeatures.map(({ title, description, Icon }) => (
              <li key={title} className="flex gap-4 py-4 first:pt-4">
                <span className="mt-0.5 text-fleetSignal">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-white">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-blue-100/80">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
