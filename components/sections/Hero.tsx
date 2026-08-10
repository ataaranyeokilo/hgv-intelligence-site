import { ButtonLink } from "@/components/ui/Button";
import { WeeklySampleDownloadBlock } from "@/components/download/WeeklySampleDownloadBlock";
import {
  IconChart,
  IconDocumentChecklist,
  IconTarget,
  IconUsersNetwork,
} from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";

type IntroIcon = (props: { className?: string }) => React.ReactElement;

const intelligencePoints = [
  {
    Icon: IconDocumentChecklist,
    text: "We monitor and analyse HGV Operator Licence filings to identify the earliest signals of fleet growth, business expansion and new market activity.",
  },
  {
    Icon: IconChart,
    text: "Through our free reports, we publish original statistics, regional analysis and expert commentary, revealing where the transport industry is growing and going.",
  },
  {
    Icon: IconUsersNetwork,
    text: "For businesses in the transport supply chain, we provide enriched intelligence products that help you connect with new and expanding operators at the perfect time.",
  },
  {
    Icon: IconTarget,
    text: "By combining regulatory data, movement indicators and commercial analysis, we turn public information into actionable intelligence.",
  },
];

function IntroIconCircle({ Icon }: { Icon: IntroIcon }) {
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-fleetSignal text-fleetSignal sm:h-[4.5rem] sm:w-[4.5rem] lg:h-20 lg:w-20">
      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="what-we-do"
      className="scroll-mt-20 border-b border-neutral-200 bg-white"
    >
      <div className={`${pageContainerClass} py-16 sm:py-20 lg:py-24`}>
        <div className="max-w-4xl">
          <h1 className="text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Welcome to{" "}
            <span className="font-bold text-fleetSignal">Fleet Signal,</span>
          </h1>
          <p className="mt-3 max-w-2xl text-xl leading-snug text-neutral-900 sm:text-2xl lg:mt-4">
            the leading source of intelligence and insight into the UK&apos;s
            transport industry.
          </p>

          <hr className="mt-8 border-t-2 border-fleetSignal sm:mt-10" />

          <ul className="divide-y divide-neutral-200">
            {intelligencePoints.map(({ Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-5 py-8 sm:gap-6 sm:py-10 lg:gap-8"
              >
                <IntroIconCircle Icon={Icon} />
                <p className="text-base leading-relaxed text-neutral-900 sm:text-lg">
                  {text}
                </p>
              </li>
            ))}
          </ul>

          <hr className="border-t-2 border-fleetSignal" />

          <p className="mt-8 max-w-3xl text-xs font-medium uppercase leading-relaxed tracking-[0.18em] text-neutral-900 sm:mt-10 sm:text-sm">
            Because understanding the market,
            <br className="hidden sm:block" />{" "}
            <span className="text-fleetSignal">
              starts with reading the signals.
            </span>
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/intelligence" className="w-full sm:w-auto">
              Explore Latest Intelligence →
            </ButtonLink>
            <ButtonLink
              href="/intelligence#sample-download"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              See Weekly Reports →
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeSampleCta({
  sectionId = "weekly-reports",
}: {
  sectionId?: string;
}) {
  return (
    <section
      id={sectionId}
      className="scroll-mt-20 bg-neutral-900 text-white"
    >
      <div
        className={`${pageContainerClass} grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-16`}
      >
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            See the data before you subscribe
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
            Download a redacted sample Excel report to review fields, layout,
            and data quality before you request a quote.
          </p>
        </div>
        <div className="w-full max-w-md lg:max-w-none lg:justify-self-end">
          <WeeklySampleDownloadBlock
            variant="dark"
            layout="inline"
            submitLabel="Download sample"
            showDisclaimer
          />
        </div>
      </div>
    </section>
  );
}
