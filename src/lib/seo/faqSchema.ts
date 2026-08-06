import { getSiteUrl } from '@/lib/siteUrl'
import type { FaqItem } from '@/data/faqData'
import type { SeoData } from '@/lib/seo/types'

type BuildFaqJsonLdInput = {
  items: FaqItem[]
  seo?: SeoData
}

/** FAQPage JSON-LD from the same items shown in the UI. */
export function buildFaqPageJsonLd({
  items,
  seo,
}: BuildFaqJsonLdInput): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = seo?.canonicalUrl || `${siteUrl}/faq`

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faqpage`,
    url: pageUrl,
    ...(seo?.title ? { name: seo.title } : {}),
    ...(seo?.description ? { description: seo.description } : {}),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
