// Base path the site is served from. Empty on a custom domain; "/86bweb" on
// <user>.github.io/86bweb. Set at build time by the GitHub Pages workflow.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// Prefix a public asset path (e.g. "/papers/x.pdf") with the base path.
export function withBasePath(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return `${basePath}${path}`;
}
