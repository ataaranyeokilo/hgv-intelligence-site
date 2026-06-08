import Link from "next/link";

export function SampleDownload() {
  return (
    <section id="sample" className="border-b border-neutral-200 bg-neutral-900 text-white">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          See the data before you subscribe
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300">
          Download a redacted sample report with real column structure and
          anonymised records. You&apos;ll see exactly how the weekly Excel file
          is laid out — field names, formatting, and the level of detail your
          sales team can expect every Monday.
        </p>
        <div className="mt-10">
          <Link
            href="/#sample"
            className="inline-flex items-center rounded-sm bg-white px-6 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
          >
            Download Sample
          </Link>
        </div>
        <p className="mt-6 text-sm text-neutral-400">
          Sample download will be wired up in a later release.
        </p>
      </div>
    </section>
  );
}
