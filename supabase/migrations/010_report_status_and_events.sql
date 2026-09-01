-- Report lifecycle: draft | published | archived
-- Public site continues to show only published reports.
-- Keep `published` boolean in sync so older queries do not drift.

alter table intelligence_reports
  add column if not exists status text;

update intelligence_reports
set status = case when published then 'published' else 'draft' end
where status is null or status = '';

alter table intelligence_reports
  alter column status set default 'draft';

update intelligence_reports
set status = 'draft'
where status is null or status = '';

alter table intelligence_reports
  alter column status set not null;

alter table intelligence_reports
  drop constraint if exists intelligence_reports_status_check;

alter table intelligence_reports
  add constraint intelligence_reports_status_check
  check (status in ('draft', 'published', 'archived'));

create or replace function sync_intelligence_report_published()
returns trigger
language plpgsql
as $$
begin
  new.published := (new.status = 'published');
  return new;
end;
$$;

drop trigger if exists intelligence_reports_sync_published on intelligence_reports;

create trigger intelligence_reports_sync_published
  before insert or update on intelligence_reports
  for each row
  execute procedure sync_intelligence_report_published();

drop policy if exists "anon_select_published_intelligence_reports" on intelligence_reports;

create policy "anon_select_published_intelligence_reports"
  on intelligence_reports for select
  to anon, authenticated
  using (status = 'published');

drop index if exists intelligence_reports_published_at_idx;

create index intelligence_reports_published_at_idx
  on intelligence_reports (published_at desc)
  where status = 'published';

-- Lightweight report analytics. No personal data.
create table if not exists report_events (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references intelligence_reports (id) on delete cascade,
  event_type text not null,
  created_at timestamptz not null default now(),
  constraint report_events_type_check
    check (event_type in ('viewed', 'clicked', 'download_started'))
);

create index if not exists report_events_report_id_idx
  on report_events (report_id);

create index if not exists report_events_created_at_idx
  on report_events (created_at desc);

create index if not exists report_events_type_created_idx
  on report_events (event_type, created_at desc);

alter table report_events enable row level security;

drop policy if exists "insert_report_events_for_published_reports" on report_events;

create policy "insert_report_events_for_published_reports"
  on report_events for insert
  to anon, authenticated
  with check (
    event_type in ('viewed', 'clicked', 'download_started')
    and exists (
      select 1
      from intelligence_reports r
      where r.id = report_id
        and r.status = 'published'
    )
  );
