/**
 * Seed / refresh Business Page global field content from built-in defaults.
 * Usage: node --require ./scripts/patch-next-env.cjs --import tsx scripts/seed-business-global.ts
 */
import { config as loadDotenv } from 'dotenv'

loadDotenv({ path: '.env.local', quiet: true })
loadDotenv({ path: '.env', quiet: true })

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const { businessCmsFieldDefaults } = await import('../src/lib/business/cmsFieldDefaults')

  const payload = await getPayload({ config })

  const existing = await payload.findGlobal({ slug: 'business', depth: 0 })
  const featureCount = Array.isArray(existing?.features?.items) ? existing.features.items.length : 0
  console.log(`Business global currently has ${featureCount} feature(s). Writing field defaults…`)

  await payload.updateGlobal({
    slug: 'business',
    data: businessCmsFieldDefaults,
    depth: 0,
    overrideAccess: true,
  })

  const updated = await payload.findGlobal({ slug: 'business', depth: 0 })
  console.log(
    `Done. stats=${Array.isArray(updated?.hero?.stats) ? updated.hero.stats.length : 0}, ` +
      `testimonials=${Array.isArray(updated?.testimonials?.items) ? updated.testimonials.items.length : 0}, ` +
      `features=${Array.isArray(updated?.features?.items) ? updated.features.items.length : 0}`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
