import { getSiteUrl } from '@/lib/siteUrl'
import type { AboutPageContentData } from '@/lib/about/types'
import type { SeoData } from './types'

type BuildAboutJsonLdInput = {
  content: AboutPageContentData
  seo?: SeoData
}

export function buildAboutPageJsonLd({
  content,
  seo,
}: BuildAboutJsonLdInput): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = seo?.canonicalUrl || `${siteUrl}/about`
  const title = seo?.title || content.hero.title
  const description = seo?.description || content.hero.description

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: 'en-AU',
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'DX Interiors',
        url: siteUrl,
        description: content.mission.title,
      },
    ],
  }
}
