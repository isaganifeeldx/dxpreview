import type { Metadata } from 'next';
import SiteShell from '@/components/layout/SiteShell';
import { defaultMetadata } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = defaultMetadata;

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className="antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
