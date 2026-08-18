import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { emptySeoData } from '@/lib/seo/types'
import { resolveRichTextHtml } from '@/lib/seo/resolveRichTextHtml'
import { getMediaUrl } from '@/lib/media'
import { PLACEHOLDER_BODY } from './defaults'
import type { UserGuideItem } from './types'

type CmsMedia = {
  url?: string | null
  alt?: string | null
} | null

export type CmsUserGuide = {
  id: number | string
  title?: string | null
  slug?: string | null
  description?: string | null
  category?: string | null
  meta?: string | null
  image?: number | CmsMedia
  imageAlt?: string | null
  publishedAt?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  featured?: boolean | null
  content?: unknown
  seo?: CmsSeo
}

export function mapCmsUserGuide(doc: CmsUserGuide): UserGuideItem | null {
  const title = doc.title?.trim()
  const slug = doc.slug?.trim()
  const description = doc.description?.trim()
  const category = doc.category?.trim()
  const imageUrl = getMediaUrl(doc.image)

  if (!title || !slug || !description || !category || !imageUrl) {
    return null
  }

  const mediaAlt =
    typeof doc.image === 'object' && doc.image && 'alt' in doc.image
      ? doc.image.alt?.trim()
      : ''
  const imageAlt = doc.imageAlt?.trim() || mediaAlt || title

  const seoFallback = emptySeoData({
    title: `${title} | DX Interiors User Guide`,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImageUrl: imageUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImageUrl: imageUrl,
  })

  return {
    id: String(doc.id),
    slug,
    title,
    description,
    category,
    image: imageUrl,
    imageAlt,
    meta: doc.meta?.trim() || undefined,
    featured: Boolean(doc.featured),
    contentHtml: resolveRichTextHtml(doc.content, PLACEHOLDER_BODY),
    seo: mapCmsSeo(doc.seo, seoFallback),
  }
}
