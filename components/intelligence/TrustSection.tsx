import { QuoteForm } from "@/components/quotes/QuoteForm";
import {
  IconCheck,
  IconClock,
  IconDatabase,
  IconLock,
} from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";

const trustPoints = [
  {
    title: "Official sources",
    description: "Built from UK operator registration data.",
    Icon: IconDatabase,
  },
  {
    title: "Clean and verified",
    description: "Deduplicated and standardised each week.",
    Icon: IconCheck,
  },
  {
    title: "Updated weekly",
    description: "Fresh files every Monday morning.",
    Icon: IconClock,
  },
  {
    title: "Privacy first",
    description: "Your enquiry data is handled securely.",
    Icon: IconLock,
  },
];

export function TrustSection() {
  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} grid gap-12 py-14 lg:grid-cols-2`}>
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">
            Trusted data. Clear process.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {trustPoints.map(({ title, description, Icon }) => (
              <div key={title} className="flex gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-neutral-800" />
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          id="get-quote"
          className="scroll-mt-20 rounded-sm border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-xl font-semibold text-neutral-900">Get a quote</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Tell us about your team and we&apos;ll respond within one working
            day.
          </p>
          <div className="mt-6">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
