import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { adminOnlyApiView } from '@/access'
import { seoFields } from '@/fields/seo'
import {
  revalidateTutorialCourseAfterChange,
  revalidateTutorialCourseAfterDelete,
} from '@/hooks/revalidateCms'
import { tutorialCoursePreview } from '@/lib/cms/previewUrl'

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

export const TutorialCourses: CollectionConfig = {
  slug: 'tutorial-courses',
  labels: {
    singular: 'Tutorial Course',
    plural: 'Tutorial Courses',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', '_status', 'featuredBeginner', 'publishedAt', 'updatedAt'],
    description: 'Video courses for the public Tutorials section — each course contains ordered lessons.',
    preview: tutorialCoursePreview,
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
    afterChange: [revalidateTutorialCourseAfterChange],
    afterDelete: [revalidateTutorialCourseAfterDelete],
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
        description: 'Shown on course cards and in search previews.',
      },
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Beginner\'s guide, Capture, Materials, Lighting, Export',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover image',
      required: true,
    },
    {
      name: 'imageAlt',
      type: 'text',
      label: 'Cover image alt text',
      admin: {
        description: 'Defaults to the media alt text when empty.',
      },
    },
    {
      name: 'featuredBeginner',
      type: 'checkbox',
      label: 'Featured in beginner carousel',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in the beginner carousel on the listing page.',
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
      name: 'lessons',
      type: 'array',
      label: 'Lessons',
      minRows: 1,
      admin: {
        description: 'Ordered lessons for this course. The first lesson plays by default.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: {
            description: 'URL segment for ?lesson= — unique within this course (e.g. first-project).',
          },
        },
        {
          name: 'duration',
          type: 'text',
          required: true,
          admin: {
            description: 'Display duration, e.g. 05:36',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail',
          required: true,
        },
        {
          name: 'imageAlt',
          type: 'text',
          label: 'Thumbnail alt text',
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'YouTube URL',
          admin: {
            description: 'Full YouTube watch, youtu.be, or embed URL.',
          },
        },
      ],
    },
    seoFields(),
  ],
}
