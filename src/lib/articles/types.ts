import type { PageClosingCtaData } from '@/lib/cta/defaults'
import type { SeoData } from '@/lib/seo/types'

export type ArticleItem = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  imageAlt: string
  featured?: boolean
  contentHtml: string
  seo: SeoData
}

export type ArticlesPageContentData = {
  heading: string
  searchPlaceholder: string
  articles: ArticleItem[]
  closing: PageClosingCtaData
  seo: SeoData
}
