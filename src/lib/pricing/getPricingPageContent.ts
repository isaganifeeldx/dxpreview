import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { mapClosingCta, type CmsClosingCta } from '@/lib/cta/mapClosingCta'
import { getMediaUrl } from '@/lib/media'
import { getPayloadClient } from '@/lib/payload'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { pricingPageDefaults } from './defaults'
import type {
  ComparisonCategory,
  ComparisonCategoryIcon,
  FeatureValue,
  PlanFeatureIcon,
  PlanIcon,
  PlanId,
  PricingPageContentData,
  PricingPlan,
  PromoBanner,
} from './types'

const PLAN_IDS: PlanId[] = ['free', 'pro', 'business', 'enterprise']

const PLAN_ICONS: PlanIcon[] = ['none', 'crown']

const FEATURE_ICONS: PlanFeatureIcon[] = [
  'check',
  'history',
  'users',
  'brand',
  'shield',
  'support',
  'ai',
  'spark',
]

const COMPARISON_ICONS: ComparisonCategoryIcon[] = [
  'workspace',
  'ai',
  'image',
  'content',
  'collaboration',
  'brand',
  'team',
  'security',
  'storage',
  'support',
]

type CmsFeatureValue = {
  type?: string | null
  text?: string | null
} | null

type CmsPricing = {
  title?: string | null
  billing?: {
    monthlyLabel?: string | null
    yearlyLabel?: string | null
    yearlyBadge?: string | null
  } | null
  planFootnotes?: Array<{ text?: string | null } | null> | null
  plans?: Array<{
    planId?: string | null
    name?: string | null
    description?: string | null
    icon?: string | null
    recommended?: boolean | null
    recommendedLabel?: string | null
    monthlyPrice?: number | null
    yearlyPrice?: number | null
    priceLabel?: string | null
    priceSuffix?: string | null
    ctaLabel?: string | null
    ctaHref?: string | null
    secondaryCtaLabel?: string | null
    secondaryCtaHref?: string | null
    compareCtaLabel?: string | null
    compareCtaHref?: string | null
    compareCtaMuted?: boolean | null
    featureHeading?: string | null
    learnMoreLabel?: string | null
    featureSections?: Array<{
      sectionId?: string | null
      heading?: string | null
      icon?: string | null
      items?: Array<{ text?: string | null } | null> | null
    } | null> | null
  } | null> | null
  comparison?: {
    title?: string | null
    categories?: Array<{
      categoryId?: string | null
      label?: string | null
      icon?: string | null
      rows?: Array<{
        rowId?: string | null
        label?: string | null
        free?: CmsFeatureValue
        pro?: CmsFeatureValue
        business?: CmsFeatureValue
        enterprise?: CmsFeatureValue
      } | null> | null
    } | null> | null
  } | null
  socialProof?: {
    title?: string | null
    logos?: Array<{
      name?: string | null
      mark?: string | null
      image?: number | { url?: string | null; filename?: string | null } | null
    } | null> | null
  } | null
  promos?: Array<{
    promoId?: string | null
    variant?: string | null
    title?: string | null
    description?: string | null
    ctaLabel?: string | null
    ctaHref?: string | null
  } | null> | null
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

function toPlanId(value: string | null | undefined, fallback: PlanId = 'free'): PlanId {
  if (value && PLAN_IDS.includes(value as PlanId)) return value as PlanId
  return fallback
}

function toPlanIcon(value: string | null | undefined, fallback: PlanIcon = 'none'): PlanIcon {
  if (value && PLAN_ICONS.includes(value as PlanIcon)) return value as PlanIcon
  return fallback
}

function toFeatureIcon(
  value: string | null | undefined,
): PlanFeatureIcon | undefined {
  if (value && FEATURE_ICONS.includes(value as PlanFeatureIcon)) {
    return value as PlanFeatureIcon
  }
  return undefined
}

function toComparisonIcon(
  value: string | null | undefined,
  fallback: ComparisonCategoryIcon = 'workspace',
): ComparisonCategoryIcon {
  if (value && COMPARISON_ICONS.includes(value as ComparisonCategoryIcon)) {
    return value as ComparisonCategoryIcon
  }
  return fallback
}

function mapFeatureValue(value: CmsFeatureValue | undefined): FeatureValue {
  const type = value?.type?.trim()
  if (type === 'included') return true
  if (type === 'text') {
    const custom = value?.text?.trim()
    return custom || '—'
  }
  return false
}

function mapCta(
  label: string | null | undefined,
  href: string | null | undefined,
  fallback: { label: string; href: string },
): { label: string; href: string } {
  return {
    label: text(label, fallback.label),
    href: text(href, fallback.href),
  }
}

function mapPlans(plans: CmsPricing['plans']): PricingPlan[] {
  if (!plans?.length) return []

  const mapped: PricingPlan[] = []

  for (let index = 0; index < plans.length; index++) {
    const plan = plans[index]
    const name = plan?.name?.trim()
    const description = plan?.description?.trim()
    if (!name || !description) continue

    const id = toPlanId(plan?.planId, PLAN_IDS[Math.min(index, PLAN_IDS.length - 1)])
    const fallback = pricingPageDefaults.plans.find((p) => p.id === id) ?? pricingPageDefaults.plans[0]

    const featureSections =
      plan?.featureSections
        ?.map((section, sectionIndex) => {
          const items =
            section?.items
              ?.map((item) => item?.text?.trim())
              .filter((item): item is string => Boolean(item)) ?? []

          if (items.length === 0) return null

          const heading = optionalText(section?.heading)
          const sectionId =
            optionalText(section?.sectionId) ||
            (heading ? slugify(heading) : `section-${sectionIndex + 1}`)

          return {
            id: sectionId,
            heading,
            icon: toFeatureIcon(section?.icon),
            items,
          }
        })
        .filter((section): section is NonNullable<typeof section> => Boolean(section)) ?? []

    const secondaryLabel = optionalText(plan?.secondaryCtaLabel)
    const secondaryHref = optionalText(plan?.secondaryCtaHref)

    mapped.push({
      id,
      name,
      description,
      icon: toPlanIcon(plan?.icon, fallback.icon),
      recommended: Boolean(plan?.recommended),
      recommendedLabel: plan?.recommended
        ? text(plan?.recommendedLabel, fallback.recommendedLabel ?? 'Recommended')
        : undefined,
      monthlyPrice:
        typeof plan?.monthlyPrice === 'number' ? plan.monthlyPrice : fallback.monthlyPrice,
      yearlyPrice:
        typeof plan?.yearlyPrice === 'number' ? plan.yearlyPrice : fallback.yearlyPrice,
      priceLabel: optionalText(plan?.priceLabel) ?? fallback.priceLabel,
      priceSuffix: text(plan?.priceSuffix, fallback.priceSuffix),
      cta: mapCta(plan?.ctaLabel, plan?.ctaHref, fallback.cta),
      secondaryCta:
        secondaryLabel && secondaryHref
          ? { label: secondaryLabel, href: secondaryHref }
          : fallback.secondaryCta,
      compareCta: {
        ...mapCta(plan?.compareCtaLabel, plan?.compareCtaHref, fallback.compareCta),
        muted: Boolean(plan?.compareCtaMuted ?? fallback.compareCta.muted),
      },
      featureHeading: text(plan?.featureHeading, fallback.featureHeading),
      featureSections: featureSections.length > 0 ? featureSections : fallback.featureSections,
      learnMoreLabel: text(plan?.learnMoreLabel, fallback.learnMoreLabel),
    })
  }

  return mapped
}

function mapComparisonCategories(
  categories: NonNullable<CmsPricing['comparison']>['categories'],
): ComparisonCategory[] {
  if (!categories?.length) return []

  const mapped: ComparisonCategory[] = []

  for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
    const category = categories[categoryIndex]
    const label = category?.label?.trim()
    if (!label) continue

    const rows =
      category?.rows
        ?.map((row, rowIndex) => {
          const rowLabel = row?.label?.trim()
          if (!rowLabel) return null

          return {
            id: optionalText(row?.rowId) || slugify(rowLabel) || `row-${rowIndex + 1}`,
            label: rowLabel,
            values: {
              free: mapFeatureValue(row?.free),
              pro: mapFeatureValue(row?.pro),
              business: mapFeatureValue(row?.business),
              enterprise: mapFeatureValue(row?.enterprise),
            },
          }
        })
        .filter((row): row is NonNullable<typeof row> => Boolean(row)) ?? []

    if (rows.length === 0) continue

    mapped.push({
      id: optionalText(category?.categoryId) || slugify(label) || `category-${categoryIndex + 1}`,
      label,
      icon: toComparisonIcon(category?.icon),
      rows,
    })
  }

  return mapped
}

