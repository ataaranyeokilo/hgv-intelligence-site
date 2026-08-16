import { Section } from "@/components/layout/Section";

export type HowItWorksStep = {
  title: string;
  description: string;
};

export const homeHowItWorksSteps: HowItWorksStep[] = [
  {
    title: "Collect",
    description: "Monitor official UK operator registrations.",
  },
  {
    title: "Clean & Enrich",
    description:
      "Standardise records and enrich them where suitable information exists.",
  },
  {
    title: "Deliver",
    description: "Customers receive a clean weekly Excel report.",
  },
];

export const aboutHowItWorksSteps: HowItWorksStep[] = [
  {
    title: "Collect",
    description:
      "We monitor official operator registrations and approvals.",
  },
  {
    title: "Clean & enrich",
    description:
      "Records are standardised, deduplicated and enriched where suitable information exists.",
  },
  {
    title: "Deliver",
    description:
      "Every Monday customers receive a clean Excel report ready for filtering and outreach.",
  },
];

function StepCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex max-w-xs flex-col items-center text-center lg:max-w-none lg:flex-1 lg:items-start lg:text-left">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white">
        {index + 1}
      </span>
      <p className="mt-4 font-medium text-neutral-900">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        {description}
      </p>
    </div>
  );
}

type HowItWorksProps = {
  steps?: HowItWorksStep[];
  id?: string;
  showHeading?: boolean;
};

export function HowItWorks({
  steps = homeHowItWorksSteps,
  id = "how-it-works",
  showHeading = true,
}: HowItWorksProps) {
  return (
    <Section id={id} compact>
      {showHeading ? (
        <h2 className="text-xl font-semibold text-neutral-900">How it works</h2>
      ) : null}
      <div
        className={`flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-4 ${showHeading ? "mt-6" : "mt-0"}`}
      >
        {steps.map((step, index) => (
          <div key={`${step.title}-${index}`} className="contents">
            {index > 0 ? (
              <>
                <span
                  className="text-xl text-neutral-300 lg:hidden"
                  aria-hidden
                >
                  ↓
                </span>
                <span
                  className="hidden shrink-0 self-center px-1 text-2xl font-light text-neutral-300 lg:inline"
                  aria-hidden
                >
                  →
                </span>
              </>
            ) : null}
            <StepCard
              index={index}
              title={step.title}
              description={step.description}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
