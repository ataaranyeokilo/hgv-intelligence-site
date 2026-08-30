import { pageContainerClass } from "@/lib/layout";

const widerMarketAudiences = [
  "Credit risk bureaux",
  "Market researchers",
  "Transport newsletters and publications",
  "Other hauliers",
  "Other organisations that need insight into the UK transport sector",
];

export function AboutStorySection() {
  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} py-14 sm:py-16`}>
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-neutral-900">Who we are</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Fleet Signal helps businesses monitoring and selling into the UK
            transport industry discover newly registered operators, growing
            operators and the detailed information behind them through
            structured commercial data.
          </p>
        </div>

        <h2 className="mt-14 text-xl font-semibold text-neutral-900">
          Why we built Fleet Signal
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12 lg:divide-x lg:divide-neutral-200">
          <div className="lg:pr-12">
            <h3 className="text-base font-semibold text-neutral-900">
              Save sales teams time
            </h3>
            <p className="mt-3 text-base font-medium text-neutral-800">
              Time is money.
            </p>
            <p className="mt-3 text-base leading-relaxed text-neutral-600">
              Sales teams currently spend too much time collecting, cleaning and
              organising operator information.
            </p>
            <p className="mt-3 text-base leading-relaxed text-neutral-600">
              Fleet Signal reduces that manual work by providing clean weekly
              reports ready for prospecting.
            </p>
          </div>
          <div className="lg:pl-12">
            <h3 className="text-base font-semibold text-neutral-900">
              Serve the wider transport market
            </h3>
            <p className="mt-3 text-base leading-relaxed text-neutral-600">
              Fleet Signal is not only for businesses selling directly to HGV
              operators. The information is also valuable to:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              {widerMarketAudiences.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fleetSignal"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Fleet Signal is a one-stop source for news, research, insight and
              actionable intelligence around the UK road transport industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
