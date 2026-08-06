import type { GlobalConfig } from 'payload'
import { publicReadAuthenticatedUpdate } from '@/access'
import { seoFields } from '@/fields/seo'
import { revalidateFaqGlobal } from '@/hooks/revalidateCms'

const categoryOptions = [
  { label: 'General', value: 'general' },
  { label: 'Studio', value: 'studio' },
  { label: 'Interiors', value: 'interiors' },
  { label: 'Models', value: 'models' },
  { label: 'Prestige', value: 'prestige' },
  { label: 'Projects', value: 'projects' },
]

export const Faq: GlobalConfig = {
  slug: 'faq',
  label: 'FAQ Page',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Editable content for the public FAQ page.',
  },
  hooks: {
    afterChange: [revalidateFaqGlobal],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Page title',
              defaultValue: 'Frequently Asked Questions',
            },
            {
              name: 'intro',
              type: 'textarea',
              label: 'Intro text',
              defaultValue:
                'Find answers to common questions about DX Interiors, our modules, and how we help developers, architects, and homeowners bring unbuilt homes to life.',
            },
            {
              name: 'searchPlaceholder',
              type: 'text',
              label: 'Search placeholder',
              defaultValue: 'Type your question here',
            },
            {
              name: 'items',
              type: 'array',
              label: 'FAQ items',
              labels: { singular: 'FAQ item', plural: 'FAQ items' },
              admin: {
                description:
                  'If empty, the site falls back to the built-in FAQ list. Add items here to manage FAQs from the CMS.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'category',
                  type: 'select',
                  required: true,
                  defaultValue: 'general',
                  options: categoryOptions,
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            seoFields({
              titleDefault: 'FAQ | DX Interiors',
              descriptionDefault: 'Frequently asked questions about DX Interiors.',
            }),
          ],
        },
      ],
    },
  ],
}
