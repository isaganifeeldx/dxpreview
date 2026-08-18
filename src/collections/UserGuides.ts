import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { adminOnlyApiView } from '@/access'
import { seoFields } from '@/fields/seo'
import {
  revalidateUserGuideAfterChange,
  revalidateUserGuideAfterDelete,
} from '@/hooks/revalidateCms'
import { userGuidePreview } from '@/lib/cms/previewUrl'

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

export const UserGuides: CollectionConfig = {
  slug: 'user-guides',
  labels: {
    singular: 'User Guide',
    plural: 'User Guides',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', '_status', 'featured', 'publishedAt', 'updatedAt'],
    description: 'Individual walkthrough guides for the public User Guide section.',
    preview: userGuidePreview,
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
    afterChange: [revalidateUserGuideAfterChange],
    afterDelete: [revalidateUserGuideAfterDelete],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        or: [
          { _status: { equals: 'published' } },
          { _status: { exists: false } },
        ],
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
      name: 'description',
      type: 'textarea',
      label: 'Short description',
      required: true,
      admin: {
        description: 'Shown on listing cards and in search previews.',
      },
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Account, Workflow, Billing, Privacy, Support',
      },
    },
    {
      name: 'meta',
      type: 'text',
      label: 'Meta line',
      admin: {
        description: 'Optional — e.g. "5 steps · 6 min read". Shown on the featured guide and detail page.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured image',
      required: true,
    },
    {
      name: 'imageAlt',
      type: 'text',
      label: 'Image alt text',
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
          'Shown on the public site. Leave empty when publishing — it will be set to now automatically.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show as the large featured guide on the listing page.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Guide body',
      admin: {
        description: 'Full guide content. Leave empty to show placeholder copy on the detail page.',
      },
    },
    seoFields(),
  ],
}
