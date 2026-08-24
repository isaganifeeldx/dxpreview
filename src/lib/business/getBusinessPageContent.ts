import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { mapClosingCta, type CmsClosingCta } from '@/lib/cta/mapClosingCta'
import { getPayloadClient } from '@/lib/payload'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { businessPageDefaults } from './defaults'
import type {
  BusinessFeature,
  BusinessFeatureIcon,
  BusinessPageContentData,
  BusinessStat,
  BusinessTestimonial,
} from './types'

const FEATURE_ICONS: BusinessFeatureIcon[] = [
  'shield',
  'lock',
  'spark',
  'users',
  'template',
  'globe',
  'encrypt',
  'chart',
  'plug',
  'support',
  'workflow',
  'chat',
]

type CmsBusiness = {
  hero?: {
    eyebrow?: string | null
    titleBefore?: string | null
    titleAccent?: string | null
    description?: string | null
    stats?: Array<{
      itemId?: string | null
      value?: string | null
      label?: string | null
    } | null> | null
  } | null
  testimonials?: {
    title?: string | null
    items?: Array<{
      itemId?: string | null
      quote?: string | null
      role?: string | null
      company?: string | null
    } | null> | null
  } | null
  features?: {
    eyebrow?: string | null
    title?: string | null
    items?: Array<{
      itemId?: string | null
      icon?: string | null
      title?: string | null
      description?: string | null
    } | null> | null
  } | null
  closing?: CmsClosingCta
  seo?: CmsSeo
}

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

function optionalText(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function toFeatureIcon(
  value: string | null | undefined,
  fallback: BusinessFeatureIcon = 'shield',
): BusinessFeatureIcon {
  if (value && FEATURE_ICONS.includes(value as BusinessFeatureIcon)) {
    return value as BusinessFeatureIcon
  }
  return fallback
}

function mapBusinessFromCms(doc: CmsBusiness | null | undefined): BusinessPageContentData {
  const defaults = businessPageDefaults
  if (!doc) return defaults

  const stats: BusinessStat[] = []
  for (const stat of doc.hero?.stats ?? []) {
    const value = stat?.value?.trim()
    const label = stat?.label?.trim()
    if (!value || !label) continue
    stats.push({
      id: optionalText(stat?.itemId) || slugify(label),
      value,
      label,
    })
  }

  const testimonials: BusinessTestimonial[] = []
  for (const item of doc.testimonials?.items ?? []) {
    const quote = item?.quote?.trim()
    const role = item?.role?.trim()
    const company = item?.company?.trim()
    if (!quote || !role || !company) continue
    testimonials.push({
      id: optionalText(item?.itemId) || slugify(role),
      quote,
      role,
      company,
    })
  }

  const features: BusinessFeature[] = []
  for (const item of doc.features?.items ?? []) {
    const title = item?.title?.trim()
    const description = item?.description?.trim()
    if (!title || !description) continue
    features.push({
      id: optionalText(item?.itemId) || slugify(title),
      icon: toFeatureIcon(item?.icon),
      title,
      description,
    })
  }

  return {
    hero: {
      eyebrow: text(doc.hero?.eyebrow, defaults.hero.eyebrow),
      titleBefore: text(doc.hero?.titleBefore, defaults.hero.titleBefore),
      titleAccent: text(doc.hero?.titleAccent, defaults.hero.titleAccent),
      description: text(doc.hero?.description, defaults.hero.description),
      stats: stats.length > 0 ? stats : defaults.hero.stats,
    },
    form: defaults.form,
    testimonials: {
      title: text(doc.testimonials?.title, defaults.testimonials.title),
      items: testimonials.length > 0 ? testimonials : defaults.testimonials.items,
    },
    features: {
      eyebrow: text(doc.features?.eyebrow, defaults.features.eyebrow),
      title: text(doc.features?.title, defaults.features.title),
      items: features.length > 0 ? features : defaults.features.items,
    },
    closing: mapClosingCta(doc.closing, defaults.closing),
    seo: mapCmsSeo(doc.seo, defaults.seo),
  }
}

export async function getBusinessPageContent(): Promise<BusinessPageContentData> {
  if (shouldSkipCmsAtBuild()) return businessPageDefaults

  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'business',
      depth: 1,
    })) as CmsBusiness
    return mapBusinessFromCms(doc)
  } catch (error) {
    console.error('[business] Failed to load Business global from Payload — using defaults.', error)
    return businessPageDefaults
  }
}
