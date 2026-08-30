import { pageContainerClass } from "@/lib/layout";

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
    description: "Customers receive a clean weekly report.",
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
      "Every Monday customers receive a clean report ready for filtering and outreach.",
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
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-medium text-fleetSignal">
        {index + 1}
      </span>
      <p className="mt-4 font-medium text-white">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-blue-100/80">
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
    <section
      id={id}
      className="scroll-mt-20"
      style={{
        backgroundColor: "#010512",
        backgroundImage: [
          "radial-gradient(60% 180% at 100% 0%, rgba(30,111,240,0.7) 0%, rgba(1,72,206,0.4) 32%, rgba(1,35,119,0.14) 55%, transparent 72%)",
          "linear-gradient(90deg, #010512 0%, #010719 45%, #001240 72%, #012377 88%, #0033A1 100%)",
        ].join(", "),
      }}
    >
      <div className={`${pageContainerClass} py-12 sm:py-14`}>
      {showHeading ? (
        <h2 className="text-xl font-semibold text-white">How it works</h2>
      ) : null}
      <div
        className={`flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-4 ${showHeading ? "mt-10" : "mt-0"}`}
      >
        {steps.map((step, index) => (
          <div key={`${step.title}-${index}`} className="contents">
            {index > 0 ? (
              <>
                <span
                  className="text-xl text-white/30 lg:hidden"
                  aria-hidden
                >
                  ↓
                </span>
                <span
                  className="hidden shrink-0 self-center px-1 text-2xl font-light text-white/30 lg:inline"
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
      </div>
    </section>
  );
}
