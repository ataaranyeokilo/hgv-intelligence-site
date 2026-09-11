import { IconArrowRight } from "@/components/ui/icons";

export const reportCardClassName =
  "group relative flex h-full cursor-pointer flex-col rounded-sm border border-neutral-200 bg-white p-5 shadow-card transition-colors hover:border-neutral-400";

export const reportCardHitTargetClassName =
  "absolute inset-0 z-10 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-900";

export function ReportCardExploreCue() {
  return (
    <span
      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900"
      aria-hidden
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-200 ease-out group-hover:max-w-[4.5rem] group-hover:opacity-100 group-focus-within:max-w-[4.5rem] group-focus-within:opacity-100">
        Explore
      </span>
      <IconArrowRight className="h-4 w-4 shrink-0" />
    </span>
  );
}