function mapPromos(promos: CmsPricing['promos']): PromoBanner[] {
  if (!promos?.length) return []

  const mapped: PromoBanner[] = []

  for (let index = 0; index < promos.length; index++) {
    const promo = promos[index]
    const title = promo?.title?.trim()
    const description = promo?.description?.trim()
    if (!title || !description) continue

    const variant = promo?.variant === 'ai' ? 'ai' : 'business'
    const fallback = pricingPageDefaults.promos[index] ?? pricingPageDefaults.promos[0]

    mapped.push({
      id: optionalText(promo?.promoId) || slugify(title) || `promo-${index + 1}`,
      title,
      description,
      variant,
      cta: mapCta(promo?.ctaLabel, promo?.ctaHref, fallback.cta),
    })
  }

  return mapped
}

function mapPricingFromCms(doc: CmsPricing | null | undefined): PricingPageContentData {
  const defaults = pricingPageDefaults
  if (!doc) return defaults

  const plans = mapPlans(doc.plans)
  const categories = mapComparisonCategories(doc.comparison?.categories)
  const logos: Array<{ name: string; mark: string; imageSrc?: string }> = []
  for (const logo of doc.socialProof?.logos ?? []) {
    const name = logo?.name?.trim()
    if (!name) continue
    const mark = logo?.mark?.trim() || name
    const imageSrc = getMediaUrl(logo?.image) ?? undefined
    if (!imageSrc && !logo?.mark?.trim()) continue
    logos.push({ name, mark, imageSrc })
  }

  const footnotes =
    doc.planFootnotes
      ?.map((item) => item?.text?.trim())
      .filter((item): item is string => Boolean(item)) ?? []

  const faqItems =
    doc.faq?.items
      ?.map((item, index) => {
        const question = item?.question?.trim()
        const answer = item?.answer?.trim()
        if (!question || !answer) return null
        return {
          id: optionalText(item?.itemId) || slugify(question) || `faq-${index + 1}`,
          question,
          answer,
        }
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? []

  const promos = mapPromos(doc.promos)

  return {
    title: text(doc.title, defaults.title),
    billing: {
      monthlyLabel: text(doc.billing?.monthlyLabel, defaults.billing.monthlyLabel),
      yearlyLabel: text(doc.billing?.yearlyLabel, defaults.billing.yearlyLabel),
      yearlyBadge: text(doc.billing?.yearlyBadge, defaults.billing.yearlyBadge),
    },
    plans: plans.length > 0 ? plans : defaults.plans,
    planFootnotes: footnotes.length > 0 ? footnotes : defaults.planFootnotes,
    comparison: {
      title: text(doc.comparison?.title, defaults.comparison.title),
      categories: categories.length > 0 ? categories : defaults.comparison.categories,
    },
    socialProof: {
      title: text(doc.socialProof?.title, defaults.socialProof.title),
      logos: logos.length > 0 ? logos : defaults.socialProof.logos,
    },
    promos: promos.length > 0 ? promos : defaults.promos,
    faq: {
      title: text(doc.faq?.title, defaults.faq.title),
      items: faqItems.length > 0 ? faqItems : defaults.faq.items,
    },
    closing: mapClosingCta(doc.closing, defaults.closing),
    seo: mapCmsSeo(doc.seo, defaults.seo),
  }
}

export async function getPricingPageContent(): Promise<PricingPageContentData> {
  if (shouldSkipCmsAtBuild()) return pricingPageDefaults

  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'pricing',
      depth: 1,
    })) as CmsPricing
    return mapPricingFromCms(doc)
  } catch (error) {
    console.error('[pricing] Failed to load Pricing global from Payload — using defaults.', error)
    return pricingPageDefaults
  }
}
