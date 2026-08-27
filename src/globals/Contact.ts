import type { GlobalConfig } from 'payload'
import { adminOnlyApiView, publicReadAuthenticatedUpdate } from '@/access'
import { closingCtaTab } from '@/fields/closingCta'
import { seoFields } from '@/fields/seo'
import { revalidateContactGlobal } from '@/hooks/revalidateCms'
import { pagePreview } from '@/lib/cms/previewUrl'
import { contactPageDefaults as d } from '@/lib/contact/defaults'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Page',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Editable content for the public Contact page.',
    group: 'Pages',
    preview: pagePreview('/contact'),
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  hooks: {
    afterChange: [revalidateContactGlobal],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Page title',
              defaultValue: 'Contact Us',
            },
            {
              name: 'introduction',
              type: 'textarea',
              label: 'Introduction',
              defaultValue: d.introduction,
            },
            {
              name: 'quickEnquiries',
              type: 'group',
              label: 'Quick enquiries',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  defaultValue: d.quickEnquiries.heading,
                },
                {
                  name: 'content',
                  type: 'textarea',
                  defaultValue: d.quickEnquiries.content,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'phone',
                      type: 'text',
                      defaultValue: d.quickEnquiries.phone,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'email',
                      type: 'email',
                      defaultValue: d.quickEnquiries.email,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'address',
                  type: 'textarea',
                  label: 'Address',
                  defaultValue: d.quickEnquiries.address,
                  admin: {
                    description: 'Shown below the email in the quick enquiries section.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Form',
          fields: [
            {
              name: 'form',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'consentNote',
                  type: 'textarea',
                  label: 'Consent note',
                  defaultValue: d.form.consentNote,
                  admin: {
                    description:
                      'Shown under the Submit button. Include the exact phrase “Privacy Policy” to auto-link that page.',
                  },
                },
              ],
            },
          ],
        },
        closingCtaTab(),
        {
          label: 'SEO',
          fields: [
            seoFields({
              titleDefault: 'Contact | DX Interiors',
              descriptionDefault:
                'Get in touch with DX Interiors for AI interior design, demos, and project enquiries.',
            }),
          ],
        },
      ],
    },
  ],
}
