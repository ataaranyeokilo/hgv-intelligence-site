"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/Button";
import {
  submitQuoteEnquiry,
  type SubmitQuoteEnquiryResult,
} from "@/lib/quotes/submit-quote-enquiry";

const inputClassName =
  "w-full rounded-sm border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400";

export function QuoteForm() {
  const [result, setResult] = useState<SubmitQuoteEnquiryResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const next = await submitQuoteEnquiry({
        fullName: String(formData.get("fullName") ?? ""),
        workEmail: String(formData.get("workEmail") ?? ""),
        company: String(formData.get("company") ?? ""),
        industry: String(formData.get("industry") ?? ""),
        regionsOfInterest: String(formData.get("regionsOfInterest") ?? ""),
        reportsRequired: String(formData.get("reportsRequired") ?? ""),
        additionalInformation: String(formData.get("additionalInformation") ?? ""),
      });
      setResult(next);
      if (next === "success") {
        event.currentTarget.reset();
      }
    });
  }

  if (result === "success") {
    return (
      <p className="text-sm leading-relaxed text-neutral-600">
        Thanks — we&apos;ll be in touch with a quote shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field label="Full name" name="fullName" required />
      <Field label="Work email" name="workEmail" type="email" required />
      <Field label="Company" name="company" required />
      <Field label="Industry" name="industry" required />
      <Field
        label="Regions of interest"
        name="regionsOfInterest"
        required
        className="sm:col-span-2"
      />
      <Field
        label="Number of reports required"
        name="reportsRequired"
        required
        className="sm:col-span-2"
      />
      <div className="sm:col-span-2">
        <label htmlFor="additionalInformation" className="text-sm text-neutral-700">
          Additional information
        </label>
        <textarea
          id="additionalInformation"
          name="additionalInformation"
          rows={4}
          className={`${inputClassName} mt-2`}
        />
      </div>
      {result === "error" ? (
        <p className="text-sm text-red-600 sm:col-span-2">
          Something went wrong. Please try again.
        </p>
      ) : null}
      <div className="sm:col-span-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending…" : "Get Quote"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm text-neutral-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={`${inputClassName} mt-2`}
      />
    </div>
  );
}
