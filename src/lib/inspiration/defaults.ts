import { emptySeoData } from '@/lib/seo/types'
import { enrichInspirationItem, inspirationModelsIntro } from './inspirationDetailDefaults'
import type { InspirationPageContentData } from './types'

const living =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
const contemporary =
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
const openPlan =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
const kitchen =
  'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=800&q=80'
const bedroom =
  'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80'
const dining =
  'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80'
const bathroom =
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80'
const outdoor =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
const office =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
const kids =
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80'
const commercial =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80'
const laundry =
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80'
const entertainment =
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
const styled =
  'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80'
const apartment =
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
const timber =
  'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=800&q=80'
const house =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
const furnished =
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
const moodboard =
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80'

function item(
  id: string,
  slug: string,
  title: string,
  category: string,
  image: string,
  imageAlt: string,
) {
  return { id, slug, title, category, image, imageAlt }
}

export const inspirationDesignStyles = [
  'Modern',
  'Scandinavian',
  'Minimal',
  'Industrial',
  'Classic',
  'Coastal',
]

export const inspirationColors = [
  'Neutral',
  'Warm',
  'Cool',
  'Bold',
  'Earth tones',
  'Monochrome',
]

export const inspirationSortOptions = ['Latest', 'Oldest']

export const inspirationCategories = [
  'Living Room',
  'Others',
  'Bedroom',
  'Dining Room',
  'Kitchen',
  'Bathroom',
  'Outdoor',
  'Home Office',
  'More Rooms',
  "Children's Room",
  'Commercial Spaces',
  'Utility Laundry',
  'Entertainment Room',
]

