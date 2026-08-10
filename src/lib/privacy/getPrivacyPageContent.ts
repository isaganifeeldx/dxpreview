import { shouldSkipCmsAtBuild } from '@/lib/cms/buildTime'
import { getPayloadClient } from '@/lib/payload'
import { mapCmsSeo, type CmsSeo } from '@/lib/seo/mapCmsSeo'
import { privacyPageDefaults } from './defaults'
import type { PrivacyPageContentData } from './types'

type CmsPrivacy = {
  title?: string | null
  body?: unknown
  seo?: CmsSeo
}

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

function mapPrivacyFromCms(doc: CmsPrivacy | null | undefined): PrivacyPageContentData {
  const defaults = privacyPageDefaults
  if (!doc) return defaults

  return {
    title: text(doc.title, defaults.title),
    body: doc.body ?? defaults.body,
    seo: mapCmsSeo(doc.seo, defaults.seo),
  }
}

export async function getPrivacyPageContent(): Promise<PrivacyPageContentData> {
  if (shouldSkipCmsAtBuild()) return privacyPageDefaults

  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({
      slug: 'privacy-policy',
      depth: 1,
    })) as CmsPrivacy
    return mapPrivacyFromCms(doc)
  } catch (error) {
    console.error(
      '[privacy] Failed to load Privacy Policy global from Payload — using defaults.',
      error,
    )
    return privacyPageDefaults
  }
}
