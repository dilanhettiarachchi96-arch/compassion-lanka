import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatCurrency } from '@/lib/format';
import type { Campaign } from '@/types';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className="flex h-full flex-col overflow-hidden pt-0 transition-shadow hover:shadow-md">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <Image
            src={campaign.imageUrl}
            alt={campaign.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <CategoryBadge category={campaign.category} />
            {campaign.isUrgent && (
              <Badge variant="destructive" className="font-medium">
                Urgent
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col gap-3 pt-4">
          <h3 className="font-[family-name:var(--font-dm-serif)] text-lg leading-snug">
            <Link
              href={`/campaigns/${campaign.slug}`}
              className="hover:text-primary"
            >
              {campaign.title}
            </Link>
          </h3>

          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" aria-hidden />
            {campaign.location}
          </p>

          <ProgressBar raised={campaign.raisedAmount} goal={campaign.goalAmount} />

          <p className="text-sm">
            <span className="font-semibold text-primary">
              {formatCurrency(campaign.raisedAmount)}
            </span>{' '}
            <span className="text-muted-foreground">
              raised of {formatCurrency(campaign.goalAmount)}
            </span>
          </p>

          <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="size-3.5" aria-hidden />
              {campaign.donorCount} donors
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden />
              {campaign.daysLeft} days left
            </span>
          </div>
        </CardContent>

        <CardFooter className="border-t-0 bg-transparent pt-0">
          <Button
            render={<Link href={`/campaigns/${campaign.slug}`} />}
            className="w-full bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-accent)]/90"
            size="lg"
          >
            Donate
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
