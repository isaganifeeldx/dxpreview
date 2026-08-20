import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { getPayloadClient } from '@/lib/payload'
import { inspirationItems as staticItems } from './defaults'
import { mapCmsInspirationItem, type CmsInspiration } from './mapInspirationItem'
import type { InspirationItem } from './types'

export async function getAllInspirationItems(): Promise<InspirationItem[]> {
  if (shouldSkipCmsAtBuild()) {
    return staticItems
  }

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'inspirations',
      depth: 2,
      limit: 100,
      sort: '-publishedAt',
      where: {
        or: [{ _status: { equals: 'published' } }, { _status: { exists: false } }],
      },
    })

    const mapped = (result.docs as CmsInspiration[])
      .map(mapCmsInspirationItem)
      .filter((item): item is InspirationItem => Boolean(item))

    if (mapped.length > 0) return mapped
    return staticItems
  } catch (error) {
    console.error('[inspiration] Failed to load items from Payload — using defaults.', error)
    return staticItems
  }
}

export async function getInspirationBySlug(slug: string): Promise<InspirationItem | null> {
  const items = await getAllInspirationItems()
  return items.find((item) => item.slug === slug) ?? null
}

export function getRelatedInspirations(
  items: InspirationItem[],
  excludeSlug: string,
  limit = 4,
): InspirationItem[] {
  const current = items.find((item) => item.slug === excludeSlug)
  if (!current) {
    return items.filter((item) => item.slug !== excludeSlug).slice(0, limit)
  }

  const sameCategory = items.filter(
    (item) => item.slug !== excludeSlug && item.category === current.category,
  )
  const others = items.filter(
    (item) => item.slug !== excludeSlug && item.category !== current.category,
  )

  return [...sameCategory, ...others].slice(0, limit)
}
