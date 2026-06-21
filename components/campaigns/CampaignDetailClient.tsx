'use client';

import Image from 'next/image';
import { MapPin, Users, Clock, X } from 'lucide-react';
import { useState } from 'react';
import { DonationForm } from '@/components/campaigns/DonationForm';
import { DonorList } from '@/components/campaigns/DonorList';
import { ShareButtons } from '@/components/campaigns/ShareButtons';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/format';
import type { Campaign, Donor } from '@/types';

const MOCK_UPDATES = [
  {
    date: '2025-01-18',
    title: 'First batch of supplies delivered',
    body: 'Thanks to your generous donations, we delivered warm jackets and blankets to 20 children this week. More supplies are on the way.',
  },
  {
    date: '2025-01-12',
    title: 'Campaign launched',
    body: 'We have officially launched this campaign. Every contribution helps us reach our goal faster.',
  },
];

interface CampaignDetailClientProps {
  campaign: Campaign;
  donors: Donor[];
}

export function CampaignDetailClient({
  campaign,
  donors,
}: CampaignDetailClientProps) {
  const percentage = Math.min(
    Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
    100
  );

  return (
    <>
      <div className="relative h-[40vh] min-h-[280px] w-full bg-muted">
        <Image
          src={campaign.imageUrl}
          alt={campaign.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-8 lg:col-span-2">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <CategoryBadge category={campaign.category} />
                {campaign.isUrgent && (
                  <Badge variant="destructive">Urgent</Badge>
                )}
              </div>

              <h1 className="font-[family-name:var(--font-dm-serif)] text-3xl text-primary sm:text-4xl">
                {campaign.title}
              </h1>

              <p className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="size-4 shrink-0" aria-hidden />
                {campaign.location}, {campaign.district}
              </p>
            </div>

            <div className="space-y-3 rounded-xl border bg-card p-6">
              <ProgressBar
                raised={campaign.raisedAmount}
                goal={campaign.goalAmount}
                animated
                showLabel
              />
              <div className="flex flex-wrap justify-between gap-2 text-sm">
                <span>
                  <strong className="text-primary">
                    {formatCurrency(campaign.raisedAmount)}
                  </strong>{' '}
                  raised of {formatCurrency(campaign.goalAmount)}
                </span>
                <span className="text-muted-foreground">{percentage}% funded</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 rounded-xl border bg-muted/40 p-4 text-center">
              <div>
                <p className="text-lg font-semibold text-primary">
                  {formatCurrency(campaign.raisedAmount)}
                </p>
                <p className="text-xs text-muted-foreground">Amount Raised</p>
              </div>
              <div>
                <p className="flex items-center justify-center gap-1 text-lg font-semibold text-primary">
                  <Users className="size-4" aria-hidden />
                  {campaign.donorCount}
                </p>
                <p className="text-xs text-muted-foreground">Donors</p>
              </div>
              <div>
                <p className="flex items-center justify-center gap-1 text-lg font-semibold text-primary">
                  <Clock className="size-4" aria-hidden />
                  {campaign.daysLeft}
                </p>
                <p className="text-xs text-muted-foreground">Days Left</p>
              </div>
            </div>

            <Tabs defaultValue="about">
              <TabsList variant="line" className="w-full justify-start">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="donors">Donors</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6 space-y-4">
                <p className="leading-relaxed text-muted-foreground">
                  {campaign.description}
                </p>
              </TabsContent>

              <TabsContent value="updates" className="mt-6 space-y-6">
                {MOCK_UPDATES.map((update) => (
                  <article key={update.date} className="space-y-2">
                    <time
                      dateTime={update.date}
                      className="text-xs text-muted-foreground"
                    >
                      {new Date(update.date).toLocaleDateString('en-LK', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    <h3 className="font-medium">{update.title}</h3>
                    <p className="text-sm text-muted-foreground">{update.body}</p>
                    <Separator />
                  </article>
                ))}
              </TabsContent>

              <TabsContent value="donors" className="mt-6">
                <DonorList donors={donors} limit={10} />
              </TabsContent>
            </Tabs>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Share this campaign
              </h2>
              <ShareButtons title={campaign.title} slug={campaign.slug} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <DonationForm
                campaignTitle={campaign.title}
                campaignId={campaign.id}
              />
            </div>
          </aside>
        </div>
      </div>

      <MobileDonationForm
        campaignTitle={campaign.title}
        campaignId={campaign.id}
      />
    </>
  );
}

function MobileDonationForm({
  campaignTitle,
  campaignId,
}: {
  campaignTitle: string;
  campaignId: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-[var(--color-surface)] p-4 shadow-lg lg:hidden">
      <div className="flex justify-end mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          aria-label="Close donation form"
        >
          <X className="size-4" />
        </Button>
      </div>
      <DonationForm campaignTitle={campaignTitle} campaignId={campaignId} />
    </div>
  );
}
