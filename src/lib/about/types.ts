import type { PageClosingCtaData } from '@/lib/cta/defaults'
import type { SeoData } from '@/lib/seo/types'

export type AboutCta = {
  label: string
  href: string
}

export type AboutImage = {
  src: string
  alt: string
}

export type AboutLocation = {
  id: string
  name: string
  role: string
  image: AboutImage
}

export type AboutVoice = {
  id: string
  quote: string
  name: string
  role: string
  avatarInitials: string
}

export type AboutPerkIcon =
  | 'health'
  | 'equity'
  | 'growth'
  | 'remote'
  | 'leave'
  | 'tools'
  | 'team'

export type AboutPerk = {
  id: string
  icon: AboutPerkIcon
  title: string
  description: string
}

export type AboutPageContentData = {
  hero: {
    title: string
    description: string
    cta: AboutCta
    images: AboutImage[]
  }
  mission: {
    eyebrow: string
    title: string
    paragraphs: string[]
    image: AboutImage
  }
  culture: {
    eyebrow: string
    title: string
    description: string
    images: AboutImage[]
  }
  locations: {
    eyebrow: string
    title: string
    description: string
    cta: AboutCta
    items: AboutLocation[]
  }
  voices: {
    eyebrow: string
    title: string
    description: string
    cta: AboutCta
    items: AboutVoice[]
  }
  perks: {
    eyebrow: string
    title: string
    description: string
    cta: AboutCta
    items: AboutPerk[]
  }
  closing: PageClosingCtaData
  seo: SeoData
}
