import type { Metadata } from 'next'
import SpaceSensePageContent from '@/components/pages/spacesense/SpaceSensePageContent'
import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { spaceSensePageDefaults } from '@/lib/spacesense/defaults'
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const content = spaceSensePageDefaults

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

export default function SpaceSenseAiPage() {
  const content = spaceSensePageDefaults

  return (
    <>
      <JsonLdScripts seo={content.seo} />
      <SpaceSensePageContent content={content} />
    </>
  )
}
