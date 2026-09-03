import type { Metadata } from 'next'
import SpaceSensePageContent from '@/components/pages/spacesense/SpaceSensePageContent'
import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { getSpaceSensePageContent } from '@/lib/spacesense/getSpaceSensePageContent'
import { buildSpaceSensePageJsonLd } from '@/lib/seo/buildSpaceSenseJsonLd'
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSpaceSensePageContent()

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/product/spacesense-ai',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/spacesense-hero.png',
    siteName: 'DX Interiors',
    absoluteTitle: true,
  })
}

export default async function SpaceSenseAiPage() {
  const content = await getSpaceSensePageContent()
  const defaultJsonLd = buildSpaceSensePageJsonLd({
    content,
    seo: content.seo,
  })

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <SpaceSensePageContent content={content} />
    </>
  )
}
