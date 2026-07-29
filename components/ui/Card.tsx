import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-sm border border-neutral-200 bg-white p-6 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
