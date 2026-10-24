"use client";

import { useId, useState, useTransition } from "react";

import { Button } from "@/components/ui/Button";
import { startBrowserDownload } from "@/lib/download/start-browser-download";
import {
  checkDownloadEmail,
  EMAIL_MAX_LENGTH,
} from "@/lib/leads/email-validation";
import {
  downloadWithEmail,
  type DownloadWithEmailResult,
} from "@/lib/leads/remember-download";

type DownloadEmailFormProps = {
  source: "weekly_sample" | "intelligence_report" | "sample_download";
  reportId?: string;
  submitLabel?: string;
  successMessage?: string;
  variant?: "light" | "dark";
  layout?: "stack" | "inline";
  onDownloadStarted?: () => void;
};

const inputVariantClasses = {
  light:
    "w-full rounded-sm border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400",
  dark: "w-full min-w-0 flex-1 rounded-sm border border-neutral-600 bg-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-400",
};

const REAL_EMAIL_NOTE = "Please enter a valid email address.";

export function DownloadEmailForm({
  source,
  reportId,
  submitLabel = "Download",
  successMessage = "Your download has started.",
  variant = "light",
  layout = "stack",
  onDownloadStarted,
}: DownloadEmailFormProps) {
  const emailInputId = useId();
  const noteId = useId();
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<DownloadWithEmailResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    // Instant feedback; the server runs the same checks plus a DNS lookup.
    const checked = checkDownloadEmail(email);
    if (!checked.ok) {
      setResult({
        status: "invalid_email",
        message: checked.message,
        suggestion: checked.suggestion,
      });
      return;
    }

    startTransition(async () => {
      try {
        const next = await downloadWithEmail({ email, source, reportId });
        setResult(next);
        if (next.status === "ready") {
          startBrowserDownload(next.url);
          onDownloadStarted?.();
        }
      } catch (cause) {
        console.error("[DownloadEmailForm] submit failed:", cause);
        setResult({ status: "error" });
      }
    });
  }

  if (result?.status === "ready") {
    return (
      <p
        className={`text-sm leading-relaxed ${
          variant === "dark" ? "text-neutral-300" : "text-neutral-600"
        }`}
      >
        {successMessage}
      </p>
    );
  }

  const submitClassName =
    variant === "dark"
      ? "shrink-0 border border-white/20 bg-neutral-900 text-white hover:bg-neutral-800"
      : "";

  // name="email" + autoComplete="email" lets phones and browsers offer the saved address in one tap.
  const fields = (
    <>
      <label htmlFor={emailInputId} className="sr-only">
        Work email
      </label>
      <input
        id={emailInputId}
        name="email"
        type="email"
        inputMode="email"
        required
        autoComplete="email"
        value={email}
        maxLength={EMAIL_MAX_LENGTH}
        aria-invalid={result?.status === "invalid_email"}
        aria-describedby={noteId}
        onChange={(event) => {
          setEmail(event.target.value);
          if (result?.status === "invalid_email") setResult(null);
        }}
        placeholder="Work email"
        className={inputVariantClasses[variant]}
      />
    </>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={layout === "inline" ? "space-y-3" : "space-y-4"}
    >
      {layout === "inline" ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <div className="min-w-0 flex-1">{fields}</div>
          <Button
            type="submit"
            disabled={isPending}
            className={submitClassName}
          >
            {isPending ? "Downloading…" : submitLabel}
          </Button>
        </div>
      ) : (
        <>
          <div>{fields}</div>
          <Button type="submit" disabled={isPending} className={submitClassName}>
            {isPending ? "Downloading…" : submitLabel}
          </Button>
        </>
      )}
      <p
        id={noteId}
        className={`text-xs leading-relaxed ${
          variant === "dark" ? "text-neutral-400" : "text-neutral-500"
        }`}
      >
        {REAL_EMAIL_NOTE}
      </p>
      {result?.status === "invalid_email" ? (
        <div role="alert" className="text-sm text-red-600">
          <p>{result.message}</p>
          {result.suggestion ? (
            <button
              type="button"
              className="mt-1 font-medium underline underline-offset-2"
              onClick={() => {
                setEmail(result.suggestion ?? "");
                setResult(null);
              }}
            >
              Use {result.suggestion}
            </button>
          ) : null}
        </div>
      ) : null}
      {result?.status === "error" ? (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
