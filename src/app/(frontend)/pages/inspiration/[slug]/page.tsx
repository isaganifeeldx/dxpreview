import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import InspirationDetailSidebar from '@/components/pages/inspiration/InspirationDetailSidebar'
import InspirationModelGrid from '@/components/pages/inspiration/InspirationModelGrid'
import InspirationShareButton from '@/components/pages/inspiration/InspirationShareButton'
import JsonLdScripts from '@/components/seo/JsonLdScripts'
import {
  getAllInspirationItems,
  getInspirationBySlug,
  getRelatedInspirations,
} from '@/lib/inspiration/getInspirations'
import { getInspirationPageContent } from '@/lib/inspiration/getInspirationPageContent'
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata'
import { buildInspirationItemJsonLd } from '@/lib/seo/buildInspirationJsonLd'

interface InspirationDetailPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const items = await getAllInspirationItems()
    return items.map((item) => ({ slug: item.slug }))
  } catch (error) {
    console.error(
      '[inspiration] generateStaticParams failed — skipping static inspiration paths for this build.',
      error,
    )
    return []
  }
}

export async function generateMetadata({
  params,
}: InspirationDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = await getInspirationBySlug(slug)
  if (!item) return { title: 'Inspiration | DX Interiors' }

  return buildMetadataFromSeo({
    seo: item.seo,
    path: `/inspiration/${item.slug}`,
    fallbackTitle: item.seo.title || `${item.title} | DX Interiors`,
    fallbackDescription: item.seo.description || item.overview,
    fallbackImageUrl: item.seo.ogImageUrl ?? item.image,
    siteName: 'DX Interiors',
    absoluteTitle: true,
  })
}

export default async function InspirationDetailPage({ params }: InspirationDetailPageProps) {
  const { slug } = await params
  const item = await getInspirationBySlug(slug)
  if (!item) notFound()

  const allItems = await getAllInspirationItems()
  const pageContent = await getInspirationPageContent()
  const relatedItems = getRelatedInspirations(allItems, item.slug, 4)
  const defaultJsonLd = buildInspirationItemJsonLd(item)

  return (
    <>
      <JsonLdScripts seo={item.seo} defaultJsonLd={defaultJsonLd} />
      <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-[1350px]">
          <Link
            href="/inspiration"
            className="inline-flex min-h-11 items-center text-[13px] font-medium text-[#6A758C] transition-colors hover:text-[#2A3040] sm:min-h-0"
          >
            ← Back to Inspiration
          </Link>

          <header className="mt-6 lg:mt-10">
            <h1 className="title-heading-normal text-[22px] leading-tight text-[#2A3040] sm:text-[28px] md:text-[32px]">
              {item.title}
            </h1>
            <InspirationShareButton />
          </header>

          <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-[14px] sm:mt-6 sm:aspect-[16/9] sm:rounded-[20px]">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              priority
              sizes="(max-width: 1350px) 100vw, 1350px"
              className="object-cover"
            />
          </div>

          <div className="mt-8 grid items-start gap-8 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0">
              <InspirationModelGrid models={item.models} intro={pageContent.modelsIntro} />

              <section className="glass-panel mt-8 !rounded-[16px] !p-4 sm:!p-6">
                <h2 className="text-[18px] font-semibold text-[#2A3040] sm:text-[20px]">
                  Design overview
                </h2>
                <p className="mt-3 max-w-[720px] text-[14px] leading-relaxed text-[#696969] sm:text-[15px]">
                  {item.overview}
                </p>
              </section>
            </div>

            <InspirationDetailSidebar
              title={item.title}
              cta={item.cta}
              relatedItems={relatedItems}
            />
          </div>
        </div>
      </div>
    </>
  )
}
