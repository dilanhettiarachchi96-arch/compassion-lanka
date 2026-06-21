import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/format';
import type { SponsoredChild } from '@/types';

interface ChildSponsorCardProps {
  child: SponsoredChild;
}

export function ChildSponsorCard({ child }: ChildSponsorCardProps) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="font-[family-name:var(--font-dm-serif)] text-lg">
            Grade {child.grade} · Age {child.age}
          </CardTitle>
          {child.isSponsored && (
            <Badge variant="secondary">Already Sponsored</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{child.schoolName}</p>
        <p className="text-sm text-muted-foreground">{child.district}</p>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-sm font-medium">Items needed:</p>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          {child.itemsNeeded.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-lg font-semibold text-primary">
          {formatCurrency(child.sponsorshipCostLKR)}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-accent text-primary hover:bg-accent/90"
          disabled={child.isSponsored}
        >
          {child.isSponsored ? 'Already Sponsored' : 'Sponsor This Child'}
        </Button>
      </CardFooter>
    </Card>
  );
}
