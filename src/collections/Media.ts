import type { CollectionConfig } from 'payload'
import { adminOnlyApiView, authenticated } from '@/access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
