/**
 * Seed / refresh Tutorial Page global field content from built-in defaults.
 * Usage: node --require ./scripts/patch-next-env.cjs --import tsx scripts/seed-tutorial-global.ts
 */
import { config as loadDotenv } from 'dotenv'

loadDotenv({ path: '.env.local', quiet: true })
loadDotenv({ path: '.env', quiet: true })

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const { tutorialPageCmsFieldDefaults } = await import('../src/lib/tutorial/cmsFieldDefaults')

  const payload = await getPayload({ config })

  console.log('Writing Tutorial Page global field defaults…')

  await payload.updateGlobal({
    slug: 'tutorial-page',
    data: tutorialPageCmsFieldDefaults,
    depth: 0,
    overrideAccess: true,
  })

  const updated = await payload.findGlobal({ slug: 'tutorial-page', depth: 0 })
  console.log(
    `Done. hero.title="${updated?.hero?.title ?? ''}", videosHeading="${updated?.videosHeading ?? ''}"`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
