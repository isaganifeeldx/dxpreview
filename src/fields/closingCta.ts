import type { Field, Tab } from 'payload'
import { pageClosingCtaDefaults, type PageClosingCtaData } from '@/lib/cta/defaults'

export function closingCtaGroupFields(
  defaults: PageClosingCtaData = pageClosingCtaDefaults,
): Field[] {
  return [
    {
      name: 'title',
      type: 'text',
      defaultValue: defaults.title,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'primaryCtaLabel',
          type: 'text',
          label: 'Primary CTA label',
          defaultValue: defaults.primaryCta.label,
          admin: { width: '50%' },
        },
        {
          name: 'primaryCtaHref',
          type: 'text',
          label: 'Primary CTA URL',
          defaultValue: defaults.primaryCta.href,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'showSecondaryCta',
      type: 'checkbox',
      label: 'Show secondary button',
      defaultValue: defaults.showSecondaryCta,
    },
    {
      type: 'row',
      admin: {
        condition: (_data, siblingData) => siblingData?.showSecondaryCta !== false,
      },
      fields: [
        {
          name: 'secondaryCtaLabel',
          type: 'text',
          label: 'Secondary CTA label',
          defaultValue: defaults.secondaryCta.label,
          admin: { width: '50%' },
        },
        {
          name: 'secondaryCtaHref',
          type: 'text',
          label: 'Secondary CTA URL',
          defaultValue: defaults.secondaryCta.href,
          admin: { width: '50%' },
        },
      ],
    },
  ]
}

export function closingCtaTab(defaults: PageClosingCtaData = pageClosingCtaDefaults): Tab {
  return {
    label: 'Closing CTA',
    fields: [
      {
        name: 'closing',
        type: 'group',
        label: false,
        fields: closingCtaGroupFields(defaults),
      },
    ],
  }
}
