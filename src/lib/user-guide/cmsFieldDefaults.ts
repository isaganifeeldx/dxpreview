import { userGuidePageDefaults } from './defaults'

/** Default field values for the User Guide Page global in Payload admin. */
export const userGuidePageCmsFieldDefaults = {
  hero: {
    title: userGuidePageDefaults.hero.title,
    description: userGuidePageDefaults.hero.description,
  },
  closing: {
    title: userGuidePageDefaults.closing.title,
    description: userGuidePageDefaults.closing.description,
    primaryCta: { ...userGuidePageDefaults.closing.primaryCta },
    secondaryCta: { ...userGuidePageDefaults.closing.secondaryCta },
  },
  seo: userGuidePageDefaults.seo,
}
