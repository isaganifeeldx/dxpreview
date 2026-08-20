import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { getPayloadClient } from '@/lib/payload'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { inspirationItems as staticItems, inspirationPageDefaults } from './defaults'
import { getAllInspirationItems } from './getInspirations'
import type { InspirationPageContentData } from './types'

type CmsInspirationPage = {
  hero?: {
    title?: string | null
    description?: string | null
  } | null
  searchPlaceholder?: string | null
  allSpacesLabel?: string | null
  modelsIntro?: string | null
  categories?: Array<{ value?: string | null }> | null
  designStyles?: Array<{ value?: string | null }> | null
  colors?: Array<{ value?: string | null }> | null
  sortOptions?: Array<{ value?: string | null }> | null
  seo?: CmsSeo
}

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

function stringArray(
  source: Array<{ value?: string | null }> | null | undefined,
  fallback: string[],
): string[] {
  const mapped = source
    ?.map((item) => item.value?.trim())
    .filter((item): item is string => Boolean(item))

  return mapped && mapped.length > 0 ? mapped : fallback
}

export async function getInspirationPageContent(): Promise<InspirationPageContentData> {
  const items = await getAllInspirationItems()
  const defaults = inspirationPageDefaults

  const base: InspirationPageContentData = {
    hero: defaults.hero,
    searchPlaceholder: defaults.searchPlaceholder,
    allSpacesLabel: defaults.allSpacesLabel,
    modelsIntro: defaults.modelsIntro,
    categories: defaults.categories,
    designStyles: defaults.designStyles,
    colors: defaults.colors,
    sortOptions: defaults.sortOptions,
    items,
    seo: defaults.seo,
  }

  if (shouldSkipCmsAtBuild()) {
    return base
  }

  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'inspiration-page',
      depth: 1,
    })) as CmsInspirationPage

    return {
      hero: {
        title: text(doc.hero?.title, defaults.hero.title),
        description: text(doc.hero?.description, defaults.hero.description),
      },
      searchPlaceholder: text(doc.searchPlaceholder, defaults.searchPlaceholder),
      allSpacesLabel: text(doc.allSpacesLabel, defaults.allSpacesLabel),
      modelsIntro: text(doc.modelsIntro, defaults.modelsIntro),
      categories: stringArray(doc.categories, defaults.categories),
      designStyles: stringArray(doc.designStyles, defaults.designStyles),
      colors: stringArray(doc.colors, defaults.colors),
      sortOptions: stringArray(doc.sortOptions, defaults.sortOptions),
      items,
      seo: mapCmsSeo(doc.seo, defaults.seo),
    }
  } catch (error) {
    console.error(
      '[inspiration] Failed to load Inspiration Page global from Payload — using defaults.',
      error,
    )
    return base
  }
}
