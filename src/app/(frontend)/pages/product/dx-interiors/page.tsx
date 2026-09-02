import type { Metadata } from 'next'
import InteriorsPageContent from '@/components/pages/interiors/InteriorsPageContent'
import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { interiorsPageDefaults } from '@/lib/interiors/defaults'
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const content = interiorsPageDefaults

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

export default function DxInteriorsPage() {
  const content = interiorsPageDefaults

  return (
    <>
      <JsonLdScripts seo={content.seo} />
      <InteriorsPageContent content={content} />
    </>
  )
}
