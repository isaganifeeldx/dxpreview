import type { AboutPageContentData } from './types'
import { aboutPageDefaults } from './defaults'

export function buildAboutCmsFieldDefaults(source: AboutPageContentData = aboutPageDefaults) {
  return {
    hero: {
      title: source.hero.title,
      description: source.hero.description,
      ctaLabel: source.hero.cta.label,
      ctaHref: source.hero.cta.href,
      images: source.hero.images.map((image) => ({
        alt: image.alt,
      })),
    },
    mission: {
      eyebrow: source.mission.eyebrow,
      title: source.mission.title,
      paragraphs: source.mission.paragraphs.map((paragraph) => ({
        text: paragraph,
      })),
      imageAlt: source.mission.image.alt,
    },
    culture: {
      eyebrow: source.culture.eyebrow,
      title: source.culture.title,
      description: source.culture.description,
      images: source.culture.images.map((image) => ({
        alt: image.alt,
      })),
    },
    locations: {
      eyebrow: source.locations.eyebrow,
      title: source.locations.title,
      description: source.locations.description,
      ctaLabel: source.locations.cta.label,
      ctaHref: source.locations.cta.href,
      items: source.locations.items.map((item) => ({
        itemId: item.id,
        name: item.name,
        role: item.role,
        imageAlt: item.image.alt,
      })),
    },
    voices: {
      eyebrow: source.voices.eyebrow,
      title: source.voices.title,
      description: source.voices.description,
      ctaLabel: source.voices.cta.label,
      ctaHref: source.voices.cta.href,
      items: source.voices.items.map((item) => ({
        itemId: item.id,
        quote: item.quote,
        name: item.name,
        role: item.role,
        avatarInitials: item.avatarInitials,
      })),
    },
    perks: {
      eyebrow: source.perks.eyebrow,
      title: source.perks.title,
      description: source.perks.description,
      ctaLabel: source.perks.cta.label,
      ctaHref: source.perks.cta.href,
      items: source.perks.items.map((item) => ({
        itemId: item.id,
        icon: item.icon,
        title: item.title,
        description: item.description,
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

export const aboutCmsFieldDefaults = buildAboutCmsFieldDefaults()
