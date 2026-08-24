import type { SeoData } from '@/lib/seo/types'

export type UserGuideCta = {
  label: string
  href: string
}

export type UserGuideItem = {
  id: string
  slug: string
  title: string
  description: string
  category: string
  image: string
  imageAlt: string
  meta?: string
  featured?: boolean
  contentHtml: string
  seo: SeoData
}

export type UserGuideCard = {
  id: string
  slug: string
  href: string
  category: string
  title: string
  description: string
  image: string
  imageAlt: string
}

export type UserGuideFeatured = UserGuideCard & {
  meta: string
}

export type UserGuidePageContentData = {
  hero: {
    title: string
    description: string
  }
  featured: UserGuideFeatured
  guides: UserGuideCard[]
  closing: {
    title: string
    description: string
    primaryCta: UserGuideCta
    secondaryCta: UserGuideCta
    showSecondaryCta: boolean
  }
  seo: SeoData
}
