import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',          // Static export for GitHub Pages
  trailingSlash: true,       // Required for GitHub Pages routing
  images: {
    unoptimized: true,        // Required for static export (no image server)
  },
};

export default nextConfig;
