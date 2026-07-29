# STACK.md

# Stack

**Frontend**

- Next.js (App Router)
- TypeScript
- Tailwind CSS

**Backend / data**

- Supabase PostgreSQL (reports, leads, enquiries, market stats)
- Supabase Storage (intelligence PDFs, hero images, weekly sample Excel)
- Supabase Auth (single admin only)

**Deployment**

- Cloudflare Workers via `@opennextjs/cloudflare` and Wrangler

**Cloudflare production environment**

Configure **Workers & Pages → hgv-intelligence-site → Settings → Variables and secrets** (Production). Missing Supabase vars commonly cause **500** on every route because middleware and pages expect them.

Minimum: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL` (your Workers URL), `SUPABASE_SERVICE_ROLE_KEY` (secret), `ADMIN_EMAIL`, `RESEND_API_KEY` (secret), `EMAIL_FROM`. Redeploy after saving. Match names in `.dev.vars.example`.

**Email**

- Resend (verification links, quote/contact notifications)

# Public app behaviour

- Marketing pages are Server Components where practical; forms use Server Actions.
- `/intelligence` — combined weekly sales + free report library; `/weekly-reports` redirects to `#sample-download` on the same page.
- Published intelligence reports are read with the Supabase **anon** key and RLS.
- Download flow: email → Postgres lead + token → Resend verification link → verify RPC → **signed Storage URL** (service role, server-only).

# Admin behaviour

- Session via Supabase Auth + `@supabase/ssr` middleware cookie refresh.
- Only the email in `ADMIN_EMAIL` may access `/admin/*`.
- Mutations and Storage uploads use `SUPABASE_SERVICE_ROLE_KEY` on the server after the admin session check.

# Environment variables (essential)

| Variable | Scope |
| -------- | ----- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public |
| `NEXT_PUBLIC_SITE_URL` | Public (verification links) |
| `ADMIN_EMAIL` | Server — sole administrator |
| `SUPABASE_SERVICE_ROLE_KEY` | Server secret |
| `RESEND_API_KEY` | Server secret |
| `EMAIL_FROM` | Server |
| `NOTIFY_EMAIL` | Server (optional) |

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
