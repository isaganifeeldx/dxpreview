import { emptySeoData } from '@/lib/seo/types'
import type { InspirationItem, InspirationModel } from './types'

const decor =
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80'
const vase =
  'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80'
const chair =
  'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=400&q=80'
const lamp =
  'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80'
const rug =
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80'
const plant =
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80'
const table =
  'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=400&q=80'
const curtain =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80'
const art =
  'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80'
const basket =
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=80'
const ottoman =
  'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=400&q=80'
const shelf =
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80'
const mirror =
  'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=400&q=80'
const pillow =
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=400&q=80'
const bowl =
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=400&q=80'
const clock =
  'https://images.unsplash.com/photo-1616628188859-7a11abb6fcc9?auto=format&fit=crop&w=400&q=80'
const candle =
  'https://images.unsplash.com/photo-1551298370-9d3d53740c72?auto=format&fit=crop&w=400&q=80'

export const inspirationModelsIntro =
  'Click, drag, and drop your room model. Build entirely in our 3D editor — create your own for free.'

export const inspirationCtaDefaults = {
  label: 'Try DX Interior',
  href: '/login',
}

const modelTemplates: Omit<InspirationModel, 'id'>[] = [
  { title: 'Coastal Table Decor Dream', image: vase, imageAlt: 'Decorative vase 3D model' },
  { title: 'Elegant Floral Curtain 3D Model', image: curtain, imageAlt: 'Floral curtain 3D model' },
  { title: 'Modern Wall Art Frame', image: art, imageAlt: 'Wall art frame 3D model' },
  { title: 'Sculptural Console Table', image: table, imageAlt: 'Console table 3D model' },
  { title: 'Woven Accent Ottoman', image: ottoman, imageAlt: 'Accent ottoman 3D model' },
  { title: 'Statement Floor Lamp', image: lamp, imageAlt: 'Floor lamp 3D model' },
  { title: 'Handwoven Storage Basket', image: basket, imageAlt: 'Storage basket 3D model' },
  { title: 'Lounge Accent Chair', image: chair, imageAlt: 'Accent chair 3D model' },
  { title: 'Layered Area Rug', image: rug, imageAlt: 'Area rug 3D model' },
  { title: 'Potted Indoor Plant', image: plant, imageAlt: 'Indoor plant 3D model' },
  { title: 'Floating Display Shelf', image: shelf, imageAlt: 'Display shelf 3D model' },
  { title: 'Arched Wall Mirror', image: mirror, imageAlt: 'Wall mirror 3D model' },
  { title: 'Textured Throw Pillow Set', image: pillow, imageAlt: 'Throw pillow set 3D model' },
  { title: 'Ceramic Serving Bowl', image: bowl, imageAlt: 'Ceramic bowl 3D model' },
  { title: 'Minimal Wall Clock', image: clock, imageAlt: 'Wall clock 3D model' },
  { title: 'Ambient Candle Cluster', image: candle, imageAlt: 'Candle cluster 3D model' },
  { title: 'Styled Side Table Set', image: decor, imageAlt: 'Side table decor 3D model' },
  { title: 'Entry Console Styling', image: decor, imageAlt: 'Console styling 3D model' },
]

function buildModels(itemId: string): InspirationModel[] {
  return modelTemplates.map((template, index) => ({
    id: `${itemId}-model-${index + 1}`,
    ...template,
  }))
}

function buildOverview(item: Pick<InspirationItem, 'title' | 'category' | 'designStyle' | 'color'>, index: number) {
  const boardNumber = 240 + (index % 20)
  return `Inspired by Mood Board #${boardNumber}. The ${item.designStyle} Edit. This ${item.category.toLowerCase()} combines layered textures, ${item.color.toLowerCase()} tones, and considered furnishing to create a cohesive space you can customise in the 3D editor.`
}

type InspirationListItem = Omit<InspirationItem, 'models' | 'overview' | 'seo' | 'cta'>

export function enrichInspirationItem(item: InspirationListItem, index: number): InspirationItem {
  const models = buildModels(item.id)
  const overview = buildOverview(item, index)

  return {
    ...item,
    models,
    overview,
    cta: inspirationCtaDefaults,
    seo: emptySeoData({
      title: `${item.title} | DX Interiors Inspiration`,
      description: overview,
      focusKeyword: `${item.category.toLowerCase()} interior design`,
      keywords: `${item.title}, ${item.category}, ${item.designStyle}, interior design inspiration`,
      ogTitle: item.title,
      ogDescription: overview,
      ogImageUrl: item.image,
      twitterCard: 'summary_large_image',
      twitterTitle: item.title,
      twitterDescription: overview,
      twitterImageUrl: item.image,
    }),
  }
}
