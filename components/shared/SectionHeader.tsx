import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]"
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-[family-name:var(--font-dm-serif)] text-3xl text-[var(--color-text)] md:text-4xl',
          description && 'mb-4'
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
