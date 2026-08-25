import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { mapClosingCta, type CmsClosingCta } from '@/lib/cta/mapClosingCta'
import { getMediaUrl } from '@/lib/media'
import { getPayloadClient } from '@/lib/payload'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { DEFAULT_NUMBER_ICONS, DEFAULT_PROCESS_IMAGE, homePageDefaults } from './defaults'
import type { HomePageContentData } from './types'
import type { BusinessFeature, BusinessFeatureIcon, BusinessTestimonial } from '@/lib/business/types'

type CmsMedia = {
  url?: string | null
} | null

type CmsHome = {
  hero?: {
    lineOne?: string | null
    title?: string | null
    description?: string | null
    features?: Array<{ label?: string | null } | null> | null
    primaryCtaLabel?: string | null
    primaryCtaHref?: string | null
    secondaryCtaLabel?: string | null
    secondaryCtaHref?: string | null
    videoId?: string | null
  } | null
  trust?: {
    intro?: string | null
    stats?: Array<{ value?: string | null; label?: string | null } | null> | null
  } | null
  process?: {
    title?: string | null
    cards?: Array<{
      title?: string | null
      description?: string | null
      image?: number | CmsMedia
      numberSide?: 'left' | 'right' | null
    } | null> | null
  } | null
  discover?: {
    title?: string | null
    items?: Array<{
      itemId?: string | null
      label?: string | null
      badge?: string | null
      image?: number | CmsMedia
      imageAlt?: string | null
      prompt?: string | null
      generateLabel?: string | null
      generateHref?: string | null
    } | null> | null
  } | null
  gallery?: {
    title?: string | null
    images?: Array<{
      image?: number | CmsMedia
      alt?: string | null
      grow?: number | null
    } | null> | null
  } | null
  lessons?: {
    title?: string | null
    description?: string | null
    ctaLabel?: string | null
    ctaHref?: string | null
    videoId?: string | null
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

function toFeatureIcon(
  value: string | null | undefined,
  fallback: BusinessFeatureIcon = 'shield',
): BusinessFeatureIcon {
  if (value && FEATURE_ICONS.includes(value as BusinessFeatureIcon)) {
    return value as BusinessFeatureIcon
  }
  return fallback
}

function mapHomeFromCms(doc: CmsHome | null | undefined): HomePageContentData {
  const defaults = homePageDefaults
  if (!doc) return defaults

  const heroFeatures =
    doc.hero?.features
      ?.map((feature) => feature?.label?.trim())
      .filter((label): label is string => Boolean(label))
      .map((label) => ({ label })) ?? []

  const trustStats =
    doc.trust?.stats
      ?.map((stat) => {
        const value = stat?.value?.trim()
        const label = stat?.label?.trim()
        if (!value || !label) return null
        return { value, label }
      })
      .filter((stat): stat is { value: string; label: string } => Boolean(stat)) ?? []

  const processCards =
    doc.process?.cards
      ?.map((card, index) => {
        const title = card?.title?.trim()
        const description = card?.description?.trim()
        if (!title || !description) return null
        return {
          title,
          description,
          imageSrc: getMediaUrl(card?.image) ?? DEFAULT_PROCESS_IMAGE,
          numberIcon: DEFAULT_NUMBER_ICONS[index % DEFAULT_NUMBER_ICONS.length],
          numberSide: card?.numberSide === 'left' ? ('left' as const) : ('right' as const),
        }
      })
      .filter((card): card is NonNullable<typeof card> => Boolean(card)) ?? []

  const galleryImages =
    doc.gallery?.images
      ?.map((item) => {
        const src = getMediaUrl(item?.image)
        const alt = item?.alt?.trim()
        if (!src || !alt) return null
        return {
          src,
          alt,
          grow: typeof item?.grow === 'number' && item.grow > 0 ? item.grow : 2,
        }
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? []

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

  const discoverItems =
    doc.discover?.items
      ?.map((item, index) => {
        const label = item?.label?.trim()
        if (!label) return null
        const fallback = defaults.discover.items[index % defaults.discover.items.length]
        return {
          id: optionalText(item?.itemId) || `discover-${index + 1}`,
          label,
          badge: optionalText(item?.badge),
          imageSrc: getMediaUrl(item?.image) ?? fallback.imageSrc,
          imageAlt: text(item?.imageAlt, fallback.imageAlt),
          prompt: text(item?.prompt, fallback.prompt),
          generateLabel: text(item?.generateLabel, fallback.generateLabel),
          generateHref: text(item?.generateHref, fallback.generateHref),
        }
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? []

  return {
    hero: {
      lineOne: text(doc.hero?.lineOne, defaults.hero.lineOne),
      title: text(doc.hero?.title, defaults.hero.title),
      description: text(doc.hero?.description, defaults.hero.description),
      features: heroFeatures.length > 0 ? heroFeatures : defaults.hero.features,
      primaryCta: {
        label: text(doc.hero?.primaryCtaLabel, defaults.hero.primaryCta.label),
        href: text(doc.hero?.primaryCtaHref, defaults.hero.primaryCta.href),
      },
      secondaryCta: {
        label: text(doc.hero?.secondaryCtaLabel, defaults.hero.secondaryCta.label),
        href: text(doc.hero?.secondaryCtaHref, defaults.hero.secondaryCta.href),
      },
      videoId: text(doc.hero?.videoId, defaults.hero.videoId),
    },
    trust: {
      intro: text(doc.trust?.intro, defaults.trust.intro),
      stats: trustStats.length > 0 ? trustStats : defaults.trust.stats,
    },
    process: {
      title: text(doc.process?.title, defaults.process.title),
      cards: processCards.length > 0 ? processCards : defaults.process.cards,
    },
    discover: {
      title: text(doc.discover?.title, defaults.discover.title),
      items: discoverItems.length > 0 ? discoverItems : defaults.discover.items,
    },
    gallery: {
      title: text(doc.gallery?.title, defaults.gallery.title),
      images: galleryImages.length > 0 ? galleryImages : defaults.gallery.images,
    },
    lessons: {
      title: text(doc.lessons?.title, defaults.lessons.title),
      description: text(doc.lessons?.description, defaults.lessons.description),
      cta: {
        label: text(doc.lessons?.ctaLabel, defaults.lessons.cta.label),
        href: text(doc.lessons?.ctaHref, defaults.lessons.cta.href),
      },
      videoId: text(doc.lessons?.videoId, defaults.lessons.videoId),
    },
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

export async function getHomePageContent(): Promise<HomePageContentData> {
  if (shouldSkipCmsAtBuild()) return homePageDefaults

  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'home',
      depth: 1,
    })) as CmsHome
    return mapHomeFromCms(doc)
  } catch (error) {
    console.error('[home] Failed to load Home global from Payload — using defaults.', error)
    return homePageDefaults
  }
}
