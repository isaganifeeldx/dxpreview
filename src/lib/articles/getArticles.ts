import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { getPayloadClient } from '@/lib/payload'
import { articlesPageDefaults, toFallbackArticleItem } from './defaults'
import { mapCmsArticle, type CmsArticle } from './mapArticle'
import type { ArticleItem } from './types'
import { articles as staticArticles } from '@/data/articlesData'

export async function getAllArticles(): Promise<ArticleItem[]> {
  if (shouldSkipCmsAtBuild()) {
    return staticArticles.map(toFallbackArticleItem)
  }

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'articles',
      depth: 1,
      limit: 100,
      sort: '-publishedAt',
      // Local API defaults to overrideAccess: true — still exclude drafts from the public site.
      where: {
        or: [
          { _status: { equals: 'published' } },
          { _status: { exists: false } },
        ],
      },
    })

    const mapped = (result.docs as CmsArticle[])
      .map(mapCmsArticle)
      .filter((item): item is ArticleItem => Boolean(item))

    if (mapped.length > 0) return mapped
    return staticArticles.map(toFallbackArticleItem)
  } catch (error) {
    console.error('[articles] Failed to load articles from Payload — using defaults.', error)
    return staticArticles.map(toFallbackArticleItem)
  }
}

export async function getArticleBySlug(slug: string): Promise<ArticleItem | null> {
  const articles = await getAllArticles()
  return articles.find((article) => article.slug === slug) ?? null
}

export function getFeaturedArticle(articles: ArticleItem[]): ArticleItem {
  return articles.find((article) => article.featured) ?? articles[0]
}

export function getArticleGridItems(articles: ArticleItem[]): ArticleItem[] {
  const featured = getFeaturedArticle(articles)
  return articles.filter((article) => article.id !== featured.id)
}

export function getArticleCategories(articles: ArticleItem[]): string[] {
  return Array.from(new Set(articles.map((article) => article.category)))
}

export function getRecentArticles(
  articles: ArticleItem[],
  excludeSlug?: string,
  limit = 3,
): ArticleItem[] {
  return articles.filter((article) => article.slug !== excludeSlug).slice(0, limit)
}

export { articlesPageDefaults }
