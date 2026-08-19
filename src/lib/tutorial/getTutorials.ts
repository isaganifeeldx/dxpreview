import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { getPayloadClient } from '@/lib/payload'
import { tutorialCourses as staticCourses } from './defaults'
import { mapCmsTutorialCourse, type CmsTutorialCourse } from './mapTutorialCourse'
import type { TutorialCourse } from './types'

export async function getAllTutorialCourses(): Promise<TutorialCourse[]> {
  if (shouldSkipCmsAtBuild()) {
    return staticCourses
  }

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'tutorial-courses',
      depth: 2,
      limit: 100,
      sort: '-publishedAt',
      where: {
        or: [
          { _status: { equals: 'published' } },
          { _status: { exists: false } },
        ],
      },
    })

    const mapped = (result.docs as CmsTutorialCourse[])
      .map(mapCmsTutorialCourse)
      .filter((course): course is TutorialCourse => Boolean(course))

    if (mapped.length > 0) return mapped
    return staticCourses
  } catch (error) {
    console.error('[tutorial] Failed to load courses from Payload — using defaults.', error)
    return staticCourses
  }
}

export async function getTutorialCourseBySlug(slug: string): Promise<TutorialCourse | null> {
  const courses = await getAllTutorialCourses()
  return courses.find((course) => course.slug === slug) ?? null
}

export function getOtherTutorialCourses(
  courses: TutorialCourse[],
  excludeSlug: string,
  limit = 6,
): TutorialCourse[] {
  return courses.filter((course) => course.slug !== excludeSlug).slice(0, limit)
}
