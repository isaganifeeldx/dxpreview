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

export function revalidatePricing() {
  revalidatePath('/plans')
  revalidatePath('/pages/pricing')
  revalidatePath('/sitemap.xml')
}

export function revalidateBusiness() {
  revalidatePublicAndPages('/business')
  revalidatePath('/sitemap.xml')
}

export function revalidateAbout() {
  revalidatePublicAndPages('/about')
  revalidatePath('/sitemap.xml')
}

export function revalidateUserGuide() {
  revalidatePublicAndPages('/user-guide')
  revalidatePath('/sitemap.xml')
}

export function revalidateUserGuideItem(slug?: string | null) {
  revalidateUserGuide()
  if (slug?.trim()) {
    revalidatePublicAndPages(`/user-guide/${slug.trim()}`)
  }
}

export function revalidateTutorial() {
  revalidatePublicAndPages('/tutorial')
  revalidatePath('/sitemap.xml')
}

export function revalidateTutorialCourse(slug?: string | null) {
  revalidateTutorial()
  if (slug?.trim()) {
    revalidatePublicAndPages(`/tutorial/${slug.trim()}`)
  }
}

export function revalidateInspiration(slug?: string) {
  revalidatePublicAndPages('/inspiration')
  if (slug?.trim()) {
    revalidatePublicAndPages(`/inspiration/${slug.trim()}`)
  }
  revalidatePath('/sitemap.xml')
}

export function revalidateDxInteriors() {
  revalidatePublicAndPages('/product/dx-interiors')
  revalidatePath('/sitemap.xml')
}

export function revalidateSpaceSense() {
  revalidatePublicAndPages('/product/spacesense-ai')
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

/** Header/footer live in the frontend layout — invalidate the whole tree. */
export function revalidateSiteSettings() {
  revalidatePath('/', 'layout')
  revalidatePath('/pages/home', 'layout')
  revalidatePath('/faq')
  revalidatePath('/contact')
  revalidatePath('/plans')
  revalidatePath('/business')
  revalidatePath('/about')
  revalidatePath('/user-guide')
  revalidatePath('/tutorial')
  revalidatePath('/inspiration')
  revalidatePath('/product/dx-interiors')
  revalidatePath('/product/spacesense-ai')
  revalidatePath('/articles')
  revalidatePath('/privacy-policy')
  revalidatePath('/terms-of-service')
  revalidatePath('/sitemap.xml')
}
