import { getSiteUrl } from '@/lib/siteUrl'
import type { TutorialCourse, TutorialPageContentData } from '@/lib/tutorial/types'
import type { SeoData } from './types'

type BuildTutorialJsonLdInput = {
  content: TutorialPageContentData
  seo?: SeoData
}

export function buildTutorialPageJsonLd({
  content,
  seo,
}: BuildTutorialJsonLdInput): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = seo?.canonicalUrl || `${siteUrl}/tutorial`
  const title = seo?.title || content.hero.title
  const description = seo?.description || content.hero.description

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: 'en-AU',
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#courses`,
        name: title,
        itemListElement: content.courses.map((course, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: course.title,
          url: `${siteUrl}/tutorial/${course.slug}`,
        })),
      },
    ],
  }
}

export function buildTutorialCourseJsonLd(course: TutorialCourse): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/tutorial/${course.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${pageUrl}#course`,
    name: course.title,
    description: course.description,
    url: pageUrl,
    inLanguage: 'en-AU',
    hasCourseInstance: course.lessons.map((lesson) => ({
      '@type': 'LearningResource',
      name: lesson.title,
      url: `${pageUrl}?lesson=${lesson.slug}`,
    })),
    provider: {
      '@type': 'Organization',
      name: 'DX Interiors',
      url: siteUrl,
    },
  }
}
