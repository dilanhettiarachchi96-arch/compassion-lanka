import type { Metadata } from 'next';
import { Check, X } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ShipmentForm } from '@/components/goods/ShipmentForm';
import { ChildSponsorCard } from '@/components/goods/ChildSponsorCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { GOODS_ADDRESS } from '@/lib/mock-data';
import { getSponsoredChildren } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Send Goods',
  description: 'Ship clothing, books, and supplies to children in Sri Lanka or sponsor a school kit.',
};

const accepted = ['Clothes', 'Shoes', 'Blankets', 'Books', 'Stationery', 'Packaged Food', 'OTC Medicine'];
const notAccepted = ['Electronics', 'Perishables', 'Used Undergarments'];

const packingSteps = [
  'Sort and clean all items',
  'Pack in a sturdy cardboard box or bale bag (max 25kg)',
  'Label the box clearly with "CHARITY DONATION — COMPASSION LANKA"',
  'Register your shipment below (so we can track and acknowledge receipt)',
  'Ship via your local postal service or courier to our address',
];

export default async function SendGoodsPage() {
  const sponsoredChildren = await getSponsoredChildren();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader
        eyebrow="Send Goods"
        title="Ship Hope to Sri Lanka"
        description="Send a bale of goods from anywhere in the world, or sponsor a child's complete school kit."
      />

      <Tabs defaultValue="goods" className="mt-10">
        <TabsList className="mb-8">
          <TabsTrigger value="goods">Send a Goods Bale</TabsTrigger>
          <TabsTrigger value="sponsor">Sponsor a School Kit</TabsTrigger>
        </TabsList>

        <TabsContent value="goods" className="space-y-8">
          <Card className="rounded-2xl border-primary/20 bg-primary/5 shadow-md">
            <CardContent className="p-6">
              <h3 className="font-[family-name:var(--font-dm-serif)] text-lg font-semibold text-primary">
                Ship To:
              </h3>
              <address className="mt-2 not-italic text-sm leading-relaxed">
                {GOODS_ADDRESS.name}<br />
                {GOODS_ADDRESS.line1}<br />
                {GOODS_ADDRESS.line2}<br />
                Tel: {GOODS_ADDRESS.phone}<br />
                Email: {GOODS_ADDRESS.email}
              </address>
            </CardContent>
          </Card>

          <div>
            <h3 className="mb-4 font-[family-name:var(--font-dm-serif)] text-xl">Packing Guide</h3>
            <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
              {packingSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-success">Accepted Items</h4>
              <ul className="space-y-1">
                {accepted.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success" aria-hidden /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-destructive">Not Accepted</h4>
              <ul className="space-y-1">
                {notAccepted.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <X className="h-4 w-4 text-destructive" aria-hidden /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-[family-name:var(--font-dm-serif)] text-xl">Register Your Shipment</h3>
            <ShipmentForm />
          </div>
        </TabsContent>

        <TabsContent value="sponsor" className="space-y-6">
          <p className="text-muted-foreground">
            Sponsor a child&apos;s full school kit for 2025. We match your donation to a specific
            child and send you an impact update.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsoredChildren.map((child) => (
              <ChildSponsorCard key={child.id} child={child} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
