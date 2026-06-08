import Link from "next/link";

import { mainNavItems } from "@/lib/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              HGV Intelligence
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-600">
              Weekly HGV operator lead data and free industry reports for UK
              transport sales teams.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-600">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-neutral-900">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 text-xs text-neutral-500">
          © {currentYear} HGV Intelligence. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
