import type { Metadata } from 'next'
import PricingPageContent from '@/components/pages/pricing/PricingPageContent'
import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { getPricingPageContent } from '@/lib/pricing/getPricingPageContent'
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata'
import { buildPricingPageJsonLd } from '@/lib/seo/buildPricingJsonLd'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPricingPageContent()

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/pricing',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/render-1.jpg',
    siteName: 'DX Interiors',
    absoluteTitle: true,
  })
}

export default async function PricingPage() {
  const content = await getPricingPageContent()
  const defaultJsonLd = buildPricingPageJsonLd({
    content,
    seo: content.seo,
  })

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <PricingPageContent content={content} />
    </>
  )
}
