import type { BusinessCta } from '@/lib/business/types'

export type PageClosingCtaData = {
  title: string
  primaryCta: BusinessCta
  secondaryCta: BusinessCta
  showSecondaryCta: boolean
}

/** Shared bottom CTA used on pages without their own CMS closing block. */
export const pageClosingCtaDefaults: PageClosingCtaData = {
  title: 'Ready to scale your design studio?',
  primaryCta: { label: 'Schedule a demo', href: '/business' },
  secondaryCta: { label: 'View plans', href: '/plans' },
  showSecondaryCta: true,
}
