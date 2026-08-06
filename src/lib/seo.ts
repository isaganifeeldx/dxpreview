import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/siteUrl';

const siteUrl = getSiteUrl();

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'DXI AI',
    template: '%s | DXI AI',
  },
  description:
    'AI-powered interior design — explore styles, visualise spaces, and create inspiring rooms with DXI AI.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'DXI AI',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
  },
};
