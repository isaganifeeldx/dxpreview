import { faqIntro, faqItems } from '@/data/faqData'
import { emptySeoData } from '@/lib/seo/types'
import type { FaqPageContentData } from './types'

export const faqPageDefaults: FaqPageContentData = {
  title: 'Frequently Asked Questions',
  intro: faqIntro,
  searchPlaceholder: 'Type your question here',
  items: faqItems,
  seo: emptySeoData({
    title: 'FAQ | DX Interiors',
    description: 'Frequently asked questions about DX Interiors.',
    focusKeyword: 'DX Interiors FAQ',
    keywords: 'DX Interiors help, interior design FAQ, DX Studio FAQ',
    ogTitle: 'FAQ | DX Interiors',
    ogDescription: 'Frequently asked questions about DX Interiors.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'FAQ | DX Interiors',
    twitterDescription: 'Frequently asked questions about DX Interiors.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}
