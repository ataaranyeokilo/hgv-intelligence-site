import type { ReactNode } from "react";

import { pageContainerClass } from "@/lib/layout";

type SectionProps = {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  compact?: boolean;
  id?: string;
};

export function Section({
  children,
  className = "",
  bordered = true,
  compact = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${bordered ? "border-b border-neutral-200" : ""} ${className}`.trim()}
    >
      <div
        className={`${pageContainerClass} ${compact ? "py-8 sm:py-10" : "py-14 sm:py-20"}`}
      >
        {children}
      </div>
    </section>
  );
}
