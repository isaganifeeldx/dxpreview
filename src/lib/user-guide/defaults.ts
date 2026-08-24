import { userGuides as staticGuides } from '@/data/userGuidesData'
import { emptySeoData } from '@/lib/seo/types'
import type { UserGuideItem, UserGuidePageContentData } from './types'

const PLACEHOLDER_BODY = `<p>This is placeholder guide content for the DX Interiors user guide section. Full walkthrough copy can replace this later — the layout and routing are ready for real tutorials.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor elit ut diam sagittis, sit amet egestas ex mollis. Pellentesque congue, magna ac dapibus eleifend, purus massa rutrum diam, ut malesuada dui ipsum ut massa.</p>
<p>Maecenas porttitor auctor congue. Donec ut nunc eros. Proin a orci nisl. Pellentesque tempus, est eget mattis sodales, tortor ex egestas diam, quis lacinia ligula erat at odio.</p>`

export function toFallbackUserGuideItem(
  guide: (typeof staticGuides)[number],
): UserGuideItem {
  return {
    id: guide.id,
    slug: guide.slug,
    title: guide.title,
    description: guide.description,
    category: guide.category,
    image: guide.image,
    imageAlt: guide.imageAlt,
    meta: guide.meta,
    featured: guide.featured,
    contentHtml: PLACEHOLDER_BODY,
    seo: emptySeoData({
      title: `${guide.title} | DX Interiors User Guide`,
      description: guide.description,
      ogTitle: guide.title,
      ogDescription: guide.description,
      ogImageUrl: guide.image,
      twitterCard: 'summary_large_image',
      twitterTitle: guide.title,
      twitterDescription: guide.description,
      twitterImageUrl: guide.image,
    }),
  }
}

export const userGuidePageDefaults: UserGuidePageContentData = {
  hero: {
    title: 'User Guide',
    description:
      'Short, friendly walkthroughs for every part of DX Interiors — from your first login to billing and privacy. Start anywhere.',
  },
  featured: {
    id: '1',
    slug: 'get-started',
    href: '/user-guide/get-started',
    category: 'Workflow',
    title: 'Your first design, step by step',
    description:
      'The whole DX Interiors workflow in one place: capture, materials, lighting, and a finished photorealistic board — usually in a few minutes.',
    meta: '5 steps · 6 min read',
    image:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Interior design desk with color and material samples',
  },
  guides: staticGuides
    .filter((guide) => !guide.featured)
    .map((guide) => ({
      id: guide.id,
      slug: guide.slug,
      href: `/user-guide/${guide.slug}`,
      category: guide.category,
      title: guide.title,
      description: guide.description,
      image: guide.image,
      imageAlt: guide.imageAlt,
    })),
  closing: {
    title: 'Still stuck? We’re here.',
    description:
      'If a guide does not cover your question, our team is one email away and replies within 24 hours on business days.',
    primaryCta: { label: 'Contact support', href: '/contact' },
    secondaryCta: { label: 'Start designing', href: '/' },
    showSecondaryCta: true,
  },
  seo: emptySeoData({
    title: 'User Guide | DX Interiors',
    description:
      'Short walkthroughs for DX Interiors — sign up, first design, billing, privacy, and how to reach support.',
    focusKeyword: 'DX Interiors user guide',
    keywords:
      'DX Interiors tutorials, interior design software guide, DX Interiors help, how to use DX Interiors',
    ogTitle: 'User Guide | DX Interiors',
    ogDescription:
      'Friendly walkthroughs for every part of DX Interiors — from first login to billing and privacy.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'User Guide | DX Interiors',
    twitterDescription:
      'Friendly walkthroughs for every part of DX Interiors — from first login to billing and privacy.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}

export { PLACEHOLDER_BODY }
