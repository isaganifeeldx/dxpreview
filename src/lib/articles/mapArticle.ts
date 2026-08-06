import { getMediaUrl } from '@/lib/media'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { emptySeoData } from '@/lib/seo/types'
import { resolveRichTextHtml } from '@/lib/seo/resolveRichTextHtml'
import { PLACEHOLDER_BODY } from './defaults'
import type { ArticleItem } from './types'

type CmsMedia = {
  url?: string | null
  alt?: string | null
} | null

export type CmsArticle = {
  id: number | string
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  category?: string | null
  publishedAt?: string | null
  featured?: boolean | null
  image?: number | CmsMedia
  imageAlt?: string | null
  content?: unknown
  seo?: CmsSeo
}

function formatArticleDate(value: string | null | undefined): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function mapCmsArticle(doc: CmsArticle): ArticleItem | null {
  const title = doc.title?.trim()
  const slug = doc.slug?.trim()
  const excerpt = doc.excerpt?.trim()
  const category = doc.category?.trim()
  const imageUrl = getMediaUrl(doc.image)

  if (!title || !slug || !excerpt || !category || !imageUrl) return null

  const mediaAlt =
    typeof doc.image === 'object' && doc.image && 'alt' in doc.image
      ? doc.image.alt?.trim()
      : ''
  const imageAlt = doc.imageAlt?.trim() || mediaAlt || title
  const date = formatArticleDate(doc.publishedAt) || '—'

  const seoFallback = emptySeoData({
    title: `${title} | DX Interiors`,
    description: excerpt,
    ogTitle: title,
    ogDescription: excerpt,
    ogImageUrl: imageUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: excerpt,
    twitterImageUrl: imageUrl,
  })

  return {
    id: String(doc.id),
    slug,
    title,
    excerpt,
    category,
    date,
    image: imageUrl,
    imageAlt,
    featured: Boolean(doc.featured),
    contentHtml: resolveRichTextHtml(doc.content, PLACEHOLDER_BODY),
    seo: mapCmsSeo(doc.seo, seoFallback),
  }
}
