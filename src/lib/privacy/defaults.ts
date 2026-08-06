import { privacyPolicyContent } from '@/data/legalContent'
import { emptySeoData } from '@/lib/seo/types'
import type { PrivacyPageContentData } from './types'

export const privacyPageDefaults: PrivacyPageContentData = {
  title: 'PRIVACY POLICY',
  body: privacyPolicyContent,
  seo: emptySeoData({
    title: 'Privacy Policy | DX Interiors',
    description:
      'Read the DX Interiors privacy policy to understand how we collect, use and protect your personal information across our website and services.',
    focusKeyword: 'DX Interiors privacy policy',
    keywords: 'privacy policy, personal information, DX Interiors privacy',
    ogTitle: 'Privacy Policy | DX Interiors',
    ogDescription:
      'Read the DX Interiors privacy policy to understand how we collect, use and protect your personal information across our website and services.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Privacy Policy | DX Interiors',
    twitterDescription:
      'Read the DX Interiors privacy policy to understand how we collect, use and protect your personal information across our website and services.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}
