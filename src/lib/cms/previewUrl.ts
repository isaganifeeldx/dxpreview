import type { GeneratePreviewURL } from 'payload'
import { getSiteUrl } from '@/lib/siteUrl'

/** Absolute frontend URL for Payload admin Preview (opens in a new tab). */
export function absolutePreviewUrl(path: string): string {
  const base = getSiteUrl()
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized === '/' ? '' : normalized}` || `${base}/`
}

/** Fixed path for a page global (Home, FAQ, etc.). */
export function pagePreview(path: string): GeneratePreviewURL {
  return () => absolutePreviewUrl(path)
}

/** Single article preview — requires a slug. */
export const articlePreview: GeneratePreviewURL = (doc) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug.trim() : ''
  if (!slug) return null
  return absolutePreviewUrl(`/articles/${slug}`)
}

/** Single user guide preview — requires a slug. */
export const userGuidePreview: GeneratePreviewURL = (doc) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug.trim() : ''
  if (!slug) return null
  return absolutePreviewUrl(`/user-guide/${slug}`)
}

/** Single tutorial course preview — requires a slug. */
export const tutorialCoursePreview: GeneratePreviewURL = (doc) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug.trim() : ''
  if (!slug) return null
  return absolutePreviewUrl(`/tutorial/${slug}`)
}

/** Single inspiration preview — requires a slug. */
export const inspirationPreview: GeneratePreviewURL = (doc) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug.trim() : ''
  if (!slug) return null
  return absolutePreviewUrl(`/inspiration/${slug}`)
}
