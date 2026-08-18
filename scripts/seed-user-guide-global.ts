/**
 * Seed / refresh User Guide Page global field content from built-in defaults.
 * Usage: node --require ./scripts/patch-next-env.cjs --import tsx scripts/seed-user-guide-global.ts
 */
import { config as loadDotenv } from 'dotenv'

loadDotenv({ path: '.env.local', quiet: true })
loadDotenv({ path: '.env', quiet: true })

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const { userGuidePageCmsFieldDefaults } = await import('../src/lib/user-guide/cmsFieldDefaults')

  const payload = await getPayload({ config })

  console.log('Writing User Guide Page global field defaults…')

  await payload.updateGlobal({
    slug: 'user-guide-page',
    data: userGuidePageCmsFieldDefaults,
    depth: 0,
    overrideAccess: true,
  })

  const updated = await payload.findGlobal({ slug: 'user-guide-page', depth: 0 })
  console.log(
    `Done. hero.title="${updated?.hero?.title ?? ''}", closing.title="${updated?.closing?.title ?? ''}"`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
