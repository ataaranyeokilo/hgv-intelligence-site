export type NavItem = {
  label: string;
  href: string;
};

export const mainNavItems: NavItem[] = [
  { label: "What we do", href: "/" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "About", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href.startsWith("/#")) {
    return pathname === "/";
  }
  if (href === "/intelligence" || href.startsWith("/intelligence#")) {
    return pathname === "/intelligence" || pathname.startsWith("/intelligence/");
  }
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
