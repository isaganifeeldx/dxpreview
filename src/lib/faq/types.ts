import type { FaqCategoryId, FaqItem } from '@/data/faqData'
import type { SeoData } from '@/lib/seo/types'

export type FaqPageContentData = {
  title: string
  intro: string
  searchPlaceholder: string
  items: FaqItem[]
  seo: SeoData
}

export type { FaqCategoryId, FaqItem }
