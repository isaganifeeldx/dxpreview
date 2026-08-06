import type { FaqCategoryId, FaqItem } from '@/data/faqData'
import { getPayloadClient } from '@/lib/payload'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { faqPageDefaults } from './defaults'
import type { FaqPageContentData } from './types'

const CATEGORY_IDS: FaqCategoryId[] = [
  'general',
  'studio',
  'interiors',
  'models',
  'prestige',
  'projects',
]

type CmsFaq = {
  title?: string | null
  intro?: string | null
  searchPlaceholder?: string | null
  items?: Array<{
    id?: string | null
    question?: string | null
    answer?: string | null
    category?: string | null
  } | null> | null
  seo?: CmsSeo
}

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

function toCategory(value: string | null | undefined): FaqCategoryId {
  if (value && CATEGORY_IDS.includes(value as FaqCategoryId)) {
    return value as FaqCategoryId
  }
  return 'general'
}

function mapItems(
  items: CmsFaq['items'],
): FaqItem[] {
  if (!items?.length) return []

  return items
    .map((item, index) => {
      const question = item?.question?.trim()
      const answer = item?.answer?.trim()
      if (!question || !answer) return null

      const category = toCategory(item?.category)
      const id =
        typeof item?.id === 'string' && item.id.trim()
          ? item.id.trim()
          : `${category}-${index + 1}`

      return { id, question, answer, category }
    })
    .filter((item): item is FaqItem => Boolean(item))
}

function mapFaqFromCms(doc: CmsFaq | null | undefined): FaqPageContentData {
  const defaults = faqPageDefaults
  if (!doc) return defaults

  const items = mapItems(doc.items)

  return {
    title: text(doc.title, defaults.title),
    intro: text(doc.intro, defaults.intro),
    searchPlaceholder: text(doc.searchPlaceholder, defaults.searchPlaceholder),
    items: items.length > 0 ? items : defaults.items,
    seo: mapCmsSeo(doc.seo, defaults.seo),
  }
}

export async function getFaqPageContent(): Promise<FaqPageContentData> {
  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'faq',
      depth: 1,
    })) as CmsFaq
    return mapFaqFromCms(doc)
  } catch (error) {
    console.error('[faq] Failed to load FAQ global from Payload — using defaults.', error)
    return faqPageDefaults
  }
}
