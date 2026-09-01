"use client";

import { useState } from "react";

import {
  AdminFileUpload,
} from "@/components/admin/AdminFileUpload";
import {
  AdminLibraryGrid,
  type AdminLibraryCardItem,
} from "@/components/admin/AdminLibraryCard";
import { formatReportMonthYear } from "@/lib/reports/format";

type AdminLibrarySectionProps = {
  heading: string;
  description: string;
  gridHeading: string;
  currentLabel: string;
  currentHint: string;
  chooseHint: string;
  accept: string;
  footerNote?: string;
  initialFileName?: string;
  initialItems: AdminLibraryCardItem[];
  emptyMessage: string;
  uploadedBadge: string;
  uploadedSummary: string;
};

function titleFromFileName(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

export function AdminLibrarySection({
  heading,
  description,
  gridHeading,
  currentLabel,
  currentHint,
  chooseHint,
  accept,
  footerNote,
  initialFileName = "",
  initialItems,
  emptyMessage,
  uploadedBadge,
  uploadedSummary,
}: AdminLibrarySectionProps) {
  const [currentFileName, setCurrentFileName] = useState(initialFileName);
  const [items, setItems] = useState(initialItems);

  function handleUpdate(file: File) {
    setCurrentFileName(file.name);
    setItems((current) => [
      {
        id: `upload-${file.name}-${file.size}-${file.lastModified}`,
        badge: uploadedBadge,
        title: titleFromFileName(file.name) || file.name,
        summary: uploadedSummary,
        dateLabel: formatReportMonthYear(new Date().toISOString()),
      },
      ...current,
    ]);
  }

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        Admin
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
        {heading}
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
        {description}
      </p>
      <div className="mt-10">
        <AdminFileUpload
          currentFileName={currentFileName}
          currentLabel={currentLabel}
          currentHint={currentHint}
          chooseHint={chooseHint}
          accept={accept}
          footerNote={footerNote}
          onUpdate={handleUpdate}
        />
      </div>
      <div className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
          {gridHeading}
        </h2>
        <AdminLibraryGrid items={items} emptyMessage={emptyMessage} />
      </div>
    </>
  );
}
