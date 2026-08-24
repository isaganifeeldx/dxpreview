import type { GlobalConfig } from 'payload'
import { adminOnlyApiView, publicReadAuthenticatedUpdate } from '@/access'
import { seoFields } from '@/fields/seo'
import { revalidateUserGuidePageGlobal } from '@/hooks/revalidateCms'
import { pagePreview } from '@/lib/cms/previewUrl'
import { userGuidePageCmsFieldDefaults as d } from '@/lib/user-guide/cmsFieldDefaults'

export const UserGuidePage: GlobalConfig = {
  slug: 'user-guide-page',
  label: 'User Guide Page',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Listing page settings and SEO for /user-guide.',
    group: 'Pages',
    preview: pagePreview('/user-guide'),
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  hooks: {
    afterChange: [revalidateUserGuidePageGlobal],
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
              name: 'closing',
              type: 'group',
              label: 'Closing CTA',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: d.closing.title,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue: d.closing.description,
                },
                {
                  name: 'primaryCta',
                  type: 'group',
                  label: 'Primary button',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      defaultValue: d.closing.primaryCta.label,
                    },
                    {
                      name: 'href',
                      type: 'text',
                      label: 'URL',
                      defaultValue: d.closing.primaryCta.href,
                    },
                  ],
                },
                {
                  name: 'showSecondaryCta',
                  type: 'checkbox',
                  label: 'Show secondary button',
                  defaultValue: true,
                },
                {
                  name: 'secondaryCta',
                  type: 'group',
                  label: 'Secondary button',
                  admin: {
                    condition: (_data, siblingData) => siblingData?.showSecondaryCta !== false,
                  },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      defaultValue: d.closing.secondaryCta.label,
                    },
                    {
                      name: 'href',
                      type: 'text',
                      label: 'URL',
                      defaultValue: d.closing.secondaryCta.href,
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
              titleDefault: 'User Guide | DX Interiors',
              descriptionDefault:
                'Short walkthroughs for DX Interiors — sign up, first design, billing, privacy, and how to reach support.',
            }),
          ],
        },
      ],
    },
  ],
}
