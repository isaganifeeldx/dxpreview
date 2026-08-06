import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles/getArticles'
import { getArticlesPageContent } from '@/lib/articles/getArticlesPageContent'
import { getContactPageContent } from '@/lib/contact/getContactPageContent'
import { getFaqPageContent } from '@/lib/faq/getFaqPageContent'
import { getHomePageContent } from '@/lib/home/getHomePageContent'
import { getPrivacyPageContent } from '@/lib/privacy/getPrivacyPageContent'
import { getTermsPageContent } from '@/lib/terms/getTermsPageContent'
import { getSiteUrl } from '@/lib/siteUrl'

/** Refresh sitemap at most once per hour so new published articles appear without a redeploy. */
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

  const [home, faq, contact, privacy, terms, articlesPage, articles] = await Promise.all([
    getHomePageContent(),
    getFaqPageContent(),
    getContactPageContent(),
    getPrivacyPageContent(),
    getTermsPageContent(),
    getArticlesPageContent(),
    getAllArticles(),
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
}
