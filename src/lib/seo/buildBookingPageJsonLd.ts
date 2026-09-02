import { getSiteUrl } from '@/lib/siteUrl'
import type { BookingPageContentData } from '@/lib/booking/types'

export function buildBookingPageJsonLd(
  content: BookingPageContentData,
): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = content.seo.canonicalUrl || `${siteUrl}/booking`

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#booking`,
    url: pageUrl,
    name: content.seo.title || content.banner.title,
    ...(content.seo.description ? { description: content.seo.description } : {}),
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'DX Interiors',
    },
    inLanguage: 'en-AU',
  }
}
