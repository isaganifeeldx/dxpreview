import type { PageClosingCtaData } from '@/lib/cta/defaults'
import type { SeoData } from '@/lib/seo/types'

export type BookingPageContentData = {
  banner: {
    title: string
  }
  introduction: string
  form: {
    consentNote: string
    submitLabel: string
    successMessage: string
  }
  closing: PageClosingCtaData
  seo: SeoData
}
