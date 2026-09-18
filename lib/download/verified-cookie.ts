import { cookies } from "next/headers";

export const DOWNLOAD_VERIFIED_COOKIE = "hgv_download_verified";
export const DOWNLOAD_VERIFIED_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export async function readDownloadVerifiedCookie(): Promise<boolean> {
  try {
    const store = await cookies();
    return store.get(DOWNLOAD_VERIFIED_COOKIE)?.value === "1";
  } catch {
    return false;
  }
}

export async function writeDownloadVerifiedCookie(): Promise<void> {
  const store = await cookies();
  store.set(DOWNLOAD_VERIFIED_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DOWNLOAD_VERIFIED_MAX_AGE_SECONDS,
  });
}
