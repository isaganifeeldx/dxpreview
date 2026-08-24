import type { PageClosingCtaData } from '@/lib/cta/defaults'
import type { SeoData } from '@/lib/seo/types'

export type TutorialLesson = {
  id: string
  slug: string
  title: string
  duration: string
  image: string
  imageAlt: string
  videoUrl?: string
}

/** Lesson flattened with its parent course for listing pages. */
export type TutorialLessonListingItem = TutorialLesson & {
  courseSlug: string
  courseTitle: string
  category: string
}

export type TutorialCourse = {
  id: string
  slug: string
  title: string
  description: string
  category: string
  image: string
  imageAlt: string
  featuredBeginner?: boolean
  lessons: TutorialLesson[]
  seo?: SeoData
}

export type TutorialPageContentData = {
  hero: {
    title: string
    description: string
  }
  videosHeading: string
  beginnerHeading: string
  allHeading: string
  otherHeading: string
  otherDescription: string
  searchPlaceholder: string
  courses: TutorialCourse[]
  closing: PageClosingCtaData
  seo: SeoData
}
