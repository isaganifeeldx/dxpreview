import type { SeoData } from '@/lib/seo/types'

export type BusinessStat = {
  id: string
  value: string
  label: string
}

export type BusinessFormCopy = {
  title: string
  subtitle: string
  nameLabel: string
  emailLabel: string
  companyLabel: string
  teamSizeLabel: string
  teamSizePlaceholder: string
  teamSizeOptions: string[]
  messageLabel: string
  submitLabel: string
  successMessage: string
}

export type BusinessTestimonial = {
  id: string
  quote: string
  role: string
  company: string
}

export type BusinessFeatureIcon =
  | 'shield'
  | 'lock'
  | 'spark'
  | 'users'
  | 'template'
  | 'globe'
  | 'encrypt'
  | 'chart'
  | 'plug'
  | 'support'
  | 'workflow'
  | 'chat'

export type BusinessFeature = {
  id: string
  icon: BusinessFeatureIcon
  title: string
  description: string
}

export type BusinessCta = {
  label: string
  href: string
}

export type BusinessPageContentData = {
  hero: {
    eyebrow: string
    titleBefore: string
    titleAccent: string
    description: string
    stats: BusinessStat[]
  }
  form: BusinessFormCopy
  testimonials: {
    title: string
    items: BusinessTestimonial[]
  }
  features: {
    eyebrow: string
    title: string
    items: BusinessFeature[]
  }
  closing: {
    title: string
    primaryCta: BusinessCta
    secondaryCta: BusinessCta
  }
  seo: SeoData
}
