import { ButtonLink } from "@/components/ui/Button";
import {
  IconBuilding,
  IconFile,
  IconShield,
  IconUsers,
} from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";

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
    title: "Excel-first delivery",
    description:
      "Clean, structured files ready to import into CRM or dialling software.",
    Icon: IconFile,
  },
  {
    title: "Built for sales teams",
    description:
      "Designed to save time and help commercial teams focus on quality conversations.",
    Icon: IconUsers,
  },
];

export function AboutHero() {
  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} py-16 sm:py-24`}>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              About HGV Intelligence
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl">
              HGV operator data built for commercial teams
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              We turn official UK HGV operator information into structured
              reports that help sales teams identify relevant transport
              businesses faster.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/intelligence" className="w-full sm:w-auto">
                View Intelligence
              </ButtonLink>
              <ButtonLink
                href="/intelligence#sample-download"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                See Weekly Reports
              </ButtonLink>
            </div>
          </div>
          <ul className="divide-y divide-neutral-200 border-t border-neutral-200 lg:border-l lg:border-t-0 lg:pl-10">
            {sideFeatures.map(({ title, description, Icon }) => (
              <li key={title} className="flex gap-4 py-6 first:pt-8 lg:first:pt-6">
                <span className="mt-0.5 text-neutral-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-neutral-900">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
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
