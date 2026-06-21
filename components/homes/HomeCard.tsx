import Image from 'next/image';
import { Phone, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import type { ChildrenHome } from '@/types';

interface HomeCardProps {
  home: ChildrenHome;
}

export function HomeCard({ home }: HomeCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-md">
      <div className="relative h-48">
        <Image
          src={home.imageUrl}
          alt={home.name}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-dm-serif)] text-xl">
          {home.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {home.district} · {home.location}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm font-medium">{home.childrenCount} children</p>
        <div className="flex flex-wrap gap-2">
          {home.currentNeeds.map((need) => (
            <CategoryBadge key={need} category={need} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{home.description}</p>
        <div className="space-y-1 text-sm">
          <p className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" aria-hidden />
            {home.contactPerson}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" aria-hidden />
            {home.phone}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
