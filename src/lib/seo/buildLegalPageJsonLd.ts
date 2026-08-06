import { getSiteUrl } from '@/lib/siteUrl'
import type { SeoData } from '@/lib/seo/types'

type BuildLegalPageJsonLdInput = {
  path: string
  pageTitle: string
  seo: SeoData
}

/** Simple WebPage JSON-LD for legal pages (Terms / Privacy). */
export function buildLegalPageJsonLd({
  path,
  pageTitle,
  seo,
}: BuildLegalPageJsonLdInput): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = seo.canonicalUrl || `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
  const name = seo.title || pageTitle
  const description = seo.description

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    ...(description ? { description } : {}),
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'DX Interiors',
    },
    inLanguage: 'en-AU',
  }
}
