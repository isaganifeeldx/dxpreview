import type { Field, GlobalConfig } from 'payload'
import { adminOnlyApiView, publicReadAuthenticatedUpdate } from '@/access'
import { closingCtaTab } from '@/fields/closingCta'
import { seoFields } from '@/fields/seo'
import { revalidatePricingGlobal } from '@/hooks/revalidateCms'
import { pagePreview } from '@/lib/cms/previewUrl'
import { pricingCmsFieldDefaults as d } from '@/lib/pricing/cmsFieldDefaults'

const planIdOptions = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Business', value: 'business' },
  { label: 'Enterprise', value: 'enterprise' },
]

const planIconOptions = [
  { label: 'None', value: 'none' },
  { label: 'Crown', value: 'crown' },
]

const featureSectionIconOptions = [
  { label: 'Check', value: 'check' },
  { label: 'History', value: 'history' },
  { label: 'Users', value: 'users' },
  { label: 'Brand', value: 'brand' },
  { label: 'Shield', value: 'shield' },
  { label: 'Support', value: 'support' },
  { label: 'AI', value: 'ai' },
  { label: 'Spark', value: 'spark' },
]

const comparisonIconOptions = [
  { label: 'Workspace', value: 'workspace' },
  { label: 'AI', value: 'ai' },
  { label: 'Image', value: 'image' },
  { label: 'Content', value: 'content' },
  { label: 'Collaboration', value: 'collaboration' },
  { label: 'Brand', value: 'brand' },
  { label: 'Team', value: 'team' },
  { label: 'Security', value: 'security' },
  { label: 'Storage', value: 'storage' },
  { label: 'Support', value: 'support' },
]

const featureValueTypeOptions = [
  { label: 'Included (checkmark)', value: 'included' },
  { label: 'Not included (dash)', value: 'excluded' },
  { label: 'Custom text', value: 'text' },
]

function planFeatureValueFields(
  planKey: string,
  label: string,
  width = '25%',
): Field {
  return {
    type: 'group',
    name: planKey,
    label,
    admin: { width },
    fields: [
      {
        name: 'type',
        type: 'select',
        required: true,
        defaultValue: 'excluded',
        options: featureValueTypeOptions,
      },
      {
        name: 'text',
        type: 'text',
        admin: {
          condition: (_data, siblingData) => siblingData?.type === 'text',
          description: 'Shown when type is Custom text.',
        },
      },
    ],
  }
}

const ctaRowFields = (prefix: string, labelPrefix: string): Field => ({
  type: 'row',
  fields: [
    {
      name: `${prefix}Label`,
      type: 'text',
      label: `${labelPrefix} label`,
      admin: { width: '50%' },
    },
    {
      name: `${prefix}Href`,
      type: 'text',
      label: `${labelPrefix} URL`,
      admin: { width: '50%' },
    },
  ],
})

