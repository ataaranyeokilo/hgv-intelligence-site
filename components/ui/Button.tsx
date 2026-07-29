import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-sm bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800",
  secondary:
    "inline-flex items-center justify-center rounded-sm border border-neutral-900 px-6 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100",
  ghost:
    "inline-flex items-center justify-center text-sm font-medium text-neutral-900 hover:text-neutral-600",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${variantClasses[variant]} ${className}`.trim()}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${variantClasses[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
