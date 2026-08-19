import { getMediaUrl } from '@/lib/media'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { emptySeoData } from '@/lib/seo/types'
import type { TutorialCourse, TutorialLesson } from './types'

type CmsMedia = {
  url?: string | null
  alt?: string | null
} | null

type CmsLesson = {
  id?: string | null
  title?: string | null
  slug?: string | null
  duration?: string | null
  image?: number | CmsMedia
  imageAlt?: string | null
  videoUrl?: string | null
}

export type CmsTutorialCourse = {
  id: number | string
  title?: string | null
  slug?: string | null
  description?: string | null
  category?: string | null
  image?: number | CmsMedia
  imageAlt?: string | null
  featuredBeginner?: boolean | null
  publishedAt?: string | null
  lessons?: CmsLesson[] | null
  seo?: CmsSeo
}

function mapLesson(
  lesson: CmsLesson,
  courseId: string,
  index: number,
): TutorialLesson | null {
  const title = lesson.title?.trim()
  const slug = lesson.slug?.trim()
  const duration = lesson.duration?.trim()
  const imageUrl = getMediaUrl(lesson.image)

  if (!title || !slug || !duration || !imageUrl) {
    return null
  }

  const mediaAlt =
    typeof lesson.image === 'object' && lesson.image && 'alt' in lesson.image
      ? lesson.image.alt?.trim()
      : ''
  const imageAlt = lesson.imageAlt?.trim() || mediaAlt || title

  return {
    id: lesson.id?.trim() || `${courseId}-lesson-${index + 1}`,
    slug,
    title,
    duration,
    image: imageUrl,
    imageAlt,
    videoUrl: lesson.videoUrl?.trim() || undefined,
  }
}

export function mapCmsTutorialCourse(doc: CmsTutorialCourse): TutorialCourse | null {
  const title = doc.title?.trim()
  const slug = doc.slug?.trim()
  const description = doc.description?.trim()
  const category = doc.category?.trim()
  const imageUrl = getMediaUrl(doc.image)

  if (!title || !slug || !description || !category || !imageUrl) {
    return null
  }

  const mediaAlt =
    typeof doc.image === 'object' && doc.image && 'alt' in doc.image
      ? doc.image.alt?.trim()
      : ''
  const imageAlt = doc.imageAlt?.trim() || mediaAlt || title

  const courseId = String(doc.id)
  const lessons = (doc.lessons ?? [])
    .map((lesson, index) => mapLesson(lesson, courseId, index))
    .filter((lesson): lesson is TutorialLesson => Boolean(lesson))

  if (lessons.length === 0) {
    return null
  }

  const seoFallback = emptySeoData({
    title: `${title} | DX Interiors Tutorials`,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImageUrl: imageUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImageUrl: imageUrl,
  })

  return {
    id: courseId,
    slug,
    title,
    description,
    category,
    image: imageUrl,
    imageAlt,
    featuredBeginner: Boolean(doc.featuredBeginner),
    lessons,
    seo: mapCmsSeo(doc.seo, seoFallback),
  }
}
