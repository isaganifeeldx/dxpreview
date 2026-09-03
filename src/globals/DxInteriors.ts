import type { GlobalConfig } from 'payload'
import { adminOnlyApiView, publicReadAuthenticatedUpdate } from '@/access'
import { closingCtaGroupFields } from '@/fields/closingCta'
import { seoFields } from '@/fields/seo'
import { revalidateDxInteriorsGlobal } from '@/hooks/revalidateCms'
import { pagePreview } from '@/lib/cms/previewUrl'
import { interiorsCmsFieldDefaults as d } from '@/lib/interiors/cmsFieldDefaults'

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

const imageUploadField = (label = 'Image') => ({
  name: 'image',
  type: 'upload' as const,
  relationTo: 'media' as const,
  label,
  admin: {
    description: 'Optional — falls back to the built-in default image if empty.',
  },
})

type SplitFeatureDefaults = typeof d.splitFeatureAbove

function splitFeatureGroupFields(defaults: SplitFeatureDefaults) {
  return [
    { name: 'itemId', type: 'text' as const, label: 'Item id', defaultValue: defaults.itemId },
    {
      name: 'eyebrow',
      type: 'text' as const,
      defaultValue: defaults.eyebrow,
    },
    {
      name: 'title',
      type: 'text' as const,
      required: true as const,
      defaultValue: defaults.title,
    },
    {
      name: 'description',
      type: 'textarea' as const,
      required: true as const,
      defaultValue: defaults.description,
    },
    {
      name: 'bullets',
      type: 'array' as const,
      label: 'Bullets',
      labels: { singular: 'Bullet', plural: 'Bullets' },
      admin: { initCollapsed: true },
      defaultValue: defaults.bullets,
      fields: [
        {
          name: 'text',
          type: 'text' as const,
          required: true as const,
          label: 'Bullet',
        },
      ],
    },
    imageUploadField(),
    {
      name: 'imageAlt',
      type: 'text' as const,
      label: 'Image alt text',
      defaultValue: defaults.imageAlt,
    },
    {
      name: 'imagePosition',
      type: 'select' as const,
      defaultValue: defaults.imagePosition,
      options: [
        { label: 'Image on the right', value: 'right' },
        { label: 'Image on the left', value: 'left' },
      ],
    },
  ]
}

