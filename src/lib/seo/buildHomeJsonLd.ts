import { getSiteUrl } from '@/lib/siteUrl'
import type { SeoData } from './types'

type HomeJsonLdInput = {
  seo: SeoData
  organizationName?: string
}

/** Homepage structured data: WebSite + Organization + WebPage. */
export function buildHomeJsonLd({
  seo,
  organizationName = 'DX Interiors',
}: HomeJsonLdInput): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const title = seo.title || 'DXI AI | AI Interior Design'
  const description =
    seo.description ||
    'AI-powered interior design — explore styles, visualise spaces, and create inspiring rooms with DXI AI.'
  const pageUrl = seo.canonicalUrl || `${siteUrl}/`
  const image = seo.ogImageUrl || seo.twitterImageUrl

  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: organizationName,
    url: siteUrl,
    logo: `${siteUrl}/images/landing/logo.svg`,
  }

  const website: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'DXI AI',
    description,
    publisher: { '@id': `${siteUrl}/#organization` },
    inLanguage: 'en-AU',
  }

  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` },
    inLanguage: 'en-AU',
  }

  if (seo.focusKeyword) {
    webPage.keywords = seo.focusKeyword
  }

  if (image) {
    const absoluteImage = /^https?:\/\//i.test(image) ? image : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`
    webPage.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: absoluteImage,
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website, webPage],
  }
}
