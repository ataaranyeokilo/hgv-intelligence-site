create table intelligence_reports (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  summary text not null,
  reading_time_minutes integer not null default 5,
  published_at timestamptz not null default now(),
  published boolean not null default false,
  content jsonb not null default '{}'::jsonb,
  hero_image_path text,
  download_storage_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table intelligence_reports enable row level security;

create policy "anon_select_published_intelligence_reports"
  on intelligence_reports for select
  to anon
  using (published = true);

create index intelligence_reports_published_at_idx
  on intelligence_reports (published_at desc)
  where published = true;

insert into intelligence_reports (
  slug,
  title,
  category,
  summary,
  reading_time_minutes,
  published_at,
  published,
  content,
  download_storage_path
)
values
  (
    'uk-hgv-operator-growth-q1',
    'UK HGV Operator Growth — Q1 Overview',
    'Market trends',
    'Where new operator registrations are accelerating and what it means for outbound sales.',
    6,
    '2026-01-15 09:00:00+00',
    true,
    jsonb_build_object(
      'introduction',
      'New HGV operator registrations remained strong across the UK in Q1, with notable regional variation in fleet size and contact availability.',
      'key_findings',
      jsonb_build_array(
        'Weekly new operator volumes increased in the Midlands and North West.',
        'Average fleet size for new entrants remained stable at 12 vehicles.',
        'Enriched direct-dial coverage improved connect rates for outbound teams.'
      ),
      'charts',
      jsonb_build_array()
    ),
    'intelligence-downloads/uk-hgv-operator-growth-q1.pdf'
  ),
  (
    'regional-fleet-expansion',
    'Regional Fleet Expansion Patterns',
    'Regional analysis',
    'Which regions are adding licensed vehicles fastest and how fleets are scaling.',
    5,
    '2026-02-01 09:00:00+00',
    true,
    jsonb_build_object(
      'introduction',
      'Fleet expansion is concentrated in logistics corridors, with smaller operators adding vehicles ahead of seasonal demand.',
      'key_findings',
      jsonb_build_array(
        'West Midlands led net fleet growth among new operators.',
        'Single-depot operators expanded faster than multi-site groups.',
        'Finance and insurance outreach windows peak within 30 days of registration.'
      ),
      'charts',
      jsonb_build_array()
    ),
    'intelligence-downloads/regional-fleet-expansion.pdf'
  ),
  (
    'new-operator-contact-enrichment',
    'New Operator Contact Enrichment',
    'Data quality',
    'How enriched direct-dial contacts improve connect rates for transport sales teams.',
    4,
    '2026-02-18 09:00:00+00',
    true,
    jsonb_build_object(
      'introduction',
      'Contact quality is the biggest lever for outbound performance when targeting newly registered HGV operators.',
      'key_findings',
      jsonb_build_array(
        'Direct-dial numbers reduce time-to-first conversation.',
        'Role-based contacts improve qualification on first call.',
        'Excel-first delivery keeps CRM imports straightforward.'
      ),
      'charts',
      jsonb_build_array()
    ),
    'intelligence-downloads/new-operator-contact-enrichment.pdf'
  );
