import { NextResponse, type NextRequest } from "next/server";

import { hasSupabaseEnv } from "@/lib/env";
import {
  DOWNLOAD_CONTACT_COOKIE,
  downloadContactCookieOptions,
} from "@/lib/download/verified-cookie";

type AccessRouteContext = {
  params: Promise<{ token: string }>;
};

/** Only site-relative paths, so the link cannot redirect off-site. */
function safeNextPath(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) {
    return "/research";
  }
  return next;
}

/**
 * Personal link from our emails: remembers this device for the contact who
 * owns the token, then continues to `next`. Unknown tokens just continue.
 */
export async function GET(request: NextRequest, { params }: AccessRouteContext) {
  const { token } = await params;
  const next = safeNextPath(request.nextUrl.searchParams.get("next"));
  const response = NextResponse.redirect(new URL(next, request.url));

  if (!token || !hasSupabaseEnv()) {
    return response;
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data: known, error } = await supabase.rpc(
      "is_download_contact_token",
      { p_token: token },
    );

    if (error) {
      console.error("[access] is_download_contact_token:", error.message);
    } else if (known === true) {
      response.cookies.set(
        DOWNLOAD_CONTACT_COOKIE,
        token,
        downloadContactCookieOptions,
      );
    }
  } catch (cause) {
    console.error("[access] uncaught:", cause);
  }

  return response;
}
