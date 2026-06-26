import type { NextConfig } from "next";

// Detect whether we're building for GitHub Pages in a GitHub Actions environment
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

// The GitHub repository name (used as the basePath on GitHub Pages)
const repoName = "86bweb";

const nextConfig: NextConfig = {
  // Static export only when building for GitHub Pages
  // Vercel handles its own server-side rendering normally
  ...(isGithubActions && { output: "export" }),

  // GitHub Pages serves from /repo-name/, so we need a basePath
  // Vercel serves from root, so no basePath needed
  basePath: isGithubActions ? `/${repoName}` : "",
  assetPrefix: isGithubActions ? `/${repoName}/` : "",

  // next/image requires unoptimized mode for static export
  // (no Node.js image optimization server available on GitHub Pages)
  images: {
    unoptimized: isGithubActions,
  },

  // Use --webpack flag (as in existing package.json build script)
  // trailingSlash ensures /services/foo/ -> out/services/foo/index.html
  trailingSlash: true,
};

export default nextConfig;
