import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CampaignDetailClient } from '@/components/campaigns/CampaignDetailClient';
import { getCampaignBySlug, getCampaignDonors } from '@/lib/queries';

interface CampaignDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CampaignDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    return { title: 'Campaign Not Found' };
  }

  return {
    title: campaign.title,
    description: campaign.shortDescription,
    openGraph: {
      title: campaign.title,
      description: campaign.shortDescription,
      images: [campaign.imageUrl],
    },
  };
}

export default async function CampaignDetailPage({
  params,
}: CampaignDetailPageProps) {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const donors = await getCampaignDonors(campaign.id, 10);

  return <CampaignDetailClient campaign={campaign} donors={donors} />;
}
