import Link from "next/link";

export function Hero() {
  return (
    <section className="border-b border-neutral-200">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
          UK HGV operator data
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl sm:leading-tight">
          Fresh weekly HGV operator leads, delivered in Excel
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
          We compile new operator registrations each week into a ready-to-dial
          spreadsheet — company names, addresses, fleet details, and enriched
          phone numbers — built for transport sales teams who need accurate
          outbound data, not stale directories.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/#sample"
            className="inline-flex items-center rounded-sm bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Download Sample
          </Link>
          <Link
            href="/#weekly-leads"
            className="inline-flex items-center rounded-sm border border-neutral-900 px-6 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
          >
            View Reports
          </Link>
        </div>
      </div>
    </section>
  );
}
