'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.nav
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[var(--color-surface)] shadow-2xl md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
              <span
                className="font-[family-name:var(--font-dm-serif)] text-lg text-[var(--color-primary)]"
              >
                Menu
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X className="size-5" />
              </Button>
            </div>

            <ul className="flex-1 overflow-y-auto px-6 py-6">
              {links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      'block rounded-lg px-3 py-3 text-base font-medium text-[var(--color-text)] transition-colors',
                      'hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)]'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="border-t border-[var(--color-border)] p-6">
              <Link
                href="/donate"
                onClick={onClose}
                className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-[var(--color-accent)] text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-accent)]/90"
              >
                Donate Now
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
