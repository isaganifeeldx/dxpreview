import type { PageClosingCtaData } from '@/lib/cta/defaults'
import type { SeoData } from '@/lib/seo/types'

export type ContactPageContentData = {
  banner: {
    title: string
  }
  introduction: string
  form: {
    consentNote: string
  }
  quickEnquiries: {
    heading: string
    content: string
    phone: string
    email: string
    address: string
  }
  closing: PageClosingCtaData
  seo: SeoData
}
