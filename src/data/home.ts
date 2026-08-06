export const homeContent = {
  hero: {
    title: 'AI interior design, made effortless',
    description:
      'Transform any room with intelligent style suggestions and photoreal visuals — from first idea to a space you can feel.',
    cta: { label: 'Start designing', href: '/#create' },
    image: {
      src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      alt: 'Bright modern living room with soft neutrals and natural light',
    },
  },
  howItWorks: {
    title: 'Design your space in four simple steps',
    steps: [
      {
        number: '01',
        title: 'Upload your room',
        description: 'Start with a photo of your space or a blank canvas to explore ideas.',
      },
      {
        number: '02',
        title: 'Choose a style',
        description: 'Browse curated interiors — modern, warm minimal, coastal, and more.',
      },
      {
        number: '03',
        title: 'Generate designs',
        description: 'Let AI craft photoreal options tailored to your room and preferences.',
      },
      {
        number: '04',
        title: 'Refine and save',
        description: 'Fine-tune details, compare looks, and keep the designs you love.',
      },
    ],
  },
  discover: {
    title: 'Discover & inspire',
    description:
      'Explore styles that fit how you live — then bring them into your own rooms with a single click.',
    cta: { label: 'Explore styles', href: '/#gallery' },
    image: {
      src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
      alt: 'Contemporary living room with layered textures and daylight',
    },
  },
  gallery: {
    title: 'Inspiring interiors to explore',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
        alt: 'Minimal living room with beige sofa',
      },
      {
        src: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80',
        alt: 'Soft modern bedroom with linen bedding',
      },
      {
        src: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=800&q=80',
        alt: 'Bright kitchen with light timber cabinetry',
      },
      {
        src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        alt: 'Open-plan home with garden views',
      },
      {
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        alt: 'Dining space with sculptural lighting',
      },
      {
        src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
        alt: 'Lounge with fireplace and textured seating',
      },
      {
        src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?auto=format&fit=crop&w=800&q=80',
        alt: 'Modern bathroom with stone finishes',
      },
      {
        src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=800&q=80',
        alt: 'Sunlit living area with arched windows',
      },
    ],
  },
  create: {
    title: 'Ready to create your next space?',
    description:
      'From mood to material — generate interiors that feel considered, personal, and ready to share.',
    cta: { label: 'Get started', href: '/#create' },
    image: {
      src: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1400&q=80',
      alt: 'Stylish living room corner with armchair and soft light',
    },
  },
} as const;
