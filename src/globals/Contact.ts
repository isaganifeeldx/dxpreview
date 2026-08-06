import type { GlobalConfig } from 'payload'
import { publicReadAuthenticatedUpdate } from '@/access'
import { seoFields } from '@/fields/seo'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Page',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Editable content for the public Contact page.',
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
              defaultValue:
                'From dream to reality, we bring your vision to life through expert craftsmanship and guidance at every stage of the journey.',
            },
            {
              name: 'quickEnquiries',
              type: 'group',
              label: 'Quick enquiries',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'For Quick Enquiries',
                },
                {
                  name: 'content',
                  type: 'textarea',
                  defaultValue:
                    'Have a question or need assistance fast? Reach out to us directly, our team is available from 8:30 AM to 6:00 PM to provide quick support and answers.',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'phone',
                      type: 'text',
                      defaultValue: '1800 333 539',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'email',
                      type: 'email',
                      defaultValue: 'sales@dxinteriors.ai',
                      admin: { width: '50%' },
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
