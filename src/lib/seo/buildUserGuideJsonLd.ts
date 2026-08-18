import { getSiteUrl } from '@/lib/siteUrl'
import type { UserGuideItem, UserGuidePageContentData } from '@/lib/user-guide/types'
import type { SeoData } from './types'

type BuildUserGuideJsonLdInput = {
  content: UserGuidePageContentData
  seo?: SeoData
}

export function buildUserGuidePageJsonLd({
  content,
  seo,
}: BuildUserGuideJsonLdInput): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = seo?.canonicalUrl || `${siteUrl}/user-guide`
  const title = seo?.title || content.hero.title
  const description = seo?.description || content.hero.description

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: 'en-AU',
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#guides`,
        name: title,
        itemListElement: [content.featured, ...content.guides].map((guide, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: guide.title,
          url: `${siteUrl}${guide.href}`,
        })),
      },
    ],
  }
}

export function buildUserGuideItemJsonLd(guide: UserGuideItem): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = guide.seo.canonicalUrl || `${siteUrl}/user-guide/${guide.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${pageUrl}#guide`,
    name: guide.title,
    description: guide.description,
    url: pageUrl,
    inLanguage: 'en-AU',
    publisher: {
      '@type': 'Organization',
      name: 'DX Interiors',
      url: siteUrl,
    },
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'User Guide',
      url: `${siteUrl}/user-guide`,
    },
  }
}
