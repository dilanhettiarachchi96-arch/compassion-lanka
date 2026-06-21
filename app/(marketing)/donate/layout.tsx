import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Make a one-time or recurring donation to support children in Sri Lanka.',
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
