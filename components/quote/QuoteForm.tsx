"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/Button";
import {
  submitQuoteRequest,
  type SubmitQuoteRequestResult,
} from "@/lib/contact/submit-quote-request";

const inputClassName =
  "w-full rounded-sm border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400";

const sectors = [
  "Fuel suppliers",
  "Commercial insurers",
  "Finance & leasing",
  "Fleet service suppliers",
  "Transport recruiters",
  "Other",
];

const regions = [
  "UK-wide",
  "North of England",
  "Midlands",
  "South of England",
  "Scotland",
  "Wales",
  "Northern Ireland",
  "Specific regions — I will note below",
];

const volumes = [
  "Exploring options",
  "Under 50 new operators a week",
  "50–200 new operators a week",
  "200+ new operators a week",
];

type QuoteFormProps = {
  interest?: string;
};

export function QuoteForm({ interest = "" }: QuoteFormProps) {
  const [result, setResult] = useState<SubmitQuoteRequestResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        const next = await submitQuoteRequest({
          fullName: String(formData.get("fullName") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          company: String(formData.get("company") ?? ""),
          role: String(formData.get("role") ?? ""),
          sector: String(formData.get("sector") ?? ""),
          region: String(formData.get("region") ?? ""),
          volume: String(formData.get("volume") ?? ""),
          notes: String(formData.get("notes") ?? ""),
          interest: String(formData.get("interest") ?? ""),
        });
        setResult(next);
        if (next === "success") {
          form.reset();
        }
      } catch (cause) {
        console.error("[QuoteForm] submit failed:", cause);
        setResult("error");
      }
    });
  }

  if (result === "success") {
    return (
      <p className="text-sm leading-relaxed text-neutral-600">
        Quote request sent. We will come back within one business day with
        pricing for your market.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="interest" value={interest} />
      {interest ? (
        <p className="rounded-sm border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-neutral-700">
          Quoting for{" "}
          <span className="font-medium text-neutral-900">{interest}</span>
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor="fullName">
          <input
            id="fullName"
            name="fullName"
            required
            autoComplete="name"
            className={inputClassName}
          />
        </Field>
        <Field label="Work email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClassName}
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" htmlFor="company">
          <input
            id="company"
            name="company"
            required
            autoComplete="organization"
            className={inputClassName}
          />
        </Field>
        <Field label="Role" htmlFor="role">
          <input
            id="role"
            name="role"
            autoComplete="organization-title"
            placeholder="Sales director, underwriter…"
            className={inputClassName}
          />
        </Field>
      </div>
      <Field label="Phone" htmlFor="phone">
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClassName}
        />
      </Field>
      <Field label="Who do you sell to?" htmlFor="sector">
        <select id="sector" name="sector" required className={inputClassName}>
          <option value="">Select a market</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Where do you cover?" htmlFor="region">
        <select id="region" name="region" required className={inputClassName}>
          <option value="">Select coverage</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </Field>
      <Field label="How many new operators do you want to reach?" htmlFor="volume">
        <select id="volume" name="volume" required className={inputClassName}>
          <option value="">Select volume</option>
          {volumes.map((volume) => (
            <option key={volume} value={volume}>
              {volume}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Anything we should know?" htmlFor="notes">
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Regions, fleet size, licence type, or how you plan to use the file."
          className={inputClassName}
        />
      </Field>
      {result === "error" ? (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full !bg-fleetSignal !text-white shadow-soft hover:!bg-blue-700 sm:w-auto"
      >
        {isPending ? "Sending…" : "Request a quote"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm text-neutral-700">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
