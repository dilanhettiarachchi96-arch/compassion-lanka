import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Download } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  mockDashboardDonations,
  mockDashboardShipments,
  mockSponsoredChildren,
} from '@/lib/mock-data';
import { formatCurrency } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View your donations, shipments, and sponsored children.',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Show dashboard with mock data when not authenticated (demo mode)
  const isDemo = !user;

  if (!user && process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_url') {
    // Allow demo access with stub env
  } else if (!user) {
    redirect('/login');
  }

  const sponsored = mockSponsoredChildren.filter((c) => c.isSponsored);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-dm-serif)] text-3xl">My Dashboard</h1>
          {isDemo && (
            <p className="mt-1 text-sm text-muted-foreground">Demo mode — showing sample data</p>
          )}
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" aria-hidden />
          Download Receipt
        </Button>
      </div>

      <Tabs defaultValue="donations" className="mt-8">
        <TabsList>
          <TabsTrigger value="donations">My Donations</TabsTrigger>
          <TabsTrigger value="shipments">My Shipments</TabsTrigger>
          <TabsTrigger value="sponsored">Sponsored Children</TabsTrigger>
        </TabsList>

        <TabsContent value="donations" className="mt-6">
          <div className="overflow-x-auto rounded-2xl border shadow-md">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left">Campaign</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockDashboardDonations.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="px-4 py-3">{d.campaign}</td>
                    <td className="px-4 py-3">{formatCurrency(d.amount)}</td>
                    <td className="px-4 py-3">{d.date}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{d.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="shipments" className="mt-6">
          <div className="overflow-x-auto rounded-2xl border shadow-md">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left">Contents</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockDashboardShipments.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="px-4 py-3">{s.contents}</td>
                    <td className="px-4 py-3">{s.date}</td>
                    <td className="px-4 py-3">
                      <Badge>{s.status.replace('_', ' ')}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="sponsored" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sponsored.map((child) => (
              <Card key={child.id} className="rounded-2xl shadow-md">
                <CardContent className="p-4">
                  <p className="font-semibold">Grade {child.grade} · Age {child.age}</p>
                  <p className="text-sm text-muted-foreground">{child.schoolName}</p>
                  <p className="text-sm text-muted-foreground">{child.district}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
