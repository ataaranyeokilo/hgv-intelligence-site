"use client";

import { FormEvent, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

export function SampleDownload() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    setStatusMessage("Form UI ready. Database connection comes next.");
  }

  function handleEmailChange(value: string) {
    setEmail(value);
    if (statusMessage) {
      setStatusMessage(null);
    }
  }

  return (
    <section id="sample" className="border-b border-neutral-200 bg-neutral-900 text-white">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          See the data before you subscribe
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300">
          Download a redacted sample report with real column structure and
          anonymised records. You&apos;ll see exactly how the weekly Excel file
          is laid out — field names, formatting, and the level of detail your
          sales team can expect every Monday.
        </p>
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
              value={email}
              onChange={(event) => handleEmailChange(event.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "sample-email-error" : undefined}
              placeholder="you@company.co.uk"
              className="w-full rounded-sm border border-neutral-600 bg-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
            {error ? (
              <p id="sample-email-error" role="alert" className="mt-2 text-sm text-red-300">
                {error}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="inline-flex shrink-0 items-center rounded-sm bg-white px-6 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
          >
            Download Sample
          </button>
        </form>
        {statusMessage ? (
          <p role="status" className="mt-4 text-sm text-neutral-300">
            {statusMessage}
          </p>
        ) : null}
        <p className="mt-6 text-sm text-neutral-400">
          We&apos;ll use your email to send the sample and may follow up about
          weekly reports. You can unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
