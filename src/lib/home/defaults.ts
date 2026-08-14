import type { HomePageContentData } from './types'
import { emptySeoData } from '@/lib/seo/types'
import { businessPageDefaults } from '@/lib/business/defaults'

const DEFAULT_PROCESS_IMAGE = '/images/landing/appview.jpg'
const DEFAULT_NUMBER_ICONS = [
  '/images/landing/1.svg',
  '/images/landing/2.svg',
  '/images/landing/3.svg',
  '/images/landing/4.svg',
] as const

export const homePageDefaults: HomePageContentData = {
  hero: {
    lineOne: 'Your Complete',
    title: 'Interior Design Studio',
    description:
      'Generate photorealistic room concepts, instant mood boards, and optimal furniture in seconds. DX Interiors handles the heavy lifting of ideation so you can focus on the art of design.',
    features: [
      { label: 'Smart Surface & Material Swapping' },
      { label: 'Seamless Scene Clean-Up' },
      { label: 'Intelligent Object Staging' },
      { label: 'Renders & Flythroughs' },
    ],
    primaryCta: { label: 'Start For Free', href: '#' },
    secondaryCta: { label: 'Request a Demo', href: '/contact' },
    videoId: 'H8t3cI9bm-Zo',
  },
  trust: {
    intro: 'Trusted by 5,000+ interior designers, homeowners and architects.',
    stats: [
      { value: '30K+', label: 'Projects Created' },
      { value: '120K+', label: 'Images Rendered' },
      { value: '16h/wk', label: 'Time Saved' },
      { value: '4.8★', label: 'Avg Rating' },
    ],
  },
  process: {
    title: 'How to design your space online for free',
    cards: [
      {
        title: 'Start with a picture of your space',
        description:
          'Upload a picture of your space or take a new photo of the area you want to design.',
        imageSrc: DEFAULT_PROCESS_IMAGE,
        numberIcon: DEFAULT_NUMBER_ICONS[0],
        numberSide: 'right',
      },
      {
        title: 'Detect interior objects automatically using AI',
        description:
          'The AI system automatically detects multiple object types in your picture, allowing you to select, focus on, modify, or remove any of them.',
        imageSrc: DEFAULT_PROCESS_IMAGE,
        numberIcon: DEFAULT_NUMBER_ICONS[1],
        numberSide: 'left',
      },
      {
        title: 'Adding new furniture to your space',
        description:
          'You can add new furniture to your space by uploading a picture, selecting from curated collections, or browsing through suppliers using our DX DB database.',
        imageSrc: DEFAULT_PROCESS_IMAGE,
        numberIcon: DEFAULT_NUMBER_ICONS[2],
        numberSide: 'right',
      },
      {
        title: 'Effortless space visualisation with AI precision & presets',
        description:
          'Visualize your space instantly with accurate multi-angle, hyper-realistic AI rendering, industry-standard presets, and real-time lifelike design previews.',
        imageSrc: DEFAULT_PROCESS_IMAGE,
        numberIcon: DEFAULT_NUMBER_ICONS[3],
        numberSide: 'left',
      },
    ],
  },
  discover: {
    title: 'Discover & Define',
    description:
      'We dive deep into your business, goals, and challenges to identify where AI can create the most impact.',
    cta: { label: 'Getting Started', href: '/login' },
    videoId: 'H8t3cI9bm-Zo',
  },
  gallery: {
    title: 'Inspiring interior design ideas for every room!',
    images: [
      { alt: 'Modern exterior render', src: '/images/landing/render-1.jpg', grow: 2 },
      { alt: 'Residential street render', src: '/images/landing/render-2.jpg', grow: 3 },
      { alt: 'Contemporary home render', src: '/images/landing/render-3.jpg', grow: 2 },
      { alt: 'Apartment building render', src: '/images/landing/render-4.jpg', grow: 3 },
      { alt: 'Modern exterior render', src: '/images/landing/render-1.jpg', grow: 3 },
      { alt: 'Residential street render', src: '/images/landing/render-2.jpg', grow: 2 },
      { alt: 'Contemporary home render', src: '/images/landing/render-3.jpg', grow: 2 },
      { alt: 'Apartment building render', src: '/images/landing/render-4.jpg', grow: 3 },
      { alt: 'Modern exterior render', src: '/images/landing/render-1.jpg', grow: 2 },
      { alt: 'Residential street render', src: '/images/landing/render-2.jpg', grow: 2 },
      { alt: 'Contemporary home render', src: '/images/landing/render-3.jpg', grow: 3 },
      { alt: 'Apartment building render', src: '/images/landing/render-4.jpg', grow: 2 },
    ],
  },
  lessons: {
    title: 'Master Interior Design in 7 Free Lessons - Start Anytime',
    description:
      'Become a professional interior design expert and bring your creative ideas to life with our powerful design platform.',
    cta: { label: "Watch beginner's guide video", href: '/login' },
    videoId: 'H8t3cI9bm-Zo',
  },
  testimonials: businessPageDefaults.testimonials,
  features: businessPageDefaults.features,
  closing: {
    ...businessPageDefaults.closing,
    primaryCta: { label: 'Schedule a demo', href: '/business' },
  },
  seo: emptySeoData({
    title: 'DXI AI | AI Interior Design',
    description:
      'AI-powered interior design — explore styles, visualise spaces, and create inspiring rooms with DXI AI.',
    focusKeyword: 'AI interior design',
    keywords: 'interior design AI, virtual room design, AI home design, DX Interiors',
    ogTitle: 'DXI AI | AI Interior Design',
    ogDescription:
      'Generate photorealistic room concepts, mood boards, and furniture layouts in seconds with DX Interiors.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'DXI AI | AI Interior Design',
    twitterDescription:
      'Generate photorealistic room concepts, mood boards, and furniture layouts in seconds with DX Interiors.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}

export { DEFAULT_NUMBER_ICONS, DEFAULT_PROCESS_IMAGE }
