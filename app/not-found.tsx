import Link from 'next/link';
import { Heart } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Heart className="h-16 w-16 text-primary" aria-hidden />
      <h1 className="mt-6 font-[family-name:var(--font-dm-serif)] text-4xl">Page Not Found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link href="/" className={cn(buttonVariants(), 'mt-8 bg-accent text-primary')}>
        Go Home
      </Link>
    </div>
  );
}
