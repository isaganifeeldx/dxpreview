import type { BusinessPageContentData } from './types'
import { businessPageDefaults } from './defaults'

export function buildBusinessCmsFieldDefaults(
  source: BusinessPageContentData = businessPageDefaults,
) {
  return {
    hero: {
      eyebrow: source.hero.eyebrow,
      titleBefore: source.hero.titleBefore,
      titleAccent: source.hero.titleAccent,
      description: source.hero.description,
      stats: source.hero.stats.map((stat) => ({
        itemId: stat.id,
        value: stat.value,
        label: stat.label,
      })),
    },
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

export const businessCmsFieldDefaults = buildBusinessCmsFieldDefaults()
