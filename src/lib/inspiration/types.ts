import type { SeoData } from '@/lib/seo/types'

export type InspirationModel = {
  id: string
  title: string
  image: string
  imageAlt: string
}

export type InspirationCta = {
  label: string
  href: string
}

export type InspirationItem = {
  id: string
  slug: string
  title: string
  category: string
  designStyle: string
  color: string
  image: string
  imageAlt: string
  models: InspirationModel[]
  overview: string
  cta: InspirationCta
  seo: SeoData
}

export type InspirationFilters = {
  space: string
  designStyle: string | null
  color: string | null
  sort: string
}

export type InspirationPageContentData = {
  hero: {
    title: string
    description: string
  }
  searchPlaceholder: string
  allSpacesLabel: string
  categories: string[]
  designStyles: string[]
  colors: string[]
  sortOptions: string[]
  modelsIntro: string
  items: InspirationItem[]
  seo: SeoData
}
