import type { SpaceSensePageContentData } from './types'
import { spaceSensePageDefaults } from './defaults'

export function buildSpaceSenseCmsFieldDefaults(
  source: SpaceSensePageContentData = spaceSensePageDefaults,
) {
  return {
    hero: {
      eyebrow: source.hero.eyebrow,
      title: source.hero.title,
      description: source.hero.description,
      primaryCtaLabel: source.hero.primaryCta.label,
      primaryCtaHref: source.hero.primaryCta.href,
      imageAlt: source.hero.imageAlt,
    },
    models: {
      title: source.models.title,
      subtitle: source.models.subtitle,
      ctaLabel: source.models.cta.label,
      ctaHref: source.models.cta.href,
      sidebarTitle: source.models.sidebarTitle,
      items: source.models.items.map((item) => ({
        itemId: item.id,
        name: item.name,
        description: item.description,
        ctaLabel: item.cta.label,
        ctaHref: item.cta.href,
        imageAlt: item.imageAlt,
      })),
    },
    whatIs: {
      title: source.whatIs.title,
      description: source.whatIs.description,
      ctaLabel: source.whatIs.cta.label,
      ctaHref: source.whatIs.cta.href,
      imageAlt: source.whatIs.imageAlt,
    },
    howTo: {
      title: source.howTo.title,
      ctaLabel: source.howTo.cta.label,
      ctaHref: source.howTo.cta.href,
      steps: source.howTo.steps.map((step) => ({
        itemId: step.id,
        step: step.step,
        title: step.title,
        description: step.description,
        imageAlt: step.imageAlt,
      })),
    },
    faq: {
      title: source.faq.title,
      items: source.faq.items.map((item) => ({
        itemId: item.id,
        question: item.question,
        answer: item.answer,
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

export const spaceSenseCmsFieldDefaults = buildSpaceSenseCmsFieldDefaults()
