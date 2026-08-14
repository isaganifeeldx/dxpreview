import type { Metadata } from 'next'
import BusinessPageContent from '@/components/pages/business/BusinessPageContent'
import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { getBusinessPageContent } from '@/lib/business/getBusinessPageContent'
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata'
import { buildBusinessPageJsonLd } from '@/lib/seo/buildBusinessJsonLd'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const content = await getBusinessPageContent()

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/business',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/render-1.jpg',
    siteName: 'DX Interiors',
    absoluteTitle: true,
  })
}

export default async function BusinessPage() {
  const content = await getBusinessPageContent()
  const defaultJsonLd = buildBusinessPageJsonLd({
    content,
    seo: content.seo,
  })

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <BusinessPageContent content={content} />
    </>
  )
}
