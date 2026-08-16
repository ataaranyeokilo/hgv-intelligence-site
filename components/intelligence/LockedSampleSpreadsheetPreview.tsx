import { IconLock } from "@/components/ui/icons";
import { WeeklySampleSpreadsheetPreview } from "@/components/reports/WeeklySampleSpreadsheetPreview";

export function LockedSampleSpreadsheetPreview() {
  return (
    <div className="relative overflow-hidden rounded-sm">
      <div className="pointer-events-none select-none blur-[6px]" aria-hidden>
        <WeeklySampleSpreadsheetPreview />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/55 px-6 py-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-fleetSignal text-white">
          <IconLock className="h-6 w-6" />
        </span>
        <p className="mt-4 max-w-xs text-sm font-semibold leading-snug text-neutral-900">
          Contact details unlocked on your quote
        </p>
        <p className="mt-2 max-w-sm text-xs leading-relaxed text-neutral-600">
          Direct emails and phone numbers for every operator in your filter.
        </p>
      </div>
    </div>
  );
}
