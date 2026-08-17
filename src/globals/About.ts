import type { GlobalConfig } from 'payload'
import { adminOnlyApiView, publicReadAuthenticatedUpdate } from '@/access'
import { seoFields } from '@/fields/seo'
import { revalidateAboutGlobal } from '@/hooks/revalidateCms'
import { pagePreview } from '@/lib/cms/previewUrl'
import { aboutCmsFieldDefaults as d } from '@/lib/about/cmsFieldDefaults'

const perkIconOptions = [
  { label: 'Health', value: 'health' },
  { label: 'Equity', value: 'equity' },
  { label: 'Growth', value: 'growth' },
  { label: 'Remote / Flexible', value: 'remote' },
  { label: 'Leave', value: 'leave' },
  { label: 'Tools', value: 'tools' },
  { label: 'Team', value: 'team' },
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

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Editable content for the public About page.',
    group: 'Pages',
    preview: pagePreview('/about'),
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  hooks: {
    afterChange: [revalidateAboutGlobal],
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
                      name: 'ctaLabel',
                      type: 'text',
                      label: 'CTA label',
                      defaultValue: d.hero.ctaLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'ctaHref',
                      type: 'text',
                      label: 'CTA URL',
                      defaultValue: d.hero.ctaHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'images',
                  type: 'array',
                  label: 'Collage images',
                  labels: { singular: 'Image', plural: 'Images' },
                  admin: {
                    initCollapsed: true,
                    description: 'Five images work best for the desktop collage layout.',
                  },
                  defaultValue: d.hero.images,
                  fields: [
                    imageUploadField(),
                    { name: 'alt', type: 'text', required: true, label: 'Alt text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Mission',
          fields: [
            {
              name: 'mission',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: d.mission.eyebrow,
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.mission.title,
                },
                {
                  name: 'paragraphs',
                  type: 'array',
                  label: 'Paragraphs',
                  labels: { singular: 'Paragraph', plural: 'Paragraphs' },
                  admin: { initCollapsed: true },
                  defaultValue: d.mission.paragraphs,
                  fields: [
                    {
                      name: 'text',
                      type: 'textarea',
                      required: true,
                      label: 'Paragraph',
                    },
                  ],
                },
                imageUploadField('Side image'),
                {
                  name: 'imageAlt',
                  type: 'text',
                  label: 'Side image alt text',
                  defaultValue: d.mission.imageAlt,
                },
              ],
            },
          ],
        },
        {
          label: 'Culture',
          fields: [
            {
              name: 'culture',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: d.culture.eyebrow,
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.culture.title,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue: d.culture.description,
                },
                {
                  name: 'images',
                  type: 'array',
                  label: 'Slider images',
                  labels: { singular: 'Image', plural: 'Images' },
                  admin: { initCollapsed: true },
                  defaultValue: d.culture.images,
                  fields: [
                    imageUploadField(),
                    { name: 'alt', type: 'text', required: true, label: 'Alt text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Locations',
          fields: [
            {
              name: 'locations',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: d.locations.eyebrow,
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.locations.title,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue: d.locations.description,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ctaLabel',
                      type: 'text',
                      label: 'CTA label',
                      defaultValue: d.locations.ctaLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'ctaHref',
                      type: 'text',
                      label: 'CTA URL',
                      defaultValue: d.locations.ctaHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Locations',
                  labels: { singular: 'Location', plural: 'Locations' },
                  admin: { initCollapsed: true },
                  defaultValue: d.locations.items,
                  fields: [
                    { name: 'itemId', type: 'text', label: 'Item id' },
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
                          name: 'role',
                          type: 'text',
                          required: true,
                          label: 'Subtitle',
                          admin: { width: '50%' },
                        },
                      ],
                    },
                    imageUploadField(),
                    { name: 'imageAlt', type: 'text', label: 'Image alt text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Voices',
          fields: [
            {
              name: 'voices',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: d.voices.eyebrow,
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.voices.title,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue: d.voices.description,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ctaLabel',
                      type: 'text',
                      label: 'CTA label',
                      defaultValue: d.voices.ctaLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'ctaHref',
                      type: 'text',
                      label: 'CTA URL',
                      defaultValue: d.voices.ctaHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Quotes',
                  labels: { singular: 'Quote', plural: 'Quotes' },
                  admin: { initCollapsed: true },
                  defaultValue: d.voices.items,
                  fields: [
                    { name: 'itemId', type: 'text', label: 'Item id' },
                    { name: 'quote', type: 'textarea', required: true },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'name',
                          type: 'text',
                          required: true,
                          admin: { width: '40%' },
                        },
                        {
                          name: 'role',
                          type: 'text',
                          required: true,
                          admin: { width: '35%' },
                        },
                        {
                          name: 'avatarInitials',
                          type: 'text',
                          label: 'Initials',
                          required: true,
                          admin: { width: '25%' },
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
          label: 'Perks',
          fields: [
            {
              name: 'perks',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: d.perks.eyebrow,
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.perks.title,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue: d.perks.description,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ctaLabel',
                      type: 'text',
                      label: 'CTA label',
                      defaultValue: d.perks.ctaLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'ctaHref',
                      type: 'text',
                      label: 'CTA URL',
                      defaultValue: d.perks.ctaHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Perk cards',
                  labels: { singular: 'Perk', plural: 'Perks' },
                  admin: { initCollapsed: true },
                  defaultValue: d.perks.items,
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
                          options: perkIconOptions,
                          defaultValue: 'health',
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
