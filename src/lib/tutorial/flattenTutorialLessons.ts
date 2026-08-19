import type { TutorialCourse, TutorialLessonListingItem } from './types'

export function flattenTutorialLessons(courses: TutorialCourse[]): TutorialLessonListingItem[] {
  return courses.flatMap((course) =>
    course.lessons.map((lesson) => ({
      ...lesson,
      courseSlug: course.slug,
      courseTitle: course.title,
      category: course.category,
    })),
  )
}
