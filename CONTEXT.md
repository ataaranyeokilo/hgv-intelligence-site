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

Published reports are listed on **`/intelligence`** (general intelligence grid plus weekly pitch) and detailed at `/intelligence/[slug]`. Weekly vs general split uses the admin **category** field (contains `weekly`) until a dedicated report type exists in the schema. On `/intelligence`, preview cards, the sample download button, and latest weekly **View report** open an email verification modal; published library cards still link to the article page.

## Paid weekly reports

Weekly Excel files with new UK HGV operator leads (company, fleet, licence, enriched contacts). Enquiries via **`/contact`** — no checkout on the site.

# Site structure

| Route | Purpose |
| ----- | ------- |
| `/` | Home — hero (Browse Intelligence; **See Weekly Reports** → `/intelligence#weekly-reports`), featured carousel, weekly highlights, sample download CTA (`#weekly-reports`) |
| `/intelligence` | **Report library:** opens on explore grid (no hero), weekly pitch (intro + latest card), sample preview, download CTA (`#sample-download`) |
| `/intelligence/[slug]` | Individual report article |
| `/weekly-reports` | Redirects to `/intelligence#sample-download` (legacy URL) |
| `/about` | Trust |
| `/contact` | Contact form |
| `/admin` | Private CMS (single administrator) |

Download verification: `/download/verify?token=…` (and `/download/intelligence/[slug]` for per-report email capture).

# Customer journey

Home → Intelligence library → Report detail → Download (email) → Verification → File download → Contact / sales follow-up.

Sample Excel download is on the **home page** (`#weekly-reports`) and on **`/intelligence`** (`#sample-download`).

# Admin

One Supabase Auth user, matched to `ADMIN_EMAIL` on the server.

Admin can:

- create / edit / publish intelligence reports (with file uploads to Supabase Storage)
- upload the weekly sample Excel file
- edit homepage market snapshot statistics

No customer accounts, public sign-up, or password reset UI (unless added later).

# Design direction

Black and white, minimal, large typography, whitespace, card layouts, mobile responsive, fast loading. Reference feel: Linear, Vercel, Stripe docs — professionalism through simplicity.

# Stack (summary)

Next.js (App Router), TypeScript, Tailwind, Supabase (Postgres, Storage, Auth), Cloudflare Workers via OpenNext, Resend for transactional email.

See [STACK.md](STACK.md) and [MIGRATION-DECISIONS.md](MIGRATION-DECISIONS.md) for deployment and env details.

# Rules

- Keep copy short; one clear purpose per page.
- Prefer small, deployable changes.
- Do not overbuild CRM, payments, or customer dashboards on this site.
