# CONTEXT.md

# Latest Handoff

_Last updated: 2026-06-11_

## Current Branch

`main` — clean, up to date with `origin/main` at `c9cf574`.

## Current Ticket

**TICKET-003** — Supabase schema + wire sample-download email capture.

Status: **proposed, not started on `main`**. Ata has not confirmed the plan yet.

Proposed scope: `leads` table migration, RLS for anonymous insert, wire `SampleDownloadForm` to save email, success/error UX. Defer sample file download, pricing section, and admin upload.

## Completed Since Last Handoff

* **Initial setup** (`7725fdf`) — Next.js 15 + TypeScript + Tailwind landing page, all core sections, Supabase client stubs, project docs.
* **TICKET-002** (`a017213`, PR #1 merged) — `SampleDownloadForm` with client-side email validation; server/client split for `SampleDownload`.
* **Housekeeping** (`c9cf574`) — `package-lock.json` added for reproducible installs.

## Current Implementation State

* Single-page landing: Hero, What We Do, Free Reports, Weekly Leads, Sample Download, About, Contact.
* **Missing from MVP list:** Pricing section, admin upload, actual sample file download.
* `SampleDownloadForm` validates email but does not persist data. Submit shows placeholder: *"Form UI ready. Database connection comes next."*
* Supabase helpers exist (`lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/env.ts`) but are unused.
* No API routes, server actions, or `app/api/` endpoints.

## Database State

* **No migrations in `main`.** No `supabase/` folder on `main`.
* No tables defined or applied from this repo on `main`.
* Unmerged remote branches contain migration SQL (see risks) — not part of `main` until merged.

## Environment Notes

* Required vars (names only): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
* Template: `.env.local.example`. No `.env.local` in repo (correct — never commit secrets).
* Local Supabase connection not verified in this environment (no `.env.local` present).

## Verification Status

| Check | Result |
|-------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass — static `/` page |
| Tests | None configured |
| CI | No `.github/` workflows |
| E2E form flow | UI only — no DB write, no file download |

## Known Issues / Risks

* **CONTEXT.md has duplicate background sections** (two overlapping "What we are building" / MVP blocks). Cleanup is a separate doc task.
* **Unmerged remote branches** may overlap with TICKET-003+ work — verify before re-implementing:
  * `origin/cursor/supabase-email-capture-dccb` — TICKET-003 (migration `001_leads.sql`, `lib/leads/submit-sample-lead.ts`)
  * `origin/cursor/lead-verification-token-dccb` — TICKET-004A (verification tokens, `002_leads_verification.sql`)
  * `origin/cursor/context-handoff-skill-7221` — this handoff skill file (`.cursor/skills/context-handoff/SKILL.md`)
* **Pending decision:** DB-only email capture vs DB + sample download in one ticket.
* **Pricing section** listed in MVP docs but not built on the page.

## Next Recommended Action

1. Read `CONTEXT.md` → `STACK.md` → `COMMUNICATION.md`.
2. Confirm TICKET-003 plan with Ata (DB-only vs include download).
3. Check whether to **merge/reuse** `origin/cursor/supabase-email-capture-dccb` or implement fresh on a new branch.
4. Do not write code until the plan is confirmed.

---

# What we are building

A simple website for a UK HGV lead/data business.

The business has two sides:

1. Free quarterly and yearly industry reports
2. Paid weekly Excel lead reports# CONTEXT.md

# What we are building

A simple website for a UK HGV lead/data business.

The business sells fresh weekly Excel lead reports for transport-industry sales teams.

The website also publishes free quarterly and yearly reports to build trust and show industry knowledge.

# Paid reports

Weekly reports include:

* new HGV operators
* fresh company data
* enriched phone numbers
* Excel download format

Target customers:

* fuel companies
* insurance companies
* vehicle finance teams
* fleet service providers
* transport sales teams

# Website Structure

The MVP is mainly a single scrolling landing page.

Sections:

* Hero
* What the business does
* Free reports
* Weekly leads
* Sample download CTA
* Pricing
* About
* Contact/footer

Later we may add:

* sample report page
* admin upload page

# MVP

Keep the MVP small.

Needed now:

* landing page
* clean responsive design
* sample download CTA
* simple navigation
* placeholder content
* admin upload later

Not needed now:

* customer dashboard
* auth system
* payment system
* CRM
* complex automation
* AI features

# Basic Flow

User visits site → sees value → enters email → downloads sample Excel report → business follows up later.

# Design Direction

The website should feel:

* clean
* black and white
* minimal
* modern
* typography focused
* simple to navigate

Use lots of whitespace.

Keep the UI lightweight and responsive.

# Rule

Keep this simple, clear, and easy to maintain.


# Free reports

These are public on the website.

They show:

* industry numbers
* trends
* charts
* useful market insight

Their job is to build trust and show that the business understands the transport industry.

# Paid reports

Customers pay for fresh weekly HGV operator leads.

These reports include:

* new HGV operators
* fresh weekly company data
* enriched phone numbers
* Excel download format

Target customers:

* fuel companies
* insurance companies
* vehicle finance teams
* fleet service providers
* transport sales teams

# MVP

Build only what helps launch fast.

Needed now:

* Home
* Industry Reports
* Weekly Leads
* Pricing
* About
* Contact
* Sample Download
* Simple Admin Upload

Not needed now:

* customer dashboard
* login system
* CRM
* payment system
* complex automation
* AI features

# Basic flow

User visits site → sees value → enters email → downloads sample Excel report → email is saved → business follows up.

Admin uploads the latest report each week.

# Rule

Keep this small, clear, and easy to change.
