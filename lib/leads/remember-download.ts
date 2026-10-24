"use server";

import { hasSupabaseEnv } from "@/lib/env";
import {
  asReportUuid,
  createDownloadHref,
  resolveDownloadTarget,
  type DownloadSource,
  type DownloadTarget,
} from "@/lib/download/resolve-download";
import {
  clearDownloadContactCookie,
  readDownloadVerifiedCookie,
  readRememberedVisitor,
  writeDownloadContactCookie,
  writeDownloadVerifiedCookie,
} from "@/lib/download/verified-cookie";
import { domainAcceptsMail } from "@/lib/leads/email-domain-check";
import {
  checkDownloadEmail,
  NO_MAIL_DOMAIN_MESSAGE,
} from "@/lib/leads/email-validation";
import { verifyDownloadToken } from "@/lib/leads/verify-download-token";

export type RememberedDownloadSource = DownloadSource;

export type StartRememberedDownloadResult =
  | { status: "ready"; url: string }
  | { status: "needs_email" }
  | { status: "error" };

export type DownloadWithEmailResult =
  | { status: "ready"; url: string }
  | { status: "invalid_email"; message: string; suggestion?: string }
  | { status: "error" };

/** Cookie value used locally when Supabase is not configured. */
const DEV_LOCAL_TOKEN = "dev-local";

function isLocalDevWithoutSupabase(): boolean {
  return process.env.NODE_ENV === "development" && !hasSupabaseEnv();
}

function generateAccessToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function hasRememberedDownload(): Promise<boolean> {
  return readDownloadVerifiedCookie();
}

/** Old verification-link flow (links already sent before one-step downloads). */
export async function rememberVerifiedDownload(token: string): Promise<void> {
  const result = await verifyDownloadToken(token);
  if (result.status !== "success") {
    return;
  }
  await writeDownloadVerifiedCookie();
}

/** Download button for a visitor this browser already knows. */
export async function startRememberedDownload(input: {
  source: RememberedDownloadSource;
  reportId?: string;
}): Promise<StartRememberedDownloadResult> {
  try {
    const visitor = await readRememberedVisitor();
    if (!visitor) {
      return { status: "needs_email" };
    }

    if (visitor.kind === "contact" && !isLocalDevWithoutSupabase()) {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data: email, error } = await supabase.rpc(
        "record_remembered_download",
        {
          p_token: visitor.token,
          p_source: leadSource(input.source, input.reportId),
          p_report_id: asReportUuid(input.reportId),
        },
      );

      if (error) {
        console.error("[startRememberedDownload] rpc:", error.message);
        return { status: "error" };
      }
      if (!email) {
        await clearDownloadContactCookie();
        return { status: "needs_email" };
      }
    }

    const prepared = await prepareDownload(input.source, input.reportId);
    return prepared ? { status: "ready", url: prepared.url } : { status: "error" };
  } catch (cause) {
    console.error("[startRememberedDownload] uncaught:", cause);
    return { status: "error" };
  }
}

/** Email form: one step, no verification. Remembers this browser afterwards. */
export async function downloadWithEmail(input: {
  email: string;
  source: RememberedDownloadSource;
  reportId?: string;
}): Promise<DownloadWithEmailResult> {
  try {
    const checked = checkDownloadEmail(String(input.email ?? ""));
    if (!checked.ok) {
      return {
        status: "invalid_email",
        message: checked.message,
        suggestion: checked.suggestion,
      };
    }
    const email = checked.email;

    // A failed lookup (null) does not block; only a domain that cannot receive mail does.
    if ((await domainAcceptsMail(email.slice(email.lastIndexOf("@") + 1))) === false) {
      return { status: "invalid_email", message: NO_MAIL_DOMAIN_MESSAGE };
    }

    if (isLocalDevWithoutSupabase()) {
      console.log(`[dev] Download for ${email} (Supabase not configured, nothing saved)`);
      await writeDownloadContactCookie(DEV_LOCAL_TOKEN);
      const prepared = await prepareDownload(input.source, input.reportId);
      return prepared ? { status: "ready", url: prepared.url } : { status: "error" };
    }

    if (!hasSupabaseEnv()) {
      console.error("[downloadWithEmail] Missing Supabase environment variables");
      return { status: "error" };
    }

    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("record_download", {
      p_email: email,
      p_new_token: generateAccessToken(),
      p_source: leadSource(input.source, input.reportId),
      p_report_id: asReportUuid(input.reportId),
    });

    const row = Array.isArray(data)
      ? (data[0] as { token?: string; is_new?: boolean } | undefined)
      : undefined;

    if (error || !row?.token) {
      console.error("[downloadWithEmail] record_download:", error?.message);
      return { status: "error" };
    }

    await writeDownloadContactCookie(row.token);

    const prepared = await prepareDownload(input.source, input.reportId);
    if (!prepared) {
      return { status: "error" };
    }

    if (row.is_new) {
      const { sendDownloadEmail } = await import(
        "@/lib/email/send-download-email"
      );
      // A failed email never blocks the download; delivery status comes from the Resend webhook.
      await sendDownloadEmail({
        to: email,
        accessToken: row.token,
        reportTitle: prepared.target.title,
        reportSlug: prepared.target.slug,
      });
    }

    return { status: "ready", url: prepared.url };
  } catch (cause) {
    console.error("[downloadWithEmail] uncaught:", cause);
    return { status: "error" };
  }
}

/** Report ids that are not real rows (dev placeholders) are logged as the sample. */
function leadSource(
  source: RememberedDownloadSource,
  reportId: string | undefined,
): RememberedDownloadSource {
  return source === "intelligence_report" && !asReportUuid(reportId)
    ? "weekly_sample"
    : source;
}

/** Resolves the file, creates its download URL and records the report event. */
async function prepareDownload(
  source: RememberedDownloadSource,
  reportId: string | undefined,
): Promise<{ url: string; target: DownloadTarget } | null> {
  const target: DownloadTarget | null = isLocalDevWithoutSupabase()
    ? { storagePath: "", title: null, slug: null }
    : await resolveDownloadTarget(source, reportId);
  if (!target) {
    return null;
  }

  const url = await createDownloadHref(target.storagePath);
  if (!url) {
    return null;
  }

  if (source === "intelligence_report" && reportId) {
    const { recordReportEvent } = await import("@/lib/reports/events");
    await recordReportEvent(reportId, "download_started");
  }

  return { url, target };
}
