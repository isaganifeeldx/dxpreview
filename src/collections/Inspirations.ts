import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { adminOnlyApiView } from '@/access'
import { seoFields } from '@/fields/seo'
import {
  revalidateInspirationAfterChange,
  revalidateInspirationAfterDelete,
} from '@/hooks/revalidateCms'
import { inspirationPreview } from '@/lib/cms/previewUrl'
import { inspirationCtaDefaults } from '@/lib/inspiration/inspirationDetailDefaults'

/** When publishing, fill Publish date if the editor left it blank. */
const setPublishedAtOnPublish: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  if (!data) return data

  const nextStatus = (data._status ?? originalDoc?._status) as string | undefined
  if (nextStatus !== 'published') return data

  if (!data.publishedAt) {
    data.publishedAt = (originalDoc?.publishedAt as string | undefined) ?? new Date().toISOString()
  }

  return data
}

export const Inspirations: CollectionConfig = {
  slug: 'inspirations',
  labels: {
    singular: 'Inspiration',
    plural: 'Inspirations',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'designStyle', '_status', 'publishedAt', 'updatedAt'],
    description: 'Individual inspiration templates for the public Inspiration section.',
    preview: inspirationPreview,
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  versions: {
    drafts: {
      schedulePublish: true,
      validate: false,
    },
  },
  hooks: {
    beforeChange: [setPublishedAtOnPublish],
    afterChange: [revalidateInspirationAfterChange],
    afterDelete: [revalidateInspirationAfterDelete],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        or: [{ _status: { equals: 'published' } }, { _status: { exists: false } }],
      }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      useAsSlug: 'title',
      overrides: (field) => {
        const slugTextField = field.fields.find(
          (f): f is (typeof field.fields)[number] & { type: 'text'; name: string } =>
            'type' in f && f.type === 'text' && 'name' in f && f.name === 'slug',
        )

        if (slugTextField?.admin) {
          slugTextField.admin.components = {
            ...slugTextField.admin.components,
            Field: {
              clientProps: {
                useAsSlug: 'title',
              },
              path: '/components/payload/SlugField',
            },
          }
        }

        return field
      },
    }),
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Living Room, Kitchen, Bedroom',
      },
    },
    {
      name: 'designStyle',
      type: 'text',
      label: 'Design style',
      required: true,
      admin: {
        description: 'e.g. Modern, Scandinavian, Minimal',
      },
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Neutral, Warm, Cool',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero image',
      required: true,
    },
    {
      name: 'imageAlt',
      type: 'text',
      label: 'Hero image alt text',
      admin: {
        description: 'Defaults to the media alt text when empty.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publish date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'd MMM yyyy h:mm a',
        },
        position: 'sidebar',
        description:
          'Used for sorting on the listing page. Leave empty when publishing — it will be set to now automatically.',
      },
    },
    {
      name: 'models',
      type: 'array',
      label: '3D models',
      minRows: 1,
      admin: {
        description: 'Models shown in the detail page grid.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'imageAlt',
          type: 'text',
          label: 'Image alt text',
        },
      ],
    },
    {
      name: 'overview',
      type: 'textarea',
      label: 'Design overview',
      required: true,
      admin: {
        description: 'Shown in the Design overview section on the detail page.',
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Sidebar CTA',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: inspirationCtaDefaults.label,
        },
        {
          name: 'href',
          type: 'text',
          label: 'URL',
          defaultValue: inspirationCtaDefaults.href,
        },
      ],
    },
    seoFields(),
  ],
}
