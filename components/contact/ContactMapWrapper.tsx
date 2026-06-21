'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const ContactMap = dynamic(
  () => import('@/components/contact/ContactMap').then((m) => m.ContactMap),
  { ssr: false, loading: () => <Skeleton className="h-48 w-full rounded-2xl" /> }
);

export function ContactMapWrapper() {
  return <ContactMap />;
}
