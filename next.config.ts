import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages hosting
  output: "export",

  // Custom domain (86b.ai) serves from root — no basePath needed
  basePath: "",
  assetPrefix: "",

  // next/image requires unoptimized mode for static export
  // (no Node.js image optimization server on GitHub Pages)
  images: {
    unoptimized: true,
  },

  // Generates /services/foo/index.html for clean URLs
  trailingSlash: true,
};

export default nextConfig;
