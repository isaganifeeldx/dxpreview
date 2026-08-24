import type { PageClosingCtaData } from '@/lib/cta/defaults'
import type { SeoData } from '@/lib/seo/types'

export type PlanId = 'free' | 'pro' | 'business' | 'enterprise'

export type BillingCycle = 'monthly' | 'yearly'

export type PlanIcon = 'none' | 'crown'

export type ComparisonCategoryIcon =
  | 'workspace'
  | 'ai'
  | 'image'
  | 'content'
  | 'collaboration'
  | 'brand'
  | 'team'
  | 'security'
  | 'storage'
  | 'support'

export type FeatureValue = boolean | string

export type PlanFeatureIcon = 'check' | 'history' | 'users' | 'brand' | 'shield' | 'support' | 'ai' | 'spark'

export type PlanFeatureSection = {
  id: string
  heading?: string
  icon?: PlanFeatureIcon
  items: string[]
}

export type PricingPlan = {
  id: PlanId
  name: string
  description: string
  icon: PlanIcon
  recommended?: boolean
  recommendedLabel?: string
  monthlyPrice: number | null
  yearlyPrice: number | null
  priceLabel?: string
  priceSuffix: string
  cta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  compareCta: { label: string; href: string; muted?: boolean }
  featureHeading: string
  featureSections: PlanFeatureSection[]
  learnMoreLabel: string
}

export type ComparisonRow = {
  id: string
  label: string
  hint?: string
  values: Record<PlanId, FeatureValue>
}

export type ComparisonCategory = {
  id: string
  label: string
  icon: ComparisonCategoryIcon
  rows: ComparisonRow[]
}

export type PromoBanner = {
  id: string
  title: string
  description: string
  cta: { label: string; href: string }
  variant: 'business' | 'ai'
}

export type PricingFaqItem = {
  id: string
  question: string
  answer: string
}

export type PricingPageContentData = {
  title: string
  billing: {
    monthlyLabel: string
    yearlyLabel: string
    yearlyBadge: string
  }
  plans: PricingPlan[]
  planFootnotes: string[]
  comparison: {
    title: string
    categories: ComparisonCategory[]
  }
  socialProof: {
    title: string
    logos: Array<{ name: string; mark: string; imageSrc?: string }>
  }
  promos: PromoBanner[]
  faq: {
    title: string
    items: PricingFaqItem[]
  }
  closing: PageClosingCtaData
  seo: SeoData
}
