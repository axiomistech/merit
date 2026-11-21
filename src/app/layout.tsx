import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FORT Learning — Knowledge. Built Strong.',
    template: '%s | FORT Learning',
  },
  description:
    'Institutional digital learning and examination practice platform for NEET, JEE Main, JEE Advanced, UPSC, and Engineering aspirants. Data-driven practice, live OMR sheets, server-authoritative mock simulations, and precision analytics.',
  keywords: [
    'NEET practice',
    'JEE Main mock tests',
    'JEE Advanced simulation',
    'UPSC answer writing',
    'Live OMR sheet',
    'Exam analytics',
    'FORT Learning',
  ],
  authors: [{ name: 'FORT Learning' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fortlearning.com'),
  openGraph: {
    title: 'FORT Learning — Knowledge. Built Strong.',
    description:
      'Serious digital learning and examination practice infrastructure built around concepts, questions, simulations, and continuous improvement.',
    url: 'https://fortlearning.com',
    siteName: 'FORT Learning',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FORT Learning — Knowledge. Built Strong.',
    description: 'Precision examination practice with live OMR simulation and honest analytics.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F1F3F4] text-[#20252B] antialiased selection:bg-[#9CC6E0]/40 selection:text-[#20252B]">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="top-right" theme="light" richColors />
      </body>
    </html>
  );
}
