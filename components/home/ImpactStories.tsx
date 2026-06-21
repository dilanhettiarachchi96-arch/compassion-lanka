'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatCategory } from '@/lib/format';
import { mockImpactStories } from '@/lib/mock-data';
import type { ImpactStory } from '@/types';

const stories = mockImpactStories.slice(0, 3);

function StoryCard({
  story,
  onReadMore,
}: {
  story: ImpactStory;
  onReadMore: (story: ImpactStory) => void;
}) {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={story.imageUrl}
          alt={`${story.firstName}'s story`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">
          {story.firstName}, {story.age} · {story.location}
        </CardTitle>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {formatCategory(story.program)} Program
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Quote className="mt-0.5 size-4 shrink-0 text-accent" />
          <p className="text-sm italic leading-relaxed text-muted-foreground">
            &ldquo;{story.quote}&rdquo;
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={() => onReadMore(story)}>
          Read Full Story
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ImpactStories() {
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);

  return (
    <section className="bg-[var(--color-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-dm-serif)] text-3xl text-primary md:text-4xl">
            Lives Changed
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Real stories from children whose lives were transformed by your
            generosity.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onReadMore={setSelectedStory}
            />
          ))}
        </div>

        <Dialog
          open={selectedStory !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedStory(null);
          }}
        >
          {selectedStory && (
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-[family-name:var(--font-dm-serif)] text-2xl">
                  {selectedStory.firstName}&apos;s Story
                </DialogTitle>
                <DialogDescription>
                  {selectedStory.age} years old · {selectedStory.location} ·{' '}
                  {formatCategory(selectedStory.program)} Program
                </DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={selectedStory.imageUrl}
                  alt={`${selectedStory.firstName}'s story`}
                  fill
                  className="object-cover"
                  sizes="512px"
                />
              </div>
              <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
                &ldquo;{selectedStory.quote}&rdquo;
              </blockquote>
              <p className="leading-relaxed text-foreground">
                {selectedStory.fullStory}
              </p>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
}
