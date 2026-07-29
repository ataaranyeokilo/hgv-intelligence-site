"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { isNavItemActive, mainNavItems } from "@/lib/navigation";
import { pageContainerClass } from "@/lib/layout";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className={`${pageContainerClass} flex items-center justify-between gap-4 py-5`}>
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-neutral-900"
        >
          HGV Intelligence
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 sm:hidden"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>

        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-2 border-b border-neutral-200 bg-white px-6 py-4 sm:static sm:flex sm:flex-row sm:border-0 sm:bg-transparent sm:p-0`}
        >
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {mainNavItems.map((item) => {
              const active = isNavItemActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm ${
                      active
                        ? "font-medium text-neutral-900 underline decoration-neutral-900 decoration-2 underline-offset-4"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
