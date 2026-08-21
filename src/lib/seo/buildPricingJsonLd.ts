import { getSiteUrl } from '@/lib/siteUrl'
import type { PricingPageContentData } from '@/lib/pricing/types'
import type { SeoData } from './types'

type BuildPricingJsonLdInput = {
  content: PricingPageContentData
  seo?: SeoData
}

/** OfferCatalog + FAQPage structured data for the pricing page. */
export function buildPricingPageJsonLd({
  content,
  seo,
}: BuildPricingJsonLdInput): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = seo?.canonicalUrl || `${siteUrl}/plans`
  const title = seo?.title || content.title
  const description = seo?.description || ''

  const offers = content.plans.map((plan) => {
    const price = plan.monthlyPrice
    const offer: Record<string, unknown> = {
      '@type': 'Offer',
      name: plan.name,
      description: plan.description,
      url: `${siteUrl}${plan.cta.href}`,
    }

    if (price !== null) {
      offer.price = String(price)
      offer.priceCurrency = 'AUD'
      offer.priceSpecification = {
        '@type': 'UnitPriceSpecification',
        price: String(price),
        priceCurrency: 'AUD',
        billingDuration: 'P1M',
      }
    }

    return offer
  })

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
        '@type': 'OfferCatalog',
        '@id': `${pageUrl}#offers`,
        name: content.title,
        url: pageUrl,
        itemListElement: offers,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faqpage`,
        url: pageUrl,
        mainEntity: content.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  }
}
