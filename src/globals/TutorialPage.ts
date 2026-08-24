import type { GlobalConfig } from 'payload'
import { adminOnlyApiView, publicReadAuthenticatedUpdate } from '@/access'
import { closingCtaTab } from '@/fields/closingCta'
import { seoFields } from '@/fields/seo'
import { revalidateTutorialPageGlobal } from '@/hooks/revalidateCms'
import { pagePreview } from '@/lib/cms/previewUrl'
import { tutorialPageCmsFieldDefaults as d } from '@/lib/tutorial/cmsFieldDefaults'

export const TutorialPage: GlobalConfig = {
  slug: 'tutorial-page',
  label: 'Tutorial Page',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Listing page settings and SEO for /tutorial.',
    group: 'Pages',
    preview: pagePreview('/tutorial'),
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  hooks: {
    afterChange: [revalidateTutorialPageGlobal],
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
              name: 'videosHeading',
              type: 'text',
              label: 'Courses section heading',
              defaultValue: d.videosHeading,
            },
            {
              name: 'beginnerHeading',
              type: 'text',
              label: 'Beginner carousel heading',
              defaultValue: d.beginnerHeading,
            },
            {
              name: 'allHeading',
              type: 'text',
              label: 'All courses heading',
              defaultValue: d.allHeading,
            },
            {
              name: 'otherHeading',
              type: 'text',
              label: 'Other courses heading (detail page)',
              defaultValue: d.otherHeading,
            },
            {
              name: 'otherDescription',
              type: 'text',
              label: 'Other courses description (detail page)',
              defaultValue: d.otherDescription,
            },
            {
              name: 'searchPlaceholder',
              type: 'text',
              label: 'Search placeholder',
              defaultValue: d.searchPlaceholder,
            },
          ],
        },
        closingCtaTab(),
        {
          label: 'SEO',
          fields: [
            seoFields({
              titleDefault: 'Tutorials | DX Interiors',
              descriptionDefault:
                'Step-by-step DX Interiors video courses — from your first project to materials, lighting, and client-ready boards.',
            }),
          ],
        },
      ],
    },
  ],
}
