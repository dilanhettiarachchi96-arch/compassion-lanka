import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Share2 } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your donation to Compassion Lanka has been received. Thank you for making a difference.',
};

export default function DonateSuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <Heart className="mx-auto h-16 w-16 text-primary" aria-hidden />
      <h1 className="mt-6 font-[family-name:var(--font-dm-serif)] text-3xl">
        Thank You for Your Generosity
      </h1>
      <p className="mt-4 text-muted-foreground">
        Your donation will directly help children in Sri Lanka with clothing, food, medicine, and education.
      </p>

      <Card className="mt-8 rounded-2xl border-accent/30 bg-accent/10 shadow-md">
        <CardContent className="p-6">
          <p className="text-sm font-medium text-primary">Your Impact</p>
          <p className="mt-2 font-[family-name:var(--font-dm-serif)] text-2xl">
            You helped feed a child for a week
          </p>
          <Button variant="outline" size="sm" className="mt-4">
            <Share2 className="mr-2 h-4 w-4" aria-hidden />
            Share Your Impact
          </Button>
        </CardContent>
      </Card>

      <Link href="/" className={cn(buttonVariants(), 'mt-8 bg-primary text-white')}>
        Return Home
      </Link>
    </div>
  );
}
