import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import {
  revalidateAbout,
  revalidateArticle,
  revalidateArticlesListing,
  revalidateBusiness,
  revalidateContact,
  revalidateFaq,
  revalidateHome,
  revalidatePricing,
  revalidatePrivacyPolicy,
  revalidateSiteSettings,
  revalidateTermsOfService,
  revalidateTutorial,
  revalidateTutorialCourse,
  revalidateUserGuide,
  revalidateUserGuideItem,
} from '@/lib/cms/revalidate'

function runSafe(label: string, fn: () => void) {
  try {
    fn()
  } catch (error) {
    console.error(`[cms] Failed to revalidate after ${label}:`, error)
  }
}

export const revalidateHomeGlobal: GlobalAfterChangeHook = () => {
  runSafe('home', revalidateHome)
}

export const revalidateFaqGlobal: GlobalAfterChangeHook = () => {
  runSafe('faq', revalidateFaq)
}

export const revalidateContactGlobal: GlobalAfterChangeHook = () => {
  runSafe('contact', revalidateContact)
}

export const revalidatePricingGlobal: GlobalAfterChangeHook = () => {
  runSafe('pricing', revalidatePricing)
}

export const revalidateBusinessGlobal: GlobalAfterChangeHook = () => {
  runSafe('business', revalidateBusiness)
}

export const revalidateAboutGlobal: GlobalAfterChangeHook = () => {
  runSafe('about', revalidateAbout)
}

export const revalidatePrivacyPolicyGlobal: GlobalAfterChangeHook = () => {
  runSafe('privacy-policy', revalidatePrivacyPolicy)
}

export const revalidateTermsOfServiceGlobal: GlobalAfterChangeHook = () => {
  runSafe('terms-of-service', revalidateTermsOfService)
}

export const revalidateArticlesPageGlobal: GlobalAfterChangeHook = () => {
  runSafe('articles-page', revalidateArticlesListing)
}

export const revalidateUserGuidePageGlobal: GlobalAfterChangeHook = () => {
  runSafe('user-guide-page', revalidateUserGuide)
}

export const revalidateTutorialPageGlobal: GlobalAfterChangeHook = () => {
  runSafe('tutorial-page', revalidateTutorial)
}

export const revalidateSettingsGlobal: GlobalAfterChangeHook = () => {
  runSafe('settings', revalidateSiteSettings)
}

export const revalidateArticleAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug : null
  runSafe(`article:${slug ?? 'unknown'}`, () => revalidateArticle(slug))
}

export const revalidateArticleAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug : null
  runSafe(`article-delete:${slug ?? 'unknown'}`, () => revalidateArticle(slug))
}

export const revalidateUserGuideAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug : null
  runSafe(`user-guide:${slug ?? 'unknown'}`, () => revalidateUserGuideItem(slug))
}

export const revalidateUserGuideAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug : null
  runSafe(`user-guide-delete:${slug ?? 'unknown'}`, () => revalidateUserGuideItem(slug))
}

export const revalidateTutorialCourseAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug : null
  runSafe(`tutorial-course:${slug ?? 'unknown'}`, () => revalidateTutorialCourse(slug))
}

export const revalidateTutorialCourseAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug : null
  runSafe(`tutorial-course-delete:${slug ?? 'unknown'}`, () => revalidateTutorialCourse(slug))
}
