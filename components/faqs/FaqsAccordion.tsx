import { IconChevron } from "@/components/ui/icons";
import { faqItems } from "@/lib/faqs";
import { pageContainerClass } from "@/lib/layout";

export function FaqsAccordion() {
  return (
    <section className="border-b border-neutral-200">
      <div className={pageContainerClass}>
        {faqItems.map(({ question, answer }) => (
          <details
            key={question}
            className="group border-b border-neutral-200 last:border-b-0"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 py-5 text-left text-base font-medium text-neutral-900 marker:content-none [&::-webkit-details-marker]:hidden">
              <IconChevron className="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 group-open:rotate-180" />
              {question}
            </summary>
            <p className="pb-5 pl-7 text-sm leading-relaxed text-neutral-600 sm:text-base">
              {answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
