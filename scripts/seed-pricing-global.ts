/**
 * Seed / refresh Pricing Page global field content from built-in defaults.
 * Usage: node --require ./scripts/patch-next-env.cjs --import tsx scripts/seed-pricing-global.ts
 */
import { config as loadDotenv } from 'dotenv'

loadDotenv({ path: '.env.local', quiet: true })
loadDotenv({ path: '.env', quiet: true })

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const { pricingCmsFieldDefaults } = await import('../src/lib/pricing/cmsFieldDefaults')

  const payload = await getPayload({ config })

  const existing = await payload.findGlobal({ slug: 'pricing', depth: 0 })
  const planCount = Array.isArray(existing?.plans) ? existing.plans.length : 0
  console.log(`Pricing global currently has ${planCount} plan(s). Writing field defaults…`)

  await payload.updateGlobal({
    slug: 'pricing',
    data: pricingCmsFieldDefaults,
    depth: 0,
    overrideAccess: true,
  })

  const updated = await payload.findGlobal({ slug: 'pricing', depth: 0 })
  console.log(
    `Done. plans=${Array.isArray(updated?.plans) ? updated.plans.length : 0}, ` +
      `faq=${Array.isArray(updated?.faq?.items) ? updated.faq.items.length : 0}, ` +
      `comparison categories=${Array.isArray(updated?.comparison?.categories) ? updated.comparison.categories.length : 0}`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
