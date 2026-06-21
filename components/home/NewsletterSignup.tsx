'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { subscribeNewsletter } from '@/actions/newsletter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function NewsletterSignup() {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);

    startTransition(async () => {
      const result = await subscribeNewsletter(formData);

      if (result.success) {
        toast.success(result.message);
        setName('');
        setEmail('');
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <section className="bg-accent py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-[family-name:var(--font-dm-serif)] text-3xl text-accent-foreground md:text-4xl">
          Stay Connected
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-accent-foreground/80">
          Get updates on new campaigns, impact stories, and ways to help
          children across Sri Lanka.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-end"
        >
          <div className="flex-1 space-y-2 text-left">
            <Label htmlFor="newsletter-name" className="text-accent-foreground">
              Name
            </Label>
            <Input
              id="newsletter-name"
              name="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-11 border-accent-foreground/20 bg-white"
              disabled={isPending}
            />
          </div>
          <div className="flex-1 space-y-2 text-left">
            <Label htmlFor="newsletter-email" className="text-accent-foreground">
              Email
            </Label>
            <Input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 border-accent-foreground/20 bg-white"
              disabled={isPending}
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="h-11 bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          >
            {isPending ? 'Subscribing…' : 'Subscribe'}
          </Button>
        </form>
      </div>
    </section>
  );
}
