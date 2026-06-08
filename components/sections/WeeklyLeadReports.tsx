const columns = [
  "Company name and registered address",
  "Licence number and operator type",
  "Vehicle count at registration",
  "Enriched phone numbers",
  "Date first registered",
];

const audiences = [
  "Fuel and card providers",
  "Commercial motor insurers",
  "Vehicle finance and leasing teams",
  "Fleet maintenance and telematics suppliers",
  "Transport recruitment agencies",
];

export function WeeklyLeadReports() {
  return (
    <section id="weekly-leads" className="border-b border-neutral-200">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Weekly lead reports
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
          Each Monday, subscribers receive an Excel file of HGV operators
          registered in the previous seven days. Records are deduplicated,
          formatted consistently, and enriched with direct-dial numbers where
          available.
        </p>

        <div className="mt-14 grid gap-12 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium uppercase tracking-widest text-neutral-500">
              What&apos;s included
            </h3>
            <ul className="mt-4 space-y-3">
              {columns.map((column) => (
                <li
                  key={column}
                  className="text-sm leading-relaxed text-neutral-700"
                >
                  {column}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-widest text-neutral-500">
              Built for
            </h3>
            <ul className="mt-4 space-y-3">
              {audiences.map((audience) => (
                <li
                  key={audience}
                  className="text-sm leading-relaxed text-neutral-700"
                >
                  {audience}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
