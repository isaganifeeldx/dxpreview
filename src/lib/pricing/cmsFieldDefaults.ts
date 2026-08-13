import type { FeatureValue, PricingPageContentData } from './types'
import { pricingPageDefaults } from './defaults'

type CmsFeatureValue = {
  type: 'included' | 'excluded' | 'text'
  text?: string
}

function toCmsFeatureValue(value: FeatureValue): CmsFeatureValue {
  if (value === true) return { type: 'included' }
  if (value === false) return { type: 'excluded' }
  return { type: 'text', text: value }
}

/** Payload field shapes for Pricing global defaultValue / seeding. */
export function buildPricingCmsFieldDefaults(
  source: PricingPageContentData = pricingPageDefaults,
) {
  return {
    title: source.title,
    billing: {
      monthlyLabel: source.billing.monthlyLabel,
      yearlyLabel: source.billing.yearlyLabel,
      yearlyBadge: source.billing.yearlyBadge,
    },
    planFootnotes: source.planFootnotes.map((text) => ({ text })),
    plans: source.plans.map((plan) => ({
      planId: plan.id,
      name: plan.name,
      description: plan.description,
      icon: plan.icon,
      recommended: Boolean(plan.recommended),
      recommendedLabel: plan.recommendedLabel ?? 'Recommended',
      monthlyPrice: plan.monthlyPrice ?? undefined,
      yearlyPrice: plan.yearlyPrice ?? undefined,
      priceLabel: plan.priceLabel,
      priceSuffix: plan.priceSuffix,
      ctaLabel: plan.cta.label,
      ctaHref: plan.cta.href,
      secondaryCtaLabel: plan.secondaryCta?.label,
      secondaryCtaHref: plan.secondaryCta?.href,
      compareCtaLabel: plan.compareCta.label,
      compareCtaHref: plan.compareCta.href,
      compareCtaMuted: Boolean(plan.compareCta.muted),
      featureHeading: plan.featureHeading,
      learnMoreLabel: plan.learnMoreLabel,
      featureSections: plan.featureSections.map((section) => ({
        sectionId: section.id,
        heading: section.heading,
        icon: section.icon,
        items: section.items.map((text) => ({ text })),
      })),
    })),
    comparison: {
      title: source.comparison.title,
      categories: source.comparison.categories.map((category) => ({
        categoryId: category.id,
        label: category.label,
        icon: category.icon,
        rows: category.rows.map((row) => ({
          rowId: row.id,
          label: row.label,
          free: toCmsFeatureValue(row.values.free),
          pro: toCmsFeatureValue(row.values.pro),
          business: toCmsFeatureValue(row.values.business),
          enterprise: toCmsFeatureValue(row.values.enterprise),
        })),
      })),
    },
    socialProof: {
      title: source.socialProof.title,
      logos: source.socialProof.logos.map((logo) => ({
        name: logo.name,
        mark: logo.mark,
      })),
    },
    promos: source.promos.map((promo) => ({
      promoId: promo.id,
      variant: promo.variant,
      title: promo.title,
      description: promo.description,
      ctaLabel: promo.cta.label,
      ctaHref: promo.cta.href,
    })),
    faq: {
      title: source.faq.title,
      items: source.faq.items.map((item) => ({
        itemId: item.id,
        question: item.question,
        answer: item.answer,
      })),
    },
    seo: {
      title: source.seo.title,
      description: source.seo.description,
      focusKeyword: source.seo.focusKeyword,
      keywords: source.seo.keywords,
      ogTitle: source.seo.ogTitle,
      ogDescription: source.seo.ogDescription,
      twitterCard: source.seo.twitterCard,
      twitterTitle: source.seo.twitterTitle,
      twitterDescription: source.seo.twitterDescription,
    },
  }
}

export const pricingCmsFieldDefaults = buildPricingCmsFieldDefaults()
