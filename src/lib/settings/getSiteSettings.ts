import { getPayloadClient } from '@/lib/payload'
import { siteSettingsDefaults, type MenuLink, type SiteSettingsData } from './defaults'

type CmsLink = { label?: string | null; href?: string | null } | null

type CmsSettings = {
  header?: {
    navLinks?: CmsLink[] | null
    resourcesLabel?: string | null
    resourceLinks?: CmsLink[] | null
    loginLabel?: string | null
    loginHref?: string | null
    demoLabel?: string | null
    demoHref?: string | null
    startFreeLabel?: string | null
    startFreeHref?: string | null
  } | null
  footer?: {
    linkColumnTitle?: string | null
    linkColumn?: CmsLink[] | null
    resourcesColumnTitle?: string | null
    resourcesColumn?: CmsLink[] | null
    companyColumnTitle?: string | null
    companyColumn?: CmsLink[] | null
    contact?: {
      email?: string | null
      phone?: string | null
      phoneHref?: string | null
      location?: string | null
    } | null
    social?: Array<{
      platform?: 'facebook' | 'linkedin' | 'instagram' | 'youtube' | null
      href?: string | null
    } | null> | null
    legalLinks?: CmsLink[] | null
    copyright?: string | null
  } | null
}

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

function mapLinks(rows: CmsLink[] | null | undefined, fallback: MenuLink[]): MenuLink[] {
  const mapped =
    rows
      ?.map((row) => {
        const label = row?.label?.trim()
        const href = row?.href?.trim()
        if (!label || !href) return null
        return { label, href }
      })
      .filter((row): row is MenuLink => Boolean(row)) ?? []

  return mapped.length > 0 ? mapped : fallback
}

function mapSettings(doc: CmsSettings | null | undefined): SiteSettingsData {
  const defaults = siteSettingsDefaults
  if (!doc) return defaults

  const social =
    doc.footer?.social
      ?.map((item) => {
        const platform = item?.platform
        const href = item?.href?.trim()
        if (!platform || !href) return null
        return { platform, href }
      })
      .filter(
        (
          item,
        ): item is {
          platform: 'facebook' | 'linkedin' | 'instagram' | 'youtube'
          href: string
        } => Boolean(item),
      ) ?? []

  return {
    header: {
      navLinks: mapLinks(doc.header?.navLinks, defaults.header.navLinks),
      resourcesLabel: text(doc.header?.resourcesLabel, defaults.header.resourcesLabel),
      resourceLinks: mapLinks(doc.header?.resourceLinks, defaults.header.resourceLinks),
      login: {
        label: text(doc.header?.loginLabel, defaults.header.login.label),
        href: text(doc.header?.loginHref, defaults.header.login.href),
      },
      demo: {
        label: text(doc.header?.demoLabel, defaults.header.demo.label),
        href: text(doc.header?.demoHref, defaults.header.demo.href),
      },
      startFree: {
        label: text(doc.header?.startFreeLabel, defaults.header.startFree.label),
        href: text(doc.header?.startFreeHref, defaults.header.startFree.href),
      },
    },
    footer: {
      linkColumnTitle: text(doc.footer?.linkColumnTitle, defaults.footer.linkColumnTitle),
      linkColumn: mapLinks(doc.footer?.linkColumn, defaults.footer.linkColumn),
      resourcesColumnTitle: text(
        doc.footer?.resourcesColumnTitle,
        defaults.footer.resourcesColumnTitle,
      ),
      resourcesColumn: mapLinks(doc.footer?.resourcesColumn, defaults.footer.resourcesColumn),
      companyColumnTitle: text(
        doc.footer?.companyColumnTitle,
        defaults.footer.companyColumnTitle,
      ),
      companyColumn: mapLinks(doc.footer?.companyColumn, defaults.footer.companyColumn),
      contact: {
        email: text(doc.footer?.contact?.email, defaults.footer.contact.email),
        phone: text(doc.footer?.contact?.phone, defaults.footer.contact.phone),
        phoneHref: text(doc.footer?.contact?.phoneHref, defaults.footer.contact.phoneHref),
        location: text(doc.footer?.contact?.location, defaults.footer.contact.location),
      },
      social: social.length > 0 ? social : defaults.footer.social,
      legalLinks: mapLinks(doc.footer?.legalLinks, defaults.footer.legalLinks),
      copyright: text(doc.footer?.copyright, defaults.footer.copyright),
    },
  }
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'settings',
      depth: 0,
    })) as CmsSettings
    return mapSettings(doc)
  } catch (error) {
    console.error('[settings] Failed to load Settings global — using defaults.', error)
    return siteSettingsDefaults
  }
}