export const inspirationItems = [
  item('1', 'warm-living-room', 'Warm living room with layered textures', 'Living Room', living, 'Bright living room with neutral sofa and soft lighting'),
  item('2', 'contemporary-lounge', 'Contemporary lounge with open plan flow', 'Living Room', contemporary, 'Contemporary living room with open shelving'),
  item('3', 'minimal-bedroom', 'Minimal bedroom with timber accents', 'Bedroom', bedroom, 'Bedroom with timber headboard and soft linens'),
  item('4', 'open-kitchen', 'Open kitchen with stone island', 'Kitchen', kitchen, 'Modern kitchen with stone island and pendant lights'),
  item('5', 'family-dining', 'Family dining with natural light', 'Dining Room', styled, 'Dining room with wooden table and pendant lighting'),
  item('6', 'spa-bathroom', 'Spa-style bathroom with stone finishes', 'Bathroom', bathroom, 'Contemporary bathroom with stone vanity'),
  item('7', 'outdoor-terrace', 'Outdoor terrace with lounge seating', 'Outdoor', outdoor, 'Outdoor patio with modern furniture'),
  item('8', 'home-office', 'Home office with built-in storage', 'Home Office', office, 'Home office with desk and shelving'),
  item('9', 'kids-playroom', 'Kids room with playful colour accents', "Children's Room", kids, 'Children\'s bedroom with colourful decor'),
  item('10', 'commercial-lobby', 'Commercial lobby with statement lighting', 'Commercial Spaces', commercial, 'Modern commercial lobby interior'),
  item('11', 'utility-laundry', 'Utility laundry with clean cabinetry', 'Utility Laundry', laundry, 'Laundry room with white cabinetry'),
  item('12', 'media-room', 'Entertainment room with media wall', 'Entertainment Room', entertainment, 'Living room configured as media space'),
  item('13', 'open-plan-living', 'Open-plan living and dining', 'More Rooms', openPlan, 'Open-plan interior connecting living and dining'),
  item('14', 'styled-lounge', 'Styled lounge with art and plants', 'Others', styled, 'Styled living room with artwork'),
  item('15', 'compact-apartment', 'Compact apartment living layout', 'Others', apartment, 'Compact apartment living area'),
  item('16', 'timber-bedroom', 'Timber-accent bedroom retreat', 'Bedroom', timber, 'Bedroom with timber feature wall'),
  item('17', 'modern-house', 'Modern house interior overview', 'Outdoor', house, 'Modern house with indoor-outdoor connection'),
  item('18', 'furnished-living', 'Furnished living room refresh', 'Living Room', furnished, 'Fully furnished contemporary living room'),
  item('19', 'design-mood', 'Design mood board corner', 'Others', moodboard, 'Interior design mood board setup'),
  item('20', 'kitchen-breakfast', 'Kitchen breakfast nook', 'Kitchen', bathroom, 'Kitchen with breakfast nook seating'),
  item('21', 'guest-bedroom', 'Guest bedroom with calm palette', 'Bedroom', bedroom, 'Guest bedroom with neutral tones'),
  item('22', 'formal-dining', 'Formal dining with statement chairs', 'Dining Room', dining, 'Formal dining room setting'),
  item('23', 'powder-room', 'Powder room with bold tile', 'Bathroom', bathroom, 'Small powder room interior'),
  item('24', 'garden-lounge', 'Garden lounge with outdoor kitchen', 'Outdoor', outdoor, 'Outdoor lounge with greenery'),
  item('25', 'studio-office', 'Studio office with dual monitors', 'Home Office', office, 'Compact home office setup'),
  item('26', 'nursery', 'Nursery with soft neutral tones', "Children's Room", kids, 'Nursery room interior'),
  item('27', 'retail-space', 'Retail space with display shelving', 'Commercial Spaces', commercial, 'Commercial retail interior'),
  item('28', 'mudroom', 'Mudroom with storage bench', 'Utility Laundry', laundry, 'Entry mudroom with storage'),
  item('29', 'game-room', 'Game room with sectional seating', 'Entertainment Room', entertainment, 'Entertainment room with sectional sofa'),
  item('30', 'reading-nook', 'Reading nook in a quiet corner', 'More Rooms', styled, 'Cozy reading nook by the window'),
  item('31', 'scandi-living', 'Scandi living with light wood floors', 'Living Room', contemporary, 'Scandinavian-style living room'),
  item('32', 'chef-kitchen', 'Chef kitchen with professional appliances', 'Kitchen', kitchen, 'Large kitchen with professional range'),
  item('33', 'ensuite-suite', 'Ensuite suite with walk-in shower', 'Bathroom', bathroom, 'Master ensuite bathroom'),
  item('34', 'balcony-retreat', 'Balcony retreat with planters', 'Outdoor', house, 'Balcony with outdoor seating'),
  item('35', 'library-wall', 'Library wall in home office', 'Home Office', office, 'Home office with floor-to-ceiling books'),
  item('36', 'teen-bedroom', 'Teen bedroom with study zone', "Children's Room", kids, 'Teen bedroom with desk area'),
  item('37', 'hotel-lobby', 'Hotel lobby inspiration', 'Commercial Spaces', commercial, 'Hotel lobby interior design'),
  item('38', 'pantry-storage', 'Pantry storage with labelled jars', 'Utility Laundry', laundry, 'Organised pantry storage'),
  item('39', 'home-theatre', 'Home theatre with tiered seating', 'Entertainment Room', entertainment, 'Dedicated home theatre room'),
  item('40', 'hallway-gallery', 'Hallway gallery wall display', 'More Rooms', moodboard, 'Hallway with framed art gallery'),
].map((entry, index) =>
  enrichInspirationItem(
    {
      ...entry,
      designStyle: inspirationDesignStyles[index % inspirationDesignStyles.length],
      color: inspirationColors[index % inspirationColors.length],
    },
    index,
  ),
)

export const inspirationPageDefaults: InspirationPageContentData = {
  hero: {
    title: 'Inspiring Home Design Ideas For Every Room',
    description:
      'Free home design templates for every space: bedrooms, living rooms, kitchens, & more',
  },
  searchPlaceholder: 'Search spaces…',
  allSpacesLabel: 'All Spaces',
  modelsIntro: inspirationModelsIntro,
  categories: inspirationCategories,
  designStyles: inspirationDesignStyles,
  colors: inspirationColors,
  sortOptions: inspirationSortOptions,
  items: inspirationItems,
  seo: emptySeoData({
    title: 'Inspiration | DX Interiors',
    description:
      'Browse interior design inspiration for every room — living rooms, bedrooms, kitchens, bathrooms, and more.',
    focusKeyword: 'interior design inspiration',
    keywords:
      'interior design inspiration, home design ideas, room templates, DX Interiors inspiration',
    ogTitle: 'Inspiration | DX Interiors',
    ogDescription:
      'Free home design inspiration for every space — bedrooms, living rooms, kitchens, and more.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Inspiration | DX Interiors',
    twitterDescription:
      'Free home design inspiration for every space — bedrooms, living rooms, kitchens, and more.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}
