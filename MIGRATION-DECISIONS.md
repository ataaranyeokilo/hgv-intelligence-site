# Migration decisions (MVP)

Decisions for the Vercel → Cloudflare move. Revisit when shipping email, file delivery, or admin upload.

## Hosting

- **Target:** Cloudflare Workers with `@opennextjs/cloudflare` and Wrangler (not Cloudflare Pages-only static hosting).
- **First deploy:** Run `npm run deploy` after `wrangler login` (or CI secrets). Set `NEXT_PUBLIC_*` vars in the Cloudflare dashboard or `wrangler.jsonc` `vars`.

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

1. `npm run build` — Next.js production build.
2. `npx opennextjs-cloudflare build` — Worker bundle.
3. Copy Supabase values into `.dev.vars` (see `.dev.vars.example`) then `npm run preview` — smoke `/` and `/download/sample`.
4. `npm run verify:baseline` — Supabase RPC path (requires applied migrations + valid `.env.local`).

## Rollback

Keep Vercel project available until Cloudflare production is validated; redeploy previous git tag on either platform.
