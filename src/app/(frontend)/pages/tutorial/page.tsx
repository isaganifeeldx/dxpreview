import type { Metadata } from 'next'
import TutorialPageContent from '@/components/pages/tutorial/TutorialPageContent'
import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { getTutorialPageContent } from '@/lib/tutorial/getTutorialPageContent'
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata'
import { buildTutorialPageJsonLd } from '@/lib/seo/buildTutorialJsonLd'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTutorialPageContent()

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/tutorial',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/render-1.jpg',
    siteName: 'DX Interiors',
    absoluteTitle: true,
  })
}

export default async function TutorialPage() {
  const content = await getTutorialPageContent()
  const defaultJsonLd = buildTutorialPageJsonLd({
    content,
    seo: content.seo,
  })

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <TutorialPageContent content={content} />
    </>
  )
}
