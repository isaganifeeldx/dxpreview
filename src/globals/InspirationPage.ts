import type { GlobalConfig } from 'payload'
import { adminOnlyApiView, publicReadAuthenticatedUpdate } from '@/access'
import { seoFields } from '@/fields/seo'
import { revalidateInspirationPageGlobal } from '@/hooks/revalidateCms'
import { pagePreview } from '@/lib/cms/previewUrl'
import { inspirationPageCmsFieldDefaults as d } from '@/lib/inspiration/cmsFieldDefaults'

export const InspirationPage: GlobalConfig = {
  slug: 'inspiration-page',
  label: 'Inspiration Page',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Listing page settings and SEO for /inspiration.',
    group: 'Pages',
    preview: pagePreview('/inspiration'),
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  hooks: {
    afterChange: [revalidateInspirationPageGlobal],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Hero',
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
              ],
            },
            {
              name: 'searchPlaceholder',
              type: 'text',
              defaultValue: d.searchPlaceholder,
            },
            {
              name: 'allSpacesLabel',
              type: 'text',
              label: 'All spaces label',
              defaultValue: d.allSpacesLabel,
            },
            {
              name: 'modelsIntro',
              type: 'textarea',
              label: '3D models intro',
              defaultValue: d.modelsIntro,
              admin: {
                description: 'Intro copy shown above the 3D model grid on detail pages.',
              },
            },
            {
              name: 'categories',
              type: 'array',
              label: 'Space filters',
              admin: {
                description: 'Options for the Spaces filter dropdown and category chips.',
              },
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'designStyles',
              type: 'array',
              label: 'Style filters',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'colors',
              type: 'array',
              label: 'Color filters',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'sortOptions',
              type: 'array',
              label: 'Sort options',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            seoFields({
              titleDefault: 'Inspiration | DX Interiors',
              descriptionDefault:
                'Browse interior design inspiration for every room — living rooms, bedrooms, kitchens, bathrooms, and more.',
            }),
          ],
        },
      ],
    },
  ],
}
