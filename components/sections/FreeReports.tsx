const reports = [
  {
    title: "Q1 2026 UK HGV Operator Snapshot",
    summary:
      "New operator registrations by region, average fleet size at first licence, and year-on-year growth across England, Scotland, and Wales.",
  },
  {
    title: "2025 Annual Fleet Trends Report",
    summary:
      "Twelve months of operator entry and exit data, licence category breakdowns, and the post-ULEZ shift in London-based haulage registrations.",
  },
];

export function FreeReports() {
  return (
    <section id="free-reports" className="border-b border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Free reports
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
          We publish quarterly and yearly industry reports to share what we see
          in the data — registration volumes, regional patterns, and market
          shifts across the UK haulage sector.
        </p>
        <ul className="mt-14 divide-y divide-neutral-200 border-y border-neutral-200">
          {reports.map((report) => (
            <li key={report.title} className="py-8 first:pt-0 last:pb-0">
              <h3 className="text-base font-medium text-neutral-900">
                {report.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                {report.summary}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-neutral-500">
          Full reports available on request. More published each quarter.
        </p>
      </div>
    </section>
  );
}
