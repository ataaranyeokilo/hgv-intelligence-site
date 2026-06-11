create table leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'sample_download',
  created_at timestamptz not null default now(),
  unique (email, source)
);

alter table leads enable row level security;

-- Anon users may insert sample-download leads only; no read/update/delete
create policy "anon_insert_sample_download_leads"
  on leads for insert
  to anon
  with check (source = 'sample_download');
