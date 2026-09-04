import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { mapClosingCta, type CmsClosingCta } from '@/lib/cta/mapClosingCta'
import { getMediaUrl } from '@/lib/media'
import { getPayloadClient } from '@/lib/payload'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { spaceSensePageDefaults } from './defaults'
import type {
  SpaceSenseFaqItem,
  SpaceSenseHowToStep,
  SpaceSenseModel,
  SpaceSensePageContentData,
} from './types'

type CmsMedia = {
  url?: string | null
} | null

type CmsSpaceSense = {
  hero?: {
    eyebrow?: string | null
    title?: string | null
    description?: string | null
    primaryCtaLabel?: string | null
    primaryCtaHref?: string | null
    image?: number | CmsMedia
    imageAlt?: string | null
  } | null
  models?: {
    title?: string | null
    subtitle?: string | null
    sidebarTitle?: string | null
    ctaLabel?: string | null
    ctaHref?: string | null
    items?: Array<{
      itemId?: string | null
      name?: string | null
      description?: string | null
      badge?: string | null
      ctaLabel?: string | null
      ctaHref?: string | null
      image?: number | CmsMedia
      imageAlt?: string | null
    } | null> | null
  } | null
  whatIs?: {
    title?: string | null
    description?: string | null
    ctaLabel?: string | null
    ctaHref?: string | null
    image?: number | CmsMedia
    imageAlt?: string | null
  } | null
  howTo?: {
    title?: string | null
    ctaLabel?: string | null
    ctaHref?: string | null
    steps?: Array<{
      itemId?: string | null
      step?: string | null
      title?: string | null
      description?: string | null
      image?: number | CmsMedia
      imageAlt?: string | null
    } | null> | null
  } | null
  faq?: {
    title?: string | null
    items?: Array<{
      itemId?: string | null
      question?: string | null
      answer?: string | null
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

function mapSpaceSenseFromCms(doc: CmsSpaceSense | null | undefined): SpaceSensePageContentData {
  const defaults = spaceSensePageDefaults
  if (!doc) return defaults

  const models: SpaceSenseModel[] = []
  for (const [index, item] of (doc.models?.items ?? []).entries()) {
    const name = item?.name?.trim()
    const description = item?.description?.trim()
    if (!name || !description) continue
    const fallback = defaults.models.items[index]
    models.push({
      id: optionalText(item?.itemId) || fallback?.id || slugify(name),
      name,
      description,
      badge: optionalText(item?.badge) || fallback?.badge,
      cta: {
        label: text(item?.ctaLabel, fallback?.cta.label ?? 'Generate'),
        href: text(item?.ctaHref, fallback?.cta.href ?? '/login'),
      },
      imageSrc: getMediaUrl(item?.image) ?? fallback?.imageSrc ?? '',
      imageAlt: text(item?.imageAlt, fallback?.imageAlt ?? name),
    })
  }

  const steps: SpaceSenseHowToStep[] = []
  for (const [index, item] of (doc.howTo?.steps ?? []).entries()) {
    const title = item?.title?.trim()
    const description = item?.description?.trim()
    if (!title || !description) continue
    const fallback = defaults.howTo.steps[index]
    steps.push({
      id: optionalText(item?.itemId) || fallback?.id || slugify(title),
      step: text(item?.step, fallback?.step ?? String(index + 1).padStart(2, '0')),
      title,
      description,
      imageSrc: getMediaUrl(item?.image) ?? fallback?.imageSrc ?? '',
      imageAlt: text(item?.imageAlt, fallback?.imageAlt ?? title),
    })
  }

  const faqItems: SpaceSenseFaqItem[] = []
  for (const item of doc.faq?.items ?? []) {
    const question = item?.question?.trim()
    const answer = item?.answer?.trim()
    if (!question || !answer) continue
    faqItems.push({
      id: optionalText(item?.itemId) || slugify(question),
      question,
      answer,
    })
  }

  return {
    hero: {
      eyebrow: text(doc.hero?.eyebrow, defaults.hero.eyebrow),
      title: text(doc.hero?.title, defaults.hero.title),
      description: text(doc.hero?.description, defaults.hero.description),
      primaryCta: {
        label: text(doc.hero?.primaryCtaLabel, defaults.hero.primaryCta.label),
        href: text(doc.hero?.primaryCtaHref, defaults.hero.primaryCta.href),
      },
      imageSrc: getMediaUrl(doc.hero?.image) ?? defaults.hero.imageSrc,
      imageAlt: text(doc.hero?.imageAlt, defaults.hero.imageAlt),
    },
    models: {
      title: text(doc.models?.title, defaults.models.title),
      subtitle: text(doc.models?.subtitle, defaults.models.subtitle),
      sidebarTitle: text(doc.models?.sidebarTitle, defaults.models.sidebarTitle),
      cta: {
        label: text(doc.models?.ctaLabel, defaults.models.cta.label),
        href: text(doc.models?.ctaHref, defaults.models.cta.href),
      },
      items: models.length > 0 ? models : defaults.models.items,
    },
    whatIs: {
      title: text(doc.whatIs?.title, defaults.whatIs.title),
      description: text(doc.whatIs?.description, defaults.whatIs.description),
      cta: {
        label: text(doc.whatIs?.ctaLabel, defaults.whatIs.cta.label),
        href: text(doc.whatIs?.ctaHref, defaults.whatIs.cta.href),
      },
      imageSrc: getMediaUrl(doc.whatIs?.image) ?? defaults.whatIs.imageSrc,
      imageAlt: text(doc.whatIs?.imageAlt, defaults.whatIs.imageAlt),
      promptPreview: defaults.whatIs.promptPreview,
    },
    howTo: {
      title: text(doc.howTo?.title, defaults.howTo.title),
      cta: {
        label: text(doc.howTo?.ctaLabel, defaults.howTo.cta.label),
        href: text(doc.howTo?.ctaHref, defaults.howTo.cta.href),
      },
      steps: steps.length > 0 ? steps : defaults.howTo.steps,
    },
    faq: {
      title: text(doc.faq?.title, defaults.faq.title),
      items: faqItems.length > 0 ? faqItems : defaults.faq.items,
    },
    closing: mapClosingCta(doc.closing, defaults.closing),
    seo: mapCmsSeo(doc.seo, defaults.seo),
  }
}

export async function getSpaceSensePageContent(): Promise<SpaceSensePageContentData> {
  if (shouldSkipCmsAtBuild()) return spaceSensePageDefaults

  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'spacesense-ai',
      depth: 1,
    })) as CmsSpaceSense
    return mapSpaceSenseFromCms(doc)
  } catch (error) {
    console.error('[spacesense-ai] Failed to load SpaceSense global from Payload — using defaults.', error)
    return spaceSensePageDefaults
  }
}
