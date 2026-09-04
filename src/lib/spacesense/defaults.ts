import { emptySeoData } from '@/lib/seo/types'
import type { SpaceSensePageContentData } from './types'

export const spaceSensePageDefaults: SpaceSensePageContentData = {
  hero: {
    eyebrow: 'SpaceSense AI',
    title: 'Advanced spatial intelligence for every room',
    description:
      'Turn photos and floor plans into precise room dimensions, layout insights, and furniture-fit recommendations — powered by AI built for interior design workflows.',
    primaryCta: { label: 'Try SpaceSense AI', href: '/login' },
    imageSrc: '/images/landing/spacesense-hero.png',
    imageAlt: 'Modern living room with sectional sofa — SpaceSense AI spatial analysis',
  },
  models: {
    title: 'Spatial AI models for precise room understanding',
    subtitle:
      'Choose the right model for scanning, measuring, staging validation, or layout optimisation — all inside the DX Interiors platform.',
    cta: { label: 'Start creating', href: '/login' },
    sidebarTitle: 'Spatial AI Models',
    items: [
      {
        id: 'style-discovery',
        name: 'Style Discovery',
        description:
          'Warm contemporary living room, centered sofa, layered #linentextiles and soft daylight through tall windows.',
        cta: { label: 'Generate', href: '/login' },
        imageSrc: '/images/landing/render-1.jpg',
        imageAlt: 'Photoreal interior style discovery preview',
      },
      {
        id: 'room-concepts',
        name: 'Room Concepts',
        description:
          'Open-plan kitchen and dining, matte black fixtures, oak island, #minimalpalette with soft pendant lighting.',
        cta: { label: 'Generate', href: '/login' },
        imageSrc: '/images/landing/render-2.jpg',
        imageAlt: 'AI-generated room concept preview',
      },
      {
        id: 'material-matching',
        name: 'Material Matching',
        description:
          'Bedroom suite with brushed brass accents, #travertine surfaces, and muted sage drapery for a calm evening mood.',
        cta: { label: 'Generate', href: '/login' },
        imageSrc: '/images/landing/render-3.jpg',
        imageAlt: 'Material matching interior preview',
      },
      {
        id: 'lighting-scenes',
        name: 'Lighting Scenes',
        description:
          'Night-time lounge, recessed cove lighting, amber lamps, and a #statementchair beside the window.',
        cta: { label: 'Generate', href: '/login' },
        imageSrc: '/images/landing/render-4.jpg',
        imageAlt: 'Lighting scene interior preview',
      },
      {
        id: 'walkthroughs',
        name: 'Walkthroughs',
        badge: 'Soon',
        description:
          'Cinematic walkthrough through a sunlit apartment, slow camera path from foyer into the living room.',
        cta: { label: 'Generate', href: '/login' },
        imageSrc: '/images/landing/appview.jpg',
        imageAlt: 'Coming soon walkthrough preview',
      },
    ],
  },
  whatIs: {
    title: 'What is SpaceSense AI?',
    description:
      'SpaceSense AI reads your room photos and plans to understand scale, structure, and usable space. It gives designers and homeowners the spatial context they need before styling, specifying, or presenting — without manual measuring or tracing.',
    cta: { label: 'Try SpaceSense AI', href: '/login' },
    imageSrc: '/images/landing/render-2.jpg',
    imageAlt: 'SpaceSense AI room analysis example',
    promptPreview: 'Analyse living room layout and suggest optimal sofa placement…',
  },
  howTo: {
    title: 'How to generate spatially accurate room insights',
    cta: { label: 'Start creating', href: '/login' },
    steps: [
      {
        id: 'step-1',
        step: '01',
        title: 'Open the DX Interiors toolkit',
        description: 'Upload a room photo or floor plan to begin spatial analysis.',
        imageSrc: '/images/landing/appview.jpg',
        imageAlt: 'DX Interiors toolkit',
      },
      {
        id: 'step-2',
        step: '02',
        title: 'Choose your SpaceSense model',
        description: 'Select scanning, dimension extraction, or layout optimisation for your brief.',
        imageSrc: '/images/landing/render-1.jpg',
        imageAlt: 'Choose SpaceSense model',
      },
      {
        id: 'step-3',
        step: '03',
        title: 'Generate and refine your results',
        description: 'Review dimensions, layouts, and fit checks — then export to your design workflow.',
        imageSrc: '/images/landing/render-4.jpg',
        imageAlt: 'Generate spatial results',
      },
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        id: 'what-is',
        question: 'What is SpaceSense AI?',
        answer:
          'SpaceSense AI is DX Interiors’ spatial intelligence layer. It analyses room photos and plans to extract dimensions, detect structural elements, and help you validate layouts and furniture fit before you design or specify.',
      },
      {
        id: 'accuracy',
        question: 'How accurate are the room measurements?',
        answer:
          'Accuracy depends on photo quality and camera angle. For best results, capture straight-on shots with reference objects or known dimensions. SpaceSense improves estimates with multiple angles and calibration prompts.',
      },
      {
        id: 'formats',
        question: 'What file types can I upload?',
        answer:
          'You can upload JPG and PNG room photos, plus PDF or image-based floor plans. Exported results can be used alongside DX Interiors renders, mood boards, and supplier staging.',
      },
      {
        id: 'plans',
        question: 'Is SpaceSense AI included in my plan?',
        answer:
          'Core spatial scanning is available on free and paid plans with usage limits. Advanced layout optimisation and fit validation are included on Pro and Business tiers.',
      },
      {
        id: 'privacy',
        question: 'Is my room data kept private?',
        answer:
          'Yes. Your uploads are processed securely and are not used to train public models without consent. Business customers can request additional data residency options.',
      },
    ],
  },
  closing: {
    title: 'Start designing with spatial confidence.',
    primaryCta: { label: 'Try SpaceSense AI', href: '/login' },
    secondaryCta: { label: 'Request a demo', href: '/contact' },
    showSecondaryCta: true,
  },
  seo: emptySeoData({
    title: 'SpaceSense AI | Spatial Intelligence for Interior Design',
    description:
      'SpaceSense AI turns room photos and floor plans into precise dimensions, layout insights, and furniture-fit recommendations for interior designers and homeowners.',
    focusKeyword: 'spatial AI interior design',
    keywords:
      'SpaceSense AI, room measurement AI, floor plan analysis, interior spatial intelligence, DX Interiors',
    ogTitle: 'SpaceSense AI | Spatial Intelligence for Interior Design',
    ogDescription:
      'Turn photos and floor plans into precise room dimensions and layout insights with SpaceSense AI.',
    ogImageUrl: '/images/landing/spacesense-hero.png',
    twitterCard: 'summary_large_image',
    twitterTitle: 'SpaceSense AI | Spatial Intelligence for Interior Design',
    twitterDescription:
      'Turn photos and floor plans into precise room dimensions and layout insights with SpaceSense AI.',
    twitterImageUrl: '/images/landing/spacesense-hero.png',
  }),
}
