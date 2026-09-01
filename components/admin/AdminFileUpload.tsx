"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

type AdminFileUploadProps = {
  currentFileName: string;
  currentLabel: string;
  currentHint: string;
  chooseHint: string;
  accept: string;
  footerNote?: string;
  onUpdate: (file: File) => void;
};

export function AdminFileUpload({
  currentFileName,
  currentLabel,
  currentHint,
  chooseHint,
  accept,
  footerNote,
  onUpdate,
}: AdminFileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setMessage("Choose a file first.");
      return;
    }
    onUpdate(file);
    setMessage("File added below. Saving to the website is not connected yet.");
    setFile(null);
    event.currentTarget.reset();
  }

  const inputClass =
    "mt-2 w-full rounded-sm border border-neutral-300 px-4 py-3 text-sm text-neutral-900 file:mr-4 file:rounded-sm file:border-0 file:bg-neutral-100 file:px-3 file:py-2 file:text-sm";

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-8">
      <div>
        <p className="text-sm font-medium text-neutral-900">{currentLabel}</p>
        <p className="mt-1 text-sm text-neutral-500">{currentHint}</p>
        <p className="mt-3 text-sm font-medium text-neutral-900">
          {currentFileName || "No file chosen yet."}
        </p>
      </div>
      <label className="block">
        <span className="text-sm font-medium text-neutral-900">
          Choose file
        </span>
        <span className="mt-1 block text-sm text-neutral-500">{chooseHint}</span>
        <input
          type="file"
          name="file"
          className={inputClass}
          accept={accept}
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
            setMessage(null);
          }}
        />
      </label>
      {message ? (
        <p className="text-sm text-neutral-600" role="status">
          {message}
        </p>
      ) : null}
      <Button
        type="submit"
        className="!bg-fleetSignal hover:!bg-blue-700"
      >
        Update file
      </Button>
      {footerNote ? (
        <p className="text-xs leading-relaxed text-neutral-500">{footerNote}</p>
      ) : null}
    </form>
  );
}
