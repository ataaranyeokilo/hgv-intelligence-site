import { IconLock } from "@/components/ui/icons";
import { WeeklySampleSpreadsheetPreview } from "@/components/reports/WeeklySampleSpreadsheetPreview";

export function LockedSampleSpreadsheetPreview() {
  return (
    <div className="relative overflow-hidden rounded-sm">
      <div className="max-h-[16rem] overflow-hidden sm:max-h-[18rem]">
        <WeeklySampleSpreadsheetPreview />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.4) 35%, rgba(255,255,255,0.92) 100%)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-4 pt-8 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fleetSignal text-white">
          <IconLock className="h-4 w-4" />
        </span>
        <p className="mt-2.5 max-w-xs text-sm font-semibold leading-snug text-neutral-900">
          Contact details unlocked on your quote
        </p>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-neutral-600">
          Direct phone numbers for every operator in your filter.
        </p>
      </div>
    </div>
  );
}
