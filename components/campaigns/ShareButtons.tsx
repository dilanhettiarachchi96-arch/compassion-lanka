'use client';

import { useState } from 'react';
import { Check, Copy, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  title: string;
  slug: string;
  className?: string;
}

export function ShareButtons({ title, slug, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/campaigns/${slug}`
      : `/campaigns/${slug}`;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        typeof window !== 'undefined'
          ? `${window.location.origin}/campaigns/${slug}`
          : url
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <Button
        variant="outline"
        size="sm"
        render={
          <a
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          />
        }
      >
        <MessageCircle className="size-4" aria-hidden />
        WhatsApp
      </Button>
      <Button
        variant="outline"
        size="sm"
        render={
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          />
        }
      >
        <Share2 className="size-4" aria-hidden />
        Facebook
      </Button>
      <Button variant="outline" size="sm" type="button" onClick={handleCopy}>
        {copied ? (
          <Check className="size-4 text-[var(--color-success)]" aria-hidden />
        ) : (
          <Copy className="size-4" aria-hidden />
        )}
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>
    </div>
  );
}
