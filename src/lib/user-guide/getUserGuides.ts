import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { getPayloadClient } from '@/lib/payload'
import { userGuides as staticGuides } from '@/data/userGuidesData'
import { toFallbackUserGuideItem } from './defaults'
import { mapCmsUserGuide, type CmsUserGuide } from './mapUserGuide'
import type { UserGuideCard, UserGuideFeatured, UserGuideItem } from './types'

export async function getAllUserGuides(): Promise<UserGuideItem[]> {
  if (shouldSkipCmsAtBuild()) {
    return staticGuides.map(toFallbackUserGuideItem)
  }

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'user-guides',
      depth: 1,
      limit: 100,
      sort: '-publishedAt',
      where: {
        or: [
          { _status: { equals: 'published' } },
          { _status: { exists: false } },
        ],
      },
    })

    const mapped = (result.docs as CmsUserGuide[])
      .map(mapCmsUserGuide)
      .filter((item): item is UserGuideItem => Boolean(item))

    if (mapped.length > 0) return mapped
    return staticGuides.map(toFallbackUserGuideItem)
  } catch (error) {
    console.error('[user-guide] Failed to load guides from Payload — using defaults.', error)
    return staticGuides.map(toFallbackUserGuideItem)
  }
}

export async function getUserGuideBySlug(slug: string): Promise<UserGuideItem | null> {
  const guides = await getAllUserGuides()
  return guides.find((guide) => guide.slug === slug) ?? null
}

export function toUserGuideCard(guide: UserGuideItem): UserGuideCard {
  return {
    id: guide.id,
    slug: guide.slug,
    href: `/user-guide/${guide.slug}`,
    category: guide.category,
    title: guide.title,
    description: guide.description,
    image: guide.image,
    imageAlt: guide.imageAlt,
  }
}

export function getFeaturedUserGuide(guides: UserGuideItem[]): UserGuideItem {
  return guides.find((guide) => guide.featured) ?? guides[0]
}

export function toUserGuideFeatured(guide: UserGuideItem): UserGuideFeatured {
  return {
    ...toUserGuideCard(guide),
    meta: guide.meta ?? '',
  }
}

export function getUserGuideGridItems(guides: UserGuideItem[]): UserGuideCard[] {
  const featured = getFeaturedUserGuide(guides)
  return guides
    .filter((guide) => guide.id !== featured.id)
    .map(toUserGuideCard)
}

export function getRecentUserGuides(
  guides: UserGuideItem[],
  excludeSlug?: string,
  limit = 3,
): UserGuideCard[] {
  return guides
    .filter((guide) => guide.slug !== excludeSlug)
    .slice(0, limit)
    .map(toUserGuideCard)
}
