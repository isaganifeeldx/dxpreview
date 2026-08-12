import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles/getArticles'
import { getArticlesPageContent } from '@/lib/articles/getArticlesPageContent'
import { getContactPageContent } from '@/lib/contact/getContactPageContent'
import { getFaqPageContent } from '@/lib/faq/getFaqPageContent'
import { getHomePageContent } from '@/lib/home/getHomePageContent'
import { getPrivacyPageContent } from '@/lib/privacy/getPrivacyPageContent'
import { getTermsPageContent } from '@/lib/terms/getTermsPageContent'
import { getPricingPageContent } from '@/lib/pricing/getPricingPageContent'
import { getSiteUrl } from '@/lib/siteUrl'

/**
 * Build sitemap at request time (not during `next build`).
 * Vercel build machines (often US) frequently cannot reach Neon (e.g. Sydney)
 * within the static-export window, which previously failed the whole deploy.
 */
export const dynamic = 'force-dynamic'

/** Soft cache for on-demand generations once the DB is reachable at runtime. */
export const revalidate = 3600

type SitemapEntry = MetadataRoute.Sitemap[number]

type StaticRoute = {
  path: string
  changeFrequency: SitemapEntry['changeFrequency']
  priority: number
  isIndexable: boolean
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const lastModified = new Date()

  try {
    const [home, faq, contact, privacy, terms, articlesPage, articles, pricing] = await Promise.all([
      getHomePageContent(),
      getFaqPageContent(),
      getContactPageContent(),
      getPrivacyPageContent(),
      getTermsPageContent(),
      getArticlesPageContent(),
      getAllArticles(),
      getPricingPageContent(),
    ])

    const staticRoutes: StaticRoute[] = [
      { path: '/', changeFrequency: 'weekly', priority: 1, isIndexable: !home.seo.noIndex },
      { path: '/faq', changeFrequency: 'monthly', priority: 0.7, isIndexable: !faq.seo.noIndex },
      {
        path: '/contact',
        changeFrequency: 'monthly',
        priority: 0.7,
        isIndexable: !contact.seo.noIndex,
      },
      {
        path: '/privacy-policy',
        changeFrequency: 'yearly',
        priority: 0.3,
        isIndexable: !privacy.seo.noIndex,
      },
      {
        path: '/terms-of-service',
        changeFrequency: 'yearly',
        priority: 0.3,
        isIndexable: !terms.seo.noIndex,
      },
      {
        path: '/articles',
        changeFrequency: 'weekly',
        priority: 0.8,
        isIndexable: !articlesPage.seo.noIndex,
      },
      {
        path: '/pricing',
        changeFrequency: 'monthly',
        priority: 0.8,
        isIndexable: !pricing.seo.noIndex,
      },
    ]

    const staticEntries = staticRoutes
      .filter((route) => route.isIndexable)
      .map((route) => ({
        url: `${siteUrl}${route.path === '/' ? '' : route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      }))

    const articleEntries = articles
      .filter((article) => !article.seo.noIndex)
      .map((article) => ({
        url: `${siteUrl}/articles/${article.slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))

    return [...staticEntries, ...articleEntries]
  } catch (error) {
    console.error('[sitemap] Failed to build CMS sitemap — returning core routes only.', error)
    return [
      { url: siteUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
      { url: `${siteUrl}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${siteUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${siteUrl}/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${siteUrl}/articles`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${siteUrl}/privacy-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
      { url: `${siteUrl}/terms-of-service`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    ]
  }
}
