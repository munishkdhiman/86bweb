'use client';

import { withBasePath } from './base-path';

// Static export has no image optimiser: serve files as-is, prefixed with the
// base path so they resolve on GitHub Pages project sites.
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  return `${withBasePath(src)}?w=${width}`;
}
