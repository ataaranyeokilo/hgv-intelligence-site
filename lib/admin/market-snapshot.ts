"use server";

import { requireAdminUser } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/service";

export type MarketSnapshotAdminStat = {
  stat_key: string;
  label: string;
  value: string;
  sort_order: number;
};

export async function listMarketSnapshotStatsAdmin(): Promise<
  MarketSnapshotAdminStat[]
> {
  await requireAdminUser();
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("market_snapshot_stats")
    .select("stat_key, label, value, sort_order")
    .order("sort_order", { ascending: true });
  return (data ?? []) as MarketSnapshotAdminStat[];
}

export async function saveMarketSnapshotStats(
  stats: MarketSnapshotAdminStat[],
): Promise<boolean> {
  await requireAdminUser();
  const supabase = createServiceClient();

  for (const stat of stats) {
    const { error } = await supabase
      .from("market_snapshot_stats")
      .update({
        label: stat.label.trim(),
        value: stat.value.trim(),
        sort_order: stat.sort_order,
        updated_at: new Date().toISOString(),
      })
      .eq("stat_key", stat.stat_key);
    if (error) {
      return false;
    }
  }

  return true;
}
