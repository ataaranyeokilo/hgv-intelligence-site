"use client";

import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/Button";
import {
  listMarketSnapshotStatsAdmin,
  saveMarketSnapshotStats,
  type MarketSnapshotAdminStat,
} from "@/lib/admin/market-snapshot";

export function MarketSnapshotAdminForm() {
  const [stats, setStats] = useState<MarketSnapshotAdminStat[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const rows = await listMarketSnapshotStatsAdmin();
      setStats(rows);
    });
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    startTransition(async () => {
      const ok = await saveMarketSnapshotStats(stats);
      setMessage(ok ? "Stats saved." : "Could not save stats.");
    });
  }

  if (!stats.length) {
    return <p className="text-sm text-neutral-600">Loading stats…</p>;
  }

  const inputClass =
    "mt-2 w-full rounded-sm border border-neutral-300 px-3 py-2 text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {stats.map((stat, index) => (
        <div
          key={stat.stat_key}
          className="grid gap-4 rounded-sm border border-neutral-200 bg-white p-4 sm:grid-cols-2"
        >
          <label className="text-sm font-medium text-neutral-800">
            Label
            <input
              className={inputClass}
              value={stat.label}
              onChange={(e) => {
                const next = [...stats];
                next[index] = { ...stat, label: e.target.value };
                setStats(next);
              }}
            />
          </label>
          <label className="text-sm font-medium text-neutral-800">
            Value
            <input
              className={inputClass}
              value={stat.value}
              onChange={(e) => {
                const next = [...stats];
                next[index] = { ...stat, value: e.target.value };
                setStats(next);
              }}
            />
          </label>
        </div>
      ))}
      {message ? <p className="text-sm text-neutral-600">{message}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : "Save stats"}
      </Button>
    </form>
  );
}
