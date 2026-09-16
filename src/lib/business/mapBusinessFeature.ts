import { getMediaUrl } from '@/lib/media'
import type { BusinessFeature, BusinessFeatureIcon } from './types'

type CmsMedia = {
  url?: string | null
} | null

export type CmsBusinessFeatureItem = {
  itemId?: string | null
  icon?: string | null
  iconImage?: number | CmsMedia
  iconAlt?: string | null
  title?: string | null
  description?: string | null
}

const FEATURE_ICONS: BusinessFeatureIcon[] = [
  'shield',
  'lock',
  'spark',
  'users',
  'template',
  'globe',
  'encrypt',
  'chart',
  'plug',
  'support',
  'workflow',
  'chat',
]

function optionalText(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function toFeatureIcon(
  value: string | null | undefined,
  fallback: BusinessFeatureIcon = 'shield',
): BusinessFeatureIcon {
  if (value && FEATURE_ICONS.includes(value as BusinessFeatureIcon)) {
    return value as BusinessFeatureIcon
  }
  return fallback
}

export function mapBusinessFeatureItem(
  item: CmsBusinessFeatureItem | null | undefined,
  fallback?: BusinessFeature,
): BusinessFeature | null {
  const title = item?.title?.trim()
  const description = item?.description?.trim()
  if (!title || !description) return null

  const iconSrc = getMediaUrl(item?.iconImage) ?? fallback?.iconSrc ?? ''

  return {
    id: optionalText(item?.itemId) || fallback?.id || slugify(title),
    icon: toFeatureIcon(item?.icon, fallback?.icon ?? 'shield'),
    ...(iconSrc ? { iconSrc, iconAlt: text(item?.iconAlt, fallback?.iconAlt ?? `${title} icon`) } : {}),
    title,
    description,
  }
}
