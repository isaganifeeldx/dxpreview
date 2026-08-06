import { termsOfServiceContent } from '@/data/legalContent'
import { emptySeoData } from '@/lib/seo/types'
import type { TermsPageContentData } from './types'

export const termsPageDefaults: TermsPageContentData = {
  title: 'TERMS OF SERVICE',
  body: termsOfServiceContent,
  seo: emptySeoData({
    title: 'Terms of Service | DX Interiors',
    description:
      'Read the DX Interiors terms of service outlining the rules, conditions and responsibilities when using our website and services.',
    focusKeyword: 'DX Interiors terms of service',
    keywords: 'terms of service, terms of use, DX Interiors legal',
    ogTitle: 'Terms of Service | DX Interiors',
    ogDescription:
      'Read the DX Interiors terms of service outlining the rules, conditions and responsibilities when using our website and services.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Terms of Service | DX Interiors',
    twitterDescription:
      'Read the DX Interiors terms of service outlining the rules, conditions and responsibilities when using our website and services.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}
