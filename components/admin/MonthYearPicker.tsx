"use client";

import { useEffect, useRef, useState } from "react";

import { IconCalendarWeek, IconChevron } from "@/components/ui/icons";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseYearMonth(value: string): { year: number; month: number } | null {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (month < 1 || month > 12) return null;
  return { year, month };
}

function formatYearMonth(value: string): string {
  const parsed = parseYearMonth(value);
  if (!parsed) return "";
  return `${MONTH_NAMES[parsed.month - 1]} ${parsed.year}`;
}

type MonthYearPickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export function MonthYearPicker({ value, onChange }: MonthYearPickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selected = parseYearMonth(value);
  const [viewYear, setViewYear] = useState(
    selected?.year ?? new Date().getFullYear(),
  );
  const display = formatYearMonth(value);

  useEffect(() => {
    if (!open) return;
    setViewYear(selected?.year ?? new Date().getFullYear());

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, selected?.year]);

  return (
    <div ref={rootRef} className="relative mt-2">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-sm border border-neutral-300 bg-white px-4 py-3 text-left text-sm text-neutral-900"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={display ? undefined : "text-neutral-400"}>
          {display || "Select month and year"}
        </span>
        <IconCalendarWeek className="h-5 w-5 text-neutral-500" />
      </button>
      {open ? (
        <div
          role="dialog"
          aria-label="Choose month and year"
          className="absolute z-30 mt-2 w-full rounded-sm border border-neutral-200 bg-white p-4 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="rounded-sm p-1 text-neutral-700 hover:bg-neutral-100"
              onClick={() => setViewYear((year) => year - 1)}
              aria-label="Previous year"
            >
              <IconChevron className="h-4 w-4 rotate-90" />
            </button>
            <p className="text-sm font-medium text-neutral-900">{viewYear}</p>
            <button
              type="button"
              className="rounded-sm p-1 text-neutral-700 hover:bg-neutral-100"
              onClick={() => setViewYear((year) => year + 1)}
              aria-label="Next year"
            >
              <IconChevron className="h-4 w-4 -rotate-90" />
            </button>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {MONTH_NAMES.map((name, index) => {
              const month = index + 1;
              const isSelected =
                selected?.year === viewYear && selected.month === month;
              return (
                <button
                  key={name}
                  type="button"
                  className={`rounded-sm px-2 py-2 text-sm ${
                    isSelected
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-800 hover:bg-neutral-100"
                  }`}
                  onClick={() => {
                    onChange(`${viewYear}-${String(month).padStart(2, "0")}`);
                    setOpen(false);
                  }}
                >
                  {name.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
