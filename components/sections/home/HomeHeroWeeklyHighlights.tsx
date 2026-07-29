import { IconClock, IconFuel, IconShield } from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";

const sideFeatures = [
  {
    title: "Every Monday",
    description: "New leads from the previous seven days.",
    Icon: IconClock,
  },
  {
    title: "Accurate & Enriched",
    description:
      "Direct-dial numbers where available, deduplicated records and consistent formatting.",
    Icon: IconShield,
  },
  {
    title: "Excel-first Delivery",
    description: "Ready to import into CRM or dialling software.",
    Icon: IconFuel,
  },
];

export function HomeHeroWeeklyHighlights() {
  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} py-10 sm:py-12`}>
        <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
          {sideFeatures.map(({ title, description, Icon }) => (
            <li key={title} className="flex gap-4">
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
    </section>
  );
}
