import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/env";

import { marketSnapshotStats as fallbackStats } from "@/lib/market-snapshot";

export type MarketSnapshotStat = {
  label: string;
  value: string;
};

export type MarketSnapshotResult = {
  stats: MarketSnapshotStat[];
  isFallback: boolean;
};

export async function getMarketSnapshotStats(): Promise<MarketSnapshotResult> {
  if (!hasSupabaseEnv()) {
    return { stats: fallbackStats, isFallback: true };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("market_snapshot_stats")
    .select("label, value, sort_order")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return { stats: fallbackStats, isFallback: true };
  }

  return {
    stats: data.map((row) => ({
      label: String(row.label),
      value: String(row.value),
    })),
    isFallback: false,
  };
}
