import type { SpaceSensePageContentData } from '@/lib/spacesense/types'
import { getSiteUrl } from '@/lib/siteUrl'
import type { SeoData } from './types'

type BuildSpaceSenseJsonLdInput = {
  content: SpaceSensePageContentData
  seo?: SeoData
}

export function buildSpaceSensePageJsonLd({
  content,
  seo,
}: BuildSpaceSenseJsonLdInput): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = seo?.canonicalUrl || `${siteUrl}/product/spacesense-ai`
  const title = seo?.title || content.hero.title
  const description = seo?.description || content.hero.description

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: 'en-AU',
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${pageUrl}#software`,
        name: 'SpaceSense AI',
        applicationCategory: 'DesignApplication',
        description,
        url: pageUrl,
        offers: {
          '@type': 'Offer',
          url: `${siteUrl}/login`,
        },
      },
    ],
  }
}
