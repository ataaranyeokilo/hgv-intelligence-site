# STACK.md

# Stack

**Frontend**

- Next.js (App Router)
- TypeScript
- Tailwind CSS

**Backend / data**

- Supabase PostgreSQL (reports, leads, contact messages, market stats for admin; `quote_enquiries` table exists but no public quote form)
- Supabase Storage (intelligence PDFs, hero images, weekly sample Excel)
- Supabase Auth (single admin only)

**Deployment**

- Cloudflare Workers via `@opennextjs/cloudflare` and Wrangler

**Email**

- Resend (download verification links, contact form notifications)

# Environment configuration

Where each variable belongs for local dev, Worker preview, and Cloudflare production. **Never commit secrets** in [wrangler.jsonc](wrangler.jsonc) or example files—use placeholders locally and **Encrypted** secrets in the dashboard.

| Variable | Used for | `.env.local` (`npm run dev`) | `.dev.vars` (`npm run preview`) | Cloudflare (plain) | Cloudflare (secret) | [wrangler.jsonc](wrangler.jsonc) `vars` |
| -------- | -------- | ---------------------------- | ------------------------------- | ------------------ | --------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL` | Client + server Supabase | Yes | Yes | Yes | — | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + server Supabase | Yes | Yes | Yes | — | No |
| `NEXT_PUBLIC_SITE_URL` | Verification links, canonical URL | Yes (e.g. `http://localhost:3000`) | Yes (e.g. `http://localhost:8787`) | Yes (production URL) | — | Yes (production URL; keep in sync with dashboard) |
| `SUPABASE_SERVICE_ROLE_KEY` | Signed downloads, admin server ops | Yes | Yes | — | Yes | No |
| `RESEND_API_KEY` | Email | Yes | Yes | — | Yes | No |
| `EMAIL_FROM` | Email | Yes | Yes | Yes | — | No |
| `NOTIFY_EMAIL` | Contact-form staff notifications | Optional | Optional | Optional (recommended) | — | No |
| `ADMIN_EMAIL` | `/admin` gate | Yes | Yes | Yes | — | No |
| `NEXTJS_ENV` | Wrangler preview | No | Yes (`development`) | No | No | No |

### Local Next.js

Copy [.env.local.example](.env.local.example) to `.env.local` (gitignored). Used by `npm run dev` and local `npm run build`.

### Local Worker preview

Copy [.dev.vars.example](.dev.vars.example) to `.dev.vars` (gitignored). Wrangler injects these at runtime for `npm run preview`. Mirror production **variable names**; use local values for `NEXT_PUBLIC_SITE_URL`.

### Cloudflare production (runtime)

**Workers & Pages → hgv-intelligence-site → Settings → Variables and secrets** (Production environment).

- **Plain text:** `NEXT_PUBLIC_*`, `EMAIL_FROM`, `NOTIFY_EMAIL` (optional), `ADMIN_EMAIL`.
- **Encrypted (secrets):** `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`.

Redeploy after changing variables. Missing Supabase vars commonly cause **500** on routes that call `getSupabaseEnv()` (middleware and data pages). With graceful fallbacks, the site may load but intelligence data and auth stay degraded until vars are set.

### Cloudflare build

Next.js inlines `NEXT_PUBLIC_*` at **build** time. Git-connected Workers Builds must expose the same `NEXT_PUBLIC_*` names during **`npm run build:cloudflare`**, not only on the running Worker. If build and runtime use separate env UIs in Cloudflare, set both; then redeploy.

### Wrangler config

[wrangler.jsonc](wrangler.jsonc) holds Worker structure (name, assets, services, compatibility) and **committed non-secret** `vars` only (`NEXT_PUBLIC_SITE_URL` for production). Supabase URLs/keys and email secrets belong in the dashboard or `wrangler secret put`, not in git. When you add a custom domain, update `NEXT_PUBLIC_SITE_URL` in both the dashboard and wrangler `vars`. After changing wrangler bindings or `vars`, run `npm run cf-typegen` to refresh [cloudflare-env.d.ts](cloudflare-env.d.ts).

See [MIGRATION-DECISIONS.md](MIGRATION-DECISIONS.md) for build/deploy commands and checklists.

### Resend (download verification + contact notify)

The app reads **`RESEND_API_KEY`** and **`EMAIL_FROM`** only (via [`lib/email/resend-client.ts`](lib/email/resend-client.ts)). There is no `FROM_EMAIL` alias.

- **Production downloads:** both must be set on the Worker at **runtime**. Missing either causes download submit to fail in production (local dev can still succeed without email when `NODE_ENV` is `development`).
- **Onboarding sender:** `onboarding@resend.dev` (or `Name <onboarding@resend.dev>`) is fine for Resend test rules; replace with a **verified-domain** address in `EMAIL_FROM` on Cloudflare before go-live, then redeploy.
- **Contact form:** messages always save to Supabase; a staff copy is sent only when **`NOTIFY_EMAIL`** is also set (plus Resend vars above).

# Public app behaviour

- Marketing pages are Server Components where practical; forms use Server Actions.
- `/intelligence` — weekly pitch + free report library; sample section uses `#sample-download`. `/weekly-reports` redirects to that anchor (legacy).
- Report downloads use one **email verification modal** on `/intelligence` and on `/intelligence/[slug]`; `/download/intelligence/[slug]` redirects to the article with `?download=1`.
- Published intelligence reports are read with the Supabase **anon** key and RLS (`status = 'published'`).
- Download flow: email → Postgres lead + token → Resend verification link → verify RPC → **signed Storage URL** (service role, server-only).
- Report analytics: anonymous `report_events` rows (`viewed`, `clicked`, `download_started`). No personal data. Admin reads via service role.

# Admin behaviour

- Session via Supabase Auth + `@supabase/ssr` middleware cookie refresh.
- Only the email in `ADMIN_EMAIL` may access `/admin/*`.
- Mutations and Storage uploads use `SUPABASE_SERVICE_ROLE_KEY` on the server after the admin session check.
- Report statuses are `draft`, `published`, and `archived`. Unpublish returns a report to draft. Archive keeps the row and file.

# Local development

- Run the app with `npm run dev` (Turbopack).
- **Do not run `npm run build` while `npm run dev` is running** — both use `.next` and the dev server can 500 / show a blank page (missing manifest files).
- After route or layout changes, or if the browser shows a blank page after a build: stop dev, then `npm run dev:clean` (deletes `.next` and starts dev) or `rm -rf .next && npm run dev`.

# Code style

- Small components, clear naming, minimal dependencies.
- No microservices; no unnecessary abstractions.
- Ship small vertical slices; keep Cloudflare build green (`npm run build:cloudflare`).

# Storage buckets (Supabase dashboard)

- `intelligence-downloads` — report files and hero images (private)
- `weekly-reports` — sample Excel (private)

See [supabase/STORAGE.md](supabase/STORAGE.md).
