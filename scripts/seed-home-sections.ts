/**
 * Seed Home Page testimonials, features, and closing CTA from built-in defaults.
 * Usage: node --require ./scripts/patch-next-env.cjs --import tsx scripts/seed-home-sections.ts
 */
import { config as loadDotenv } from 'dotenv'

loadDotenv({ path: '.env.local', quiet: true })
loadDotenv({ path: '.env', quiet: true })

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const { homePageDefaults } = await import('../src/lib/home/defaults')

  const payload = await getPayload({ config })

  const data = {
    testimonials: {
      title: homePageDefaults.testimonials.title,
      items: homePageDefaults.testimonials.items.map((item) => ({
        itemId: item.id,
        quote: item.quote,
        role: item.role,
        company: item.company,
      })),
    },
    features: {
      eyebrow: homePageDefaults.features.eyebrow,
      title: homePageDefaults.features.title,
      items: homePageDefaults.features.items.map((item) => ({
        itemId: item.id,
        icon: item.icon,
        title: item.title,
        description: item.description,
      })),
    },
    closing: {
      title: homePageDefaults.closing.title,
      primaryCtaLabel: homePageDefaults.closing.primaryCta.label,
      primaryCtaHref: homePageDefaults.closing.primaryCta.href,
      secondaryCtaLabel: homePageDefaults.closing.secondaryCta.label,
      secondaryCtaHref: homePageDefaults.closing.secondaryCta.href,
    },
  }

  await payload.updateGlobal({
    slug: 'home',
    data,
    depth: 0,
    overrideAccess: true,
  })

  const updated = await payload.findGlobal({ slug: 'home', depth: 0 })
  console.log(
    `Done. testimonials=${Array.isArray(updated?.testimonials?.items) ? updated.testimonials.items.length : 0}, ` +
      `features=${Array.isArray(updated?.features?.items) ? updated.features.items.length : 0}, ` +
      `closing="${updated?.closing?.title ?? ''}"`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
