'use client';

import { motion } from 'framer-motion';
import { Progress, ProgressIndicator, ProgressTrack } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  raised: number;
  goal: number;
  animated?: boolean;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  raised,
  goal,
  animated = false,
  className,
  showLabel = false,
}: ProgressBarProps) {
  const percentage = goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0;

  if (animated) {
    return (
      <div className={cn('space-y-1', className)}>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        {showLabel && (
          <p className="text-right text-xs text-muted-foreground">{percentage}% funded</p>
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-1', className)}>
      <Progress value={percentage} className="gap-0">
        <ProgressTrack className="h-2">
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
      {showLabel && (
        <p className="text-right text-xs text-muted-foreground">{percentage}% funded</p>
      )}
    </div>
  );
}
