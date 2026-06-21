import type { Metadata } from 'next';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { HomeCard } from '@/components/homes/HomeCard';
import { HomesMapWrapper } from '@/components/homes/HomesMapWrapper';
import { getHomes } from '@/lib/queries';

export const metadata: Metadata = {
  title: "Children's Homes",
  description: 'Explore our partner children\'s homes across Sri Lanka on an interactive map.',
};

export default async function HomesPage() {
  const homes = await getHomes();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader
        eyebrow="Our Partners"
        title="Children's Homes Across Sri Lanka"
        description="We partner with registered homes in every province to ensure your donations reach children who need them most."
      />
      <div className="mb-12">
        <HomesMapWrapper homes={homes} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {homes.map((home) => (
          <HomeCard key={home.id} home={home} />
        ))}
      </div>
    </div>
  );
}
