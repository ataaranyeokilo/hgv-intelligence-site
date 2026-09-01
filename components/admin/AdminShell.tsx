"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { signOutAdmin } from "@/lib/admin/reports";
import { isAdminUiPreview } from "@/lib/admin/preview";
import { pageContainerClass } from "@/lib/layout";

const adminNav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/intelligence", label: "Intelligence" },
];

type AdminShellProps = {
  children: React.ReactNode;
};

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") {
    return pathname === "/admin";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const preview = isAdminUiPreview();

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-fleetSignal">
        <div
          className={`${pageContainerClass} flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between`}
        >
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
            <Link href="/admin" className="leading-none">
              <span className="block text-base font-semibold tracking-tight text-white">
                Fleet Signal
              </span>
              <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-100">
                Admin
              </span>
            </Link>
            <nav aria-label="Admin" className="flex gap-8 text-sm sm:text-base">
              {adminNav.map((item) => {
                const active = pathname ? isActive(pathname, item.href) : false;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      active
                        ? "font-medium text-white underline decoration-white decoration-2 underline-offset-4"
                        : "text-blue-100 hover:text-white"
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-blue-100 hover:text-white">
              View website
            </Link>
            {preview ? null : (
              <form action={signOutAdmin}>
                <button
                  type="submit"
                  className="font-medium text-blue-100 hover:text-white"
                >
                  Sign out
                </button>
              </form>
            )}
          </div>
        </div>
      </header>
      {preview ? (
        <p className="border-b border-neutral-200 bg-neutral-50 py-2 text-center text-xs text-neutral-500">
          UI preview with sample data. Saving is not connected yet.
        </p>
      ) : null}
      <div className={`${pageContainerClass} py-10 sm:py-14`}>{children}</div>
    </div>
  );
}
