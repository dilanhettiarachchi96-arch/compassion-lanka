import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ImpactCounter } from '@/components/home/ImpactCounter';
import { impactStats } from '@/lib/mock-data';

interface HeroSectionProps {
  stats?: typeof impactStats;
}

export function HeroSection({ stats }: HeroSectionProps = {}) {
  return (
    <section className="relative flex min-h-screen flex-col">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Children supported by Compassion Lanka Foundation"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(27, 79, 58, 0.72)' }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Compassion Lanka Foundation
          </p>
          <h1 className="font-[family-name:var(--font-dm-serif)] text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
            Every Child Deserves a Better Tomorrow
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Join thousands worldwide helping homeless children and families in
            Sri Lanka with clothes, food, medicine, and school supplies.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              nativeButton={false}
              render={
                <Link
                  href="/campaigns"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-8 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                />
              }
            >
              Donate Now
            </Button>
            <Button
              nativeButton={false}
              render={
                <Link
                  href="/send-goods"
                  className="inline-flex h-11 items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
                />
              }
            >
              Send Goods
            </Button>
          </div>
        </div>
      </div>
      <ImpactCounter stats={stats} />
    </section>
  );
}
