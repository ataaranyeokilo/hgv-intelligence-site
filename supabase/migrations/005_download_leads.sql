create table if not exists weekly_report_files (
  id uuid primary key default gen_random_uuid(),
  kind text not null unique,
  storage_path text not null,
  updated_at timestamptz not null default now()
);

insert into weekly_report_files (kind, storage_path)
values ('sample', 'weekly-reports/sample.xlsx')
on conflict (kind) do nothing;

alter table weekly_report_files enable row level security;

alter table leads
  add column if not exists report_id uuid references intelligence_reports (id) on delete set null;

alter table leads drop constraint if exists leads_email_source_key;

create unique index if not exists leads_email_source_no_report_key
  on leads (email, source)
  where report_id is null;

create unique index if not exists leads_email_report_key
  on leads (email, report_id)
  where report_id is not null;

drop policy if exists "anon_insert_sample_download_leads" on leads;

create policy "anon_insert_download_leads"
  on leads for insert
  to anon
  with check (
    source in ('sample_download', 'weekly_sample', 'intelligence_report')
    and (
      (source = 'intelligence_report' and report_id is not null)
      or (source in ('sample_download', 'weekly_sample') and report_id is null)
    )
  );

create or replace function upsert_download_lead(
  p_email text,
  p_token text,
  p_expires_at timestamptz,
  p_source text,
  p_report_id uuid default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_source = 'intelligence_report' and p_report_id is null then
    raise exception 'report_id required for intelligence_report leads';
  end if;

  if p_source in ('sample_download', 'weekly_sample') then
    insert into leads (
      email,
      source,
      report_id,
      status,
      download_token,
      token_expires_at
    )
    values (
      lower(trim(p_email)),
      p_source,
      null,
      'pending',
      p_token,
      p_expires_at
    )
    on conflict (email, source) where report_id is null do update set
      download_token = excluded.download_token,
      token_expires_at = excluded.token_expires_at,
      status = 'pending',
      verified_at = null;
    return;
  end if;

  insert into leads (
    email,
    source,
    report_id,
    status,
    download_token,
    token_expires_at
  )
  values (
    lower(trim(p_email)),
    p_source,
    p_report_id,
    'pending',
    p_token,
    p_expires_at
  )
  on conflict (email, report_id) where report_id is not null do update set
    download_token = excluded.download_token,
    token_expires_at = excluded.token_expires_at,
    status = 'pending',
    verified_at = null,
    source = excluded.source;
end;
$$;

revoke all on function upsert_download_lead(text, text, timestamptz, text, uuid) from public;
grant execute on function upsert_download_lead(text, text, timestamptz, text, uuid) to anon;

create or replace function verify_download_token(p_token text)
returns table (
  success boolean,
  storage_path text,
  lead_source text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_lead leads%rowtype;
  v_path text;
begin
  select * into v_lead
  from leads
  where download_token = p_token
    and token_expires_at > now()
  limit 1;

  if not found then
    return query select false, null::text, null::text;
    return;
  end if;

  if v_lead.status = 'pending' then
    update leads
    set status = 'verified', verified_at = now()
    where id = v_lead.id;
  elsif v_lead.status <> 'verified' then
    return query select false, null::text, null::text;
    return;
  end if;

  if v_lead.source = 'intelligence_report' and v_lead.report_id is not null then
    select download_storage_path into v_path
    from intelligence_reports
    where id = v_lead.report_id;
  elsif v_lead.source in ('sample_download', 'weekly_sample') then
    select coalesce(
      (select storage_path from weekly_report_files where kind = 'sample' limit 1),
      'weekly-reports/sample.xlsx'
    ) into v_path;
  else
    v_path := null;
  end if;

  if v_path is null or v_path = '' then
    return query select false, null::text, null::text;
    return;
  end if;

  return query select true, v_path, v_lead.source;
end;
$$;

revoke all on function verify_download_token(text) from public;
grant execute on function verify_download_token(text) to anon;

-- Backwards-compatible wrappers
create or replace function upsert_sample_lead(
  p_email text,
  p_token text,
  p_expires_at timestamptz
)
returns void
language sql
security definer
set search_path = public
as $$
  select upsert_download_lead(p_email, p_token, p_expires_at, 'sample_download', null);
$$;

revoke all on function upsert_sample_lead(text, text, timestamptz) from public;
grant execute on function upsert_sample_lead(text, text, timestamptz) to anon;

create or replace function verify_sample_download_token(p_token text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_result record;
begin
  select * into v_result from verify_download_token(p_token);
  return coalesce(v_result.success, false);
end;
$$;

revoke all on function verify_sample_download_token(text) from public;
grant execute on function verify_sample_download_token(text) to anon;
