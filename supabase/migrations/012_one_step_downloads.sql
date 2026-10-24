-- One-step downloads: visitors enter their email once and the download starts.
-- No verification link. Each email gets a long-lived access token that the
-- browser keeps in a cookie and that personal links in our emails carry, so a
-- known person is recognised on any device. Resend delivery webhooks record
-- whether the address is real (delivered) or not (bounced / complained).

create table if not exists download_contacts (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  access_token text not null unique,
  email_status text not null default 'pending',
  email_status_at timestamptz,
  created_at timestamptz not null default now(),
  last_download_at timestamptz not null default now(),
  constraint download_contacts_email_status_check
    check (email_status in ('pending', 'delivered', 'bounced', 'complained')),
  -- Same shape as EMAIL_SHAPE_RE in lib/leads/email-validation.ts: plain
  -- lowercase ASCII addresses only, so nothing else can be stored as an email.
  constraint download_contacts_email_format
    check (char_length(email) <= 254 and email ~ '^[a-z0-9._%+-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$'),
  constraint download_contacts_access_token_format
    check (char_length(access_token) between 32 and 128 and access_token ~ '^[A-Za-z0-9_-]+$')
);

-- No anon policies: access goes through the security definer functions below
-- or the service role (admin, webhooks).
alter table download_contacts enable row level security;

-- Everyone who already gave a well-formed email is a known contact, so they are
-- not sent a welcome email again. Tokens built from two uuids (core Postgres,
-- no pgcrypto).
insert into download_contacts (email, access_token, created_at, last_download_at)
select
  lower(trim(l.email)),
  replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', ''),
  min(l.created_at),
  max(l.created_at)
from leads l
where char_length(lower(trim(l.email))) <= 254
  and lower(trim(l.email)) ~ '^[a-z0-9._%+-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$'
group by lower(trim(l.email))
on conflict (email) do nothing;

-- Records which download a contact took. Never resets an existing lead.
create or replace function log_download_lead(
  p_email text,
  p_source text,
  p_report_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_source not in ('sample_download', 'weekly_sample', 'intelligence_report') then
    raise exception 'unknown download source %', p_source;
  end if;

  if p_source = 'intelligence_report' then
    if p_report_id is null then
      raise exception 'report_id required for intelligence_report leads';
    end if;

    insert into leads (email, source, report_id)
    values (p_email, p_source, p_report_id)
    on conflict (email, report_id) where report_id is not null do nothing;
    return;
  end if;

  insert into leads (email, source, report_id)
  values (p_email, p_source, null)
  on conflict (email, source) where report_id is null do nothing;
end;
$$;

revoke all on function log_download_lead(text, text, uuid) from public;

-- Email form: creates the contact on first use (is_new = true) or finds the
-- existing one, logs the download, and returns the contact's access token.
create or replace function record_download(
  p_email text,
  p_new_token text,
  p_source text,
  p_report_id uuid default null
)
returns table (token text, is_new boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(trim(p_email));
  v_token text;
  v_is_new boolean := false;
begin
  -- The table constraint enforces the full format; fail early with a clear error.
  if v_email is null or char_length(v_email) > 254 or position('@' in v_email) = 0 then
    raise exception 'invalid email';
  end if;

  insert into download_contacts (email, access_token)
  values (v_email, p_new_token)
  on conflict (email) do nothing
  returning download_contacts.access_token into v_token;

  if v_token is not null then
    v_is_new := true;
  else
    update download_contacts dc
    set last_download_at = now()
    where dc.email = v_email
    returning dc.access_token into v_token;
  end if;

  perform log_download_lead(v_email, p_source, p_report_id);

  return query select v_token, v_is_new;
end;
$$;

revoke all on function record_download(text, text, text, uuid) from public;
grant execute on function record_download(text, text, text, uuid) to anon;

-- Remembered device: looks up the contact for a cookie / personal-link token
-- and logs the download. Returns null when the token is unknown.
create or replace function record_remembered_download(
  p_token text,
  p_source text,
  p_report_id uuid default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
begin
  update download_contacts dc
  set last_download_at = now()
  where dc.access_token = p_token
  returning dc.email into v_email;

  if v_email is null then
    return null;
  end if;

  perform log_download_lead(v_email, p_source, p_report_id);
  return v_email;
end;
$$;

revoke all on function record_remembered_download(text, text, uuid) from public;
grant execute on function record_remembered_download(text, text, uuid) to anon;

-- Personal links: true when the token belongs to a contact.
create or replace function is_download_contact_token(p_token text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from download_contacts where access_token = p_token);
$$;

revoke all on function is_download_contact_token(text) from public;
grant execute on function is_download_contact_token(text) to anon;
