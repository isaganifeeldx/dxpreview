import type { InteriorsPageContentData } from '@/lib/interiors/types'
import { getSiteUrl } from '@/lib/siteUrl'
import type { SeoData } from './types'

type BuildInteriorsJsonLdInput = {
  content: InteriorsPageContentData
  seo?: SeoData
}

export function buildInteriorsPageJsonLd({
  content,
  seo,
}: BuildInteriorsJsonLdInput): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = seo?.canonicalUrl || `${siteUrl}/product/dx-interiors`
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
        name: 'DX Interiors',
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
