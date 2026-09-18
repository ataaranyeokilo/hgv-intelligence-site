"use client";

import { useEffect } from "react";

import { rememberVerifiedDownload } from "@/lib/leads/remember-download";

export function RememberDownloadCookie({ token }: { token: string }) {
  useEffect(() => {
    if (!token) return;
    void rememberVerifiedDownload(token);
  }, [token]);

  return null;
}
