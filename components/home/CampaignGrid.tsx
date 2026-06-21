'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress, ProgressIndicator, ProgressTrack } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCategory, formatCurrency } from '@/lib/format';
import { mockCampaigns } from '@/lib/mock-data';
import type { Campaign, CampaignCategory } from '@/types';

type FilterValue = 'all' | CampaignCategory;

const filters: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'clothes', label: 'Clothes' },
  { value: 'food', label: 'Food' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'school_supplies', label: 'School Supplies' },
];

function CampaignPreviewCard({
  slug,
  title,
  category,
  isUrgent,
  location,
  imageUrl,
  raisedAmount,
  goalAmount,
  donorCount,
  daysLeft,
}: Campaign) {
  const progress = Math.min((raisedAmount / goalAmount) * 100, 100);

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-white/90 text-primary">
            {formatCategory(category)}
          </Badge>
          {isUrgent && (
            <Badge variant="destructive" className="bg-destructive text-white">
              Urgent
            </Badge>
          )}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg leading-snug">{title}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {location}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={progress}>
          <ProgressTrack className="h-2">
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        <p className="text-sm font-medium">
          {formatCurrency(raisedAmount)} raised of {formatCurrency(goalAmount)}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="size-3.5" />
            {donorCount} donors
          </span>
          <span>{daysLeft} days left</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          nativeButton={false}
          className="w-full"
          render={<Link href={`/campaigns/${slug}`} />}
        >
          Donate
        </Button>
      </CardFooter>
    </Card>
  );
}

interface CampaignGridProps {
  campaigns?: Campaign[];
}

export function CampaignGrid({ campaigns: campaignsProp }: CampaignGridProps = {}) {
  const [filter, setFilter] = useState<FilterValue>('all');
  const source = campaignsProp ?? mockCampaigns;

  const campaigns = useMemo(() => {
    const filtered =
      filter === 'all'
        ? source
        : source.filter((campaign) => campaign.category === filter);
    return filtered.slice(0, 6);
  }, [source, filter]);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-dm-serif)] text-3xl text-primary md:text-4xl">
              Active Campaigns
            </h2>
            <p className="mt-2 text-muted-foreground">
              Support children in need across Sri Lanka right now.
            </p>
          </div>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/campaigns" />}
          >
            View All Campaigns
          </Button>
        </div>

        <Tabs
          value={filter}
          onValueChange={(value) => setFilter(value as FilterValue)}
        >
          <TabsList className="mb-8 h-auto flex-wrap">
            {filters.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {filters.map(({ value }) => (
            <TabsContent key={value} value={value} className="mt-0">
              {campaigns.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {campaigns.map((campaign) => (
                    <CampaignPreviewCard key={campaign.id} {...campaign} />
                  ))}
                </div>
              ) : (
                <p className="py-12 text-center text-muted-foreground">
                  No campaigns found in this category.
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
