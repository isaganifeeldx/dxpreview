import { getSiteUrl } from '@/lib/siteUrl'
import type { InspirationItem, InspirationPageContentData } from '@/lib/inspiration/types'
import type { SeoData } from './types'

type BuildInspirationJsonLdInput = {
  content: InspirationPageContentData
  seo?: SeoData
}

export function buildInspirationPageJsonLd({
  content,
  seo,
}: BuildInspirationJsonLdInput): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = seo?.canonicalUrl || `${siteUrl}/inspiration`
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
        '@id': `${pageUrl}#inspiration`,
        name: title,
        itemListElement: content.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.title,
          url: `${siteUrl}/inspiration/${item.slug}`,
        })),
      },
    ],
  }
}

export function buildInspirationItemJsonLd(item: InspirationItem): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = item.seo.canonicalUrl || `${siteUrl}/inspiration/${item.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${pageUrl}#inspiration`,
    name: item.title,
    description: item.overview,
    image: [item.image],
    url: pageUrl,
    genre: item.category,
    keywords: [item.designStyle, item.color, item.category].join(', '),
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'DX Interiors',
    },
    inLanguage: 'en-AU',
  }
}
