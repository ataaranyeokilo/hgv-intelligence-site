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
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-fleetSignal text-fleetSignal sm:h-14 sm:w-14">
      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="what-we-do"
      className="relative scroll-mt-20 border-b border-neutral-200 bg-cover bg-[70%_center] bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent"
        aria-hidden="true"
      />
      <div
        className={`relative z-10 ${pageContainerClass} pb-10 pt-14 sm:pb-12 sm:pt-16 lg:pb-12 lg:pt-[4.5rem]`}
      >
        <div className="max-w-[800px]">
          <h1 className="text-[1.875rem] font-semibold leading-tight text-white sm:text-[2.125rem] lg:text-[2.75rem]">
            Welcome to{" "}
            <span className="font-bold text-fleetSignal">Fleet Signal,</span>
          </h1>
          <p className="mt-2 max-w-[34rem] text-xl leading-snug text-white sm:text-[1.375rem] lg:mt-3">
            the leading source of intelligence and insight into the UK&apos;s
            transport industry.
          </p>

          <hr className="mt-6 border-t border-white sm:mt-7" />

          <ul className="divide-y divide-white/80">
            {intelligencePoints.map(({ Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-6 py-5 sm:gap-7 sm:py-6"
              >
                <IntroIconCircle Icon={Icon} />
                <p className="min-w-0 flex-1 text-base leading-[1.55] text-white">
                  {text}
                </p>
              </li>
            ))}
          </ul>

          <hr className="border-t border-white" />

          <p className="mt-7 max-w-[800px] pt-6 text-xs font-medium uppercase leading-relaxed tracking-[0.18em] text-white sm:mt-8 sm:pt-7 sm:text-sm">
            Because understanding the market,
            <br className="hidden sm:block" />{" "}
            <span className="text-fleetSignal">
              starts with reading the signals.
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href="/intelligence"
              className="w-full !bg-fleetSignal !text-white hover:!bg-blue-700 sm:w-auto"
            >
              Explore Paid Intelligence →
            </ButtonLink>
            <ButtonLink
              href="/research"
              variant="secondary"
              className="w-full !border-white !bg-white !text-neutral-900 hover:!bg-neutral-100 sm:w-auto"
            >
              Explore Free Research →
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
