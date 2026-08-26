import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 requires explicit quality allowlist.
    qualities: [75, 90],
  },
};

export default nextConfig;