export const Pricing: GlobalConfig = {
  slug: 'pricing',
  label: 'Pricing Page',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Editable content for the public Plans and pricing page.',
    group: 'Pages',
    preview: pagePreview('/plans'),
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  hooks: {
    afterChange: [revalidatePricingGlobal],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Page title',
              defaultValue: d.title,
            },
            {
              name: 'billing',
              type: 'group',
              label: 'Billing toggle',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'monthlyLabel',
                      type: 'text',
                      defaultValue: d.billing.monthlyLabel,
                      admin: { width: '33%' },
                    },
                    {
                      name: 'yearlyLabel',
                      type: 'text',
                      defaultValue: d.billing.yearlyLabel,
                      admin: { width: '33%' },
                    },
                    {
                      name: 'yearlyBadge',
                      type: 'text',
                      defaultValue: d.billing.yearlyBadge,
                      admin: { width: '34%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Plans',
          fields: [
            {
              name: 'plans',
              type: 'array',
              label: 'Pricing plans',
              labels: { singular: 'Plan', plural: 'Plans' },
              admin: { initCollapsed: true },
              defaultValue: d.plans,
              fields: [
                {
                  name: 'planId',
                  type: 'select',
                  required: true,
                  options: planIdOptions,
                  defaultValue: 'free',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'icon',
                      type: 'select',
                      options: planIconOptions,
                      defaultValue: 'none',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'recommended',
                      type: 'checkbox',
                      label: 'Recommended badge',
                      defaultValue: false,
                      admin: { width: '40%' },
                    },
                    {
                      name: 'recommendedLabel',
                      type: 'text',
                      defaultValue: 'Recommended',
                      admin: {
                        width: '60%',
                        condition: (_data, siblingData) => Boolean(siblingData?.recommended),
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'monthlyPrice',
                      type: 'number',
                      label: 'Monthly price (AUD)',
                      admin: {
                        width: '33%',
                        description: 'Leave empty for custom price label (e.g. Enterprise).',
                      },
                    },
                    {
                      name: 'yearlyPrice',
                      type: 'number',
                      label: 'Yearly monthly-equivalent (AUD)',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'priceLabel',
                      type: 'text',
                      label: 'Custom price label',
                      admin: {
                        width: '34%',
                        description: 'Overrides numeric price when set (e.g. Let’s talk).',
                      },
                    },
                  ],
                },
                {
                  name: 'priceSuffix',
                  type: 'text',
                  defaultValue: 'AUD /month',
                },
                ctaRowFields('cta', 'Primary CTA'),
                ctaRowFields('secondaryCta', 'Secondary CTA'),
                ctaRowFields('compareCta', 'Compare-table CTA'),
                {
                  name: 'compareCtaMuted',
                  type: 'checkbox',
                  label: 'Muted compare CTA style',
                  defaultValue: false,
                },
                {
                  name: 'featureHeading',
                  type: 'text',
                  label: 'Feature list heading',
                  defaultValue: "What's included",
                },
                {
                  name: 'learnMoreLabel',
                  type: 'text',
                  defaultValue: 'Learn more',
                },
                {
                  name: 'featureSections',
                  type: 'array',
                  label: 'Feature sections',
                  labels: { singular: 'Section', plural: 'Sections' },
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      name: 'sectionId',
                      type: 'text',
                      label: 'Section id',
                      admin: { description: 'Stable id used in the frontend (optional).' },
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'heading',
                          type: 'text',
                          admin: { width: '60%' },
                        },
                        {
                          name: 'icon',
                          type: 'select',
                          options: featureSectionIconOptions,
                          admin: { width: '40%' },
                        },
                      ],
                    },
                    {
                      name: 'items',
                      type: 'array',
                      label: 'Items',
                      labels: { singular: 'Item', plural: 'Items' },
                      fields: [
                        {
                          name: 'text',
                          type: 'text',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'planFootnotes',
              type: 'array',
              label: 'Plan footnotes',
              labels: { singular: 'Footnote', plural: 'Footnotes' },
              admin: { initCollapsed: true },
              defaultValue: d.planFootnotes,
              fields: [
                {
                  name: 'text',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Comparison',
          fields: [
            {
              name: 'comparison',
              type: 'group',
              label: 'Feature comparison',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.comparison.title,
                },
                {
                  name: 'categories',
                  type: 'array',
                  label: 'Categories',
                  labels: { singular: 'Category', plural: 'Categories' },
                  admin: { initCollapsed: true },
                  defaultValue: d.comparison.categories,
                  fields: [
                    {
                      name: 'categoryId',
                      type: 'text',
                      label: 'Category id',
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          required: true,
                          admin: { width: '60%' },
                        },
                        {
                          name: 'icon',
                          type: 'select',
                          required: true,
                          options: comparisonIconOptions,
                          defaultValue: 'workspace',
                          admin: { width: '40%' },
                        },
                      ],
                    },
                    {
                      name: 'rows',
                      type: 'array',
                      label: 'Feature rows',
                      labels: { singular: 'Row', plural: 'Rows' },
                      admin: { initCollapsed: true },
                      fields: [
                        {
                          name: 'rowId',
                          type: 'text',
                          label: 'Row id',
                        },
                        {
                          name: 'label',
                          type: 'text',
                          required: true,
                        },
                        {
                          type: 'row',
                          fields: [
                            planFeatureValueFields('free', 'Free'),
                            planFeatureValueFields('pro', 'Pro'),
                            planFeatureValueFields('business', 'Business'),
                            planFeatureValueFields('enterprise', 'Enterprise'),
                          ],
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
          label: 'Social & promos',
          fields: [
            {
              name: 'socialProof',
              type: 'group',
              label: 'Social proof',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.socialProof.title,
                },
                {
                  name: 'logos',
                  type: 'array',
                  label: 'Logos / wordmarks',
                  labels: { singular: 'Logo', plural: 'Logos' },
                  admin: { initCollapsed: true },
                  defaultValue: d.socialProof.logos,
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                      admin: { description: 'Internal label / alt text.' },
                    },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Logo image',
                      admin: {
                        description: 'Optional. When set, shown instead of the wordmark text.',
                      },
                    },
                    {
                      name: 'mark',
                      type: 'text',
                      label: 'Wordmark text',
                      admin: {
                        description: 'Fallback text when no logo image is uploaded.',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'promos',
              type: 'array',
              label: 'Promo banners',
              labels: { singular: 'Promo', plural: 'Promos' },
              admin: { initCollapsed: true },
              defaultValue: d.promos,
              fields: [
                {
                  name: 'promoId',
                  type: 'text',
                  label: 'Promo id',
                },
                {
                  name: 'variant',
                  type: 'select',
                  required: true,
                  defaultValue: 'business',
                  options: [
                    { label: 'Business', value: 'business' },
                    { label: 'AI tools', value: 'ai' },
                  ],
                },
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
                ctaRowFields('cta', 'CTA'),
              ],
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            {
              name: 'faq',
              type: 'group',
              label: 'Pricing FAQ',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.faq.title,
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Questions',
                  labels: { singular: 'Question', plural: 'Questions' },
                  admin: { initCollapsed: true },
                  defaultValue: d.faq.items,
                  fields: [
                    {
                      name: 'itemId',
                      type: 'text',
                      label: 'Item id',
                    },
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
                  ],
                },
              ],
            },
          ],
        },
        closingCtaTab(),
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
