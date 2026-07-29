"use client";

import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/Button";
import {
  getWeeklySamplePath,
  uploadWeeklySampleFile,
} from "@/lib/admin/weekly";

export function WeeklySampleUploadForm() {
  const [currentPath, setCurrentPath] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const path = await getWeeklySamplePath();
      setCurrentPath(path);
    });
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await uploadWeeklySampleFile(formData);
      if (!result.ok) {
        setMessage(result.message);
        return;
      }
      setCurrentPath(result.path);
      setMessage("Sample file updated.");
      form.reset();
    });
  }

  return (
    <div>
      <p className="text-sm text-neutral-600">
        Current path:{" "}
        <code className="text-neutral-900">{currentPath || "—"}</code>
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input type="file" name="file" accept=".xlsx,.xls,.csv" required />
        {message ? <p className="text-sm text-neutral-600">{message}</p> : null}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Uploading…" : "Upload sample"}
        </Button>
      </form>
    </div>
  );
}
