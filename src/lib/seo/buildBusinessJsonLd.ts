import { getSiteUrl } from '@/lib/siteUrl'
import type { BusinessPageContentData } from '@/lib/business/types'
import type { SeoData } from './types'

type BuildBusinessJsonLdInput = {
  content: BusinessPageContentData
  seo?: SeoData
}

export function buildBusinessPageJsonLd({
  content,
  seo,
}: BuildBusinessJsonLdInput): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = seo?.canonicalUrl || `${siteUrl}/business`
  const title = seo?.title || `${content.hero.titleBefore} ${content.hero.titleAccent}`
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
        '@type': 'ContactPage',
        '@id': `${pageUrl}#contact`,
        url: pageUrl,
        name: content.form.title,
        description: content.form.subtitle,
      },
    ],
  }
}
