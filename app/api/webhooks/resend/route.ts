import { NextResponse, type NextRequest } from "next/server";

import { createServiceClient, hasServiceRoleKey } from "@/lib/supabase/service";

/** Resend event → download_contacts.email_status. Other events are ignored. */
const STATUS_BY_EVENT: Record<string, "delivered" | "bounced" | "complained"> = {
  "email.delivered": "delivered",
  "email.bounced": "bounced",
  "email.complained": "complained",
};

const MAX_CLOCK_SKEW_SECONDS = 5 * 60;

type ResendEvent = {
  type?: string;
  data?: { to?: string[] | string };
};

function base64ToBytes(value: string): Uint8Array<ArrayBuffer> {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** Resend signs webhooks with Svix: HMAC-SHA256 of `${id}.${timestamp}.${body}`. */
async function hasValidSignature(
  request: NextRequest,
  body: string,
  secret: string,
): Promise<boolean> {
  const id = request.headers.get("svix-id");
  const timestamp = request.headers.get("svix-timestamp");
  const signatures = request.headers.get("svix-signature");
  if (!id || !timestamp || !signatures) {
    return false;
  }

  const sentAt = Number(timestamp);
  if (
    !Number.isFinite(sentAt) ||
    Math.abs(Date.now() / 1000 - sentAt) > MAX_CLOCK_SKEW_SECONDS
  ) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    base64ToBytes(secret.replace(/^whsec_/, "")),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${id}.${timestamp}.${body}`),
  );
  const expected = bytesToBase64(new Uint8Array(signed));

  return signatures.split(" ").some((entry) => {
    const [version, value] = entry.split(",");
    return version === "v1" && Boolean(value) && timingSafeEqual(value, expected);
  });
}

export async function POST(request: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET?.trim();
  if (!secret || !hasServiceRoleKey()) {
    console.error("[resend webhook] Missing RESEND_WEBHOOK_SECRET or service role key");
    return new NextResponse("Not configured", { status: 503 });
  }

  const body = await request.text();
  if (!(await hasValidSignature(request, body, secret))) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  let event: ResendEvent;
  try {
    event = JSON.parse(body) as ResendEvent;
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const status = event.type ? STATUS_BY_EVENT[event.type] : undefined;
  const recipients = Array.isArray(event.data?.to)
    ? event.data.to
    : event.data?.to
      ? [event.data.to]
      : [];

  if (!status || recipients.length === 0) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const emails = recipients.map((email) => email.trim().toLowerCase());
  const supabase = createServiceClient();
  let query = supabase
    .from("download_contacts")
    .update({ email_status: status, email_status_at: new Date().toISOString() })
    .in("email", emails);

  // A spam complaint sticks; a later delivery does not undo it.
  if (status === "delivered") {
    query = query.neq("email_status", "complained");
  }

  const { error } = await query;
  if (error) {
    console.error("[resend webhook] update:", error.message);
    return new NextResponse("Update failed", { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
