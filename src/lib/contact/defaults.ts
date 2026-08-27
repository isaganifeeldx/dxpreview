import { contactContent } from '@/data/contactData'
import { pageClosingCtaDefaults } from '@/lib/cta/defaults'
import { emptySeoData } from '@/lib/seo/types'
import type { ContactPageContentData } from './types'

export const contactPageDefaults: ContactPageContentData = {
  banner: contactContent.banner,
  introduction: contactContent.introduction,
  form: {
    consentNote:
      'By submitting, you agree to our Privacy Policy. We reply to every enquiry within one business day.',
  },
  quickEnquiries: contactContent.quickEnquiries,
  closing: pageClosingCtaDefaults,
  seo: emptySeoData({
    title: 'Contact | DX Interiors',
    description:
      'Get in touch with DX Interiors for AI interior design, demos, and project enquiries.',
    focusKeyword: 'contact DX Interiors',
    keywords: 'contact DX Interiors, interior design demo, DX Interiors enquiry',
    ogTitle: 'Contact | DX Interiors',
    ogDescription:
      'Get in touch with DX Interiors for AI interior design, demos, and project enquiries.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Contact | DX Interiors',
    twitterDescription:
      'Get in touch with DX Interiors for AI interior design, demos, and project enquiries.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}
