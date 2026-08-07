import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Resolve async metadata before streaming HTML so SEO tags stay in <head>.
  htmlLimitedBots: /.*/,
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
