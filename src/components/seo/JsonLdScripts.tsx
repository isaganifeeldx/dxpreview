import { parseCustomJsonLd, serializeJsonLd } from '@/lib/seo/jsonLd'
import type { SeoData } from '@/lib/seo/types'

type JsonLdScriptsProps = {
  seo: SeoData
  /** Auto-generated schema for this page (Organization/WebSite/etc.). */
  defaultJsonLd?: Record<string, unknown> | null
}

/** Renders default + optional editor custom JSON-LD script tags. */
export default function JsonLdScripts({ seo, defaultJsonLd = null }: JsonLdScriptsProps) {
  const custom = parseCustomJsonLd(seo.customJsonLd)
  const showDefault = Boolean(defaultJsonLd) && !seo.replaceDefaultJsonLd

  return (
    <>
      {showDefault && defaultJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(defaultJsonLd) }}
        />
      ) : null}
      {custom ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(custom) }}
        />
      ) : null}
    </>
  )
}
