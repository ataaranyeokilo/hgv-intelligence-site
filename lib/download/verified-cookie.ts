import { cookies } from "next/headers";

/** Set by the old verification-link flow; still honoured for those visitors. */
export const DOWNLOAD_VERIFIED_COOKIE = "hgv_download_verified";
/** Holds the visitor's download_contacts access token. */
export const DOWNLOAD_CONTACT_COOKIE = "hgv_download_contact";
export const DOWNLOAD_VERIFIED_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export const downloadContactCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: DOWNLOAD_VERIFIED_MAX_AGE_SECONDS,
};

export type RememberedVisitor =
  | { kind: "contact"; token: string }
  | { kind: "legacy" }
  | null;

export async function readRememberedVisitor(): Promise<RememberedVisitor> {
  try {
    const store = await cookies();
    const token = store.get(DOWNLOAD_CONTACT_COOKIE)?.value;
    if (token) {
      return { kind: "contact", token };
    }
    if (store.get(DOWNLOAD_VERIFIED_COOKIE)?.value === "1") {
      return { kind: "legacy" };
    }
    return null;
  } catch {
    return null;
  }
}

export async function readDownloadVerifiedCookie(): Promise<boolean> {
  return (await readRememberedVisitor()) !== null;
}

export async function writeDownloadVerifiedCookie(): Promise<void> {
  const store = await cookies();
  store.set(DOWNLOAD_VERIFIED_COOKIE, "1", downloadContactCookieOptions);
}

export async function writeDownloadContactCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(DOWNLOAD_CONTACT_COOKIE, token, downloadContactCookieOptions);
}

export async function clearDownloadContactCookie(): Promise<void> {
  const store = await cookies();
  store.delete(DOWNLOAD_CONTACT_COOKIE);
}
