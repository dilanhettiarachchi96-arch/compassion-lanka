import type { Metadata } from 'next';
import { DM_Serif_Display, Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const dmSerif = DM_Serif_Display({
  variable: '--font-dm-serif',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Compassion Lanka Foundation',
    template: '%s | Compassion Lanka',
  },
  description:
    'Helping homeless children and families in Sri Lanka with clothes, food, medicine, and school supplies.',
  openGraph: {
    title: 'Compassion Lanka Foundation',
    description:
      'Join thousands worldwide helping children in Sri Lanka.',
    images: ['/images/hero.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${dmSerif.variable} min-h-screen bg-[var(--color-bg)] font-[family-name:var(--font-inter)] text-[var(--color-text)] antialiased`}
      >
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
