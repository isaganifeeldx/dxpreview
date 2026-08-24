import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { mapClosingCta, type CmsClosingCta } from '@/lib/cta/mapClosingCta'
import { getPayloadClient } from '@/lib/payload'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { tutorialPageDefaults } from './defaults'
import { getAllTutorialCourses } from './getTutorials'
import type { TutorialPageContentData } from './types'

type CmsTutorialPage = {
  hero?: {
    title?: string | null
    description?: string | null
  } | null
  videosHeading?: string | null
  beginnerHeading?: string | null
  allHeading?: string | null
  otherHeading?: string | null
  otherDescription?: string | null
  searchPlaceholder?: string | null
  closing?: CmsClosingCta
  seo?: CmsSeo
}

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

export async function getTutorialPageContent(): Promise<TutorialPageContentData> {
  const courses = await getAllTutorialCourses()
  const defaults = tutorialPageDefaults

  const base: TutorialPageContentData = {
    hero: defaults.hero,
    videosHeading: defaults.videosHeading,
    beginnerHeading: defaults.beginnerHeading,
    allHeading: defaults.allHeading,
    otherHeading: defaults.otherHeading,
    otherDescription: defaults.otherDescription,
    searchPlaceholder: defaults.searchPlaceholder,
    courses,
    closing: defaults.closing,
    seo: defaults.seo,
  }

  if (shouldSkipCmsAtBuild()) {
    return base
  }

  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'tutorial-page',
      depth: 1,
    })) as CmsTutorialPage

    return {
      hero: {
        title: text(doc.hero?.title, defaults.hero.title),
        description: text(doc.hero?.description, defaults.hero.description),
      },
      videosHeading: text(doc.videosHeading, defaults.videosHeading),
      beginnerHeading: text(doc.beginnerHeading, defaults.beginnerHeading),
      allHeading: text(doc.allHeading, defaults.allHeading),
      otherHeading: text(doc.otherHeading, defaults.otherHeading),
      otherDescription: text(doc.otherDescription, defaults.otherDescription),
      searchPlaceholder: text(doc.searchPlaceholder, defaults.searchPlaceholder),
      courses,
      closing: mapClosingCta(doc.closing, defaults.closing),
      seo: mapCmsSeo(doc.seo, defaults.seo),
    }
  } catch (error) {
    console.error(
      '[tutorial] Failed to load Tutorial Page global from Payload — using defaults.',
      error,
    )
    return base
  }
}
