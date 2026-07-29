create table market_snapshot_stats (
  id uuid primary key default gen_random_uuid(),
  stat_key text not null unique,
  label text not null,
  value text not null,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

insert into market_snapshot_stats (stat_key, label, value, sort_order)
values
  ('new_operators', 'New operators', '142', 1),
  ('growth_pct', 'Growth', '+8.4%', 2),
  ('top_region', 'Highest growth region', 'West Midlands', 3),
  ('avg_fleet', 'Average fleet size', '12 vehicles', 4)
on conflict (stat_key) do nothing;

alter table market_snapshot_stats enable row level security;

create policy "anon_select_market_snapshot_stats"
  on market_snapshot_stats for select
  to anon
  using (true);
