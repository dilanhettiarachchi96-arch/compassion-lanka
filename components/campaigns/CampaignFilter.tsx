'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { Campaign, CampaignCategory } from '@/types';

export type CategoryFilter = CampaignCategory | 'all';
export type SortOption = 'urgent' | 'newest' | 'funded' | 'ending';

const categories: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'clothes', label: 'Clothes' },
  { value: 'food', label: 'Food' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'school_supplies', label: 'School Supplies' },
];

interface CampaignFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: CategoryFilter;
  onCategoryChange: (value: CategoryFilter) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function CampaignFilter({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: CampaignFilterProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
          aria-label="Search campaigns"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onCategoryChange(item.value)}
              className={cn(
                'rounded-full border px-3 py-1 text-sm font-medium transition-colors',
                category === item.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="w-full sm:w-44" aria-label="Sort campaigns">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="urgent">Most Urgent</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="funded">Most Funded</SelectItem>
            <SelectItem value="ending">Ending Soon</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function filterAndSortCampaigns(
  campaigns: Campaign[],
  search: string,
  category: CategoryFilter,
  sort: SortOption
): Campaign[] {
  const query = search.trim().toLowerCase();

  let result = campaigns.filter((c) => c.isActive);

  if (query) {
    result = result.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query) ||
        c.shortDescription.toLowerCase().includes(query)
    );
  }

  if (category !== 'all') {
    result = result.filter((c) => c.category === category);
  }

  return [...result].sort((a, b) => {
    switch (sort) {
      case 'urgent':
        if (a.isUrgent !== b.isUrgent) return a.isUrgent ? -1 : 1;
        return a.daysLeft - b.daysLeft;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'funded':
        return b.raisedAmount / b.goalAmount - a.raisedAmount / a.goalAmount;
      case 'ending':
        return a.daysLeft - b.daysLeft;
      default:
        return 0;
    }
  });
}

interface CampaignListingProps {
  campaigns: Campaign[];
}

export function CampaignListing({ campaigns }: CampaignListingProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sort, setSort] = useState<SortOption>('urgent');

  const filtered = useMemo(
    () => filterAndSortCampaigns(campaigns, search, category, sort),
    [campaigns, search, category, sort]
  );

  return (
    <div className="space-y-8">
      <CampaignFilter
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
      />

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          No campaigns match your filters. Try adjusting your search.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}
