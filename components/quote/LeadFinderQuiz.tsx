"use client";

import { useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { pageContainerClass } from "@/lib/layout";
import {
  quoteRegions,
  quoteSectors,
  quoteVolumes,
  type QuoteOption,
} from "@/lib/quote/options";

const steps = [
  { key: "sector", question: "What do you offer HGV operators?", options: quoteSectors },
  { key: "region", question: "Where do you cover?", options: quoteRegions },
  {
    key: "volume",
    question: "How many new operators would you like to reach?",
    options: quoteVolumes,
  },
] as const;

type Answers = Partial<Record<(typeof steps)[number]["key"], QuoteOption>>;

/** Three quick questions; the answers prefill the quote form. */
export function LeadFinderQuiz({
  sectionId = "find-your-leads",
}: {
  sectionId?: string;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const done = stepIndex >= steps.length;
  const step = steps[Math.min(stepIndex, steps.length - 1)];

  function choose(option: QuoteOption) {
    setAnswers((current) => ({ ...current, [step.key]: option }));
    setStepIndex((current) => current + 1);
  }

  const quoteHref = `/quote?${new URLSearchParams(
    Object.fromEntries(
      Object.entries(answers).map(([key, option]) => [key, option.value]),
    ),
  ).toString()}`;

  return (
    <section
      id={sectionId}
      className="scroll-mt-20 text-white"
      style={{
        backgroundColor: "#010512",
        backgroundImage: [
          "radial-gradient(60% 180% at 100% 0%, rgba(30,111,240,0.7) 0%, rgba(1,72,206,0.4) 32%, rgba(1,35,119,0.14) 55%, transparent 72%)",
          "linear-gradient(90deg, #010512 0%, #010719 45%, #001240 72%, #012377 88%, #0033A1 100%)",
        ].join(", "),
      }}
    >
      <div
        className={`${pageContainerClass} grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-16`}
      >
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Find the right leads for your business
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
            Answer three quick questions and we&apos;ll put together a quote
            for the new operators that matter to you.
          </p>
        </div>

        <div className="w-full rounded-sm bg-white p-6 text-neutral-900 shadow-soft sm:p-8">
          <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
            <span>
              {done ? "All done" : `Question ${stepIndex + 1} of ${steps.length}`}
            </span>
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={() => setStepIndex((current) => current - 1)}
                className="hover:text-neutral-900"
              >
                ← Back
              </button>
            ) : null}
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-neutral-100" aria-hidden>
            <div
              className="h-full bg-fleetSignal transition-all duration-300"
              style={{ width: `${(Math.min(stepIndex, steps.length) / steps.length) * 100}%` }}
            />
          </div>

          {done ? (
            <div className="mt-6" aria-live="polite">
              <p className="text-lg font-semibold">Here&apos;s what you&apos;re after</p>
              <dl className="mt-4 divide-y divide-neutral-100 text-sm">
                {steps.map(({ key, question }) => (
                  <div key={key} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-neutral-500">{question}</dt>
                    <dd className="shrink-0 text-right font-medium">
                      {answers[key]?.label}
                    </dd>
                  </div>
                ))}
              </dl>
              <ButtonLink
                href={quoteHref}
                className="mt-6 w-full !bg-fleetSignal !text-white shadow-soft hover:!bg-blue-700"
              >
                Get my quote
              </ButtonLink>
              <p className="mt-3 text-center text-xs text-neutral-500">
                No commitment. We reply within one business day.
              </p>
            </div>
          ) : (
            <fieldset className="mt-6" key={step.key}>
              <legend className="text-lg font-semibold">{step.question}</legend>
              <div className="mt-4 space-y-2">
                {step.options.map((option) => {
                  const selected = answers[step.key]?.value === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => choose(option)}
                      aria-pressed={selected}
                      className={`flex w-full items-center gap-3 rounded-sm border px-4 py-3 text-left text-sm transition-colors ${
                        selected
                          ? "border-fleetSignal bg-blue-50"
                          : "border-neutral-200 hover:border-fleetSignal hover:bg-blue-50/60"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          selected ? "border-fleetSignal" : "border-neutral-300"
                        }`}
                        aria-hidden
                      >
                        {selected ? (
                          <span className="h-2 w-2 rounded-full bg-fleetSignal" />
                        ) : null}
                      </span>
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}
        </div>
      </div>
    </section>
  );
}
