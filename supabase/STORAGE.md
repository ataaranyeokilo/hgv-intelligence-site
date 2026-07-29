# Supabase Storage (manual setup)

Create these **private** buckets in the Supabase dashboard before using verified downloads or admin uploads:

| Bucket | Purpose |
| ------ | ------- |
| `intelligence-downloads` | PDF/files linked from `intelligence_reports.download_storage_path` (e.g. `intelligence-downloads/report.pdf`) |
| `weekly-reports` | Sample Excel for weekly report downloads (path stored in `weekly_report_files`) |

Signed download URLs require `SUPABASE_SERVICE_ROLE_KEY` on the Worker / `.env.local`.

Apply SQL migrations in order (`001`–`009`) via the Supabase SQL editor or CLI. **Required:** run `009_fix_verify_download_token_ambiguous.sql` if email verification links fail or `verify_download_token` errors with ambiguous `storage_path`.

Create a single admin user in **Authentication → Users** (disable public sign-up in Auth settings).

Set `ADMIN_EMAIL` to that user’s email on the Worker / `.env.local`. Only that address can access `/admin` after sign-in.
