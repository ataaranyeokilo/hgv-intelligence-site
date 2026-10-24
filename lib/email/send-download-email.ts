import { sendResendEmail } from "@/lib/email/resend-client";

export type SendDownloadEmailInput = {
  to: string;
  accessToken: string;
  /** Report title, or null for the weekly sample. */
  reportTitle: string | null;
  /** Report slug, or null for the weekly sample. */
  reportSlug: string | null;
};

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

/**
 * Personal link: opening it on any device remembers that device for this
 * contact, then continues to `next` (a site-relative path).
 */
export function buildAccessUrl(token: string, next: string): string {
  return `${siteUrl()}/access/${encodeURIComponent(token)}?next=${encodeURIComponent(next)}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function downloadEmailSubject(reportTitle: string | null): string {
  return reportTitle
    ? `Your report — ${reportTitle}`
    : "Your HGV Intelligence sample report";
}

/** Sent once, the first time an email is used to download. */
export async function sendDownloadEmail({
  to,
  accessToken,
  reportTitle,
  reportSlug,
}: SendDownloadEmailInput): Promise<boolean> {
  const againPath = reportSlug
    ? `/download/intelligence/${encodeURIComponent(reportSlug)}`
    : "/intelligence#sample-download";
  const againUrl = buildAccessUrl(accessToken, againPath);
  const browseUrl = buildAccessUrl(accessToken, "/research");
  const what = reportTitle ? `“${escapeHtml(reportTitle)}”` : "the sample report";

  logDevAccessLink(againUrl);

  return sendResendEmail({
    to,
    subject: downloadEmailSubject(reportTitle),
    html: [
      `<p>Thanks for downloading ${what} from HGV Intelligence. Your download started on the site.</p>`,
      `<p><a href="${againUrl}">Download it again</a></p>`,
      `<p>Open any of our links from this email on another device and your downloads will start straight away there too.</p>`,
      `<p><a href="${browseUrl}">Browse all reports</a></p>`,
    ].join(""),
  });
}

function logDevAccessLink(url: string): void {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  console.log(`[dev] Personal download link: ${url}`);
}
