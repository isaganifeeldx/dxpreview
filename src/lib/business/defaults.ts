import { emptySeoData } from '@/lib/seo/types'
import type { BusinessPageContentData } from './types'

export const businessPageDefaults: BusinessPageContentData = {
  hero: {
    eyebrow: 'Business',
    titleBefore: 'Interior design AI',
    titleAccent: 'at scale',
    description:
      'Give every studio, developer, and facilities team the same photorealistic pipeline — with SSO, admin controls, custom catalogues, and a dedicated success manager.',
    stats: [
      { id: 'studios', value: '5,000+', label: 'designers and studios' },
      { id: 'security', value: 'SSO', label: 'and directory sync' },
      { id: 'time', value: 'Hours', label: 'saved per presentation' },
    ],
  },
  form: {
    title: 'Talk to our team',
    subtitle: 'See how DX Interiors supports enterprise design teams.',
    nameLabel: 'Full name',
    emailLabel: 'Work email',
    companyLabel: 'Company',
    teamSizeLabel: 'Team size',
    teamSizePlaceholder: 'Select team size',
    teamSizeOptions: ['1–10', '11–50', '51–200', '201–1,000', '1,000+'],
    messageLabel: 'What are you looking for?',
    submitLabel: 'Schedule a demo',
    successMessage: "Thanks — we'll be in touch shortly to schedule your demo.",
  },
  testimonials: {
    title: 'Trusted by design leaders',
    items: [
      {
        id: 'studio',
        quote:
          'We present client-ready boards in the same meeting we capture the room. DX Interiors replaced a week of visualisation wait time.',
        role: 'Design director',
        company: 'National interior studio',
      },
      {
        id: 'developer',
        quote:
          'Sales suites stay on-brand across every project. Shared libraries and admin controls finally match how our teams actually work.',
        role: 'Head of product',
        company: 'Residential developer',
      },
      {
        id: 'hospitality',
        quote:
          'Flythroughs and material swaps used to be a specialist bottleneck. Now every designer on the account can deliver at the same standard.',
        role: 'Creative lead',
        company: 'Hospitality group',
      },
    ],
  },
  features: {
    eyebrow: 'Features',
    title: 'Everything your team needs',
    items: [
      {
        id: 'sso',
        icon: 'lock',
        title: 'SSO',
        description: 'Directory sync and single sign-on so every seat stays under IT control.',
      },
      {
        id: 'security',
        icon: 'shield',
        title: 'Enterprise security',
        description: 'Audit logs, role-based permissions, and data residency options for large organisations.',
      },
      {
        id: 'ai',
        icon: 'spark',
        title: 'Custom AI capacity',
        description: 'Dedicated render capacity and optional model fine-tuning for your studio look.',
      },
      {
        id: 'teams',
        icon: 'users',
        title: 'Team management',
        description: 'Unlimited seats, guest reviewers, and admin controls across projects and brands.',
      },
      {
        id: 'templates',
        icon: 'template',
        title: 'Custom templates',
        description: 'Lock in room templates, style presets, and presentation layouts for every brief.',
      },
      {
        id: 'privacy',
        icon: 'globe',
        title: 'Global privacy',
        description: 'Keep client spaces and catalogues in the region your compliance team requires.',
      },
      {
        id: 'encryption',
        icon: 'encrypt',
        title: 'Data encryption',
        description: 'Protect project files, renders, and brand kits in transit and at rest.',
      },
      {
        id: 'analytics',
        icon: 'chart',
        title: 'Usage analytics',
        description: 'See render volume, seat activity, and queue health across the organisation.',
      },
      {
        id: 'integrations',
        icon: 'plug',
        title: 'Custom integrations',
        description: 'Connect supplier catalogues, DAM, and internal tools through API and partner work.',
      },
      {
        id: 'support',
        icon: 'support',
        title: 'Priority support',
        description: 'A dedicated success manager, custom onboarding, and an SLA built for your rollout.',
      },
      {
        id: 'workflows',
        icon: 'workflow',
        title: 'Studio workflows',
        description: 'Batch renders, approvals, and shared libraries so delivery stays consistent.',
      },
      {
        id: 'white-label',
        icon: 'chat',
        title: 'White-label exports',
        description: 'Client-facing boards and flythroughs without DX watermarks or leftover branding.',
      },
    ],
  },
  closing: {
    title: 'Ready to scale your design studio?',
    primaryCta: { label: 'Schedule a demo', href: '#talk-to-team' },
    secondaryCta: { label: 'View plans', href: '/plans' },
    showSecondaryCta: true,
  },
  seo: emptySeoData({
    title: 'Business | DX Interiors',
    description:
      'Talk to DX Interiors about Business and Enterprise plans — SSO, unlimited seats, custom catalogues, dedicated render capacity, and a success manager for your studio.',
    focusKeyword: 'DX Interiors business',
    keywords:
      'DX Interiors business, interior design studio AI, AI interior design SSO, DX Interiors enterprise',
    ogTitle: 'Business | DX Interiors',
    ogDescription:
      'Scale photorealistic interiors across your organisation with SSO, admin controls, and dedicated support.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Business | DX Interiors',
    twitterDescription:
      'Scale photorealistic interiors across your organisation with SSO, admin controls, and dedicated support.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}
