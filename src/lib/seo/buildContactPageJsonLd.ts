import { getSiteUrl } from '@/lib/siteUrl'
import type { ContactPageContentData } from '@/lib/contact/types'

/** ContactPage JSON-LD from the same phone/email shown on the page. */
export function buildContactPageJsonLd(
  content: ContactPageContentData,
): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = content.seo.canonicalUrl || `${siteUrl}/contact`
  const { phone, email } = content.quickEnquiries

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${pageUrl}#contactpage`,
    url: pageUrl,
    name: content.seo.title || content.banner.title,
    ...(content.seo.description ? { description: content.seo.description } : {}),
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'DX Interiors',
    },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'DX Interiors',
      url: siteUrl,
      ...(phone ? { telephone: phone } : {}),
      ...(email ? { email } : {}),
    },
    inLanguage: 'en-AU',
  }
}
