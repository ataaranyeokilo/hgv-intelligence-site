# Migration decisions (MVP)

Decisions for the Vercel → Cloudflare move. Revisit when shipping email, file delivery, or admin upload.

## Hosting

- **Target:** Cloudflare Workers with `@opennextjs/cloudflare` and Wrangler (not Cloudflare Pages-only static hosting).
- **Local one-shot deploy:** `npm run deploy` (runs `build:cloudflare` then `deploy:cloudflare`).
- **Git-connected Workers Builds:** use the split commands below—not `npm run build` + `npx wrangler deploy`.

### Cloudflare Workers Builds (Git CI)

| Field | Command |
| ----- | ------- |
| Install command | `npm ci` (or platform default install) |
| **Build command** | `npm run build:cloudflare` |
| **Deploy command** | `npm run deploy:cloudflare` |

**Avoid:** `npm run build` as the only build step, and **`npx wrangler deploy`** alone (OpenNext must run first; deploy goes through `opennextjs-cloudflare deploy`).

The `.open-next/` output is gitignored; CI generates it on every build.

### Worker environment variables

Full variable matrix: [STACK.md](STACK.md) → **Environment configuration**.

**Build-time (Workers Builds / `npm run build:cloudflare`)**

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

These must be available when OpenNext runs the Next production build so client bundles and SSR see correct values.

**Runtime (Worker → Variables and secrets, Production)**

- Plain: same `NEXT_PUBLIC_*` as build, plus `EMAIL_FROM`, optional `NOTIFY_EMAIL`, `ADMIN_EMAIL`
- Encrypted secrets: `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`
- **Resend:** `RESEND_API_KEY` + `EMAIL_FROM` required for production download emails; see [STACK.md](STACK.md) → **Resend** (onboarding sender vs verified domain).

**Rules**

- Do not put secrets in [wrangler.jsonc](wrangler.jsonc). Use Cloudflare **Encrypted** variables or `wrangler secret put` for CLI deploys.
- `NEXT_PUBLIC_SITE_URL` in wrangler `vars` is the committed production canonical URL; keep it aligned with the dashboard when the domain changes.
- After changing build/deploy commands or any variable, retry deployment from the dashboard.

## Data and storage

| Topic | Decision | Rationale |
| ----- | -------- | ----------- |
| Leads database | **Keep Supabase Postgres** for MVP | Already implemented (RPCs + migrations); not Vercel-specific. |
| D1 | **Defer** | Migration cost with no current code benefit. |
| Report files | **Supabase Storage first** when upload/download is built | Already documented in STACK.md; R2 optional later if everything moves to Cloudflare. |
| R2 | **Defer** until file pipeline exists | No file code in repo yet. |

## Product integrations

| Topic | Decision | Rationale |
| ----- | -------- | ----------- |
| Resend / email | **Add before public launch** (not blocking CF deploy) | Verification links for downloads; enquiry notifications. |
| Turnstile | **Post-MVP** unless abuse appears | No CAPTCHA in repo. |
| Auth / admin | **In scope (Phase 2)** | Single Supabase Auth admin; protected `/admin` routes. |

## Verification checklist

1. `npm run build` — Next.js production build (local / Node host).
2. `npm run build:cloudflare` — OpenNext Worker bundle (must end with `Worker saved in .open-next/worker.js`).
3. Copy values into `.dev.vars` (see [.dev.vars.example](.dev.vars.example)) using the same **names** as production; set local `NEXT_PUBLIC_SITE_URL` (e.g. `http://localhost:8787`). Then `npm run preview` — smoke `/` and `/download/sample`.
4. `npm run verify:baseline` — Supabase RPC path (requires applied migrations + valid `.env.local`).

## Rollback

Keep Vercel project available until Cloudflare production is validated; redeploy previous git tag on either platform.
