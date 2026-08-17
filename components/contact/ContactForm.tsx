"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/Button";
import {
  submitContactMessage,
  type SubmitContactMessageResult,
} from "@/lib/contact/submit-contact-message";

const inputClassName =
  "w-full rounded-sm border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400";

export function ContactForm() {
  const [result, setResult] = useState<SubmitContactMessageResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        const next = await submitContactMessage({
          fullName: String(formData.get("fullName") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
        });
        setResult(next);
        if (next === "success") {
          form.reset();
        }
      } catch (cause) {
        console.error("[ContactForm] submit failed:", cause);
        setResult("error");
      }
    });
  }

  if (result === "success") {
    return (
      <p className="text-sm leading-relaxed text-neutral-600">
        Message sent. We&apos;ll reply within one business day.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="text-sm text-neutral-700">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          required
          className={`${inputClassName} mt-2`}
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm text-neutral-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={`${inputClassName} mt-2`}
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm text-neutral-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${inputClassName} mt-2`}
        />
      </div>
      {result === "error" ? (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      ) : null}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full !bg-fleetSignal !text-white shadow-soft hover:!bg-blue-700 sm:w-auto"
      >
        {isPending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
