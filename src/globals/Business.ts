import type { GlobalConfig } from 'payload'
import { adminOnlyApiView, publicReadAuthenticatedUpdate } from '@/access'
import { seoFields } from '@/fields/seo'
import { revalidateBusinessGlobal } from '@/hooks/revalidateCms'
import { pagePreview } from '@/lib/cms/previewUrl'
import { businessCmsFieldDefaults as d } from '@/lib/business/cmsFieldDefaults'

const featureIconOptions = [
  { label: 'Shield', value: 'shield' },
  { label: 'Lock', value: 'lock' },
  { label: 'Spark', value: 'spark' },
  { label: 'Users', value: 'users' },
  { label: 'Template', value: 'template' },
  { label: 'Globe', value: 'globe' },
  { label: 'Encrypt', value: 'encrypt' },
  { label: 'Chart', value: 'chart' },
  { label: 'Plug', value: 'plug' },
  { label: 'Support', value: 'support' },
  { label: 'Workflow', value: 'workflow' },
  { label: 'Chat', value: 'chat' },
]

export const Business: GlobalConfig = {
  slug: 'business',
  label: 'Business Page',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Editable content for the public Business page.',
    group: 'Pages',
    preview: pagePreview('/business'),
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  hooks: {
    afterChange: [revalidateBusinessGlobal],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: d.hero.eyebrow,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'titleBefore',
                      type: 'text',
                      label: 'Title',
                      defaultValue: d.hero.titleBefore,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'titleAccent',
                      type: 'text',
                      label: 'Title accent',
                      defaultValue: d.hero.titleAccent,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue: d.hero.description,
                },
                {
                  name: 'stats',
                  type: 'array',
                  label: 'Stats',
                  labels: { singular: 'Stat', plural: 'Stats' },
                  admin: { initCollapsed: true },
                  defaultValue: d.hero.stats,
                  fields: [
                    { name: 'itemId', type: 'text', label: 'Stat id' },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'value',
                          type: 'text',
                          required: true,
                          admin: { width: '40%' },
                        },
                        {
                          name: 'label',
                          type: 'text',
                          required: true,
                          admin: { width: '60%' },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonials',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.testimonials.title,
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Quotes',
                  labels: { singular: 'Quote', plural: 'Quotes' },
                  admin: { initCollapsed: true },
                  defaultValue: d.testimonials.items,
                  fields: [
                    { name: 'itemId', type: 'text', label: 'Item id' },
                    { name: 'quote', type: 'textarea', required: true },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'role',
                          type: 'text',
                          required: true,
                          admin: { width: '50%' },
                        },
                        {
                          name: 'company',
                          type: 'text',
                          required: true,
                          admin: { width: '50%' },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Features',
          fields: [
            {
              name: 'features',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: d.features.eyebrow,
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.features.title,
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Feature cards',
                  labels: { singular: 'Feature', plural: 'Features' },
                  admin: { initCollapsed: true },
                  defaultValue: d.features.items,
                  fields: [
                    { name: 'itemId', type: 'text', label: 'Item id' },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          required: true,
                          admin: { width: '60%' },
                        },
                        {
                          name: 'icon',
                          type: 'select',
                          required: true,
                          options: featureIconOptions,
                          defaultValue: 'shield',
                          admin: { width: '40%' },
                        },
                      ],
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Closing CTA',
          fields: [
            {
              name: 'closing',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.closing.title,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'primaryCtaLabel',
                      type: 'text',
                      label: 'Primary CTA label',
                      defaultValue: d.closing.primaryCtaLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'primaryCtaHref',
                      type: 'text',
                      label: 'Primary CTA URL',
                      defaultValue: d.closing.primaryCtaHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'secondaryCtaLabel',
                      type: 'text',
                      label: 'Secondary CTA label',
                      defaultValue: d.closing.secondaryCtaLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'secondaryCtaHref',
                      type: 'text',
                      label: 'Secondary CTA URL',
                      defaultValue: d.closing.secondaryCtaHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            seoFields({
              titleDefault: d.seo.title,
              descriptionDefault: d.seo.description,
            }),
          ],
        },
      ],
    },
  ],
}
