import { getMarketSnapshotStats } from "@/lib/market-snapshot/queries";

export async function MarketSnapshot() {
  const { stats } = await getMarketSnapshotStats();

  return (
    <section className="border-b border-neutral-200">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
          Live market snapshot
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold tracking-tight text-neutral-900">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-neutral-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
