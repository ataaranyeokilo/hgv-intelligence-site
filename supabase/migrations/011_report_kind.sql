-- Library kind: research reports vs paid Intelligence subscribe cards.
-- Existing rows are research. Public /research mixes both; homepage stays research-only.

alter table intelligence_reports
  add column if not exists kind text;

update intelligence_reports
set kind = 'research'
where kind is null or kind = '';

alter table intelligence_reports
  alter column kind set default 'research';

update intelligence_reports
set kind = 'research'
where kind is null or kind = '';

alter table intelligence_reports
  alter column kind set not null;

alter table intelligence_reports
  drop constraint if exists intelligence_reports_kind_check;

alter table intelligence_reports
  add constraint intelligence_reports_kind_check
  check (kind in ('research', 'intelligence'));

create index if not exists intelligence_reports_kind_status_idx
  on intelligence_reports (kind, status, published_at desc);
