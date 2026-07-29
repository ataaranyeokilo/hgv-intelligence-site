"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DownloadGateModal,
  type DownloadGateModalContent,
} from "@/components/download/DownloadGateModal";
import {
  intelligenceReportEmailSubject,
  WEEKLY_SAMPLE_EMAIL_SUBJECT,
} from "@/lib/download/constants";

type IntelligenceDownloadContextValue = {
  openWeeklySample: () => void;
  openReportDownload: (input: { reportId: string; title: string }) => void;
};

const IntelligenceDownloadContext =
  createContext<IntelligenceDownloadContextValue | null>(null);

export function useIntelligenceDownload(): IntelligenceDownloadContextValue {
  const ctx = useContext(IntelligenceDownloadContext);
  if (!ctx) {
    throw new Error(
      "useIntelligenceDownload must be used within IntelligenceDownloadProvider",
    );
  }
  return ctx;
}

const weeklySampleContent: DownloadGateModalContent = {
  title: "Download sample report",
  description:
    "Enter your work email to receive a verification link for the redacted weekly operator Excel sample.",
  source: "weekly_sample",
  emailSubject: WEEKLY_SAMPLE_EMAIL_SUBJECT,
  submitLabel: "Download sample report",
};

type IntelligenceDownloadProviderProps = {
  children: ReactNode;
};

export function IntelligenceDownloadProvider({
  children,
}: IntelligenceDownloadProviderProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<DownloadGateModalContent | null>(null);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const openWeeklySample = useCallback(() => {
    setContent(weeklySampleContent);
    setOpen(true);
  }, []);

  const openReportDownload = useCallback(
    (input: { reportId: string; title: string }) => {
      setContent({
        title: "Download full report",
        description: `Enter your work email to receive a verification link for “${input.title}”.`,
        source: "intelligence_report",
        reportId: input.reportId,
        emailSubject: intelligenceReportEmailSubject(input.title),
        submitLabel: "Send verification email",
      });
      setOpen(true);
    },
    [],
  );

  const value = useMemo(
    () => ({ openWeeklySample, openReportDownload }),
    [openWeeklySample, openReportDownload],
  );

  return (
    <IntelligenceDownloadContext.Provider value={value}>
      {children}
      <DownloadGateModal open={open} content={content} onClose={close} />
    </IntelligenceDownloadContext.Provider>
  );
}
