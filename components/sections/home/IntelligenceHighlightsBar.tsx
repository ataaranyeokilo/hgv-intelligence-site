import {
  IconCalendarWeek,
  IconRadar,
  IconTargetArrow,
} from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";

/** Near-black navy base with a blue bloom anchored to the top-right corner. */
const barGradient = [
  "radial-gradient(60% 180% at 100% 0%, rgba(30,111,240,0.7) 0%, rgba(1,72,206,0.4) 32%, rgba(1,35,119,0.14) 55%, transparent 72%)",
  "linear-gradient(90deg, #010512 0%, #010719 45%, #001240 72%, #012377 88%, #0033A1 100%)",
].join(", ");

const highlights = [
  {
    Icon: IconRadar,
    caption: "Spot market movement early",
    title: "New Operator Signals",
  },
  {
    Icon: IconCalendarWeek,
    caption: "Fresh intelligence delivered regularly",
    title: "Updated Weekly",
  },
  {
    Icon: IconTargetArrow,
    caption: "Built for fuel, insurance & fleet sales teams",
    title: "Sales-Ready Intelligence",
  },
];

export function IntelligenceHighlightsBar() {
  return (
    <section
      style={{ backgroundColor: "#010512", backgroundImage: barGradient }}
    >
      <div className={`${pageContainerClass} py-7 sm:py-8`}>
        <ul className="grid divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {highlights.map(({ Icon, caption, title }) => (
            <li
              key={title}
              className="flex items-center gap-3.5 py-5 first:pt-0 last:pb-0 sm:px-4 sm:py-0 sm:first:pl-0 sm:last:pr-0"
            >
              <Icon
                className="h-10 w-10 shrink-0 text-white"
                accentClassName="text-fleetSignal"
              />
              <div className="min-w-0">
                <p className="text-[11px] leading-snug text-blue-100/80">
                  {caption}
                </p>
                <p className="mt-1 text-base font-bold leading-snug text-white sm:text-lg">
                  {title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
