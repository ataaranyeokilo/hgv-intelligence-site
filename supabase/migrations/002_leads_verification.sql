alter table leads
  add column if not exists status text not null default 'pending',
  add column if not exists download_token text,
  add column if not exists token_expires_at timestamptz,
  add column if not exists verified_at timestamptz;

alter table leads
  drop constraint if exists leads_status_check;

alter table leads
  add constraint leads_status_check
  check (status in ('pending', 'verified'));

create unique index if not exists leads_download_token_key
  on leads (download_token)
  where download_token is not null;

create or replace function upsert_sample_lead(
  p_email text,
  p_token text,
  p_expires_at timestamptz
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into leads (
    email,
    source,
    status,
    download_token,
    token_expires_at
  )
  values (
    lower(trim(p_email)),
    'sample_download',
    'pending',
    p_token,
    p_expires_at
  )
  on conflict (email, source) do update set
    download_token = excluded.download_token,
    token_expires_at = excluded.token_expires_at,
    status = 'pending',
    verified_at = null;
end;
$$;

revoke all on function upsert_sample_lead(text, text, timestamptz) from public;
grant execute on function upsert_sample_lead(text, text, timestamptz) to anon;
