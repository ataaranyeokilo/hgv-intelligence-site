create table quote_enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  work_email text not null,
  company text not null,
  industry text not null,
  regions_of_interest text not null,
  reports_required text not null,
  additional_information text,
  created_at timestamptz not null default now()
);

alter table quote_enquiries enable row level security;

create policy "anon_insert_quote_enquiries"
  on quote_enquiries for insert
  to anon
  with check (true);
