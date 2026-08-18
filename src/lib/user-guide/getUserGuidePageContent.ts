import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { getPayloadClient } from '@/lib/payload'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { userGuidePageDefaults } from './defaults'
import {
  getAllUserGuides,
  getFeaturedUserGuide,
  getUserGuideGridItems,
  toUserGuideFeatured,
} from './getUserGuides'
import type { UserGuidePageContentData } from './types'

type CmsUserGuidePage = {
  hero?: {
    title?: string | null
    description?: string | null
  } | null
  closing?: {
    title?: string | null
    description?: string | null
    primaryCta?: { label?: string | null; href?: string | null } | null
    secondaryCta?: { label?: string | null; href?: string | null } | null
  } | null
  seo?: CmsSeo
}

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

function cta(
  source: { label?: string | null; href?: string | null } | null | undefined,
  fallback: { label: string; href: string },
) {
  return {
    label: text(source?.label, fallback.label),
    href: text(source?.href, fallback.href),
  }
}

export async function getUserGuidePageContent(): Promise<UserGuidePageContentData> {
  const guides = await getAllUserGuides()
  const defaults = userGuidePageDefaults
  const featuredGuide = getFeaturedUserGuide(guides)

  const base: UserGuidePageContentData = {
    hero: defaults.hero,
    featured: toUserGuideFeatured(featuredGuide),
    guides: getUserGuideGridItems(guides),
    closing: defaults.closing,
    seo: defaults.seo,
  }

  if (shouldSkipCmsAtBuild()) {
    return base
  }

  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'user-guide-page',
      depth: 1,
    })) as CmsUserGuidePage

    return {
      hero: {
        title: text(doc.hero?.title, defaults.hero.title),
        description: text(doc.hero?.description, defaults.hero.description),
      },
      featured: toUserGuideFeatured(featuredGuide),
      guides: getUserGuideGridItems(guides),
      closing: {
        title: text(doc.closing?.title, defaults.closing.title),
        description: text(doc.closing?.description, defaults.closing.description),
        primaryCta: cta(doc.closing?.primaryCta, defaults.closing.primaryCta),
        secondaryCta: cta(doc.closing?.secondaryCta, defaults.closing.secondaryCta),
      },
      seo: mapCmsSeo(doc.seo, defaults.seo),
    }
  } catch (error) {
    console.error(
      '[user-guide] Failed to load User Guide Page global from Payload — using defaults.',
      error,
    )
    return base
  }
}
