import { inspirationCtaDefaults } from './inspirationDetailDefaults'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { emptySeoData } from '@/lib/seo/types'
import { getMediaUrl } from '@/lib/media'
import type { InspirationCta, InspirationItem, InspirationModel } from './types'

type CmsMedia = {
  url?: string | null
  alt?: string | null
} | null

type CmsModel = {
  id?: string | null
  title?: string | null
  image?: number | CmsMedia
  imageAlt?: string | null
}

export type CmsInspiration = {
  id: number | string
  title?: string | null
  slug?: string | null
  category?: string | null
  designStyle?: string | null
  color?: string | null
  image?: number | CmsMedia
  imageAlt?: string | null
  publishedAt?: string | null
  models?: CmsModel[] | null
  overview?: string | null
  cta?: {
    label?: string | null
    href?: string | null
  } | null
  seo?: CmsSeo
}

function mapModel(model: CmsModel, itemId: string, index: number): InspirationModel | null {
  const title = model.title?.trim()
  const imageUrl = getMediaUrl(model.image)

  if (!title || !imageUrl) {
    return null
  }

  const mediaAlt =
    typeof model.image === 'object' && model.image && 'alt' in model.image
      ? model.image.alt?.trim()
      : ''
  const imageAlt = model.imageAlt?.trim() || mediaAlt || title

  return {
    id: model.id?.trim() || `${itemId}-model-${index + 1}`,
    title,
    image: imageUrl,
    imageAlt,
  }
}

function mapCta(source: CmsInspiration['cta']): InspirationCta {
  return {
    label: source?.label?.trim() || inspirationCtaDefaults.label,
    href: source?.href?.trim() || inspirationCtaDefaults.href,
  }
}

export function mapCmsInspirationItem(doc: CmsInspiration): InspirationItem | null {
  const title = doc.title?.trim()
  const slug = doc.slug?.trim()
  const category = doc.category?.trim()
  const designStyle = doc.designStyle?.trim()
  const color = doc.color?.trim()
  const overview = doc.overview?.trim()
  const imageUrl = getMediaUrl(doc.image)

  if (!title || !slug || !category || !designStyle || !color || !overview || !imageUrl) {
    return null
  }

  const itemId = String(doc.id)
  const models = (doc.models ?? [])
    .map((model, index) => mapModel(model, itemId, index))
    .filter((model): model is InspirationModel => Boolean(model))

  if (models.length === 0) {
    return null
  }

  const mediaAlt =
    typeof doc.image === 'object' && doc.image && 'alt' in doc.image
      ? doc.image.alt?.trim()
      : ''
  const imageAlt = doc.imageAlt?.trim() || mediaAlt || title

  const seoFallback = emptySeoData({
    title: `${title} | DX Interiors Inspiration`,
    description: overview,
    focusKeyword: `${category.toLowerCase()} interior design`,
    keywords: `${title}, ${category}, ${designStyle}, interior design inspiration`,
    ogTitle: title,
    ogDescription: overview,
    ogImageUrl: imageUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: overview,
    twitterImageUrl: imageUrl,
  })

  return {
    id: itemId,
    slug,
    title,
    category,
    designStyle,
    color,
    image: imageUrl,
    imageAlt,
    models,
    overview,
    cta: mapCta(doc.cta),
    seo: mapCmsSeo(doc.seo, seoFallback),
  }
}
