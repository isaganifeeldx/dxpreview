import { getSiteUrl } from '@/lib/siteUrl'
import type { ArticleItem } from '@/lib/articles/types'
import type { SeoData } from '@/lib/seo/types'

export function buildArticlesListJsonLd(seo: SeoData): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = seo.canonicalUrl || `${siteUrl}/articles`

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: seo.title || 'Articles | DX Interiors',
    ...(seo.description ? { description: seo.description } : {}),
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'DX Interiors',
    },
    inLanguage: 'en-AU',
  }
}

export function buildArticleJsonLd(article: ArticleItem): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = article.seo.canonicalUrl || `${siteUrl}/articles/${article.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    image: [article.image],
    articleSection: article.category,
    mainEntityOfPage: pageUrl,
    author: {
      '@type': 'Organization',
      name: 'DX Interiors',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DX Interiors',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/landing/logo.svg`,
      },
    },
    inLanguage: 'en-AU',
  }
}
