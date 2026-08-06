import { getPayloadClient } from '@/lib/payload'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { articlesPageDefaults } from './defaults'
import { getAllArticles } from './getArticles'
import type { ArticlesPageContentData } from './types'

type CmsArticlesPage = {
  heading?: string | null
  searchPlaceholder?: string | null
  seo?: CmsSeo
}

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

export async function getArticlesPageContent(): Promise<ArticlesPageContentData> {
  const articles = await getAllArticles()
  const defaults = articlesPageDefaults

  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'articles-page',
      depth: 1,
    })) as CmsArticlesPage

    return {
      heading: text(doc.heading, defaults.heading),
      searchPlaceholder: text(doc.searchPlaceholder, defaults.searchPlaceholder),
      articles,
      seo: mapCmsSeo(doc.seo, defaults.seo),
    }
  } catch (error) {
    console.error(
      '[articles] Failed to load Articles Page global from Payload — using defaults.',
      error,
    )
    return {
      ...defaults,
      articles,
    }
  }
}
