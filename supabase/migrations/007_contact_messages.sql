create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

create policy "anon_insert_contact_messages"
  on contact_messages for insert
  to anon
  with check (true);
