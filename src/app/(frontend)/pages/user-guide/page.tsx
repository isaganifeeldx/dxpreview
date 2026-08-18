import type { Metadata } from 'next'
import UserGuidePageContent from '@/components/pages/user-guide/UserGuidePageContent'
import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { getUserGuidePageContent } from '@/lib/user-guide/getUserGuidePageContent'
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata'
import { buildUserGuidePageJsonLd } from '@/lib/seo/buildUserGuideJsonLd'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const content = await getUserGuidePageContent()

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/user-guide',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/render-1.jpg',
    siteName: 'DX Interiors',
    absoluteTitle: true,
  })
}

export default async function UserGuidePage() {
  const content = await getUserGuidePageContent()
  const defaultJsonLd = buildUserGuidePageJsonLd({
    content,
    seo: content.seo,
  })

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <UserGuidePageContent content={content} />
    </>
  )
}
