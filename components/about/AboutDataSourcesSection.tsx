import { IconBuilding } from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";

export function AboutDataSourcesSection() {
  return (
    <section className="border-b border-neutral-200">
      <div
        className={`${pageContainerClass} flex flex-col gap-10 py-14 sm:py-16 lg:flex-row lg:items-center lg:gap-16`}
      >
        <div className="flex shrink-0 justify-center lg:justify-start">
          <span className="flex h-32 w-32 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-800 sm:h-40 sm:w-40">
            <IconBuilding className="h-14 w-14 sm:h-16 sm:w-16" />
          </span>
        </div>
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-neutral-900">
            Where the data comes from
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Our information originates from official UK operator registration
            sources. We review and organise this data before producing weekly
            lead reports and free intelligence summaries.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Sample reports use redacted or fictional placeholder values so you
            can review structure and fields without exposing operator contact
            details.
          </p>
        </div>
      </div>
    </section>
  );
}
