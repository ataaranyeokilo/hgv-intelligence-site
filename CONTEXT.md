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

Published reports are listed on **`/intelligence`** (general intelligence grid plus weekly pitch) and detailed at `/intelligence/[slug]`. Weekly vs general split uses the admin **category** field (contains `weekly`) until a dedicated report type exists in the schema.

On **`/intelligence`**, the sample download button, weekly **View report**, and placeholder cards open the **email verification modal**. Published library cards link to the article page; **Download full report** on the article opens the same modal.

Legacy URL `/download/intelligence/[slug]` redirects to `/intelligence/[slug]?download=1` (opens the modal).

## Paid weekly reports

Weekly Excel files with new UK HGV operator leads (company, fleet, licence, enriched contacts). Enquiries via **`/contact`** — no checkout on the site.

# Site structure

| Route | Purpose |
| ----- | ------- |
| `/` | Home — hero, featured research card scroller, intelligence highlights bar |
| `/intelligence` | Report library (explore grid), weekly pitch, sample preview, sample CTA (`#sample-download`) |
| `/intelligence/[slug]` | Report article; download via modal (`?download=1` auto-opens modal) |
| `/weekly-reports` | Redirects to `/intelligence#sample-download` (legacy URL) |
| `/download/sample` | Legacy: token → verify; else → `/intelligence#sample-download` |
| `/download/verify` | Email verification → signed file download |
| `/about` | Trust |
| `/faqs` | Frequently asked questions |
| `/contact` | Contact form |
| `/admin` | Private CMS (single administrator) |

# Customer journey

Home → Intelligence library → Report detail → Download (email modal) → Verification email → File download → Contact / sales follow-up.

Sample Excel: **`/about`** (`#weekly-reports`) and **`/intelligence`** (`#sample-download`).

# Admin

One Supabase Auth user, matched to `ADMIN_EMAIL` on the server.

Admin can:

- create / edit / publish intelligence reports (with file uploads to Supabase Storage)
- upload the weekly sample Excel file
- edit market snapshot statistics (stored in Postgres; **not shown on the public homepage** today)

No customer accounts, public sign-up, or password reset UI (unless added later).

# Design direction

Black and white, minimal, large typography, whitespace, card layouts, mobile responsive, fast loading. Reference feel: Linear, Vercel, Stripe docs — professionalism through simplicity.

# Stack (summary)

Next.js (App Router), TypeScript, Tailwind, Supabase (Postgres, Storage, Auth), Cloudflare Workers via OpenNext. Transactional email: **Resend** using **`RESEND_API_KEY`** (secret) and **`EMAIL_FROM`** (sender address on Cloudflare).

See [STACK.md](STACK.md) and [MIGRATION-DECISIONS.md](MIGRATION-DECISIONS.md) for deployment and env details.

# Rules

- Keep copy short; one clear purpose per page.
- Prefer small, deployable changes.
- Do not overbuild CRM, payments, or customer dashboards on this site.
