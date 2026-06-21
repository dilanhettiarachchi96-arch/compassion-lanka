import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <LoadingSkeleton />
    </div>
  );
}