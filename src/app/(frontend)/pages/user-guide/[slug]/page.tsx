import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleTableOfContents from '@/components/pages/articles/ArticleTableOfContents'
import RecentUserGuides from '@/components/pages/user-guide/RecentUserGuides'
import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { buildArticleToc } from '@/lib/articles/buildArticleToc'
import {
  getAllUserGuides,
  getRecentUserGuides,
  getUserGuideBySlug,
} from '@/lib/user-guide/getUserGuides'
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata'
import { buildUserGuideItemJsonLd } from '@/lib/seo/buildUserGuideJsonLd'

interface UserGuideDetailPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const guides = await getAllUserGuides()
    return guides.map((guide) => ({ slug: guide.slug }))
  } catch (error) {
    console.error(
      '[user-guide] generateStaticParams failed — skipping static guide paths for this build.',
      error,
    )
    return []
  }
}

export async function generateMetadata({
  params,
}: UserGuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = await getUserGuideBySlug(slug)
  if (!guide) return { title: 'User Guide | DX Interiors' }

  return buildMetadataFromSeo({
    seo: guide.seo,
    path: `/user-guide/${guide.slug}`,
    fallbackTitle: guide.seo.title || `${guide.title} | DX Interiors User Guide`,
    fallbackDescription: guide.seo.description || guide.description,
    fallbackImageUrl: guide.seo.ogImageUrl ?? guide.image,
    siteName: 'DX Interiors',
    absoluteTitle: true,
  })
}

export default async function UserGuideDetailPage({ params }: UserGuideDetailPageProps) {
  const { slug } = await params
  const guide = await getUserGuideBySlug(slug)
  if (!guide) notFound()

  const allGuides = await getAllUserGuides()
  const recentGuides = getRecentUserGuides(allGuides, guide.slug, 3)
  const defaultJsonLd = buildUserGuideItemJsonLd(guide)
  const { contentHtml, toc } = buildArticleToc(guide.contentHtml)

  return (
    <>
      <JsonLdScripts seo={guide.seo} defaultJsonLd={defaultJsonLd} />
      <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
        <article className="mx-auto max-w-[1350px] rounded-[16px] bg-white !p-4 sm:!p-8 lg:!p-10">
          <Link
            href="/user-guide"
            className="inline-flex min-h-11 items-center text-[13px] font-medium text-[#6A758C] transition-colors hover:text-[#2A3040] sm:min-h-0"
          >
            ← Back to User Guide
          </Link>

          <header className="sm:mt-10">
            <h1 className="title-heading-normal text-[22px] leading-tight text-[#2A3040] sm:text-[28px] md:text-[32px]">
              {guide.title}
            </h1>

            {guide.meta ? (
              <p className="mt-2 text-[12px] tracking-wide text-[#8A909C]">{guide.meta}</p>
            ) : null}

            <p className="mt-4 inline-flex w-fit rounded-full border border-[#000000]/20 px-2 py-0.5 text-[10px] tracking-wide text-[#2A3040]">
              {guide.category}
            </p>
          </header>

          <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[14px] sm:mt-10 sm:aspect-[16/9] sm:rounded-[20px]">
            <Image
              src={guide.image}
              alt={guide.imageAlt}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1350px) 100vw, 1350px"
              className="object-cover"
            />
          </div>

          <ArticleTableOfContents items={toc} />

          <div
            className="article-content mt-6 sm:mt-10"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        <RecentUserGuides guides={recentGuides} />
      </div>
    </>
  )
}
