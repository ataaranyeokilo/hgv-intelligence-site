import { SampleDownloadForm } from "@/components/sections/SampleDownloadForm";

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
        <SampleDownloadForm />
        <p className="mt-6 text-sm text-neutral-400">
          We&apos;ll use your email to send the sample and may follow up about
          weekly reports. You can unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
