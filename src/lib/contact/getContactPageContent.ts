import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { getPayloadClient } from '@/lib/payload'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { contactPageDefaults } from './defaults'
import type { ContactPageContentData } from './types'

type CmsContact = {
  title?: string | null
  introduction?: string | null
  quickEnquiries?: {
    heading?: string | null
    content?: string | null
    phone?: string | null
    email?: string | null
  } | null
  seo?: CmsSeo
}

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

function mapContactFromCms(doc: CmsContact | null | undefined): ContactPageContentData {
  const defaults = contactPageDefaults
  if (!doc) return defaults

  return {
    banner: {
      title: text(doc.title, defaults.banner.title),
    },
    introduction: text(doc.introduction, defaults.introduction),
    quickEnquiries: {
      heading: text(doc.quickEnquiries?.heading, defaults.quickEnquiries.heading),
      content: text(doc.quickEnquiries?.content, defaults.quickEnquiries.content),
      phone: text(doc.quickEnquiries?.phone, defaults.quickEnquiries.phone),
      email: text(doc.quickEnquiries?.email, defaults.quickEnquiries.email),
    },
    seo: mapCmsSeo(doc.seo, defaults.seo),
  }
}

export async function getContactPageContent(): Promise<ContactPageContentData> {
  if (shouldSkipCmsAtBuild()) return contactPageDefaults

  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'contact',
      depth: 1,
    })) as CmsContact
    return mapContactFromCms(doc)
  } catch (error) {
    console.error('[contact] Failed to load Contact global from Payload — using defaults.', error)
    return contactPageDefaults
  }
}
