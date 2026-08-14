"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNavItems } from "@/lib/navigation";
import { pageContainerClass } from "@/lib/layout";
import { SiteLogo } from "@/components/layout/SiteLogo";

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const linkColumns = [
    mainNavItems.slice(0, 3),
    mainNavItems.slice(3),
  ];

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className={`${pageContainerClass} py-14`}>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <SiteLogo className="h-10 w-auto sm:h-12" />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
              Weekly HGV operator leads and free industry reports for UK
              transport sales teams.
            </p>
          </div>
          {linkColumns.map((column, index) => (
            <nav key={index} aria-label={index === 0 ? "Quick links" : "More links"}>
              <p className="text-sm font-semibold text-neutral-900">
                {index === 0 ? "Quick links" : "Company"}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                {column.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-neutral-900">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-12 border-t border-neutral-200 pt-8 text-xs text-neutral-500">
          © {currentYear} HGV Intelligence. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
