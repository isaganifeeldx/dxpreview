import type { InteriorsPageContentData } from './types'
import { interiorsPageDefaults } from './defaults'

export function buildInteriorsCmsFieldDefaults(
  source: InteriorsPageContentData = interiorsPageDefaults,
) {
  return {
    hero: {
      eyebrow: source.hero.eyebrow,
      title: source.hero.title,
      description: source.hero.description,
      primaryCtaLabel: source.hero.primaryCta.label,
      primaryCtaHref: source.hero.primaryCta.href,
      secondaryCtaLabel: source.hero.secondaryCta.label,
      secondaryCtaHref: source.hero.secondaryCta.href,
    },
    capabilityPills: {
      eyebrow: source.capabilityPills.eyebrow,
      items: source.capabilityPills.items.map((item) => ({
        itemId: item.id,
        title: item.title,
        subtitle: item.subtitle,
        iconAlt: item.iconAlt,
      })),
    },
    splitFeatureAbove: {
      itemId: source.splitFeatures[0]?.id ?? 'context',
      eyebrow: source.splitFeatures[0]?.eyebrow ?? '',
      title: source.splitFeatures[0]?.title ?? '',
      description: source.splitFeatures[0]?.description ?? '',
      bullets: (source.splitFeatures[0]?.bullets ?? []).map((text) => ({ text })),
      imageAlt: source.splitFeatures[0]?.imageAlt ?? '',
      imagePosition: source.splitFeatures[0]?.imagePosition ?? 'right',
    },
    splitFeatureBelow: {
      itemId: source.splitFeatures[1]?.id ?? 'refine',
      eyebrow: source.splitFeatures[1]?.eyebrow ?? '',
      title: source.splitFeatures[1]?.title ?? '',
      description: source.splitFeatures[1]?.description ?? '',
      bullets: (source.splitFeatures[1]?.bullets ?? []).map((text) => ({ text })),
      imageAlt: source.splitFeatures[1]?.imageAlt ?? '',
      imagePosition: source.splitFeatures[1]?.imagePosition ?? 'left',
    },
    capabilityGrid: {
      title: source.capabilityGrid.title,
      subtitle: source.capabilityGrid.subtitle,
      footerLinkLabel: source.capabilityGrid.footerLink.label,
      footerLinkHref: source.capabilityGrid.footerLink.href,
      items: source.capabilityGrid.items.map((item) => ({
        itemId: item.id,
        title: item.title,
        description: item.description,
        imageAlt: item.imageAlt,
        tone: item.tone,
        span: item.span,
        variant: item.variant ?? 'image',
      })),
    },
    comparison: {
      title: source.comparison.title,
      subtitle: source.comparison.subtitle,
      oldWayTitle: source.comparison.oldWay.title,
      oldWayItems: source.comparison.oldWay.items.map((text) => ({ text })),
      newWayTitle: source.comparison.newWay.title,
      newWayItems: source.comparison.newWay.items.map((text) => ({ text })),
    },
    stats: source.stats.map((stat) => ({
      itemId: stat.id,
      value: stat.value,
      label: stat.label,
    })),
    testimonials: {
      title: source.testimonials.title,
      items: source.testimonials.items.map((item) => ({
        itemId: item.id,
        quote: item.quote,
        role: item.role,
        company: item.company,
      })),
    },
    features: {
      eyebrow: source.features.eyebrow,
      title: source.features.title,
      items: source.features.items.map((item) => ({
        itemId: item.id,
        icon: item.icon,
        title: item.title,
        description: item.description,
      })),
    },
    closing: {
      title: source.closing.title,
      primaryCtaLabel: source.closing.primaryCta.label,
      primaryCtaHref: source.closing.primaryCta.href,
      secondaryCtaLabel: source.closing.secondaryCta.label,
      secondaryCtaHref: source.closing.secondaryCta.href,
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

export const interiorsCmsFieldDefaults = buildInteriorsCmsFieldDefaults()
