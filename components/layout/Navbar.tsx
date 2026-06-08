import Link from "next/link";

import { mainNavItems } from "@/lib/navigation";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-neutral-900"
        >
          HGV Intelligence
        </Link>

        <nav aria-label="Main navigation">
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
    </header>
  );
}
