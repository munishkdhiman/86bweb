import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles SSR, image optimisation, and routing natively
  // No output: 'export' needed — Vercel is a full Next.js host
  images: {
    qualities: [100, 75],
  },
  trailingSlash: true,
};

export default nextConfig;
