import type { Field } from 'payload'

export const featureIconOptions = [
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
] as const

export const businessFeatureCardFields: Field[] = [
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
        options: [...featureIconOptions],
        defaultValue: 'shield',
        admin: {
          width: '40%',
          description: 'Built-in glyph when no custom icon is uploaded.',
        },
      },
    ],
  },
  {
    name: 'iconImage',
    type: 'upload',
    relationTo: 'media',
    label: 'Custom icon',
    admin: {
      description: 'Upload SVG (preferred) or PNG. Overrides the built-in glyph when set.',
    },
  },
  {
    name: 'iconAlt',
    type: 'text',
    label: 'Icon alt text',
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
  },
]
