import {
  IconBuilding,
  IconChart,
  IconDocument,
  IconMapPin,
} from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";

const sideFeatures = [
  {
    title: "Official Regulatory Sources",
    description:
      "Every insight begins with verified Traffic Commissioner activity.",
    Icon: IconBuilding,
  },
  {
    title: "Independent Analysis",
    description:
      "We turn market signals into clear, objective intelligence.",
    Icon: IconChart,
  },
  {
    title: "UK-wide Coverage",
    description: "Monitoring activity across the entire UK transport sector.",
    Icon: IconMapPin,
  },
  {
    title: "Published Intelligence",
    description:
      "Quarterly and annual reports covering the latest market trends.",
    Icon: IconDocument,
  },
];

export function HomeHeroWeeklyHighlights() {
  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} py-10 sm:py-12`}>
        <ul className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
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
