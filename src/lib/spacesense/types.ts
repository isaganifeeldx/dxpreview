import type { BusinessCta } from '@/lib/business/types'
import type { PageClosingCtaData } from '@/lib/cta/defaults'
import type { SeoData } from '@/lib/seo/types'

export type SpaceSenseHero = {
  eyebrow: string
  title: string
  description: string
  primaryCta: BusinessCta
  imageSrc: string
  imageAlt: string
}

export type SpaceSenseModel = {
  id: string
  name: string
  description: string
  cta: BusinessCta
  imageSrc: string
  imageAlt: string
}

export type SpaceSenseModelsSection = {
  title: string
  subtitle: string
  cta: BusinessCta
  sidebarTitle: string
  items: SpaceSenseModel[]
}

export type SpaceSenseWhatIs = {
  title: string
  description: string
  cta: BusinessCta
  imageSrc: string
  imageAlt: string
  promptPreview: string
}

export type SpaceSenseHowToStep = {
  id: string
  step: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export type SpaceSenseHowToSection = {
  title: string
  cta: BusinessCta
  steps: SpaceSenseHowToStep[]
}

export type SpaceSenseFaqItem = {
  id: string
  question: string
  answer: string
}

export type SpaceSensePageContentData = {
  hero: SpaceSenseHero
  models: SpaceSenseModelsSection
  whatIs: SpaceSenseWhatIs
  howTo: SpaceSenseHowToSection
  faq: {
    title: string
    items: SpaceSenseFaqItem[]
  }
  closing: PageClosingCtaData
  seo: SeoData
}
