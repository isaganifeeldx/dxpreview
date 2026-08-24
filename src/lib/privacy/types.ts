import type { PageClosingCtaData } from '@/lib/cta/defaults'
import type { SeoData } from '@/lib/seo/types'

export type PrivacyPageContentData = {
  title: string
  /** Plain/HTML fallback string, or Lexical editor JSON from CMS. */
  body: unknown
  closing: PageClosingCtaData
  seo: SeoData
}
