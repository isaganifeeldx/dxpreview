import type { Metadata } from 'next'
import { getSiteUrl } from '@/lib/siteUrl'
import type { SeoData } from './types'

function toAbsoluteUrl(urlOrPath: string, siteUrl: string): string {
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath
  return `${siteUrl}${urlOrPath.startsWith('/') ? '' : '/'}${urlOrPath}`
}

type BuildMetadataOptions = {
  seo: SeoData
  path: string
  fallbackTitle: string
  fallbackDescription: string
  fallbackImageUrl?: string | null
  siteName?: string
  locale?: string
  absoluteTitle?: boolean
}

export function buildMetadataFromSeo({
  seo,
  path,
  fallbackTitle,
  fallbackDescription,
  fallbackImageUrl = null,
  siteName = 'DXI AI',
  locale = 'en_AU',
  absoluteTitle = false,
}: BuildMetadataOptions): Metadata {
  const siteUrl = getSiteUrl()
  const title = seo.title || fallbackTitle
  const description = seo.description || fallbackDescription
  const canonical = seo.canonicalUrl
    ? toAbsoluteUrl(seo.canonicalUrl, siteUrl)
    : `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

  const ogTitle = seo.ogTitle || title
  const ogDescription = seo.ogDescription || description
  const ogImage = seo.ogImageUrl || fallbackImageUrl

  const twitterTitle = seo.twitterTitle || ogTitle
  const twitterDescription = seo.twitterDescription || ogDescription
  const twitterImage = seo.twitterImageUrl || ogImage

  const keywords = [
    seo.focusKeyword,
    ...seo.keywords
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  ].filter(Boolean)

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords.length > 0 ? { keywords } : {}),
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
      googleBot: {
        index: !seo.noIndex,
        follow: !seo.noFollow,
      },
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
      url: canonical,
      siteName,
      locale,
      ...(ogImage
        ? {
            images: [
              {
                url: toAbsoluteUrl(ogImage, siteUrl),
                alt: ogTitle,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: seo.twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      ...(twitterImage
        ? {
            images: [toAbsoluteUrl(twitterImage, siteUrl)],
          }
        : {}),
    },
  }
}
