import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TutorialCoursePageContent from '@/components/pages/tutorial/TutorialCoursePageContent'
import JsonLdScripts from '@/components/seo/JsonLdScripts'
import {
  getAllTutorialCourses,
  getOtherTutorialCourses,
  getTutorialCourseBySlug,
} from '@/lib/tutorial/getTutorials'
import { getTutorialPageContent } from '@/lib/tutorial/getTutorialPageContent'
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata'
import { buildTutorialCourseJsonLd } from '@/lib/seo/buildTutorialJsonLd'
import { emptySeoData } from '@/lib/seo/types'

interface TutorialCoursePageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lesson?: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const courses = await getAllTutorialCourses()
    return courses.map((course) => ({ slug: course.slug }))
  } catch (error) {
    console.error(
      '[tutorial] generateStaticParams failed — skipping static course paths for this build.',
      error,
    )
    return []
  }
}

export async function generateMetadata({ params }: TutorialCoursePageProps): Promise<Metadata> {
  const { slug } = await params
  const course = await getTutorialCourseBySlug(slug)
  if (!course) return { title: 'Tutorials | DX Interiors' }

  const seo =
    course.seo ??
    emptySeoData({
      title: `${course.title} | DX Interiors Tutorials`,
      description: course.description,
      ogTitle: course.title,
      ogDescription: course.description,
      ogImageUrl: course.image,
      twitterCard: 'summary_large_image',
      twitterTitle: course.title,
      twitterDescription: course.description,
      twitterImageUrl: course.image,
    })

  return buildMetadataFromSeo({
    seo,
    path: `/tutorial/${course.slug}`,
    fallbackTitle: seo.title,
    fallbackDescription: seo.description,
    fallbackImageUrl: course.image,
    siteName: 'DX Interiors',
    absoluteTitle: true,
  })
}

export default async function TutorialCoursePage({ params, searchParams }: TutorialCoursePageProps) {
  const { slug } = await params
  const { lesson } = await searchParams
  const course = await getTutorialCourseBySlug(slug)
  if (!course) notFound()

  const [allCourses, pageContent] = await Promise.all([
    getAllTutorialCourses(),
    getTutorialPageContent(),
  ])
  const otherCourses = getOtherTutorialCourses(allCourses, course.slug, 6)
  const seo =
    course.seo ??
    emptySeoData({
      title: `${course.title} | DX Interiors Tutorials`,
      description: course.description,
    })
  const defaultJsonLd = buildTutorialCourseJsonLd(course)

  return (
    <>
      <JsonLdScripts seo={seo} defaultJsonLd={defaultJsonLd} />
      <TutorialCoursePageContent
        course={course}
        otherCourses={otherCourses}
        otherHeading={pageContent.otherHeading}
        otherDescription={pageContent.otherDescription}
        initialLessonSlug={lesson}
      />
    </>
  )
}
