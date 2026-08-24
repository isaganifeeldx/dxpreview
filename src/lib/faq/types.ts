import type { FaqCategoryId, FaqItem } from '@/data/faqData'
import type { PageClosingCtaData } from '@/lib/cta/defaults'
import type { SeoData } from '@/lib/seo/types'

export type FaqPageContentData = {
  title: string
  intro: string
  searchPlaceholder: string
  items: FaqItem[]
  closing: PageClosingCtaData
  seo: SeoData
}

export type { FaqCategoryId, FaqItem }
