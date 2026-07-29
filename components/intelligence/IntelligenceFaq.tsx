"use client";

import { pageContainerClass } from "@/lib/layout";

const faqs = [
  {
    question: "When do I receive the report?",
    answer:
      "Every Monday morning. Each file covers new operator registrations from the previous 7 days.",
  },
  {
    question: "How are the phone numbers sourced?",
    answer:
      "We enrich operator records with publicly available and licensed contact data, verified before delivery.",
  },
  {
    question: "Can I see a sample before subscribing?",
    answer:
      "Yes. Download a redacted sample on this page after a quick email verification step.",
  },
  {
    question: "Can I change or cancel later?",
    answer:
      "Contact us anytime to adjust regions, volume, or pause delivery. There is no self-service subscription portal on this site.",
  },
];

export function IntelligenceFaq() {
  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} max-w-3xl py-14`}>
        <h2 className="text-xl font-semibold text-neutral-900">
          Frequently asked questions
        </h2>
        <div className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-medium text-neutral-900 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span
                    className="text-neutral-400 transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <p
                id={`faq-answer-${index}`}
                className="mt-3 text-sm leading-relaxed text-neutral-600"
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
