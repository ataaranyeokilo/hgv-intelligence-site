# CONTEXT.md

# What we are building

A B2B marketing website for **HGV Intelligence** — a UK HGV operator data business.

The site is **not** a SaaS product. It exists to:

- establish credibility
- publish free intelligence reports
- capture leads
- convert visitors into enquiries for paid weekly Excel lead reports

# Product offer

## Free intelligence reports

Published **research** reports are listed on **`/research`** and featured on the home “Explore our research” scroller. Report articles stay at `/intelligence/[slug]`. **`/intelligence`** is the paid Intelligence product pitch, not the report library.

Live **Intelligence** items (`kind = intelligence`) also appear on **`/research`**, mixed with research cards. They show a gold **Subscribe** pill and link to **`/contact`** (request a quote). They do not open a report article and do not appear on the home scroller.

Weekly vs general split uses the admin **category** field (contains `weekly`) until a dedicated report type exists in the schema. Intelligence items are a separate `kind`, not a weekly category.

Published library cards link to the article page. Spreadsheet reports show a **redacted 25-row snippet** (company name, address, licence and similar identity columns are never stored in that preview). **Download** (header and below the table) opens the **email verification modal**. PDF reports keep the article + key findings layout. Placeholder cards and the weekly sample CTA open the same modal.

Legacy URL `/download/intelligence/[slug]` redirects to `/intelligence/[slug]?download=1` (opens the modal).

## Paid weekly reports

Weekly Excel files with new UK HGV operator leads (company, fleet, licence, enriched contacts). Enquiries via **`/contact`** — no checkout on the site.

# Site structure

| Route | Purpose |
| ----- | ------- |
| `/` | Home — hero, featured research card scroller, intelligence highlights bar |
| `/research` | Public library — live research reports and live Intelligence Subscribe cards |
| `/intelligence` | Paid Intelligence product pitch (not the report library) |
| `/intelligence/[slug]` | Report article or redacted spreadsheet preview; download via modal (`?download=1` auto-opens modal) |
| `/weekly-reports` | Redirects to `/intelligence#sample-download` (legacy URL) |
| `/download/sample` | Legacy: token → verify; else → `/intelligence#sample-download` |
| `/download/verify` | Email verification → signed file download starts automatically |
| `/about` | Trust |
| `/faqs` | Frequently asked questions |
| `/contact` | Contact form |
| `/admin` | Private CMS (single administrator; login required in production) |
| `/admin-preview` | Public UI mock of Overview / Reports / Intelligence. Sample data only, no login. Not linked from the navbar. |

# Customer journey

Home → Research library → Report detail (`/intelligence/[slug]`) → redacted spreadsheet snippet (if uploaded) → Download (email modal) → Verification email → Click link → File download starts → Contact / sales follow-up.

Sample Excel: **`/about`** (`#weekly-reports`) and **`/intelligence`** (`#sample-download`).

# Domain terms

| Term | Definition |
| ---- | ---------- |
| Public report library | `/research` — visitors browse live research reports and live Intelligence Subscribe cards. The home scroller shows research reports only. |
| Intelligence | Paid product pitch at `/intelligence`. Admin Intelligence items (`kind = intelligence`) go live on `/research` as Subscribe cards linking to `/contact`. Report articles still use `/intelligence/[slug]`. |
| Kind | `intelligence_reports.kind`: `research` (default) or `intelligence`. |
| Draft / Not live | Item is not on the public site. It stays in the admin card grid and can be made live. |
| Published / Live | Research is live on `/research` and the home scroller. Intelligence is live on `/research` as a Subscribe card. |
| Go live | Admin action: status → published. Everyday control on each admin card. |
| Take down | Admin action: published → draft. Removes the card from the public site without deleting it. |
| Archived | Item is not on the public site. The database row and uploaded file are kept. Not shown as an everyday admin control. |
| Unpublish | Same as Take down: published → draft. |
| Archive | Admin action: set status to archived. |
| Restore | Admin action: archived → draft. |
| Reporting period | The existing `published_at` date. Public cards show month + year. Admin can show the same date as period and as date published. |
| Report viewed | Public article page `/intelligence/[slug]` loaded. |
| Report clicked | Visitor clicked **View report** on a library or home card. |
| Download started | Visitor submitted the email gate for that report. Reuses the existing download-lead flow as the trigger; does not store email on the event. |
| Spreadsheet preview | Public 25-row teaser stored on `content.spreadsheet_preview`. Built on upload from the first sheet. Identity columns (company, name, address, licence ref, phone, email, contact) are stored as empty placeholders, never as live values. Licence type is kept. Full Excel/CSV stays in Storage until email verification. |

Permanent delete is not the normal admin workflow. The current Delete control should be removed from the everyday UI.

# Admin

One Supabase Auth user, matched to `ADMIN_EMAIL` on the server. `/admin` is not linked from the public navbar or footer.

`/admin-preview` (and `/admin-preview/reports`, `/admin-preview/intelligence`) is a no-login mock of the admin screens for sharing with a client. It uses sample data, does not write to Supabase, and is marked `noindex`. Production `/admin` still requires login.

Admin can:

- create / edit research reports (with file uploads to Supabase Storage; Excel/CSV builds a redacted 25-row public preview)
- create / edit Intelligence cards (title, period, description; file optional)
- save as draft, then **Go live** or **Take down** from each admin card
- publishing or going live on a research report makes it appear on `/research` and the home research scroller without a code change or redeploy
- going live on an Intelligence card makes it appear on `/research` with a gold Subscribe pill linking to `/contact`
- taking down removes it from the public site but keeps the record and file
- see lightweight last-7-day report metrics (views, clicks, downloads)
- upload the weekly sample Excel file
- edit market snapshot statistics (stored in Postgres; **not shown on the public homepage** today)

The report editor keeps the fields the public article page already needs (slug, category, summary, introduction, key findings, reading time, optional hero image). Spreadsheet reports also store a redacted preview on the report content JSON.

To publish the first real Research card: **Admin → Reports → New report** (`/admin/reports/new`). Title **UK HGV Operator Master 2025**, upload `Fleet_Signal_UK_HGV_2025_Master_v3.xlsx` (do not commit that file to git), write a short description, Publish or Go live. Placeholders on `/research` drop once any research report or Intelligence card is live.

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
