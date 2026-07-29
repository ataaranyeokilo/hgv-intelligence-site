"use client";

import { useEffect, useRef } from "react";

import { DownloadEmailForm } from "@/components/download/DownloadEmailForm";

export type DownloadGateModalContent = {
  title: string;
  description?: string;
  source: "weekly_sample" | "intelligence_report";
  reportId?: string;
  emailSubject: string;
  submitLabel?: string;
};

type DownloadGateModalProps = {
  open: boolean;
  content: DownloadGateModalContent | null;
  onClose: () => void;
};

export function DownloadGateModal({
  open,
  content,
  onClose,
}: DownloadGateModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-gate-title"
        className="relative z-10 w-full max-w-md rounded-sm border border-neutral-200 bg-white p-6 shadow-lg sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-700"
          aria-label="Close"
        >
          <span aria-hidden className="text-xl leading-none">
            ×
          </span>
        </button>
        <h2
          id="download-gate-title"
          className="pr-8 text-lg font-semibold text-neutral-900"
        >
          {content.title}
        </h2>
        {content.description ? (
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            {content.description}
          </p>
        ) : null}
        <div className="mt-6">
          <DownloadEmailForm
            key={`${content.source}-${content.reportId ?? "sample"}`}
            source={content.source}
            reportId={content.reportId}
            emailSubject={content.emailSubject}
            submitLabel={content.submitLabel ?? "Continue"}
            variant="light"
            layout="stack"
          />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-neutral-500">
          We&apos;ll email a verification link before your download starts.
        </p>
      </div>
    </div>
  );
}
