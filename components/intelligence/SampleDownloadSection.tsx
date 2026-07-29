import { SampleDownloadPanel } from "@/components/intelligence/WeeklyOperatorSampleSection";
import { pageContainerClass } from "@/lib/layout";

/** Standalone sample download block (hub page uses WeeklyOperatorSampleSection). */
export function SampleDownloadSection() {
  return (
    <section className="border-b border-neutral-200 bg-neutral-50">
      <div className={`${pageContainerClass} max-w-lg py-14`}>
        <SampleDownloadPanel embedded={false} />
      </div>
    </section>
  );
}
