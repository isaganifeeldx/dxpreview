export type StaticUserGuide = {
  id: string
  slug: string
  title: string
  description: string
  category: string
  image: string
  imageAlt: string
  meta?: string
  featured?: boolean
}

/** Static guide list used as CMS fallback when no guides are published. */
export const userGuides: StaticUserGuide[] = [
  {
    id: '1',
    slug: 'get-started',
    title: 'Your first design, step by step',
    description:
      'The whole DX Interiors workflow in one place: capture, materials, lighting, and a finished photorealistic board — usually in a few minutes.',
    category: 'Workflow',
    meta: '5 steps · 6 min read',
    image:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Interior design desk with color and material samples',
    featured: true,
  },
  {
    id: '2',
    slug: 'account',
    title: 'Sign up & Log in',
    description: 'Set up your account, switch language, stay secure',
    category: 'Account',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Team onboarding session around a laptop',
  },
  {
    id: '3',
    slug: 'workflow',
    title: 'Get Started',
    description: 'The core five-step design workflow',
    category: 'Workflow',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Modern living room render workflow example',
  },
  {
    id: '4',
    slug: 'billing',
    title: 'Payment & Billing',
    description: 'Plans, payment methods, credits, refunds',
    category: 'Billing',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Invoice and payment calculator on a desk',
  },
  {
    id: '5',
    slug: 'privacy',
    title: 'Privacy & Terms',
    description: 'What we collect, why, and your rights',
    category: 'Privacy',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Data security lock overlay on digital interface',
  },
  {
    id: '6',
    slug: 'support',
    title: 'Customer Service',
    description: 'How to reach us and when to expect a reply',
    category: 'Support',
    image:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Support agent with headset assisting customers',
  },
]
