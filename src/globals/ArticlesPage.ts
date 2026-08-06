import type { GlobalConfig } from 'payload'
import { publicReadAuthenticatedUpdate } from '@/access'
import { seoFields } from '@/fields/seo'
import { revalidateArticlesPageGlobal } from '@/hooks/revalidateCms'

export const ArticlesPage: GlobalConfig = {
  slug: 'articles-page',
  label: 'Articles Page',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Listing page settings and SEO for /articles.',
  },
  hooks: {
    afterChange: [revalidateArticlesPageGlobal],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heading',
              type: 'text',
              label: 'Grid heading',
              defaultValue: 'Articles',
            },
            {
              name: 'searchPlaceholder',
              type: 'text',
              label: 'Search placeholder',
              defaultValue: 'Search Articles',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            seoFields({
              titleDefault: 'Articles | DX Interiors',
              descriptionDefault:
                'Ideas, guides, and insights on interior design, visualisation, and creating spaces that feel like home.',
            }),
          ],
        },
      ],
    },
  ],
}
