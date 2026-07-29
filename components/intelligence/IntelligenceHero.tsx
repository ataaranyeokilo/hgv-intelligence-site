import {
  IconClock,
  IconFile,
  IconShield,
  IconUsers,
} from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";

const heroFeatures = [
  {
    title: "Regularly updated",
    description: "New intelligence is published as current data becomes available.",
    Icon: IconClock,
  },
  {
    title: "Built from reliable sources",
    description:
      "Reports are based on official UK operator information and reviewed data.",
    Icon: IconShield,
  },
  {
    title: "Practical formats",
    description: "Reports are structured to be easy to read, download and use.",
    Icon: IconFile,
  },
  {
    title: "Built for commercial teams",
    description:
      "Designed to support sales, market research and business development.",
    Icon: IconUsers,
  },
];

export function IntelligenceHero() {
  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} py-12 sm:py-16`}>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Intelligence
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl">
              Intelligence that drives results
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600">
              Actionable operator intelligence to help you identify opportunities,
              understand the UK HGV market and support better commercial
              decisions.
            </p>
          </div>
          <ul className="divide-y divide-neutral-200 border-t border-neutral-200 lg:border-l lg:border-t-0 lg:pl-8">
            {heroFeatures.map(({ title, description, Icon }) => (
              <li key={title} className="flex gap-3 py-3.5 first:pt-6 lg:first:pt-4">
                <span className="mt-0.5 shrink-0 text-neutral-600">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-900">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-neutral-600">
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
