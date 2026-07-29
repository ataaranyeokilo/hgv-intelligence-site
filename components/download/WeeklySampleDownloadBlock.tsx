import { DownloadEmailForm } from "@/components/download/DownloadEmailForm";
import { WEEKLY_SAMPLE_EMAIL_SUBJECT } from "@/lib/download/constants";

type WeeklySampleDownloadBlockProps = {
  variant?: "light" | "dark";
  layout?: "stack" | "inline";
  submitLabel?: string;
  className?: string;
  showDisclaimer?: boolean;
};

export function WeeklySampleDownloadBlock({
  variant = "light",
  layout = "stack",
  submitLabel = "Download sample report",
  className = "",
  showDisclaimer = false,
}: WeeklySampleDownloadBlockProps) {
  return (
    <div className={className}>
      <DownloadEmailForm
        source="weekly_sample"
        emailSubject={WEEKLY_SAMPLE_EMAIL_SUBJECT}
        submitLabel={submitLabel}
        variant={variant}
        layout={layout}
      />
      {showDisclaimer ? (
        <p
          className={`mt-3 text-xs leading-relaxed ${
            variant === "dark" ? "text-neutral-400" : "text-neutral-500"
          }`}
        >
          We&apos;ll email a verification link before your download starts.
        </p>
      ) : null}
    </div>
  );
}
