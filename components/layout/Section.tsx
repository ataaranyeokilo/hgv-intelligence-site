import type { ReactNode } from "react";

import { pageContainerClass } from "@/lib/layout";

type SectionProps = {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  id?: string;
};

export function Section({
  children,
  className = "",
  bordered = true,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${bordered ? "border-b border-neutral-200" : ""} ${className}`.trim()}
    >
      <div className={`${pageContainerClass} py-14 sm:py-20`}>{children}</div>
    </section>
  );
}
