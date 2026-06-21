import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Compassion Lanka Foundation — we are here to help with donations, partnerships, and volunteering.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
