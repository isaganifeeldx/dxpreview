import { revalidatePath } from 'next/cache'

/** Public URL + App Router path (rewrites map public → /pages/...). */
function revalidatePublicAndPages(publicPath: string) {
  const pagesPath =
    publicPath === '/' ? '/pages/home' : `/pages${publicPath}`

  revalidatePath(publicPath)
  revalidatePath(pagesPath)
}

export function revalidateHome() {
  revalidatePublicAndPages('/')
  revalidatePath('/sitemap.xml')
}

export function revalidateFaq() {
  revalidatePublicAndPages('/faq')
  revalidatePath('/sitemap.xml')
}

export function revalidateContact() {
  revalidatePublicAndPages('/contact')
  revalidatePath('/sitemap.xml')
}

export function revalidatePrivacyPolicy() {
  revalidatePublicAndPages('/privacy-policy')
  revalidatePath('/sitemap.xml')
}

export function revalidateTermsOfService() {
  revalidatePublicAndPages('/terms-of-service')
  revalidatePath('/sitemap.xml')
}

export function revalidateArticlesListing() {
  revalidatePublicAndPages('/articles')
  revalidatePath('/sitemap.xml')
}

export function revalidateArticle(slug?: string | null) {
  revalidateArticlesListing()
  if (slug?.trim()) {
    revalidatePublicAndPages(`/articles/${slug.trim()}`)
  }
}
