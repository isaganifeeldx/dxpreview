import { pageClosingCtaDefaults } from '@/lib/cta/defaults'
import { emptySeoData } from '@/lib/seo/types'
import type { BookingPageContentData } from './types'

export const bookingPageDefaults: BookingPageContentData = {
  banner: {
    title: 'Book a Demo',
  },
  introduction:
    'See SpaceSense AI in action. Tell us who you are and we will confirm your demo time within one business day.',
  form: {
    consentNote:
      'By submitting, you agree to our Privacy Policy and Terms of Service. We reply to every booking request within one business day.',
    submitLabel: 'Book a demo',
    successMessage: "Thanks — we'll be in touch shortly to confirm your demo.",
  },
  closing: pageClosingCtaDefaults,
  seo: emptySeoData({
    title: 'Book a Demo | DX Interiors',
    description:
      'Book a demo of DX Interiors and SpaceSense AI for your design studio or enterprise team.',
    focusKeyword: 'book demo DX Interiors',
    keywords: 'book demo, DX Interiors demo, interior design software demo',
    ogTitle: 'Book a Demo | DX Interiors',
    ogDescription:
      'Book a demo of DX Interiors and SpaceSense AI for your design studio or enterprise team.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Book a Demo | DX Interiors',
    twitterDescription:
      'Book a demo of DX Interiors and SpaceSense AI for your design studio or enterprise team.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}
