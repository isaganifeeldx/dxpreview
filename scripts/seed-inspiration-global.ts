/**
 * Seed / refresh Inspiration Page global field content from built-in defaults.
 * Usage: node --require ./scripts/patch-next-env.cjs --import tsx scripts/seed-inspiration-global.ts
 */
import { config as loadDotenv } from 'dotenv'

loadDotenv({ path: '.env.local', quiet: true })
loadDotenv({ path: '.env', quiet: true })

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const { inspirationPageCmsFieldDefaults } = await import('../src/lib/inspiration/cmsFieldDefaults')

  const payload = await getPayload({ config })

  console.log('Writing Inspiration Page global field defaults…')

  await payload.updateGlobal({
    slug: 'inspiration-page',
    data: inspirationPageCmsFieldDefaults,
    depth: 0,
    overrideAccess: true,
  })

  const updated = await payload.findGlobal({ slug: 'inspiration-page', depth: 0 })
  console.log(
    `Done. hero.title="${updated?.hero?.title ?? ''}", modelsIntro="${(updated?.modelsIntro ?? '').slice(0, 40)}…"`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
