type IconProps = { className?: string };

/** Keeps default dimensions when callers only pass layout/colour classes. */
function iconClassName(defaultSize: string, className?: string) {
  if (!className) return defaultSize;
  if (/\b(h|w)-/.test(className)) return className;
  return `${defaultSize} ${className}`;
}

export function IconClock({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconShield({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function IconFile({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 4h8l4 4v12H8V4z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M16 4v4h4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconDocument({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3h7l5 5v13H7V3z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg
      className={iconClassName("h-4 w-4", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 12l4 4L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconMail({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconUsers({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 19c0-3 2.5-5 6-5s6 2 6 5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="17" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconChart({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 15V11M12 15V8M16 15v-5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function IconDatabase({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function IconLock({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 10V8a4 4 0 118 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function IconPhone({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 5h2l1 4-2 1a11 11 0 005 5l1-2 4 1v2a2 2 0 01-2 2A14 14 0 018 7a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function IconTruck({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 8h11v8H3V8zm11 3h4l2 3v2h-6v-5z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconBuilding({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" stroke="currentColor" />
    </svg>
  );
}

export function IconMapPin({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconFuel({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 4h8v16H6V4zm8 4h3l2 3v5h-5V8z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function IconDocumentChecklist({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 4h7l3 3v13H8V4z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M15 4v3h3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 11h6M10 14h4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M15.5 17l1 1 2-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconUsersNetwork({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8.5 18c0-2.2 1.6-3.5 3.5-3.5s3.5 1.3 3.5 3.5M4 18c0-1.7 1.3-2.8 2.5-2.8M20 18c0-1.7-1.3-2.8-2.5-2.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconTarget({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3v2M12 19v2M3 12h2M19 12h2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
