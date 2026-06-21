'use client';

import { Heart, Menu, Moon, Sun, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MobileMenu, type NavLink } from '@/components/layout/MobileMenu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/campaigns', label: 'Campaigns' },
  { href: '/send-goods', label: 'Send Goods' },
  { href: '/homes', label: 'Homes' },
  { href: '/how-we-help', label: 'How We Help' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'si'>('en');
  const [user, setUser] = useState<any>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'si' : 'en'));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full border-b transition-all duration-300',
          scrolled
            ? 'border-[var(--color-border)] bg-white/90 shadow-sm backdrop-blur-md dark:bg-[var(--color-text)]/90'
            : 'border-transparent bg-[var(--color-surface)]'
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Heart
              className="size-7 fill-[var(--color-primary)] text-[var(--color-primary)]"
              aria-hidden="true"
            />
            <span
              className="font-[family-name:var(--font-dm-serif)] text-lg text-[var(--color-primary)] sm:text-xl"
            >
              Compassion Lanka
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="hidden items-center gap-0.5 rounded-lg px-2 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-colors hover:bg-muted sm:flex"
              aria-label="Toggle language"
            >
              <span
                className={cn(
                  language === 'en' && 'font-semibold text-[var(--color-primary)]'
                )}
              >
                EN
              </span>
              <span className="text-[var(--color-border)]">|</span>
              <span
                className={cn(
                  language === 'si' && 'font-semibold text-[var(--color-primary)]'
                )}
              >
                සිං
              </span>
            </button>

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="text-[var(--color-muted)]"
            >
              {mounted &&
                (resolvedTheme === 'dark' ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                ))}
            </Button>

            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="hidden h-7 items-center justify-center rounded-[min(var(--radius-md),12px)] bg-[var(--color-accent)] px-2.5 text-[0.8rem] font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-accent)]/90 sm:inline-flex"
                >
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleLogout}
                  aria-label="Logout"
                  className="text-[var(--color-muted)] hidden sm:flex"
                >
                  <LogOut className="size-4" />
                </Button>
              </>
            )}

            {!user && (
              <Link
                href="/donate"
                className="hidden h-7 items-center justify-center rounded-[min(var(--radius-md),12px)] bg-[var(--color-accent)] px-2.5 text-[0.8rem] font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-accent)]/90 sm:inline-flex"
              >
                Donate Now
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}
