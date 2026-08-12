import type { PricingPageContentData } from './types'
import { emptySeoData } from '@/lib/seo/types'

const included = true
const notIncluded = false

export const pricingPageDefaults: PricingPageContentData = {
  title: 'Plans and pricing',
  billing: {
    monthlyLabel: 'Monthly',
    yearlyLabel: 'Yearly',
    yearlyBadge: 'Save 20%',
  },
  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Explore AI interiors and try core tools on a personal project.',
      icon: 'none',
      monthlyPrice: 0,
      yearlyPrice: 0,
      priceSuffix: 'AUD /month',
      cta: { label: 'Get started', href: '/login' },
      compareCta: { label: 'Get started', href: '/login', muted: true },
      featureHeading: "What's in Free",
      featureSections: [
        {
          id: 'free-core',
          items: [
            '10 AI renders each month',
            '1 active project',
            'Basic material swapping',
            'Standard room templates',
            'Community support',
            'DX watermark on exports',
          ],
        },
        {
          id: 'free-ai',
          heading: 'AI allowance',
          icon: 'ai',
          items: ['10 generative credits / month', 'Standard queue priority'],
        },
      ],
      learnMoreLabel: 'Learn more',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For independent designers who need polished, client-ready visuals.',
      icon: 'crown',
      monthlyPrice: 29,
      yearlyPrice: 23,
      priceSuffix: 'AUD /month',
      cta: { label: 'Start free trial', href: '/login' },
      compareCta: { label: 'Get Pro', href: '/login' },
      featureHeading: 'Everything in Free, plus:',
      featureSections: [
        {
          id: 'pro-core',
          items: [
            '150 AI renders each month',
            '10 active projects',
            'Smart surface & material swapping',
            'Seamless scene clean-up',
            'Intelligent object staging',
            'No watermark',
            '4K exports',
          ],
        },
        {
          id: 'pro-ai',
          heading: 'AI allowance',
          icon: 'ai',
          items: [
            '150 generative credits / month',
            'Faster render queue',
            'Multi-angle AI views',
          ],
        },
        {
          id: 'pro-new',
          heading: 'New features',
          icon: 'spark',
          items: [
            'Early access to new AI tools',
            'Style preset library updates',
          ],
        },
        {
          id: 'pro-history',
          heading: 'Project history',
          icon: 'history',
          items: ['30-day version history', 'Client share links'],
        },
        {
          id: 'pro-support',
          heading: 'Support',
          icon: 'support',
          items: ['Email support'],
        },
      ],
      learnMoreLabel: 'Learn more',
    },
    {
      id: 'business',
      name: 'Business',
      description: 'For studios that collaborate, present, and deliver at scale.',
      icon: 'crown',
      recommended: true,
      recommendedLabel: 'Recommended',
      monthlyPrice: 79,
      yearlyPrice: 63,
      priceSuffix: 'AUD /month',
      cta: { label: 'Start free trial', href: '/login' },
      secondaryCta: { label: 'Contact sales', href: '/contact' },
      compareCta: { label: 'Get Business', href: '/login' },
      featureHeading: 'Everything in Pro, plus:',
      featureSections: [
        {
          id: 'business-core',
          items: [
            'Unlimited AI renders',
            'Unlimited projects',
            'Renders and flythroughs',
            'Print-ready boards',
            'Priority support',
          ],
        },
        {
          id: 'business-ai',
          heading: 'AI allowance',
          icon: 'ai',
          items: [
            'Unlimited generative credits',
            'Priority render queue',
            'Batch render jobs',
          ],
        },
        {
          id: 'business-new',
          heading: 'New features',
          icon: 'spark',
          items: [
            'Early access to studio AI tools',
            'Beta flythrough models',
            'Custom style training (beta)',
          ],
        },
        {
          id: 'business-collab',
          heading: 'Collaboration',
          icon: 'users',
          items: [
            '5 team seats included',
            'Shared libraries',
            'Client comments & approvals',
            'Guest reviewer access',
          ],
        },
        {
          id: 'business-brand',
          heading: 'Brand & assets',
          icon: 'brand',
          items: ['Brand kit', 'Shared asset library', 'Admin controls'],
        },
      ],
      learnMoreLabel: 'Learn more',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Advanced security, onboarding, and support for large organisations.',
      icon: 'crown',
      monthlyPrice: null,
      yearlyPrice: null,
      priceLabel: "Let's talk",
      priceSuffix: '',
      cta: { label: 'Contact sales', href: '/contact' },
      secondaryCta: { label: 'Request a demo', href: '/contact' },
      compareCta: { label: 'Contact sales', href: '/contact' },
      featureHeading: 'Everything in Business, plus:',
      featureSections: [
        {
          id: 'enterprise-core',
          items: [
            'Unlimited seats and projects',
            'Custom catalogues & integrations',
            'White-label exports',
            'Custom render capacity',
          ],
        },
        {
          id: 'enterprise-ai',
          heading: 'AI allowance',
          icon: 'ai',
          items: [
            'Unlimited generative credits',
            'Dedicated render capacity',
            'Custom model fine-tuning',
          ],
        },
        {
          id: 'enterprise-new',
          heading: 'New features',
          icon: 'spark',
          items: [
            'Private beta access',
            'Roadmap influence sessions',
            'Custom feature development',
          ],
        },
        {
          id: 'enterprise-security',
          heading: 'Security & admin',
          icon: 'shield',
          items: [
            'SSO and directory sync',
            'Audit logs',
            'Role-based permissions',
            'Data residency options',
          ],
        },
        {
          id: 'enterprise-support',
          heading: 'Support & services',
          icon: 'support',
          items: [
            'Dedicated success manager',
            'Custom onboarding',
            'Custom SLA',
            'API and supplier integrations',
          ],
        },
      ],
      learnMoreLabel: 'Learn more',
    },
  ],
  planFootnotes: [
    '*Leonardo.Ai Essential plan features are not available during free trials of Canva Business.',
    '**Available only where Canva Print is offered. Cannot be combined with other print offers.',
    '^Use estimates represent total AI uses across AI tiers. Paid plans include a shared AI allowance across Standard, Premium and Ultra AI, while Free includes a shared allowance across Standard and Premium AI only. Higher-tier AI use more of your allowance and uses may vary by tool. See Help Centre for details.',
    "Canva’s features and offerings may evolve over time. Each plan includes everything in the previous plans - plus more.",
  ],
  comparison: {
    title: 'Compare features',
    categories: [
      {
        id: 'essentials',
        label: 'Studio essentials',
        icon: 'workspace',
        rows: [
          {
            id: 'renders',
            label: 'AI renders / month',
            values: { free: '10', pro: '150', business: 'Unlimited', enterprise: 'Unlimited' },
          },
          {
            id: 'projects',
            label: 'Active projects',
            values: { free: '1', pro: '10', business: 'Unlimited', enterprise: 'Unlimited' },
          },
          {
            id: 'preview',
            label: 'Real-time design preview',
            values: { free: included, pro: included, business: included, enterprise: included },
          },
          {
            id: 'history',
            label: 'Version history',
            values: { free: '3 days', pro: '30 days', business: 'Unlimited', enterprise: 'Unlimited' },
          },
          {
            id: 'watermark',
            label: 'Remove DX watermark',
            values: { free: notIncluded, pro: included, business: included, enterprise: included },
          },
          {
            id: 'exports',
            label: 'High-resolution exports',
            values: { free: '720p', pro: '4K', business: '4K + print', enterprise: 'Custom' },
          },
          {
            id: 'templates',
            label: 'Room templates',
            values: { free: 'Limited', pro: included, business: included, enterprise: 'Custom' },
          },
        ],
      },
      {
        id: 'ai',
        label: 'AI visualisation',
        icon: 'ai',
        rows: [
          {
            id: 'photoreal',
            label: 'Photorealistic AI renders',
            values: { free: included, pro: included, business: included, enterprise: included },
          },
          {
            id: 'angles',
            label: 'Multi-angle views',
            values: { free: notIncluded, pro: included, business: included, enterprise: included },
          },
          {
            id: 'flythroughs',
            label: 'Renders & flythroughs',
            values: { free: notIncluded, pro: notIncluded, business: included, enterprise: included },
          },
          {
            id: 'presets',
            label: 'Style presets',
            values: { free: '3', pro: included, business: included, enterprise: 'Custom' },
          },
          {
            id: 'cleanup',
            label: 'Seamless scene clean-up',
            values: { free: notIncluded, pro: included, business: included, enterprise: included },
          },
        ],
      },
      {
        id: 'materials',
        label: 'Materials and staging',
        icon: 'image',
        rows: [
          {
            id: 'swapping',
            label: 'Smart surface & material swapping',
            values: { free: 'Basic', pro: included, business: included, enterprise: included },
          },
          {
            id: 'staging',
            label: 'Intelligent object staging',
            values: { free: notIncluded, pro: included, business: included, enterprise: included },
          },
          {
            id: 'dxdb',
            label: 'DX DB supplier catalogue',
            values: { free: 'Limited', pro: included, business: included, enterprise: 'Custom catalogue' },
          },
          {
            id: 'custom-materials',
            label: 'Upload custom materials',
            values: { free: notIncluded, pro: included, business: included, enterprise: included },
          },
        ],
      },
      {
        id: 'content',
        label: 'Content and publishing',
        icon: 'content',
        rows: [
          {
            id: 'boards',
            label: 'Mood boards & presentations',
            values: { free: '1 template', pro: included, business: included, enterprise: included },
          },
          {
            id: 'share-links',
            label: 'Client share links',
            values: { free: notIncluded, pro: included, business: included, enterprise: included },
          },
          {
            id: 'print',
            label: 'Print-ready boards',
            values: { free: notIncluded, pro: notIncluded, business: included, enterprise: included },
          },
        ],
      },
      {
        id: 'collaboration',
        label: 'Collaboration',
        icon: 'collaboration',
        rows: [
          {
            id: 'seats',
            label: 'Team seats',
            values: { free: '1', pro: '1', business: '5 included', enterprise: 'Unlimited' },
          },
          {
            id: 'comments',
            label: 'Client comments & approvals',
            values: { free: notIncluded, pro: included, business: included, enterprise: included },
          },
          {
            id: 'libraries',
            label: 'Shared libraries',
            values: { free: notIncluded, pro: notIncluded, business: included, enterprise: included },
          },
          {
            id: 'guest',
            label: 'Guest reviewer access',
            values: { free: notIncluded, pro: notIncluded, business: included, enterprise: included },
          },
        ],
      },
      {
        id: 'brand',
        label: 'Brand and assets',
        icon: 'brand',
        rows: [
          {
            id: 'brand-kit',
            label: 'Brand kit',
            values: { free: notIncluded, pro: notIncluded, business: included, enterprise: included },
          },
          {
            id: 'asset-library',
            label: 'Shared asset library',
            values: { free: notIncluded, pro: notIncluded, business: included, enterprise: included },
          },
          {
            id: 'white-label',
            label: 'White-label exports',
            values: { free: notIncluded, pro: notIncluded, business: notIncluded, enterprise: included },
          },
        ],
      },
      {
        id: 'team',
        label: 'Team and permissions',
        icon: 'team',
        rows: [
          {
            id: 'admin',
            label: 'Admin controls',
            values: { free: notIncluded, pro: notIncluded, business: included, enterprise: included },
          },
          {
            id: 'roles',
            label: 'Role-based permissions',
            values: { free: notIncluded, pro: notIncluded, business: included, enterprise: included },
          },
          {
            id: 'sso-roles',
            label: 'Directory sync',
            values: { free: notIncluded, pro: notIncluded, business: notIncluded, enterprise: included },
          },
        ],
      },
      {
        id: 'security',
        label: 'Security',
        icon: 'security',
        rows: [
          {
            id: 'sso',
            label: 'SSO',
            values: { free: notIncluded, pro: notIncluded, business: notIncluded, enterprise: included },
          },
          {
            id: 'audit',
            label: 'Audit logs',
            values: { free: notIncluded, pro: notIncluded, business: notIncluded, enterprise: included },
          },
          {
            id: 'residency',
            label: 'Data residency options',
            values: { free: notIncluded, pro: notIncluded, business: notIncluded, enterprise: included },
          },
        ],
      },
      {
        id: 'storage',
        label: 'Storage and performance',
        icon: 'storage',
        rows: [
          {
            id: 'storage',
            label: 'Cloud storage',
            values: { free: '1 GB', pro: '50 GB', business: '500 GB', enterprise: 'Custom' },
          },
          {
            id: 'concurrent',
            label: 'Concurrent renders',
            values: { free: '1', pro: '3', business: '10', enterprise: 'Custom' },
          },
        ],
      },
      {
        id: 'support',
        label: 'Support and services',
        icon: 'support',
        rows: [
          {
            id: 'support-level',
            label: 'Support',
            values: {
              free: 'Community',
              pro: 'Email',
              business: 'Priority',
              enterprise: 'Dedicated manager',
            },
          },
          {
            id: 'onboarding',
            label: 'Onboarding',
            values: { free: notIncluded, pro: notIncluded, business: included, enterprise: included },
          },
          {
            id: 'sla',
            label: 'Custom SLA',
            values: { free: notIncluded, pro: notIncluded, business: notIncluded, enterprise: included },
          },
        ],
      },
    ],
  },
  socialProof: {
    title: 'Trusted by companies of all sizes',
    logos: [
      { name: 'DX Living', mark: 'DX Living' },
      { name: 'FeelDX', mark: 'FeelDX' },
      { name: 'Studios', mark: 'STUDIOS' },
      { name: 'Architects', mark: 'ARCHITECTS' },
      { name: 'Developers', mark: 'DEVELOPERS' },
      { name: 'Hospitality', mark: 'HOSPITALITY' },
    ],
  },
  promos: [
    {
      id: 'business',
      title: 'Power growth with DX Interiors Business',
      description:
        'Give your studio shared libraries, brand kits, and unlimited renders so every presentation stays on-brief.',
      cta: { label: 'Learn more', href: '#compare-features' },
      variant: 'business',
    },
    {
      id: 'ai',
      title: 'Accelerate your creative vision with AI tools',
      description:
        'Swap materials, stage objects, and generate photorealistic flythroughs in minutes — not days.',
      cta: { label: 'Learn more', href: '/login' },
      variant: 'ai',
    },
  ],
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        id: 'which-plan',
        question: 'Which plan should I choose?',
        answer:
          'Free is ideal for exploring DX Interiors on a single project. Pro suits independent designers who need client-ready visuals. Business is built for studios that collaborate and present at scale. Enterprise is for organisations that need SSO, admin controls, and a dedicated success manager.',
      },
      {
        id: 'trial',
        question: 'Is there a free trial?',
        answer:
          'Yes. Pro and Business include a free trial so you can test renders, material swapping, and staging before you subscribe. No credit card is required to start on the Free plan.',
      },
      {
        id: 'yearly',
        question: 'How does yearly billing work?',
        answer:
          'Yearly billing is charged up front and saves 20% compared with paying month to month. You can switch between monthly and yearly from your account at the next renewal.',
      },
      {
        id: 'change-plan',
        question: 'Can I change or cancel my plan later?',
        answer:
          'You can upgrade, downgrade, or cancel at any time. Upgrades take effect immediately. Downgrades and cancellations apply from the end of the current billing period, and you keep access until then.',
      },
      {
        id: 'seats',
        question: 'What counts as a team seat?',
        answer:
          'A seat is anyone who can create, edit, or export designs. Business includes five seats, with additional seats available. Enterprise supports unlimited seats with role-based admin controls.',
      },
      {
        id: 'renders',
        question: 'What happens if I reach my render limit?',
        answer:
          'Free and Pro plans reset render credits each billing cycle. If you hit the cap, you can wait for the reset, purchase additional credits, or upgrade. Business and Enterprise include unlimited renders.',
      },
    ],
  },
  seo: emptySeoData({
    title: 'Plans and pricing | DX Interiors',
    description:
      'Compare Free, Pro, Business, and Enterprise plans for DX Interiors. Generate photorealistic room concepts, mood boards, and flythroughs with AI.',
    focusKeyword: 'interior design pricing',
    keywords:
      'DX Interiors pricing, AI interior design plans, interior design software cost, DX Interiors business',
    ogTitle: 'Plans and pricing | DX Interiors',
    ogDescription:
      'Choose the DX Interiors plan that fits your studio — from free exploration to enterprise collaboration.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Plans and pricing | DX Interiors',
    twitterDescription:
      'Choose the DX Interiors plan that fits your studio — from free exploration to enterprise collaboration.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}
