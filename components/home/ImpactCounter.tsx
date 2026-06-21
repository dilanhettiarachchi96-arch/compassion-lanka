'use client';

import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { impactStats } from '@/lib/mock-data';

interface ImpactCounterProps {
  stats?: typeof impactStats;
}

function AnimatedStat({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString('en-LK')
  );

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: 'easeOut' });
    }
  }, [isInView, value, count]);

  return (
    <div ref={ref} className="text-center">
      <motion.p className="text-3xl font-bold text-primary-foreground md:text-4xl">
        {rounded}
      </motion.p>
      <p className="mt-1 text-sm text-primary-foreground/80 md:text-base">
        {label}
      </p>
    </div>
  );
}

export function ImpactCounter({ stats: statsProp }: ImpactCounterProps = {}) {
  const source = statsProp ?? impactStats;

  const stats = [
    { label: 'Total Donors', value: source.totalDonors },
    { label: 'Children Helped', value: source.childrenHelped },
    { label: 'Goods Packages', value: source.goodsPackagesReceived },
    { label: 'Active Campaigns', value: source.activeCampaigns },
  ] as const;

  return (
    <section className="bg-primary py-10 md:py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4 md:gap-6">
        {stats.map((stat) => (
          <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  );
}
