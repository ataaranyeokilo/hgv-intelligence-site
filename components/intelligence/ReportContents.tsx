import {
  IconCheck,
  IconDatabase,
  IconFile,
  IconPhone,
  IconShield,
} from "@/components/ui/icons";
import { pageContainerClass } from "@/lib/layout";

const included = [
  {
    title: "Company details",
    description: "Name, address, and trading style.",
    Icon: IconDatabase,
  },
  {
    title: "Licence information",
    description: "Licence number, operator type, and date registered.",
    Icon: IconFile,
  },
  {
    title: "Fleet data",
    description: "Vehicle count and operator status.",
    Icon: IconShield,
  },
  {
    title: "Enriched contacts",
    description: "Direct-dial phone numbers.",
    Icon: IconPhone,
  },
  {
    title: "Ready to use",
    description: "Clean Excel with consistent formatting.",
    Icon: IconCheck,
  },
];

export function ReportContents() {
  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} py-10 sm:py-12`}>
        <h2 className="text-lg font-semibold text-neutral-900 sm:text-xl">
          What&apos;s included in every weekly report
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {included.map(({ title, description, Icon }) => (
            <div key={title} className="text-center">
              <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-800">
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-3 text-sm font-semibold text-neutral-900">
                {title}
              </p>
              <p className="mt-1 hidden text-xs leading-relaxed text-neutral-600 sm:block">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
