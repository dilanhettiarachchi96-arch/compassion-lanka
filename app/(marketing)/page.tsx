import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { CampaignGrid } from '@/components/home/CampaignGrid';
import { ImpactStories } from '@/components/home/ImpactStories';
import { GoodsCTA } from '@/components/home/GoodsCTA';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';
import { getFeaturedCampaigns, getImpactStats } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Every child deserves a better tomorrow. Help homeless children in Sri Lanka with clothes, food, medicine, and school supplies.',
};

export default async function HomePage() {
  const [campaigns, stats] = await Promise.all([
    getFeaturedCampaigns(6),
    getImpactStats(),
  ]);

  return (
    <>
      <HeroSection stats={stats} />
      <HowItWorks />
      <CampaignGrid campaigns={campaigns} />
      <ImpactStories />
      <GoodsCTA />
      <NewsletterSignup />
    </>
  );
}
