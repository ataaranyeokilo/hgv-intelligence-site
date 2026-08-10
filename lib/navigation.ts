export type NavItem = {
  label: string;
  href: string;
};

export const mainNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "About us", href: "/about" },
  { label: "FAQs", href: "/faqs" },
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
