"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/Button";
import { IconMail } from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";
import { submitReportNotify } from "@/lib/intelligence/submit-report-notify";

export function ReportNotifyBanner() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    startTransition(async () => {
      const result = await submitReportNotify(email);
      setMessage(
        result === "success"
          ? "Thanks — we'll email you when new reports are published."
          : "Something went wrong. Please try again.",
      );
    });
  }

  return (
    <section className="border-t border-neutral-200 bg-neutral-100">
      <div className={`${pageContainerClass} py-10`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4">
            <span className="mt-1 text-neutral-700">
              <IconMail />
            </span>
            <div>
              <p className="font-semibold text-neutral-900">
                Get new reports by email
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                Be the first to know when new industry reports are published.
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-lg flex-col gap-2 sm:flex-row lg:shrink-0"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.co.uk"
              className="min-w-0 flex-1 rounded-sm border border-neutral-300 bg-white px-4 py-2.5 text-sm"
            />
            <Button type="submit" disabled={isPending} className="shrink-0">
              {isPending ? "Sending…" : "Notify me"}
            </Button>
          </form>
        </div>
        {message ? (
          <p className="mt-4 text-sm text-neutral-600">{message}</p>
        ) : null}
      </div>
    </section>
  );
}
