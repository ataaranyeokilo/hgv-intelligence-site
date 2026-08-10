export const SITE_NAME = "Fleet Signal";
export const SITE_TAGLINE = "Stay ahead of the market";

export const LOGO_PATHS = {
  header: "/images/fleet-signal-logo.png",
  footer: "/images/fleet-signal-logo-footer.png",
} as const;

export const LOGO_DIMENSIONS = {
  header: { width: 1624, height: 246 },
  footer: { width: 969, height: 201 },
} as const;

export type SiteLogoVariant = keyof typeof LOGO_PATHS;

/** Bump when replacing logo assets to bust browser cache. */
export const LOGO_CACHE_VERSION = "1";
