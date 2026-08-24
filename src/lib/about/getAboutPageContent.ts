import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { mapClosingCta, type CmsClosingCta } from '@/lib/cta/mapClosingCta'
import { getMediaUrl } from '@/lib/media'
import { getPayloadClient } from '@/lib/payload'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { aboutPageDefaults } from './defaults'
import type {
  AboutImage,
  AboutLocation,
  AboutPageContentData,
  AboutPerk,
  AboutPerkIcon,
  AboutVoice,
} from './types'

const PERK_ICONS: AboutPerkIcon[] = [
  'health',
  'equity',
  'growth',
  'remote',
  'leave',
  'tools',
  'team',
]

type CmsMedia = {
  url?: string | null
  filename?: string | null
} | null

type CmsImageRow = {
  image?: number | CmsMedia | null
  alt?: string | null
  imageAlt?: string | null
} | null

type CmsAbout = {
  hero?: {
    title?: string | null
    description?: string | null
    ctaLabel?: string | null
    ctaHref?: string | null
    images?: CmsImageRow[] | null
  } | null
  mission?: {
    eyebrow?: string | null
    title?: string | null
    paragraphs?: Array<{ text?: string | null } | null> | null
    image?: number | CmsMedia | null
    imageAlt?: string | null
  } | null
  culture?: {
    eyebrow?: string | null
    title?: string | null
    description?: string | null
    images?: CmsImageRow[] | null
  } | null
  locations?: {
    eyebrow?: string | null
    title?: string | null
    description?: string | null
    ctaLabel?: string | null
    ctaHref?: string | null
    items?: Array<{
      itemId?: string | null
      name?: string | null
      role?: string | null
      image?: number | CmsMedia | null
      imageAlt?: string | null
    } | null> | null
  } | null
  voices?: {
    eyebrow?: string | null
    title?: string | null
    description?: string | null
    ctaLabel?: string | null
    ctaHref?: string | null
    items?: Array<{
      itemId?: string | null
      quote?: string | null
      name?: string | null
      role?: string | null
      avatarInitials?: string | null
    } | null> | null
  } | null
  perks?: {
    eyebrow?: string | null
    title?: string | null
    description?: string | null
    ctaLabel?: string | null
    ctaHref?: string | null
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

function toPerkIcon(value: string | null | undefined, fallback: AboutPerkIcon = 'health'): AboutPerkIcon {
  if (value && PERK_ICONS.includes(value as AboutPerkIcon)) {
    return value as AboutPerkIcon
  }
  return fallback
}

function mapImage(
  row: CmsImageRow | undefined,
  fallback: AboutImage,
  altKey: 'alt' | 'imageAlt' = 'alt',
): AboutImage {
  const altSource = altKey === 'imageAlt' ? row?.imageAlt : row?.alt
  return {
    src: getMediaUrl(row?.image) ?? fallback.src,
    alt: text(altSource, fallback.alt),
  }
}

function mapAboutFromCms(doc: CmsAbout | null | undefined): AboutPageContentData {
  const defaults = aboutPageDefaults
  if (!doc) return defaults

  const heroImages =
    doc.hero?.images
      ?.map((row, index) => {
        const fallback = defaults.hero.images[index] ?? defaults.hero.images[0]
        if (!fallback) return null
        const mapped = mapImage(row, fallback)
        if (!mapped.alt) return null
        return mapped
      })
      .filter((image): image is AboutImage => Boolean(image)) ?? []

  const paragraphs =
    doc.mission?.paragraphs
      ?.map((row) => row?.text?.trim())
      .filter((paragraph): paragraph is string => Boolean(paragraph)) ?? []

  const cultureImages =
    doc.culture?.images
      ?.map((row, index) => {
        const fallback = defaults.culture.images[index] ?? defaults.culture.images[0]
        if (!fallback) return null
        const mapped = mapImage(row, fallback)
        if (!mapped.alt) return null
        return mapped
      })
      .filter((image): image is AboutImage => Boolean(image)) ?? []

  const locations: AboutLocation[] = []
  for (const [index, item] of (doc.locations?.items ?? []).entries()) {
    const name = item?.name?.trim()
    const role = item?.role?.trim()
    if (!name || !role) continue
    const fallbackImage = defaults.locations.items[index]?.image ?? defaults.locations.items[0]?.image
    if (!fallbackImage) continue
    locations.push({
      id: optionalText(item?.itemId) || slugify(name),
      name,
      role,
      image: {
        src: getMediaUrl(item?.image) ?? fallbackImage.src,
        alt: text(item?.imageAlt, fallbackImage.alt),
      },
    })
  }

  const voices: AboutVoice[] = []
  for (const item of doc.voices?.items ?? []) {
    const quote = item?.quote?.trim()
    const name = item?.name?.trim()
    const role = item?.role?.trim()
    const avatarInitials = item?.avatarInitials?.trim()
    if (!quote || !name || !role || !avatarInitials) continue
    voices.push({
      id: optionalText(item?.itemId) || slugify(name),
      quote,
      name,
      role,
      avatarInitials,
    })
  }

  const perks: AboutPerk[] = []
  for (const item of doc.perks?.items ?? []) {
    const title = item?.title?.trim()
    const description = item?.description?.trim()
    if (!title || !description) continue
    perks.push({
      id: optionalText(item?.itemId) || slugify(title),
      icon: toPerkIcon(item?.icon),
      title,
      description,
    })
  }

  return {
    hero: {
      title: text(doc.hero?.title, defaults.hero.title),
      description: text(doc.hero?.description, defaults.hero.description),
      cta: {
        label: text(doc.hero?.ctaLabel, defaults.hero.cta.label),
        href: text(doc.hero?.ctaHref, defaults.hero.cta.href),
      },
      images: heroImages.length > 0 ? heroImages : defaults.hero.images,
    },
    mission: {
      eyebrow: text(doc.mission?.eyebrow, defaults.mission.eyebrow),
      title: text(doc.mission?.title, defaults.mission.title),
      paragraphs: paragraphs.length > 0 ? paragraphs : defaults.mission.paragraphs,
      image: {
        src: getMediaUrl(doc.mission?.image) ?? defaults.mission.image.src,
        alt: text(doc.mission?.imageAlt, defaults.mission.image.alt),
      },
    },
    culture: {
      eyebrow: text(doc.culture?.eyebrow, defaults.culture.eyebrow),
      title: text(doc.culture?.title, defaults.culture.title),
      description: text(doc.culture?.description, defaults.culture.description),
      images: cultureImages.length > 0 ? cultureImages : defaults.culture.images,
    },
    locations: {
      eyebrow: text(doc.locations?.eyebrow, defaults.locations.eyebrow),
      title: text(doc.locations?.title, defaults.locations.title),
      description: text(doc.locations?.description, defaults.locations.description),
      cta: {
        label: text(doc.locations?.ctaLabel, defaults.locations.cta.label),
        href: text(doc.locations?.ctaHref, defaults.locations.cta.href),
      },
      items: locations.length > 0 ? locations : defaults.locations.items,
    },
    voices: {
      eyebrow: text(doc.voices?.eyebrow, defaults.voices.eyebrow),
      title: text(doc.voices?.title, defaults.voices.title),
      description: text(doc.voices?.description, defaults.voices.description),
      cta: {
        label: text(doc.voices?.ctaLabel, defaults.voices.cta.label),
        href: text(doc.voices?.ctaHref, defaults.voices.cta.href),
      },
      items: voices.length > 0 ? voices : defaults.voices.items,
    },
    perks: {
      eyebrow: text(doc.perks?.eyebrow, defaults.perks.eyebrow),
      title: text(doc.perks?.title, defaults.perks.title),
      description: text(doc.perks?.description, defaults.perks.description),
      cta: {
        label: text(doc.perks?.ctaLabel, defaults.perks.cta.label),
        href: text(doc.perks?.ctaHref, defaults.perks.cta.href),
      },
      items: perks.length > 0 ? perks : defaults.perks.items,
    },
    closing: mapClosingCta(doc.closing, defaults.closing),
    seo: mapCmsSeo(doc.seo, defaults.seo),
  }
}

export async function getAboutPageContent(): Promise<AboutPageContentData> {
  if (shouldSkipCmsAtBuild()) return aboutPageDefaults

  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'about',
      depth: 1,
    })) as CmsAbout
    return mapAboutFromCms(doc)
  } catch (error) {
    console.error('[about] Failed to load About global from Payload — using defaults.', error)
    return aboutPageDefaults
  }
}
