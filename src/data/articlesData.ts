export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
}

/** Static article list used as CMS fallback when no articles are published. */
export const articles: ArticleItem[] = [
  {
    id: '1',
    slug: 'designing-spaces-that-feel-like-home',
    title: 'Designing Spaces That Feel Like Home',
    excerpt:
      'How thoughtful material choices, lighting, and spatial flow turn empty rooms into places people actually want to live in — before a single finish is ordered.',
    category: 'Design',
    date: 'July 18, 2026',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Bright modern living room with natural light',
    featured: true,
  },
  {
    id: '2',
    slug: 'ai-interior-design-what-actually-changes',
    title: 'AI Interior Design: What Actually Changes',
    excerpt:
      'Beyond pretty renders — how AI helps homeowners and designers compare finishes, test layouts, and make confident decisions earlier in the project.',
    category: 'Product',
    date: 'July 12, 2026',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Contemporary living room interior',
  },
  {
    id: '3',
    slug: 'five-ways-to-visualise-your-kitchen-before-you-build',
    title: 'Five Ways to Visualise Your Kitchen Before You Build',
    excerpt:
      'From mood boards to immersive walkthroughs — practical ways to lock in cabinetry, stone, and lighting before costly changes on site.',
    category: 'Guides',
    date: 'July 4, 2026',
    image:
      'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern kitchen with wood cabinetry',
  },
  {
    id: '4',
    slug: 'material-selection-without-the-guesswork',
    title: 'Material Selection Without the Guesswork',
    excerpt:
      'See real tiles, stone, and textiles in context so clients stop imagining how finishes might look — and start choosing with certainty.',
    category: 'Insights',
    date: 'June 28, 2026',
    image:
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Bedroom with soft neutral finishes',
  },
  {
    id: '5',
    slug: 'from-floorplan-to-first-walkthrough',
    title: 'From Floorplan to First Walk through',
    excerpt:
      'A simple path for architects and homeowners: start with drawings, add real products, and step inside the design before construction begins.',
    category: 'Workflow',
    date: 'June 20, 2026',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Open plan living and dining space',
  },
  {
    id: '6',
    slug: 'why-clients-say-yes-faster-with-3d',
    title: 'Why Clients Say Yes Faster With 3D',
    excerpt:
      'Clear visuals reduce hesitation. When everyone sees the same space, approvals move quicker and revision cycles shrink.',
    category: 'Business',
    date: 'June 11, 2026',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Luxury living room with large windows',
  },
  {
    id: '7',
    slug: 'small-spaces-big-decisions',
    title: 'Small Spaces, Big Decisions',
    excerpt:
      'Compact apartments leave little room for mistakes. Here’s how visualisation helps you test scale, storage, and light before you commit.',
    category: 'Design',
    date: 'June 2, 2026',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Compact modern apartment interior',
  },
  {
    id: '8',
    slug: 'working-with-suppliers-inside-the-model',
    title: 'Working With Suppliers Inside the Model',
    excerpt:
      'Connect real products to your design so selections stay accurate — from lead times to finishes — across every stakeholder review.',
    category: 'Product',
    date: 'May 24, 2026',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Styled living room with furniture and finishes',
  },
  {
    id: '9',
    slug: 'lighting-that-transforms-every-room',
    title: 'Lighting That Transforms Every Room',
    excerpt:
      'Daylight, task lighting, and ambient layers change how a space feels. Explore options virtually before wiring and fittings go in.',
    category: 'Guides',
    date: 'May 15, 2026',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Interior with warm ambient lighting',
  },
  {
    id: '10',
    slug: 'a-calmer-path-from-brief-to-build',
    title: 'A Calmer Path From Brief to Build',
    excerpt:
      'Fewer surprises on site start with clearer decisions early. Here’s how teams use immersive design to keep projects on track.',
    category: 'Insights',
    date: 'May 6, 2026',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern house exterior and interior glimpse',
  },
];

export const getFeaturedArticle = () =>
  articles.find((article) => article.featured) ?? articles[0];

export const getArticleGridItems = () =>
  articles.filter((article) => !article.featured);

export const articleCategories = Array.from(
  new Set(articles.map((article) => article.category)),
);

export const getRecentArticles = (excludeSlug?: string, limit = 3) =>
  articles.filter((article) => article.slug !== excludeSlug).slice(0, limit);
