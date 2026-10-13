import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '86b.ai Services | Applied Enterprise Artificial Intelligence',
  description: 'We integrate customised, secure and scalable AI solutions into your existing workflows. From data orchestration to intelligent automation.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
