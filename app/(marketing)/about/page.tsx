import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockTeamMembers } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Compassion Lanka Foundation — our mission, team, and commitment to Sri Lankan children.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader
        eyebrow="About Us"
        title="Compassion Lanka Foundation"
        description="Registered charity serving homeless and underprivileged children across Sri Lanka since 2008."
      />

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6">
            <h2 className="font-[family-name:var(--font-dm-serif)] text-xl text-primary">Our Mission</h2>
            <p className="mt-3 text-muted-foreground">
              To ensure every homeless and underprivileged child in Sri Lanka has access to
              clothing, nutrition, healthcare, and education.
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6">
            <h2 className="font-[family-name:var(--font-dm-serif)] text-xl text-primary">Our Vision</h2>
            <p className="mt-3 text-muted-foreground">
              A Sri Lanka where no child goes to sleep hungry, cold, or without hope.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="prose prose-neutral mt-12 max-w-3xl">
        <h2 className="font-[family-name:var(--font-dm-serif)] text-2xl">Our Story</h2>
        <p className="text-muted-foreground">
          Compassion Lanka Foundation was founded in 2008 by a group of social workers who witnessed
          firsthand the plight of abandoned children in Colombo&apos;s streets. What began as a small
          clothing drive in a church hall has grown into a nationwide network serving 47 partner
          homes across all nine provinces.
        </p>
        <p className="text-muted-foreground">
          Today, we connect international donors with local communities through transparent
          campaigns, goods shipment tracking, and child sponsorship programs. Every rupee and every
          parcel is accounted for — our finance team publishes quarterly reports available to all donors.
        </p>
        <p className="text-muted-foreground">
          We believe that compassion knows no borders. Whether you donate LKR 500 or ship a bale of
          clothes from Melbourne, you become part of a movement that has touched over 12,400 lives.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="mb-8 text-center font-[family-name:var(--font-dm-serif)] text-2xl">Our Team</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mockTeamMembers.map((member) => (
            <Card key={member.id} className="rounded-2xl text-center shadow-md">
              <CardContent className="p-6">
                <Avatar className="mx-auto h-20 w-20">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 font-semibold">{member.name}</h3>
                <p className="text-sm font-medium text-accent">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-12 rounded-2xl border-primary/20 bg-primary/5 shadow-md">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-primary">Registration Details</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Registered under the Voluntary Social Service Organizations Act No. 31 of 1980.
              Registration No: VSSO/2008/CLF/0342
            </p>
          </div>
          <Link href="#" className={cn(buttonVariants({ variant: 'outline' }))}>
            <Download className="mr-2 h-4 w-4" aria-hidden />
            Download Annual Report
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
