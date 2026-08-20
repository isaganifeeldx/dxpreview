import type { Metadata } from 'next'
import InspirationPageContent from '@/components/pages/inspiration/InspirationPageContent'
import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { getInspirationPageContent } from '@/lib/inspiration/getInspirationPageContent'
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata'
import { buildInspirationPageJsonLd } from '@/lib/seo/buildInspirationJsonLd'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const content = await getInspirationPageContent()

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/inspiration',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/render-1.jpg',
    siteName: 'DX Interiors',
    absoluteTitle: true,
  })
}

export default async function InspirationPage() {
  const content = await getInspirationPageContent()
  const defaultJsonLd = buildInspirationPageJsonLd({
    content,
    seo: content.seo,
  })

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <InspirationPageContent content={content} />
    </>
  )
}
