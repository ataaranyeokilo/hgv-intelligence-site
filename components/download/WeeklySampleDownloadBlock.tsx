"use client";

import { useEffect, useState, useTransition } from "react";

import { DownloadEmailForm } from "@/components/download/DownloadEmailForm";
import { Button } from "@/components/ui/Button";
import { startBrowserDownload } from "@/lib/download/start-browser-download";
import { WEEKLY_SAMPLE_EMAIL_SUBJECT } from "@/lib/download/constants";
import {
  hasRememberedDownload,
  startRememberedDownload,
} from "@/lib/leads/remember-download";

type WeeklySampleDownloadBlockProps = {
  alreadyVerified?: boolean;
  variant?: "light" | "dark";
  layout?: "stack" | "inline";
  submitLabel?: string;
  className?: string;
  showDisclaimer?: boolean;
};

export function WeeklySampleDownloadBlock({
  alreadyVerified = false,
  variant = "light",
  layout = "stack",
  submitLabel = "Download sample report",
  className = "",
  showDisclaimer = false,
}: WeeklySampleDownloadBlockProps) {
  const [remembered, setRemembered] = useState(alreadyVerified);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (alreadyVerified) return;
    void hasRememberedDownload().then(setRemembered);
  }, [alreadyVerified]);

  const submitClassName =
    variant === "dark"
      ? "shrink-0 border border-white/20 bg-neutral-900 text-white hover:bg-neutral-800"
      : "";

  function handleRememberedDownload() {
    setError(null);
    startTransition(async () => {
      const result = await startRememberedDownload({ source: "weekly_sample" });
      if (result.status === "ready") {
        startBrowserDownload(result.url);
        return;
      }
      setRemembered(false);
      if (result.status === "error") {
        setError("Something went wrong. Please try again.");
      }
    });
  }

  if (remembered) {
    return (
      <div className={className}>
        <Button
          type="button"
          disabled={isPending}
          className={submitClassName}
          onClick={handleRememberedDownload}
        >
          {isPending ? "Downloading…" : submitLabel}
        </Button>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className={className}>
      <DownloadEmailForm
        source="weekly_sample"
        emailSubject={WEEKLY_SAMPLE_EMAIL_SUBJECT}
        submitLabel={submitLabel}
        variant={variant}
        layout={layout}
      />
      {showDisclaimer ? (
        <p
          className={`mt-3 text-xs leading-relaxed ${
            variant === "dark" ? "text-neutral-400" : "text-neutral-500"
          }`}
        >
          We&apos;ll email a verification link before your download starts.
        </p>
      ) : null}
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
