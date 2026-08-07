import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { adminOnlyApiView } from '@/access'
import { seoFields } from '@/fields/seo'
import {
  revalidateArticleAfterChange,
  revalidateArticleAfterDelete,
} from '@/hooks/revalidateCms'

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

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', '_status', 'featured', 'publishedAt', 'updatedAt'],
    description: 'Blog / insights articles for the public Articles section.',
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  versions: {
    drafts: {
      schedulePublish: true,
      // Allow incomplete articles while drafting; required fields still apply on Publish.
      validate: false,
    },
  },
  hooks: {
    beforeChange: [setPublishedAtOnPublish],
    afterChange: [revalidateArticleAfterChange],
    afterDelete: [revalidateArticleAfterDelete],
  },
  access: {
    read: ({ req: { user } }) => {
      // Logged-in editors can see drafts; the public site only sees published articles.
      if (user) return true
      return {
        or: [
          { _status: { equals: 'published' } },
          // Existing docs created before drafts was enabled may not have `_status` yet.
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Design, Product, Guides, Insights, Workflow, Business',
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
        description: 'Show as the large featured article on the listing page.',
      },
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
      admin: {
        description: 'Defaults to the media alt text when empty.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Article body',
      admin: {
        description: 'Full article content. Leave empty to show placeholder copy on the detail page.',
      },
    },
    seoFields(),
  ],
}
