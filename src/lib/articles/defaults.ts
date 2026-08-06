import { articles as staticArticles } from '@/data/articlesData'
import { emptySeoData } from '@/lib/seo/types'
import type { ArticleItem, ArticlesPageContentData } from './types'

const PLACEHOLDER_BODY = `<p>This is placeholder article content for the DX Interiors articles section. Full editorial copy can replace this later — the layout and routing are ready for real stories.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor elit ut diam sagittis, sit amet egestas ex mollis. Pellentesque congue, magna ac dapibus eleifend, purus massa rutrum diam, ut malesuada dui ipsum ut massa.</p>
<p>Maecenas porttitor auctor congue. Donec ut nunc eros. Proin a orci nisl. Pellentesque tempus, est eget mattis sodales, tortor ex egestas diam, quis lacinia ligula erat at odio.</p>`

export function toFallbackArticleItem(
  article: (typeof staticArticles)[number],
): ArticleItem {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    date: article.date,
    image: article.image,
    imageAlt: article.imageAlt,
    featured: article.featured,
    contentHtml: PLACEHOLDER_BODY,
    seo: emptySeoData({
      title: `${article.title} | DX Interiors`,
      description: article.excerpt,
      ogTitle: article.title,
      ogDescription: article.excerpt,
      ogImageUrl: article.image,
      twitterCard: 'summary_large_image',
      twitterTitle: article.title,
      twitterDescription: article.excerpt,
      twitterImageUrl: article.image,
    }),
  }
}

export const articlesPageDefaults: ArticlesPageContentData = {
  heading: 'Articles',
  searchPlaceholder: 'Search Articles',
  articles: staticArticles.map(toFallbackArticleItem),
  seo: emptySeoData({
    title: 'Articles | DX Interiors',
    description:
      'Ideas, guides, and insights on interior design, visualisation, and creating spaces that feel like home.',
    focusKeyword: 'interior design articles',
    keywords: 'interior design tips, visualisation guides, DX Interiors blog',
    ogTitle: 'Articles | DX Interiors',
    ogDescription:
      'Ideas, guides, and insights on interior design, visualisation, and creating spaces that feel like home.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Articles | DX Interiors',
    twitterDescription:
      'Ideas, guides, and insights on interior design, visualisation, and creating spaces that feel like home.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}

export { PLACEHOLDER_BODY }
