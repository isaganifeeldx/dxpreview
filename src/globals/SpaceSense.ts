import type { GlobalConfig } from 'payload'
import { adminOnlyApiView, publicReadAuthenticatedUpdate } from '@/access'
import { closingCtaGroupFields } from '@/fields/closingCta'
import { seoFields } from '@/fields/seo'
import { revalidateSpaceSenseGlobal } from '@/hooks/revalidateCms'
import { pagePreview } from '@/lib/cms/previewUrl'
import { spaceSenseCmsFieldDefaults as d } from '@/lib/spacesense/cmsFieldDefaults'

const imageUploadField = (name = 'image', label = 'Image') => ({
  name,
  type: 'upload' as const,
  relationTo: 'media' as const,
  label,
  admin: {
    description: 'Optional — falls back to the built-in default image if empty.',
  },
})

export const SpaceSense: GlobalConfig = {
  slug: 'spacesense-ai',
  label: 'SpaceSense AI Page',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Editable content for the public SpaceSense AI product page.',
    group: 'Pages',
    preview: pagePreview('/product/spacesense-ai'),
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  hooks: {
    afterChange: [revalidateSpaceSenseGlobal],
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
                imageUploadField(),
                {
                  name: 'imageAlt',
                  type: 'text',
                  label: 'Image alt text',
                  defaultValue: d.hero.imageAlt,
                },
              ],
            },
          ],
        },
        {
          label: 'Models',
          fields: [
            {
              name: 'models',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.models.title,
                },
                {
                  name: 'subtitle',
                  type: 'textarea',
                  defaultValue: d.models.subtitle,
                },
                {
                  name: 'sidebarTitle',
                  type: 'text',
                  label: 'Sidebar title',
                  defaultValue: d.models.sidebarTitle,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ctaLabel',
                      type: 'text',
                      label: 'Section CTA label',
                      defaultValue: d.models.ctaLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'ctaHref',
                      type: 'text',
                      label: 'Section CTA URL',
                      defaultValue: d.models.ctaHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Models',
                  labels: { singular: 'Model', plural: 'Models' },
                  admin: { initCollapsed: true },
                  defaultValue: d.models.items,
                  fields: [
                    { name: 'itemId', type: 'text', label: 'Item id' },
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
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
                          name: 'ctaLabel',
                          type: 'text',
                          label: 'CTA label',
                          required: true,
                          admin: { width: '50%' },
                        },
                        {
                          name: 'ctaHref',
                          type: 'text',
                          label: 'CTA URL',
                          required: true,
                          admin: { width: '50%' },
                        },
                      ],
                    },
                    imageUploadField(),
                    {
                      name: 'imageAlt',
                      type: 'text',
                      label: 'Image alt text',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'What is',
          fields: [
            {
              name: 'whatIs',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.whatIs.title,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue: d.whatIs.description,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ctaLabel',
                      type: 'text',
                      label: 'CTA label',
                      defaultValue: d.whatIs.ctaLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'ctaHref',
                      type: 'text',
                      label: 'CTA URL',
                      defaultValue: d.whatIs.ctaHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
                imageUploadField(),
                {
                  name: 'imageAlt',
                  type: 'text',
                  label: 'Image alt text',
                  defaultValue: d.whatIs.imageAlt,
                },
              ],
            },
          ],
        },
        {
          label: 'How to',
          fields: [
            {
              name: 'howTo',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.howTo.title,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ctaLabel',
                      type: 'text',
                      label: 'CTA label',
                      defaultValue: d.howTo.ctaLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'ctaHref',
                      type: 'text',
                      label: 'CTA URL',
                      defaultValue: d.howTo.ctaHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'steps',
                  type: 'array',
                  label: 'Steps',
                  labels: { singular: 'Step', plural: 'Steps' },
                  admin: { initCollapsed: true },
                  defaultValue: d.howTo.steps,
                  fields: [
                    { name: 'itemId', type: 'text', label: 'Item id' },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'step',
                          type: 'text',
                          label: 'Step number',
                          required: true,
                          admin: { width: '30%' },
                        },
                        {
                          name: 'title',
                          type: 'text',
                          required: true,
                          admin: { width: '70%' },
                        },
                      ],
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                    },
                    imageUploadField(),
                    {
                      name: 'imageAlt',
                      type: 'text',
                      label: 'Image alt text',
                    },
                  ],
                },
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
              label: false,
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
                    { name: 'itemId', type: 'text', label: 'Item id' },
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
