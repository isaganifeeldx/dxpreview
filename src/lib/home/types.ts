import type { SeoData } from '@/lib/seo/types'
import type {
  BusinessCta,
  BusinessFeature,
  BusinessTestimonial,
} from '@/lib/business/types'

export type HomeCta = {
  label: string
  href: string
}

export type HomeHeroFeature = {
  label: string
}

export type HomeTrustStat = {
  value: string
  label: string
}

export type HomeProcessCard = {
  title: string
  description: string
  imageSrc: string
  numberIcon: string
  numberSide: 'left' | 'right'
}

export type HomeGalleryImage = {
  src: string
  alt: string
  grow: number
}

export type HomePageContentData = {
  hero: {
    lineOne: string
    title: string
    description: string
    features: HomeHeroFeature[]
    primaryCta: HomeCta
    secondaryCta: HomeCta
    videoId: string
  }
  trust: {
    intro: string
    stats: HomeTrustStat[]
  }
  process: {
    title: string
    cards: HomeProcessCard[]
  }
  discover: {
    title: string
    description: string
    cta: HomeCta
    videoId: string
  }
  gallery: {
    title: string
    images: HomeGalleryImage[]
  }
  lessons: {
    title: string
    description: string
    cta: HomeCta
    videoId: string
  }
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
