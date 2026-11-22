import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'MERITWISE — Competitive Examination Practice & Assessment',
    template: '%s | MERITWISE',
  },
  description:
    'Practice with purpose. Progress with merit. Curated competitive examination papers, timed testing, authoritative evaluation, and performance diagnostics for NEET, JEE, UPSC, and GATE.',
  keywords: [
    'MERITWISE',
    'NEET practice',
    'JEE Main practice',
    'JEE Advanced',
    'UPSC Civil Services',
    'GATE examination',
    'timed mock tests',
    'question paper practice',
    'performance evaluation',
  ],
  authors: [{ name: 'MERITWISE' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://meritwise.in'),
  openGraph: {
    title: 'MERITWISE — Competitive Examination Practice & Assessment',
    description:
      'Practice with purpose. Progress with merit. Curated competitive examination papers, timed testing, authoritative evaluation, and performance diagnostics for NEET, JEE, UPSC, and GATE.',
    url: 'https://meritwise.in',
    siteName: 'MERITWISE',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MERITWISE — Practice with purpose. Progress with merit.',
    description: 'Curated examination papers, timed tests, and diagnostic insights for NEET, JEE, UPSC, and GATE.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/brand/logo-gold-icon.png', type: 'image/png' },
    ],
    apple: '/brand/logo-gold-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-sans bg-[#F8FAF6] text-[#121316] antialiased selection:bg-[#8C6D3B]/20 selection:text-[#121316]">
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#121316',
              border: '1px solid #E4E4DF',
              borderRadius: '16px',
              fontSize: '13px',
              fontFamily: 'var(--font-primary)',
            },
          }}
        />
      </body>
    </html>
  );
}
