/**
 * Seed / refresh About Page global field content from built-in defaults.
 * Usage: node --require ./scripts/patch-next-env.cjs --import tsx scripts/seed-about-global.ts
 */
import { config as loadDotenv } from 'dotenv'

loadDotenv({ path: '.env.local', quiet: true })
loadDotenv({ path: '.env', quiet: true })

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const { aboutCmsFieldDefaults } = await import('../src/lib/about/cmsFieldDefaults')

  const payload = await getPayload({ config })

  const existing = await payload.findGlobal({ slug: 'about', depth: 0 })
  const voiceCount = Array.isArray(existing?.voices?.items) ? existing.voices.items.length : 0
  console.log(`About global currently has ${voiceCount} voice(s). Writing field defaults…`)

  await payload.updateGlobal({
    slug: 'about',
    data: aboutCmsFieldDefaults,
    depth: 0,
    overrideAccess: true,
  })

  const updated = await payload.findGlobal({ slug: 'about', depth: 0 })
  console.log(
    `Done. heroImages=${Array.isArray(updated?.hero?.images) ? updated.hero.images.length : 0}, ` +
      `locations=${Array.isArray(updated?.locations?.items) ? updated.locations.items.length : 0}, ` +
      `voices=${Array.isArray(updated?.voices?.items) ? updated.voices.items.length : 0}, ` +
      `perks=${Array.isArray(updated?.perks?.items) ? updated.perks.items.length : 0}`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
