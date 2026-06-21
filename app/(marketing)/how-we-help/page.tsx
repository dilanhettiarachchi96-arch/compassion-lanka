import type { Metadata } from 'next';
import Image from 'next/image';
import { SectionHeader } from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'How We Help',
  description: 'Learn how Compassion Lanka delivers clothes, food, medical aid, and education to children across Sri Lanka.',
};

const programs = [
  {
    title: 'Clothes & Essentials',
    description:
      'We collect and distribute clothing bales from donors worldwide. Each bale is sorted, quality-checked, and matched to homes based on children\'s ages and sizes.',
    impact: ['3,200+ clothing items distributed', '18 countries shipped from'],
    image: '/images/campaign-1.jpg',
    reverse: false,
  },
  {
    title: 'Food Security',
    description:
      'Our monthly meal programs ensure partner homes can provide three nutritious meals daily. We fund rice, lentils, vegetables, milk, and eggs for every child.',
    impact: ['1,800 meals per month', '12 partner homes'],
    image: '/images/campaign-2.jpg',
    reverse: true,
  },
  {
    title: 'Medical Aid',
    description:
      'We supply OTC medicines, vitamins, and hygiene kits to children\'s homes and hospital wards. Regular health check-ups track each child\'s wellbeing.',
    impact: ['6,400 medicine packs', '8 hospital wards supported'],
    image: '/images/campaign-4.jpg',
    reverse: false,
  },
  {
    title: 'Education First',
    description:
      'Complete school kits — textbooks, uniforms, stationery — for Grades 1–11. No child should miss school because they cannot afford books.',
    impact: ['2,100 school kits', 'Grade 1–11 coverage'],
    image: '/images/campaign-3.jpg',
    reverse: true,
  },
];

export default function HowWeHelpPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader
        eyebrow="Our Programs"
        title="How We Help"
        description="Four pillars of support reaching children in every province of Sri Lanka."
      />

      <div className="mt-12 space-y-20">
        {programs.map((program) => (
          <div
            key={program.title}
            className={`grid items-center gap-8 md:grid-cols-2 ${program.reverse ? 'md:[direction:rtl]' : ''}`}
          >
            <div className={`relative h-64 overflow-hidden rounded-2xl shadow-md md:h-80 ${program.reverse ? 'md:[direction:ltr]' : ''}`}>
              <Image src={program.image} alt={program.title} fill className="object-cover" sizes="50vw" />
            </div>
            <div className={program.reverse ? 'md:[direction:ltr]' : ''}>
              <h2 className="font-[family-name:var(--font-dm-serif)] text-2xl md:text-3xl">
                {program.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{program.description}</p>
              <ul className="mt-4 space-y-2">
                {program.impact.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-medium text-primary">
                    <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="mb-8 text-center font-[family-name:var(--font-dm-serif)] text-2xl">
          Our Work in Pictures
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
              <Image
                src={`/images/gallery-${i + 1}.jpg`}
                alt={`Compassion Lanka program photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width:768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
