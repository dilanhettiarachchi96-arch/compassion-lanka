'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h2 className="font-[family-name:var(--font-dm-serif)] text-2xl">Something went wrong</h2>
      <p className="mt-4 text-muted-foreground">We could not load your dashboard. Please try again.</p>
      <Button onClick={reset} className="mt-6 bg-primary text-white">
        Try Again
      </Button>
    </div>
  );
}