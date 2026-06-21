import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatCurrency } from '@/lib/format';
import { mockDonors } from '@/lib/mock-data';
import type { Donor } from '@/types';

interface DonorListProps {
  donors?: Donor[];
  limit?: number;
}

export function DonorList({ donors: donorsProp, limit }: DonorListProps = {}) {
  const source = donorsProp ?? mockDonors;
  const donors = limit ? source.slice(0, limit) : source;

  return (
    <ul className="divide-y divide-border">
      {donors.map((donor, index) => {
        const displayName = donor.anonymous ? 'Anonymous' : donor.name;
        const initials = donor.anonymous
          ? '?'
          : donor.name
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();

        return (
          <li
            key={`${donor.date}-${index}`}
            className="flex items-center justify-between gap-4 py-4 first:pt-0"
          >
            <div className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary/10 text-xs text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(donor.date).toLocaleDateString('en-LK', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <span className="text-sm font-semibold text-primary">
              {formatCurrency(donor.amount)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
