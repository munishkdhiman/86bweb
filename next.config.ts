import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles SSR, image optimisation, and routing natively
  images: {
    qualities: [100, 75],
  },
};

export default nextConfig;
