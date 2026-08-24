import type { GlobalConfig } from 'payload'
import { closingCtaGroupFields } from '@/fields/closingCta'
import { adminOnlyApiView, publicReadAuthenticatedUpdate } from '@/access'
import { seoFields } from '@/fields/seo'
import { revalidateHomeGlobal } from '@/hooks/revalidateCms'
import { pagePreview } from '@/lib/cms/previewUrl'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  access: publicReadAuthenticatedUpdate,
  admin: {
    description: 'Editable content for the public homepage.',
    group: 'Pages',
    preview: pagePreview('/'),
    components: {
      views: {
        edit: adminOnlyApiView,
      },
    },
  },
  hooks: {
    afterChange: [revalidateHomeGlobal],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'lineOne',
                  type: 'text',
                  label: 'Line one',
                  defaultValue: 'Your Complete',
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  defaultValue: 'Interior Design Studio',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Generate photorealistic room concepts, instant mood boards, and optimal furniture in seconds. DX Interiors handles the heavy lifting of ideation so you can focus on the art of design.',
                },
                {
                  name: 'features',
                  type: 'array',
                  labels: { singular: 'Feature', plural: 'Features' },
                  maxRows: 4,
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                  ],
                  defaultValue: [
                    { label: 'Smart Surface & Material Swapping' },
                    { label: 'Seamless Scene Clean-Up' },
                    { label: 'Intelligent Object Staging' },
                    { label: 'Renders & Flythroughs' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'primaryCtaLabel',
                      type: 'text',
                      label: 'Primary CTA label',
                      defaultValue: 'Start For Free',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'primaryCtaHref',
                      type: 'text',
                      label: 'Primary CTA link',
                      defaultValue: '#',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'secondaryCtaLabel',
                      type: 'text',
                      label: 'Secondary CTA label',
                      defaultValue: 'Request a Demo',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'secondaryCtaHref',
                      type: 'text',
                      label: 'Secondary CTA link',
                      defaultValue: '/contact',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'videoId',
                  type: 'text',
                  label: 'Livid video ID',
                  defaultValue: 'H8t3cI9bm-Zo',
                },
              ],
            },
          ],
        },
        {
          label: 'Trust',
          fields: [
            {
              name: 'trust',
              type: 'group',
              fields: [
                {
                  name: 'intro',
                  type: 'text',
                  defaultValue: 'Trusted by 5,000+ interior designers, homeowners and architects.',
                },
                {
                  name: 'stats',
                  type: 'array',
                  labels: { singular: 'Stat', plural: 'Stats' },
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', required: true },
                  ],
                  defaultValue: [
                    { value: '30K+', label: 'Projects Created' },
                    { value: '120K+', label: 'Images Rendered' },
                    { value: '16h/wk', label: 'Time Saved' },
                    { value: '4.8★', label: 'Avg Rating' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Process',
          fields: [
            {
              name: 'process',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'How to design your space online for free',
                },
                {
                  name: 'cards',
                  type: 'array',
                  labels: { singular: 'Card', plural: 'Cards' },
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Card image (optional — falls back to default)',
                    },
                    {
                      name: 'numberSide',
                      type: 'select',
                      defaultValue: 'right',
                      options: [
                        { label: 'Right', value: 'right' },
                        { label: 'Left', value: 'left' },
                      ],
                    },
                  ],
                  defaultValue: [
                    {
                      title: 'Start with a picture of your space',
                      description:
                        'Upload a picture of your space or take a new photo of the area you want to design.',
                      numberSide: 'right',
                    },
                    {
                      title: 'Detect interior objects automatically using AI',
                      description:
                        'The AI system automatically detects multiple object types in your picture, allowing you to select, focus on, modify, or remove any of them.',
                      numberSide: 'left',
                    },
                    {
                      title: 'Adding new furniture to your space',
                      description:
                        'You can add new furniture to your space by uploading a picture, selecting from curated collections, or browsing through suppliers using our DX DB database.',
                      numberSide: 'right',
                    },
                    {
                      title: 'Effortless space visualisation with AI precision & presets',
                      description:
                        'Visualize your space instantly with accurate multi-angle, hyper-realistic AI rendering, industry-standard presets, and real-time lifelike design previews.',
                      numberSide: 'left',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Discover',
          fields: [
            {
              name: 'discover',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Discover & Define',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'We dive deep into your business, goals, and challenges to identify where AI can create the most impact.',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ctaLabel',
                      type: 'text',
                      label: 'CTA label',
                      defaultValue: 'Getting Started',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'ctaHref',
                      type: 'text',
                      label: 'CTA link',
                      defaultValue: '/login',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'videoId',
                  type: 'text',
                  label: 'Livid video ID',
                  defaultValue: 'H8t3cI9bm-Zo',
                },
              ],
            },
          ],
        },
        {
          label: 'Gallery',
          fields: [
            {
              name: 'gallery',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Inspiring interior design ideas for every room!',
                },
                {
                  name: 'images',
                  type: 'array',
                  labels: { singular: 'Image', plural: 'Images' },
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                    },
                    {
                      name: 'alt',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'grow',
                      type: 'number',
                      label: 'Column grow weight',
                      defaultValue: 2,
                      min: 1,
                      max: 5,
                      admin: {
                        description: 'Controls relative height in the desktop masonry layout.',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Lessons',
          fields: [
            {
              name: 'lessons',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Master Interior Design in 7 Free Lessons - Start Anytime',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Become a professional interior design expert and bring your creative ideas to life with our powerful design platform.',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ctaLabel',
                      type: 'text',
                      label: 'CTA label',
                      defaultValue: "Watch beginner's guide video",
                      admin: { width: '50%' },
                    },
                    {
                      name: 'ctaHref',
                      type: 'text',
                      label: 'CTA link',
                      defaultValue: '/login',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'videoId',
                  type: 'text',
                  label: 'Livid video ID',
                  defaultValue: 'H8t3cI9bm-Zo',
                },
              ],
            },
          ],
        },
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonials',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Trusted by design leaders',
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Quotes',
                  labels: { singular: 'Quote', plural: 'Quotes' },
                  admin: { initCollapsed: true },
                  defaultValue: [
                    {
                      itemId: 'studio',
                      quote:
                        'We present client-ready boards in the same meeting we capture the room. DX Interiors replaced a week of visualisation wait time.',
                      role: 'Design director',
                      company: 'National interior studio',
                    },
                    {
                      itemId: 'developer',
                      quote:
                        'Sales suites stay on-brand across every project. Shared libraries and admin controls finally match how our teams actually work.',
                      role: 'Head of product',
                      company: 'Residential developer',
                    },
                    {
                      itemId: 'hospitality',
                      quote:
                        'Flythroughs and material swaps used to be a specialist bottleneck. Now every designer on the account can deliver at the same standard.',
                      role: 'Creative lead',
                      company: 'Hospitality group',
                    },
                  ],
                  fields: [
                    { name: 'itemId', type: 'text', label: 'Item id' },
                    { name: 'quote', type: 'textarea', required: true },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'role',
                          type: 'text',
                          required: true,
                          admin: { width: '50%' },
                        },
                        {
                          name: 'company',
                          type: 'text',
                          required: true,
                          admin: { width: '50%' },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Features',
          fields: [
            {
              name: 'features',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'Features',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Everything your team needs',
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Feature cards',
                  labels: { singular: 'Feature', plural: 'Features' },
                  admin: { initCollapsed: true },
                  defaultValue: [
                    {
                      itemId: 'sso',
                      icon: 'lock',
                      title: 'SSO',
                      description: 'Directory sync and single sign-on so every seat stays under IT control.',
                    },
                    {
                      itemId: 'security',
                      icon: 'shield',
                      title: 'Enterprise security',
                      description:
                        'Audit logs, role-based permissions, and data residency options for large organisations.',
                    },
                    {
                      itemId: 'ai',
                      icon: 'spark',
                      title: 'Custom AI capacity',
                      description: 'Dedicated render capacity and optional model fine-tuning for your studio look.',
                    },
                    {
                      itemId: 'teams',
                      icon: 'users',
                      title: 'Team management',
                      description: 'Unlimited seats, guest reviewers, and admin controls across projects and brands.',
                    },
                    {
                      itemId: 'templates',
                      icon: 'template',
                      title: 'Custom templates',
                      description: 'Lock in room templates, style presets, and presentation layouts for every brief.',
                    },
                    {
                      itemId: 'privacy',
                      icon: 'globe',
                      title: 'Global privacy',
                      description: 'Keep client spaces and catalogues in the region your compliance team requires.',
                    },
                    {
                      itemId: 'encryption',
                      icon: 'encrypt',
                      title: 'Data encryption',
                      description: 'Protect project files, renders, and brand kits in transit and at rest.',
                    },
                    {
                      itemId: 'analytics',
                      icon: 'chart',
                      title: 'Usage analytics',
                      description: 'See render volume, seat activity, and queue health across the organisation.',
                    },
                    {
                      itemId: 'integrations',
                      icon: 'plug',
                      title: 'Custom integrations',
                      description: 'Connect supplier catalogues, DAM, and internal tools through API and partner work.',
                    },
                    {
                      itemId: 'support',
                      icon: 'support',
                      title: 'Priority support',
                      description: 'A dedicated success manager, custom onboarding, and an SLA built for your rollout.',
                    },
                    {
                      itemId: 'workflows',
                      icon: 'workflow',
                      title: 'Studio workflows',
                      description: 'Batch renders, approvals, and shared libraries so delivery stays consistent.',
                    },
                    {
                      itemId: 'white-label',
                      icon: 'chat',
                      title: 'White-label exports',
                      description: 'Client-facing boards and flythroughs without DX watermarks or leftover branding.',
                    },
                  ],
                  fields: [
                    { name: 'itemId', type: 'text', label: 'Item id' },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          required: true,
                          admin: { width: '60%' },
                        },
                        {
                          name: 'icon',
                          type: 'select',
                          required: true,
                          options: [
                            { label: 'Shield', value: 'shield' },
                            { label: 'Lock', value: 'lock' },
                            { label: 'Spark', value: 'spark' },
                            { label: 'Users', value: 'users' },
                            { label: 'Template', value: 'template' },
                            { label: 'Globe', value: 'globe' },
                            { label: 'Encrypt', value: 'encrypt' },
                            { label: 'Chart', value: 'chart' },
                            { label: 'Plug', value: 'plug' },
                            { label: 'Support', value: 'support' },
                            { label: 'Workflow', value: 'workflow' },
                            { label: 'Chat', value: 'chat' },
                          ],
                          defaultValue: 'shield',
                          admin: { width: '40%' },
                        },
                      ],
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Closing CTA',
          fields: [
            {
              name: 'closing',
              type: 'group',
              fields: closingCtaGroupFields(),
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            seoFields({
              titleDefault: 'DXI AI | AI Interior Design',
              descriptionDefault:
                'AI-powered interior design — explore styles, visualise spaces, and create inspiring rooms with DXI AI.',
            }),
          ],
        },
      ],
    },
  ],
}
