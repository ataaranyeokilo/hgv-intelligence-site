import {
  LOGO_CACHE_VERSION,
  LOGO_DIMENSIONS,
  LOGO_PATHS,
  SITE_NAME,
  type SiteLogoVariant,
} from "@/lib/brand";

type SiteLogoProps = {
  className?: string;
  variant?: SiteLogoVariant;
};

export function SiteLogo({ className = "", variant = "header" }: SiteLogoProps) {
  const { width, height } = LOGO_DIMENSIONS[variant];

  return (
    <img
      src={`${LOGO_PATHS[variant]}?v=${LOGO_CACHE_VERSION}`}
      alt={SITE_NAME}
      width={width}
      height={height}
      className={className}
      decoding="async"
    />
  );
}
