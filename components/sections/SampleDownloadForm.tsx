"use client";

import { FormEvent, useState } from "react";

import {
  submitSampleLead,
  type SubmitSampleLeadResult,
} from "@/lib/leads/submit-sample-lead";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STATUS_MESSAGES: Record<SubmitSampleLeadResult, string> = {
  success: "Check your email for the sample report link.",
  error: "Something went wrong. Please try again later.",
};

function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

export function SampleDownloadForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const result = await submitSampleLead(trimmedEmail);
      setStatusMessage(STATUS_MESSAGES[result]);
    } catch {
      setStatusMessage(STATUS_MESSAGES.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEmailChange(value: string) {
    setEmail(value);
    if (statusMessage) {
      setStatusMessage(null);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-start"
        noValidate
      >
        <div className="w-full sm:max-w-sm">
          <label htmlFor="sample-email" className="sr-only">
            Email address
          </label>
          <input
            id="sample-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            disabled={isSubmitting}
            value={email}
            onChange={(event) => handleEmailChange(event.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "sample-email-error" : undefined}
            placeholder="you@company.co.uk"
            className="w-full rounded-sm border border-neutral-600 bg-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 disabled:opacity-60"
          />
          {error ? (
            <p id="sample-email-error" role="alert" className="mt-2 text-sm text-red-300">
              {error}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex shrink-0 items-center rounded-sm bg-white px-6 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100 disabled:opacity-60"
        >
          Download Sample
        </button>
      </form>
      {statusMessage ? (
        <p role="status" className="mt-4 text-sm text-neutral-300">
          {statusMessage}
        </p>
      ) : null}
    </>
  );
}
