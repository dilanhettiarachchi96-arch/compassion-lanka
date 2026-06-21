import type { Metadata } from 'next';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Donation Cancelled',
  description: 'Your donation was not completed. You can try again anytime.',
};

export default function DonateCancelPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="font-[family-name:var(--font-dm-serif)] text-3xl">
        Donation Not Completed
      </h1>
      <p className="mt-4 text-muted-foreground">
        No worries — your payment was not processed. The children still need your help whenever you&apos;re ready.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/donate" className={cn(buttonVariants(), 'bg-accent text-primary')}>
          Try Again
        </Link>
        <Link href="/" className={cn(buttonVariants({ variant: 'outline' }))}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
