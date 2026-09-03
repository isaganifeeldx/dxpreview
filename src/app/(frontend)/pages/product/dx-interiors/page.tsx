import type { Metadata } from 'next'
import InteriorsPageContent from '@/components/pages/interiors/InteriorsPageContent'
import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { getInteriorsPageContent } from '@/lib/interiors/getInteriorsPageContent'
import { buildInteriorsPageJsonLd } from '@/lib/seo/buildInteriorsJsonLd'
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const content = await getInteriorsPageContent()

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/product/dx-interiors',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/render-1.jpg',
    siteName: 'DX Interiors',
    absoluteTitle: true,
  })
}

export default async function DxInteriorsPage() {
  const content = await getInteriorsPageContent()
  const defaultJsonLd = buildInteriorsPageJsonLd({
    content,
    seo: content.seo,
  })

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <InteriorsPageContent content={content} />
    </>
  )
}
