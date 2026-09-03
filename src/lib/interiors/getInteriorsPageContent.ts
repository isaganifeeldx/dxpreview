import type { BusinessFeature, BusinessFeatureIcon, BusinessTestimonial } from '@/lib/business/types'
import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { mapClosingCta, type CmsClosingCta } from '@/lib/cta/mapClosingCta'
import { getMediaUrl } from '@/lib/media'
import { getPayloadClient } from '@/lib/payload'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { interiorsPageDefaults } from './defaults'
import type {
  InteriorsCapabilityCard,
  InteriorsCapabilityPill,
  InteriorsPageContentData,
  InteriorsSplitFeature,
  InteriorsStat,
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

const CARD_TONES: InteriorsCapabilityCard['tone'][] = [
  'rose',
  'purple',
  'coral',
  'charcoal',
  'indigo',
  'violet',
  'magenta',
  'lavender',
  'sunset',
]

type CmsMedia = {
  url?: string | null
} | null

type CmsInteriors = {
  hero?: {
    eyebrow?: string | null
    title?: string | null
    description?: string | null
    primaryCtaLabel?: string | null
    primaryCtaHref?: string | null
    secondaryCtaLabel?: string | null
    secondaryCtaHref?: string | null
  } | null
  capabilityPills?: {
    eyebrow?: string | null
    items?: Array<{
      itemId?: string | null
      title?: string | null
      subtitle?: string | null
      icon?: number | CmsMedia
      iconAlt?: string | null
    } | null> | null
  } | null
  splitFeatureAbove?: {
    itemId?: string | null
    eyebrow?: string | null
    title?: string | null
    description?: string | null
    bullets?: Array<{ text?: string | null } | null> | null
    image?: number | CmsMedia
    imageAlt?: string | null
    imagePosition?: 'left' | 'right' | null
  } | null
  splitFeatureBelow?: {
    itemId?: string | null
    eyebrow?: string | null
    title?: string | null
    description?: string | null
    bullets?: Array<{ text?: string | null } | null> | null
    image?: number | CmsMedia
    imageAlt?: string | null
    imagePosition?: 'left' | 'right' | null
  } | null
  capabilityGrid?: {
    title?: string | null
    subtitle?: string | null
    footerLinkLabel?: string | null
    footerLinkHref?: string | null
    items?: Array<{
      itemId?: string | null
      title?: string | null
      description?: string | null
      variant?: 'image' | 'custom' | null
      image?: number | CmsMedia
      imageAlt?: string | null
      span?: 'normal' | 'wide' | null
      tone?: string | null
    } | null> | null
  } | null
  comparison?: {
    title?: string | null
    subtitle?: string | null
    oldWayTitle?: string | null
    oldWayItems?: Array<{ text?: string | null } | null> | null
    newWayTitle?: string | null
    newWayItems?: Array<{ text?: string | null } | null> | null
  } | null
  stats?: Array<{
    itemId?: string | null
    value?: string | null
    label?: string | null
  } | null> | null
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

function toCardTone(
  value: string | null | undefined,
  fallback: InteriorsCapabilityCard['tone'] = 'rose',
): InteriorsCapabilityCard['tone'] {
  if (value && CARD_TONES.includes(value as InteriorsCapabilityCard['tone'])) {
    return value as InteriorsCapabilityCard['tone']
  }
  return fallback
}

function lines(items: Array<{ text?: string | null } | null> | null | undefined): string[] {
  const result: string[] = []
  for (const item of items ?? []) {
    const value = item?.text?.trim()
    if (value) result.push(value)
  }
  return result
}

function mapInteriorsFromCms(doc: CmsInteriors | null | undefined): InteriorsPageContentData {
  const defaults = interiorsPageDefaults
  if (!doc) return defaults

  const pills: InteriorsCapabilityPill[] = []
  for (const [index, item] of (doc.capabilityPills?.items ?? []).entries()) {
    const title = item?.title?.trim()
    const subtitle = item?.subtitle?.trim()
    if (!title || !subtitle) continue
    const fallback = defaults.capabilityPills.items[index]
    pills.push({
      id: optionalText(item?.itemId) || fallback?.id || slugify(title),
      title,
      subtitle,
      iconSrc: getMediaUrl(item?.icon) ?? '',
      iconAlt: text(item?.iconAlt, fallback?.iconAlt ?? `${title} icon`),
    })
  }

  const splitFeatures: InteriorsSplitFeature[] = []
  for (const [index, item] of [doc.splitFeatureAbove, doc.splitFeatureBelow].entries()) {
    const fallback = defaults.splitFeatures[index] ?? defaults.splitFeatures[0]
    if (!item && !fallback) continue

    const title = item?.title?.trim() || fallback?.title
    const description = item?.description?.trim() || fallback?.description
    if (!title || !description) continue

    const bullets = lines(item?.bullets)
    splitFeatures.push({
      id: optionalText(item?.itemId) || fallback?.id || slugify(title),
      eyebrow: text(item?.eyebrow, fallback?.eyebrow ?? ''),
      title,
      description,
      bullets: bullets.length > 0 ? bullets : (fallback?.bullets ?? []),
      imageSrc: getMediaUrl(item?.image) ?? fallback?.imageSrc ?? '',
      imageAlt: text(item?.imageAlt, fallback?.imageAlt ?? title),
      imagePosition:
        item?.imagePosition === 'left' || item?.imagePosition === 'right'
          ? item.imagePosition
          : (fallback?.imagePosition ?? 'right'),
    })
  }

  const gridCards: InteriorsCapabilityCard[] = []
  for (const [index, item] of (doc.capabilityGrid?.items ?? []).entries()) {
    const title = item?.title?.trim()
    const description = item?.description?.trim()
    if (!title || !description) continue
    const fallback = defaults.capabilityGrid.items[index]
    const variant = item?.variant === 'custom' ? 'custom' : 'image'
    gridCards.push({
      id: optionalText(item?.itemId) || fallback?.id || slugify(title),
      title,
      description,
      imageSrc: getMediaUrl(item?.image) ?? fallback?.imageSrc ?? '',
      imageAlt: text(item?.imageAlt, fallback?.imageAlt ?? title),
      tone: toCardTone(item?.tone, fallback?.tone),
      span: item?.span === 'wide' ? 'wide' : 'normal',
      variant,
    })
  }

  const stats: InteriorsStat[] = []
  for (const stat of doc.stats ?? []) {
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

  const oldWayItems = lines(doc.comparison?.oldWayItems)
  const newWayItems = lines(doc.comparison?.newWayItems)

  return {
    hero: {
      eyebrow: text(doc.hero?.eyebrow, defaults.hero.eyebrow),
      title: text(doc.hero?.title, defaults.hero.title),
      description: text(doc.hero?.description, defaults.hero.description),
      primaryCta: {
        label: text(doc.hero?.primaryCtaLabel, defaults.hero.primaryCta.label),
        href: text(doc.hero?.primaryCtaHref, defaults.hero.primaryCta.href),
      },
      secondaryCta: {
        label: text(doc.hero?.secondaryCtaLabel, defaults.hero.secondaryCta.label),
        href: text(doc.hero?.secondaryCtaHref, defaults.hero.secondaryCta.href),
      },
    },
    capabilityPills: {
      eyebrow: text(doc.capabilityPills?.eyebrow, defaults.capabilityPills.eyebrow),
      items: pills.length > 0 ? pills : defaults.capabilityPills.items,
    },
    splitFeatures: splitFeatures.length > 0 ? splitFeatures : defaults.splitFeatures,
    capabilityGrid: {
      title: text(doc.capabilityGrid?.title, defaults.capabilityGrid.title),
      subtitle: text(doc.capabilityGrid?.subtitle, defaults.capabilityGrid.subtitle),
      items: gridCards.length > 0 ? gridCards : defaults.capabilityGrid.items,
      footerLink: {
        label: text(doc.capabilityGrid?.footerLinkLabel, defaults.capabilityGrid.footerLink.label),
        href: text(doc.capabilityGrid?.footerLinkHref, defaults.capabilityGrid.footerLink.href),
      },
    },
    comparison: {
      title: text(doc.comparison?.title, defaults.comparison.title),
      subtitle: text(doc.comparison?.subtitle, defaults.comparison.subtitle),
      oldWay: {
        title: text(doc.comparison?.oldWayTitle, defaults.comparison.oldWay.title),
        items: oldWayItems.length > 0 ? oldWayItems : defaults.comparison.oldWay.items,
      },
      newWay: {
        title: text(doc.comparison?.newWayTitle, defaults.comparison.newWay.title),
        items: newWayItems.length > 0 ? newWayItems : defaults.comparison.newWay.items,
      },
    },
    stats: stats.length > 0 ? stats : defaults.stats,
    featuredQuote: defaults.featuredQuote,
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

export async function getInteriorsPageContent(): Promise<InteriorsPageContentData> {
  if (shouldSkipCmsAtBuild()) return interiorsPageDefaults

  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'dx-interiors',
      depth: 1,
    })) as CmsInteriors
    return mapInteriorsFromCms(doc)
  } catch (error) {
    console.error('[dx-interiors] Failed to load DX Interiors global from Payload — using defaults.', error)
    return interiorsPageDefaults
  }
}
