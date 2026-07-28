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

Set in the Cloudflare dashboard (Worker → Settings → Variables):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (production canonical URL)

After changing Build/Deploy commands or variables, retry the deployment from the dashboard.

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
| Resend / email | **Add before public launch** (not blocking CF deploy) | UI promises email; dev-only console link today. |
| Turnstile | **Post-MVP** unless abuse appears | No CAPTCHA in repo. |
| Auth / dashboard | **Out of scope** | Per CONTEXT.md. |

## Verification checklist

1. `npm run build` — Next.js production build (local / Node host).
2. `npm run build:cloudflare` — OpenNext Worker bundle (must end with `Worker saved in .open-next/worker.js`).
3. Copy Supabase values into `.dev.vars` (see `.dev.vars.example`) then `npm run preview` — smoke `/` and `/download/sample`.
4. `npm run verify:baseline` — Supabase RPC path (requires applied migrations + valid `.env.local`).

## Rollback

Keep Vercel project available until Cloudflare production is validated; redeploy previous git tag on either platform.
