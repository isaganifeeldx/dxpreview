import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import {
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

export const revalidatePrivacyPolicyGlobal: GlobalAfterChangeHook = () => {
  runSafe('privacy-policy', revalidatePrivacyPolicy)
}

export const revalidateTermsOfServiceGlobal: GlobalAfterChangeHook = () => {
  runSafe('terms-of-service', revalidateTermsOfService)
}

export const revalidateArticlesPageGlobal: GlobalAfterChangeHook = () => {
  runSafe('articles-page', revalidateArticlesListing)
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
