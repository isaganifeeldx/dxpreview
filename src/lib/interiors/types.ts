import type { BusinessCta, BusinessFeature, BusinessTestimonial } from '@/lib/business/types'
import type { PageClosingCtaData } from '@/lib/cta/defaults'
import type { SeoData } from '@/lib/seo/types'

export type InteriorsHero = {
  eyebrow: string
  title: string
  description: string
  primaryCta: BusinessCta
  secondaryCta: BusinessCta
}

export type InteriorsCapabilityIcon =
  | 'surface'
  | 'cleanup'
  | 'staging'
  | 'renders'
  | 'style'
  | 'layout'
  | 'layers'
  | 'spark'

export type InteriorsCapabilityPill = {
  id: string
  title: string
  subtitle: string
  /** Uploaded SVG/image URL from CMS. Empty string uses the built-in fallback glyph. */
  iconSrc: string
  iconAlt: string
}

export type InteriorsSplitFeature = {
  id: string
  eyebrow: string
  title: string
  description: string
  bullets: string[]
  imageSrc: string
  imageAlt: string
  imagePosition: 'left' | 'right'
}

export type InteriorsCapabilityCard = {
  id: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  tone: 'rose' | 'purple' | 'coral' | 'charcoal' | 'indigo' | 'violet' | 'magenta' | 'lavender' | 'sunset'
  span: 'normal' | 'wide'
  variant?: 'image' | 'custom'
}

export type InteriorsComparisonSide = {
  title: string
  items: string[]
}

export type InteriorsStat = {
  id: string
  value: string
  label: string
}

export type InteriorsFeaturedQuote = {
  quote: string
  role: string
  company: string
}

export type InteriorsPageContentData = {
  hero: InteriorsHero
  capabilityPills: {
    eyebrow: string
    items: InteriorsCapabilityPill[]
  }
  splitFeatures: InteriorsSplitFeature[]
  capabilityGrid: {
    title: string
    subtitle: string
    items: InteriorsCapabilityCard[]
    footerLink: BusinessCta
  }
  comparison: {
    title: string
    subtitle: string
    oldWay: InteriorsComparisonSide
    newWay: InteriorsComparisonSide
  }
  stats: InteriorsStat[]
  featuredQuote: InteriorsFeaturedQuote
  testimonials: {
    title: string
    items: BusinessTestimonial[]
  }
  features: {
    eyebrow: string
    title: string
    items: BusinessFeature[]
  }
  closing: PageClosingCtaData
  seo: SeoData
}
