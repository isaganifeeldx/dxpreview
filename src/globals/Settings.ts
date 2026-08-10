import type { GlobalConfig } from 'payload'
import { adminOnlyApiView, publicReadAuthenticatedUpdate } from '@/access'
import { menuLinkRowsField } from '@/fields/menuLinks'
import { revalidateSettingsGlobal } from '@/hooks/revalidateCms'
import { siteSettingsDefaults } from '@/lib/settings/defaults'

const d = siteSettingsDefaults

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Settings',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Site-wide header, footer, and tracking scripts.',
    group: 'Site',
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  hooks: {
    afterChange: [revalidateSettingsGlobal],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header',
          fields: [
            {
              name: 'header',
              type: 'group',
              label: false,
              fields: [
                menuLinkRowsField('navLinks', 'Main menu links', d.header.navLinks),
                {
                  name: 'resourcesLabel',
                  type: 'text',
                  label: 'Resources dropdown label',
                  defaultValue: d.header.resourcesLabel,
                },
                menuLinkRowsField(
                  'resourceLinks',
                  'Resources dropdown links',
                  d.header.resourceLinks,
                ),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'loginLabel',
                      type: 'text',
                      label: 'Log in label',
                      defaultValue: d.header.login.label,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'loginHref',
                      type: 'text',
                      label: 'Log in URL',
                      defaultValue: d.header.login.href,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'demoLabel',
                      type: 'text',
                      label: 'Get a demo label',
                      defaultValue: d.header.demo.label,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'demoHref',
                      type: 'text',
                      label: 'Get a demo URL',
                      defaultValue: d.header.demo.href,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'startFreeLabel',
                      type: 'text',
                      label: 'Start Free label',
                      defaultValue: d.header.startFree.label,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'startFreeHref',
                      type: 'text',
                      label: 'Start Free URL',
                      defaultValue: d.header.startFree.href,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footer',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'linkColumnTitle',
                  type: 'text',
                  label: 'Link column title',
                  defaultValue: d.footer.linkColumnTitle,
                },
                menuLinkRowsField('linkColumn', 'Link column', d.footer.linkColumn),
                {
                  name: 'resourcesColumnTitle',
                  type: 'text',
                  label: 'Resources column title',
                  defaultValue: d.footer.resourcesColumnTitle,
                },
                menuLinkRowsField(
                  'resourcesColumn',
                  'Resources column',
                  d.footer.resourcesColumn,
                ),
                {
                  name: 'companyColumnTitle',
                  type: 'text',
                  label: 'Company column title',
                  defaultValue: d.footer.companyColumnTitle,
                },
                menuLinkRowsField('companyColumn', 'Company column', d.footer.companyColumn),
                {
                  name: 'contact',
                  type: 'group',
                  label: 'Contact column',
                  fields: [
                    {
                      name: 'email',
                      type: 'email',
                      label: 'Email',
                      defaultValue: d.footer.contact.email,
                    },
                    {
                      name: 'phone',
                      type: 'text',
                      label: 'Phone display',
                      defaultValue: d.footer.contact.phone,
                    },
                    {
                      name: 'phoneHref',
                      type: 'text',
                      label: 'Phone link (tel:)',
                      defaultValue: d.footer.contact.phoneHref,
                    },
                    {
                      name: 'location',
                      type: 'text',
                      label: 'Location',
                      defaultValue: d.footer.contact.location,
                    },
                  ],
                },
                {
                  name: 'social',
                  type: 'array',
                  label: 'Social links',
                  labels: { singular: 'Social link', plural: 'Social links' },
                  defaultValue: d.footer.social,
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'YouTube', value: 'youtube' },
                      ],
                    },
                    {
                      name: 'href',
                      type: 'text',
                      required: true,
                      label: 'URL',
                    },
                  ],
                },
                menuLinkRowsField('legalLinks', 'Legal / bottom links', d.footer.legalLinks),
                {
                  name: 'copyright',
                  type: 'text',
                  label: 'Copyright text',
                  defaultValue: d.footer.copyright,
                },
              ],
            },
          ],
        },
        {
          label: 'Tracking',
          fields: [
            {
              name: 'tracking',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'googleTagHead',
                  type: 'textarea',
                  label: 'Google Tag / GTM (head)',
                  admin: {
                    description:
                      'Paste the Google tag (gtag.js) or Google Tag Manager snippet that belongs in <head>. Leave empty to disable.',
                    rows: 10,
                  },
                },
                {
                  name: 'googleTagBody',
                  type: 'textarea',
                  label: 'Google Tag Manager (body)',
                  admin: {
                    description:
                      'Optional. Paste the GTM <noscript> snippet that belongs right after <body>.',
                    rows: 6,
                  },
                },
                {
                  name: 'metaPixel',
                  type: 'textarea',
                  label: 'Meta Pixel',
                  admin: {
                    description:
                      'Paste the Meta (Facebook) Pixel base code. Leave empty to disable.',
                    rows: 10,
                  },
                },
                {
                  name: 'ahrefs',
                  type: 'textarea',
                  label: 'Ahrefs',
                  admin: {
                    description:
                      'Paste the Ahrefs Analytics script. Leave empty to disable.',
                    rows: 10,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
