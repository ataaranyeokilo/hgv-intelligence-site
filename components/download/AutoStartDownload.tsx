"use client";

import { useEffect, useRef } from "react";

type AutoStartDownloadProps = {
  href: string;
};

export function AutoStartDownload({ href }: AutoStartDownloadProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    linkRef.current?.click();
  }, [href]);

  return (
    <a
      ref={linkRef}
      href={href}
      download
      className="inline-flex items-center justify-center rounded-sm bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
    >
      Download now
    </a>
  );
}
