"use client";

import { useId, useState, useTransition } from "react";

import { Button } from "@/components/ui/Button";
import {
  submitDownloadLead,
  type SubmitDownloadLeadResult,
} from "@/lib/leads/submit-download-lead";

type DownloadEmailFormProps = {
  source: "weekly_sample" | "intelligence_report" | "sample_download";
  reportId?: string;
  emailSubject: string;
  submitLabel?: string;
  successMessage?: string;
  variant?: "light" | "dark";
  layout?: "stack" | "inline";
};

const inputVariantClasses = {
  light:
    "w-full rounded-sm border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400",
  dark: "w-full min-w-0 flex-1 rounded-sm border border-neutral-600 bg-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-400",
};

export function DownloadEmailForm({
  source,
  reportId,
  emailSubject,
  submitLabel = "Continue",
  successMessage = "Check your email for a verification link to download your report.",
  variant = "light",
  layout = "stack",
}: DownloadEmailFormProps) {
  const emailInputId = useId();
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<SubmitDownloadLeadResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    startTransition(async () => {
      try {
        const next = await submitDownloadLead({
          email,
          source,
          reportId,
          emailSubject,
        });
        setResult(next);
      } catch (cause) {
        console.error("[DownloadEmailForm] submit failed:", cause);
        setResult("error");
      }
    });
  }

  if (result === "success") {
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

  const fields = (
    <>
      <label htmlFor={emailInputId} className="sr-only">
        Work email
      </label>
      <input
        id={emailInputId}
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
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
            {isPending ? "Sending…" : submitLabel}
          </Button>
        </div>
      ) : (
        <>
          <div>{fields}</div>
          <Button type="submit" disabled={isPending} className={submitClassName}>
            {isPending ? "Sending…" : submitLabel}
          </Button>
        </>
      )}
      {result === "error" ? (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
