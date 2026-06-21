'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import type { ChildrenHome } from '@/types';

const HomesMap = dynamic(
  () => import('@/components/homes/HomesMap').then((m) => m.HomesMap),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full rounded-2xl md:h-[500px]" />,
  }
);

interface HomesMapWrapperProps {
  homes?: ChildrenHome[];
}

export function HomesMapWrapper({ homes }: HomesMapWrapperProps = {}) {
  return <HomesMap homes={homes} />;
}
