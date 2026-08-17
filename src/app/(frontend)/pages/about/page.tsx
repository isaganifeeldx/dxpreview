import type { Metadata } from 'next'
import AboutPageContent from '@/components/pages/about/AboutPageContent'
import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { getAboutPageContent } from '@/lib/about/getAboutPageContent'
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata'
import { buildAboutPageJsonLd } from '@/lib/seo/buildAboutJsonLd'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutPageContent()

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/about',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/render-1.jpg',
    siteName: 'DX Interiors',
    absoluteTitle: true,
  })
}

export default async function AboutPage() {
  const content = await getAboutPageContent()
  const defaultJsonLd = buildAboutPageJsonLd({
    content,
    seo: content.seo,
  })

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <AboutPageContent content={content} />
    </>
  )
}
