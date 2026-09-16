import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Match lib/admin/report-uploads.ts MAX_DOWNLOAD_BYTES (20MB).
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
