import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import { getS3ImageRemotePatterns } from './src/lib/cms/mediaStorage';

function siteActionOrigins(): string[] {
  const origins = new Set([
    'dxpreview-tau.vercel.app',
    'localhost:3000',
    'localhost:3005',
  ]);

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();
  if (siteUrl) {
    try {
      const url = new URL(
        /^https?:\/\//i.test(siteUrl) ? siteUrl : `https://${siteUrl}`,
      );
      origins.add(url.host);
    } catch {
      // ignore invalid NEXT_PUBLIC_SITE_URL
    }
  }

  return [...origins];
}

const nextConfig: NextConfig = {
  // Resolve async metadata before streaming HTML so SEO tags stay in <head>.
  htmlLimitedBots: /.*/,
  // Payload admin uses Server Actions; allow Vercel hosts + the public site URL
  // (EC2 domain) so Origin / x-forwarded-host mismatches don't abort.
  experimental: {
    serverActions: {
      allowedOrigins: siteActionOrigins(),
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.livid.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      ...getS3ImageRemotePatterns(),
    ],
    localPatterns: [
      {
        pathname: '/images/**',
      },
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/admin/login',
        permanent: false,
      },
      {
        source: '/pages/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pages/faq',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/pages/contact',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/pages/privacy-policy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/pages/terms-of-service',
        destination: '/terms-of-service',
        permanent: true,
      },
      {
        source: '/pages/articles',
        destination: '/articles',
        permanent: true,
      },
      {
        source: '/pages/articles/:slug',
        destination: '/articles/:slug',
        permanent: true,
      },
      {
        source: '/pages/pricing',
        destination: '/plans',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/plans',
        permanent: true,
      },
      {
        source: '/plan',
        destination: '/plans',
        permanent: true,
      },
      {
        source: '/pages/business',
        destination: '/business',
        permanent: true,
      },
      {
        source: '/pages/about',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/pages/user-guide',
        destination: '/user-guide',
        permanent: true,
      },
      {
        source: '/pages/user-guide/:slug',
        destination: '/user-guide/:slug',
        permanent: true,
      },
      {
        source: '/pages/tutorial',
        destination: '/tutorial',
        permanent: true,
      },
      {
        source: '/pages/tutorial/:slug',
        destination: '/tutorial/:slug',
        permanent: true,
      },
      {
        source: '/pages/inspiration',
        destination: '/inspiration',
        permanent: true,
      },
      {
        source: '/pages/inspiration/:slug',
        destination: '/inspiration/:slug',
        permanent: true,
      },
      {
        source: '/pages/product/dx-interiors',
        destination: '/product/dx-interiors',
        permanent: true,
      },
      {
        source: '/pages/product/spacesense-ai',
        destination: '/product/spacesense-ai',
        permanent: true,
      },
      {
        source: '/billing',
        destination: '/business',
        permanent: true,
      },
      {
        source: '/pages/billing',
        destination: '/business',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/', destination: '/pages/home' },
      { source: '/faq', destination: '/pages/faq' },
      { source: '/contact', destination: '/pages/contact' },
      { source: '/privacy-policy', destination: '/pages/privacy-policy' },
      { source: '/terms-of-service', destination: '/pages/terms-of-service' },
      { source: '/articles', destination: '/pages/articles' },
      { source: '/articles/:slug', destination: '/pages/articles/:slug' },
      { source: '/plans', destination: '/pages/pricing' },
      { source: '/business', destination: '/pages/business' },
      { source: '/about', destination: '/pages/about' },
      { source: '/user-guide', destination: '/pages/user-guide' },
      { source: '/user-guide/:slug', destination: '/pages/user-guide/:slug' },
      { source: '/tutorial', destination: '/pages/tutorial' },
      { source: '/tutorial/:slug', destination: '/pages/tutorial/:slug' },
      { source: '/inspiration', destination: '/pages/inspiration' },
      { source: '/inspiration/:slug', destination: '/pages/inspiration/:slug' },
      { source: '/product/dx-interiors', destination: '/pages/product/dx-interiors' },
      { source: '/product/spacesense-ai', destination: '/pages/product/spacesense-ai' },
    ];
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    };
    return webpackConfig;
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
