import type { Metadata } from 'next';
import { CampaignListing } from '@/components/campaigns/CampaignFilter';
import { getCampaigns } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Campaigns',
  description:
    'Browse active fundraising campaigns supporting children across Sri Lanka. Donate to clothes, food, medicine, and school supply drives.',
  openGraph: {
    title: 'Active Campaigns | Compassion Lanka',
    description:
      'Find and support urgent campaigns helping children in need across Sri Lanka.',
  },
};

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-2">
        <h1 className="font-[family-name:var(--font-dm-serif)] text-3xl text-primary sm:text-4xl">
          Active Campaigns
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Every donation goes directly to children in need. Filter by category or
          urgency to find a cause that speaks to you.
        </p>
      </div>

      <CampaignListing campaigns={campaigns} />
    </div>
  );
}