export const DxInteriors: GlobalConfig = {
  slug: 'dx-interiors',
  label: 'DX Interiors Page',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Editable content for the public DX Interiors product page.',
    group: 'Pages',
    preview: pagePreview('/product/dx-interiors'),
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  hooks: {
    afterChange: [revalidateDxInteriorsGlobal],
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
                  name: 'title',
                  type: 'text',
                  defaultValue: d.hero.title,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue: d.hero.description,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'primaryCtaLabel',
                      type: 'text',
                      label: 'Primary CTA label',
                      defaultValue: d.hero.primaryCtaLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'primaryCtaHref',
                      type: 'text',
                      label: 'Primary CTA URL',
                      defaultValue: d.hero.primaryCtaHref,
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
                      defaultValue: d.hero.secondaryCtaLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'secondaryCtaHref',
                      type: 'text',
                      label: 'Secondary CTA URL',
                      defaultValue: d.hero.secondaryCtaHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Capability bar',
          fields: [
            {
              name: 'capabilityPills',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: d.capabilityPills.eyebrow,
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Capabilities',
                  labels: { singular: 'Capability', plural: 'Capabilities' },
                  admin: { initCollapsed: true },
                  defaultValue: d.capabilityPills.items,
                  fields: [
                    { name: 'itemId', type: 'text', label: 'Item id' },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          required: true,
                          admin: { width: '50%' },
                        },
                        {
                          name: 'subtitle',
                          type: 'text',
                          required: true,
                          admin: { width: '50%' },
                        },
                      ],
                    },
                    {
                      name: 'icon',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Icon',
                      admin: {
                        description: 'Upload an SVG (preferred) or PNG. Falls back to the built-in glyph if empty.',
                      },
                    },
                    {
                      name: 'iconAlt',
                      type: 'text',
                      label: 'Icon alt text',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Feature: Context',
          fields: [
            {
              name: 'splitFeatureAbove',
              type: 'group',
              label: false,
              admin: {
                description: 'Appears above the capability suite on the page.',
              },
              fields: splitFeatureGroupFields(d.splitFeatureAbove),
            },
          ],
        },
        {
          label: 'Capability grid',
          fields: [
            {
              name: 'capabilityGrid',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.capabilityGrid.title,
                },
                {
                  name: 'subtitle',
                  type: 'textarea',
                  defaultValue: d.capabilityGrid.subtitle,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'footerLinkLabel',
                      type: 'text',
                      label: 'Footer link label',
                      defaultValue: d.capabilityGrid.footerLinkLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'footerLinkHref',
                      type: 'text',
                      label: 'Footer link URL',
                      defaultValue: d.capabilityGrid.footerLinkHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Cards',
                  labels: { singular: 'Card', plural: 'Cards' },
                  admin: { initCollapsed: true },
                  defaultValue: d.capabilityGrid.items,
                  fields: [
                    { name: 'itemId', type: 'text', label: 'Item id' },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                    },
                    {
                      name: 'variant',
                      type: 'select',
                      defaultValue: 'image',
                      options: [
                        { label: 'Image card', value: 'image' },
                        { label: 'Custom / empty preview', value: 'custom' },
                      ],
                    },
                    imageUploadField(),
                    {
                      name: 'imageAlt',
                      type: 'text',
                      label: 'Image alt text',
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'span',
                          type: 'select',
                          defaultValue: 'normal',
                          options: [
                            { label: 'Normal', value: 'normal' },
                            { label: 'Wide', value: 'wide' },
                          ],
                          admin: { width: '50%' },
                        },
                        {
                          name: 'tone',
                          type: 'select',
                          defaultValue: 'rose',
                          options: [
                            { label: 'Rose', value: 'rose' },
                            { label: 'Purple', value: 'purple' },
                            { label: 'Coral', value: 'coral' },
                            { label: 'Charcoal', value: 'charcoal' },
                            { label: 'Indigo', value: 'indigo' },
                            { label: 'Violet', value: 'violet' },
                            { label: 'Magenta', value: 'magenta' },
                            { label: 'Lavender', value: 'lavender' },
                            { label: 'Sunset', value: 'sunset' },
                          ],
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
          label: 'Feature: Refine',
          fields: [
            {
              name: 'splitFeatureBelow',
              type: 'group',
              label: false,
              admin: {
                description: 'Appears below the capability suite on the page.',
              },
              fields: splitFeatureGroupFields(d.splitFeatureBelow),
            },
          ],
        },
        {
          label: 'Comparison & stats',
          fields: [
            {
              name: 'comparison',
              type: 'group',
              label: 'Comparison',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.comparison.title,
                },
                {
                  name: 'subtitle',
                  type: 'textarea',
                  defaultValue: d.comparison.subtitle,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'oldWayTitle',
                      type: 'text',
                      label: 'Old way title',
                      defaultValue: d.comparison.oldWayTitle,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'newWayTitle',
                      type: 'text',
                      label: 'New way title',
                      defaultValue: d.comparison.newWayTitle,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'oldWayItems',
                  type: 'array',
                  label: 'Old way items',
                  labels: { singular: 'Item', plural: 'Items' },
                  admin: { initCollapsed: true },
                  defaultValue: d.comparison.oldWayItems,
                  fields: [{ name: 'text', type: 'text', required: true, label: 'Item' }],
                },
                {
                  name: 'newWayItems',
                  type: 'array',
                  label: 'New way items',
                  labels: { singular: 'Item', plural: 'Items' },
                  admin: { initCollapsed: true },
                  defaultValue: d.comparison.newWayItems,
                  fields: [{ name: 'text', type: 'text', required: true, label: 'Item' }],
                },
              ],
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Stats',
              labels: { singular: 'Stat', plural: 'Stats' },
              admin: { initCollapsed: true },
              defaultValue: d.stats,
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
              fields: closingCtaGroupFields({
                title: d.closing.title,
                primaryCta: { label: d.closing.primaryCtaLabel, href: d.closing.primaryCtaHref },
                secondaryCta: {
                  label: d.closing.secondaryCtaLabel,
                  href: d.closing.secondaryCtaHref,
                },
                showSecondaryCta: true,
              }),
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
