import type { SeoData } from '@/lib/seo/types'

export type ContactPageContentData = {
  banner: {
    title: string
  }
  introduction: string
  quickEnquiries: {
    heading: string
    content: string
    phone: string
    email: string
  }
  seo: SeoData
}
