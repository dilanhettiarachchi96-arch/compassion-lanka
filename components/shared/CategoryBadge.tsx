import { Badge } from '@/components/ui/badge';
import { formatCategory } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { CampaignCategory } from '@/types';

const categoryStyles: Record<CampaignCategory, string> = {
  clothes: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
  food: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200',
  medicine: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200',
  school_supplies:
    'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200',
};

interface CategoryBadgeProps {
  category: CampaignCategory;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'border-0 font-medium capitalize',
        categoryStyles[category],
        className
      )}
    >
      {formatCategory(category)}
    </Badge>
  );
}
