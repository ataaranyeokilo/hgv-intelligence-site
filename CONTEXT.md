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

A B2B marketing website for **HGV Intelligence** — a UK HGV operator data business.

The site is **not** a SaaS product. It exists to:

- establish credibility
- publish free intelligence reports
- capture leads
- convert visitors into enquiries for paid weekly Excel lead reports

# Product offer

## Free intelligence reports

Published reports are listed on **`/research`** (the public report library) and featured on the home “Explore our research” scroller. Report articles stay at `/intelligence/[slug]`. **`/intelligence`** is the paid Intelligence product pitch, not the report library.

Weekly vs general split uses the admin **category** field (contains `weekly`) until a dedicated report type exists in the schema.

Published library cards link to the article page. **Download full report** on the article opens the **email verification modal**. Placeholder cards and the weekly sample CTA open the same modal.

Legacy URL `/download/intelligence/[slug]` redirects to `/intelligence/[slug]?download=1` (opens the modal).

## Paid weekly reports

Weekly Excel files with new UK HGV operator leads (company, fleet, licence, enriched contacts). Enquiries via **`/contact`** — no checkout on the site.

# Site structure

| Route | Purpose |
| ----- | ------- |
| `/` | Home — hero, featured research card scroller, intelligence highlights bar |
| `/research` | Public report library — published reports from the database |
| `/intelligence` | Paid Intelligence product pitch (not the report library) |
| `/intelligence/[slug]` | Report article; download via modal (`?download=1` auto-opens modal) |
| `/weekly-reports` | Redirects to `/intelligence#sample-download` (legacy URL) |
| `/download/sample` | Legacy: token → verify; else → `/intelligence#sample-download` |
| `/download/verify` | Email verification → signed file download |
| `/about` | Trust |
| `/faqs` | Frequently asked questions |
| `/contact` | Contact form |
| `/admin` | Private CMS (single administrator; login required in production) |
| `/admin-preview` | Public UI mock of Overview / Reports / Intelligence. Sample data only, no login. Not linked from the navbar. |

# Customer journey

Home → Research library → Report detail (`/intelligence/[slug]`) → Download (email modal) → Verification email → File download → Contact / sales follow-up.

Sample Excel: **`/about`** (`#weekly-reports`) and **`/intelligence`** (`#sample-download`).

# Domain terms

| Term | Definition |
| ---- | ---------- |
| Public report library | `/research` — visitors browse published reports. The home scroller shows a subset of the same list. |
| Intelligence | Paid product pitch at `/intelligence`. Report articles still use `/intelligence/[slug]`. |
| Draft | Report is not on the public site. It stays in the admin working list and can be published. |
| Published | Report is live on `/research` and the home scroller. |
| Archived | Report is not on the public site. The database row and uploaded file are kept. It is not treated as an active draft. Restore to draft, then publish, to put it back on the site. |
| Unpublish | Admin action: published → draft. |
| Archive | Admin action: set status to archived. |
| Restore | Admin action: archived → draft. |
| Reporting period | The existing `published_at` date. Public cards show month + year. Admin can show the same date as period and as date published. |
| Report viewed | Public article page `/intelligence/[slug]` loaded. |
| Report clicked | Visitor clicked **View report** on a library or home card. |
| Download started | Visitor submitted the email gate for that report. Reuses the existing download-lead flow as the trigger; does not store email on the event. |

Permanent delete is not the normal admin workflow. The current Delete control should be removed from the everyday UI.

# Admin

One Supabase Auth user, matched to `ADMIN_EMAIL` on the server. `/admin` is not linked from the public navbar or footer.

`/admin-preview` (and `/admin-preview/reports`, `/admin-preview/intelligence`) is a no-login mock of the admin screens for sharing with a client. It uses sample data, does not write to Supabase, and is marked `noindex`. Production `/admin` still requires login.

Admin can:

- create / edit intelligence reports (with file uploads to Supabase Storage)
- save as draft, publish, unpublish (back to draft), and archive
- publishing a report makes it appear on `/research` and the home research scroller without a code change or redeploy
- archiving or unpublishing removes it from the public site but keeps the record and file
- see lightweight last-7-day report metrics (views, clicks, downloads)
- upload the weekly sample Excel file
- edit market snapshot statistics (stored in Postgres; **not shown on the public homepage** today)

The report editor keeps the fields the public article page already needs (slug, category, summary, introduction, key findings, reading time, optional hero image). Do not strip those down to a title-and-file form.

No customer accounts, public sign-up, role-management UI, or password reset UI (unless added later).

# Design direction

Black and white, minimal, large typography, whitespace, card layouts, mobile responsive, fast loading. Reference feel: Linear, Vercel, Stripe docs — professionalism through simplicity.

# Stack (summary)

Next.js (App Router), TypeScript, Tailwind, Supabase (Postgres, Storage, Auth), Cloudflare Workers via OpenNext. Transactional email: **Resend** using **`RESEND_API_KEY`** (secret) and **`EMAIL_FROM`** (sender address on Cloudflare).

See [STACK.md](STACK.md) and [MIGRATION-DECISIONS.md](MIGRATION-DECISIONS.md) for deployment and env details.

# Rules

- Keep copy short; one clear purpose per page.
- Prefer small, deployable changes.
- Do not overbuild CRM, payments, or customer dashboards on this site.
