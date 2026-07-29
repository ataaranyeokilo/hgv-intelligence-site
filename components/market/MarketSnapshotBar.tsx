import { getMarketSnapshotStats } from "@/lib/market-snapshot/queries";
import {
  IconChart,
  IconBuilding,
  IconTruck,
  IconUsers,
} from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";
import type { ComponentType } from "react";

type IconProps = { className?: string };

const statIcons: ComponentType<IconProps>[] = [
  IconUsers,
  IconChart,
  IconBuilding,
  IconTruck,
];

export async function MarketSnapshotBar({
  title = "Latest market snapshot",
  subtitle = "Based on the latest operator registration data.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const { stats, isFallback } = await getMarketSnapshotStats();

  return (
    <section className="border-y border-neutral-200 bg-neutral-100">
      <div className={`${pageContainerClass} py-8 sm:py-10`}>
        <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
        <p className="mt-1 text-sm text-neutral-600">
          {isFallback
            ? "Example figures — update in admin when live data is available."
            : subtitle}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = statIcons[index] ?? IconUsers;
            return (
              <div key={stat.label} className="flex gap-4 border-l border-neutral-300 pl-5">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-neutral-700" />
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
