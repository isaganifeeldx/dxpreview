import { businessPageDefaults } from '@/lib/business/defaults'
import { emptySeoData } from '@/lib/seo/types'
import type { InteriorsPageContentData } from './types'

export const interiorsPageDefaults: InteriorsPageContentData = {
  hero: {
    eyebrow: 'DX Interiors',
    title: 'Design stunning spaces in minutes, not days',
    description:
      'Generate photorealistic room concepts, instant mood boards, and optimal furniture layouts in seconds. DX Interiors handles the heavy lifting of ideation so you can focus on the art of design.',
    primaryCta: { label: 'Start for free', href: '/login' },
    secondaryCta: { label: 'Request a demo', href: '/contact' },
  },
  capabilityPills: {
    eyebrow: 'Powered by generative AI',
    items: [
      {
        id: 'surface',
        title: 'Surface Swap',
        subtitle: 'One-click material changes',
        iconTone: 'blue',
      },
      {
        id: 'cleanup',
        title: 'Scene Clean-Up',
        subtitle: 'Remove objects instantly',
        iconTone: 'slate',
      },
      {
        id: 'staging',
        title: 'Object Staging',
        subtitle: 'Add furniture from catalogue',
        iconTone: 'lavender',
      },
      {
        id: 'renders',
        title: 'Renders',
        subtitle: 'Photorealistic outputs',
        iconTone: 'warm',
      },
      {
        id: 'style',
        title: 'Style Discovery',
        subtitle: 'Explore design directions',
        iconTone: 'neutral',
      },
    ],
  },
  splitFeatures: [
    {
      id: 'context',
      eyebrow: 'Full room context',
      title: 'Full context from every photo, automatically',
      description:
        'Upload a single room photo and DX Interiors detects walls, floors, furniture, and lighting — giving you a complete editable scene without manual masking or tracing.',
      bullets: [
        'Automatic object detection across walls, floors, and fixtures',
        'Preserve room proportions and camera perspective',
        'Swap materials while keeping lighting and shadows intact',
        'Connect supplier catalogues directly to detected objects',
      ],
      imageSrc: '/images/landing/appview.jpg',
      imageAlt: 'DX Interiors room context detection interface',
      imagePosition: 'right',
    },
    {
      id: 'refine',
      eyebrow: 'Refine & iterate',
      title: 'Refine your designs with targeted AI suggestions',
      description:
        'Get instant feedback on layout, palette, and scale. Iterate through variations in real time until the concept matches your client brief.',
      bullets: [
        'Generate multiple style directions from one prompt',
        'Adjust furniture scale and placement with precision controls',
        'Compare before-and-after renders side by side',
        'Export presentation-ready boards for client meetings',
      ],
      imageSrc: '/images/landing/render-2.jpg',
      imageAlt: 'DX Interiors design refinement preview',
      imagePosition: 'left',
    },
  ],
  capabilityGrid: {
    title: 'A complete suite for every stage of interior design',
    subtitle:
      'From first concept to client-ready presentation — every tool your studio needs in one platform.',
    items: [
      {
        id: 'style-discovery',
        title: 'Style Discovery',
        description: 'Explore curated palettes and room directions from a single prompt.',
        imageSrc: '/images/landing/render-1.jpg',
        imageAlt: 'Style discovery preview',
        tone: 'rose',
        span: 'wide',
      },
      {
        id: 'room-concepts',
        title: 'Room Concepts',
        description: 'Generate full room layouts with furniture, lighting, and finishes.',
        imageSrc: '/images/landing/render-2.jpg',
        imageAlt: 'Room concept preview',
        tone: 'purple',
        span: 'normal',
      },
      {
        id: 'material-matching',
        title: 'Material Matching',
        description: 'Swap surfaces and textures while preserving room geometry.',
        imageSrc: '/images/landing/render-3.jpg',
        imageAlt: 'Material matching preview',
        tone: 'coral',
        span: 'normal',
      },
      {
        id: 'object-staging',
        title: 'Object Staging',
        description: 'Stage furniture from supplier catalogues with true-to-scale placement.',
        imageSrc: '/images/landing/appview.jpg',
        imageAlt: 'Object staging preview',
        tone: 'charcoal',
        span: 'normal',
      },
      {
        id: 'lighting-scenes',
        title: 'Lighting Scenes',
        description: 'Preview day, dusk, and accent lighting in photoreal quality.',
        imageSrc: '/images/landing/render-4.jpg',
        imageAlt: 'Lighting scene preview',
        tone: 'indigo',
        span: 'normal',
      },
      {
        id: 'mood-boards',
        title: 'Mood Boards',
        description: 'Build client-ready boards with renders, swatches, and notes.',
        imageSrc: '/images/landing/render-1.jpg',
        imageAlt: 'Mood board preview',
        tone: 'violet',
        span: 'wide',
      },
      {
        id: 'renders',
        title: 'Photoreal Renders',
        description: 'High-resolution outputs for presentations, sales suites, and client sign-off.',
        imageSrc: '/images/landing/render-2.jpg',
        imageAlt: 'Photoreal render preview',
        tone: 'magenta',
        span: 'normal',
      },
      {
        id: 'walkthroughs',
        title: 'Walkthroughs',
        description: 'Cinematic flythroughs for sales suites and client presentations.',
        imageSrc: '/images/landing/render-3.jpg',
        imageAlt: 'Walkthrough preview',
        tone: 'lavender',
        span: 'normal',
      },
      {
        id: 'custom-presets',
        title: 'Custom Presets',
        description: 'Save your studio styles, room templates, and presentation layouts.',
        imageSrc: '',
        imageAlt: '',
        tone: 'sunset',
        span: 'normal',
        variant: 'custom',
      },
    ],
    footerLink: { label: 'Browse all capabilities', href: '/login' },
  },
  comparison: {
    title: 'The old way vs. DX Interiors',
    subtitle: 'Stop wasting hours on manual visualisation and start designing at the speed of ideas.',
    oldWay: {
      title: 'The old way',
      items: [
        'Days waiting for 3D renders from external studios',
        'Manual Photoshop masking for every material swap',
        'Scattered mood boards across Pinterest and spreadsheets',
        'Expensive revisions every time the brief changes',
        'No way to test furniture scale before ordering',
      ],
    },
    newWay: {
      title: 'The DX Interiors way',
      items: [
        'Photorealistic concepts in under five minutes',
        'One-click surface and furniture swaps on any photo',
        'Unified boards with renders, notes, and supplier links',
        'Unlimited iterations at no extra cost per revision',
        'True-to-scale staging from real supplier catalogues',
      ],
    },
  },
  stats: [
    { value: '16h/wk', label: 'Time saved per designer' },
    { value: '120K+', label: 'Images rendered' },
    { value: '< 5 min', label: 'To first concept' },
    { value: '5,000+', label: 'Designers & studios' },
  ],
  featuredQuote: {
    quote:
      'We present client-ready boards in the same meeting we capture the room. DX Interiors replaced a week of visualisation wait time.',
    role: 'Design director',
    company: 'National interior studio',
  },
  testimonials: businessPageDefaults.testimonials,
  features: businessPageDefaults.features,
  closing: {
    title: 'Start designing better spaces today.',
    primaryCta: { label: 'Start for free', href: '/login' },
    secondaryCta: { label: 'Request a demo', href: '/contact' },
    showSecondaryCta: true,
  },
  seo: emptySeoData({
    title: 'DX Interiors | AI Interior Design Platform',
    description:
      'Design stunning interior spaces in minutes with DX Interiors — photorealistic renders, mood boards, material swaps, and supplier staging powered by generative AI.',
    focusKeyword: 'AI interior design platform',
    keywords:
      'DX Interiors, AI interior design, room visualisation, mood boards, interior design software',
    ogTitle: 'DX Interiors | AI Interior Design Platform',
    ogDescription:
      'Generate photorealistic room concepts, mood boards, and furniture layouts in seconds with DX Interiors.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'DX Interiors | AI Interior Design Platform',
    twitterDescription:
      'Generate photorealistic room concepts, mood boards, and furniture layouts in seconds with DX Interiors.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}
