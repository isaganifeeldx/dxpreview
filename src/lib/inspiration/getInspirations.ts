import { cache } from 'react'
import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { getPayloadClient } from '@/lib/payload'
import { inspirationItems as staticItems } from './defaults'
import { mapCmsInspirationItem, type CmsInspiration } from './mapInspirationItem'
import type { InspirationItem } from './types'

const publishedWhere = {
  or: [{ _status: { equals: 'published' as const } }, { _status: { exists: false as const } }],
}

/** Dedupes within a single RSC request (detail page used to fetch the full list 2–3×). */
export const getAllInspirationItems = cache(async (): Promise<InspirationItem[]> => {
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
      where: publishedWhere,
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
})

export async function getInspirationBySlug(slug: string): Promise<InspirationItem | null> {
  const normalized = slug.trim()
  if (!normalized) return null

  if (!shouldSkipCmsAtBuild()) {
    try {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'inspirations',
        depth: 2,
        limit: 1,
        where: {
          and: [{ slug: { equals: normalized } }, publishedWhere],
        },
      })

      const doc = result.docs[0] as CmsInspiration | undefined
      if (doc) {
        const mapped = mapCmsInspirationItem(doc)
        if (mapped) return mapped
      }
    } catch (error) {
      console.error('[inspiration] Failed to load item by slug — falling back to list.', error)
    }
  }

  const items = await getAllInspirationItems()
  return items.find((item) => item.slug === normalized) ?? null
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
