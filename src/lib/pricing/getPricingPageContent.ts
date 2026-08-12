import { pricingPageDefaults } from './defaults'
import type { PricingPageContentData } from './types'

export async function getPricingPageContent(): Promise<PricingPageContentData> {
  return pricingPageDefaults
}
