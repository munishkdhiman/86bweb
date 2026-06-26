import { getServiceBySlug, services } from '@/lib/services-data';
import ServiceDetailClient from './ServiceDetailClient';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

interface PageProps { params: Promise<{ slug: string }>; }

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) notFound();
  return <ServiceDetailClient svc={svc} />;
}
