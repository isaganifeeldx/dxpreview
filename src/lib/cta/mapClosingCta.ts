import { pageClosingCtaDefaults, type PageClosingCtaData } from './defaults'

export type CmsClosingCta = {
  title?: string | null
  primaryCtaLabel?: string | null
  primaryCtaHref?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaHref?: string | null
  showSecondaryCta?: boolean | null
} | null | undefined

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

export function mapClosingCta(
  doc: CmsClosingCta,
  defaults: PageClosingCtaData = pageClosingCtaDefaults,
): PageClosingCtaData {
  if (!doc) return defaults

  return {
    title: text(doc.title, defaults.title),
    primaryCta: {
      label: text(doc.primaryCtaLabel, defaults.primaryCta.label),
      href: text(doc.primaryCtaHref, defaults.primaryCta.href),
    },
    secondaryCta: {
      label: text(doc.secondaryCtaLabel, defaults.secondaryCta.label),
      href: text(doc.secondaryCtaHref, defaults.secondaryCta.href),
    },
    showSecondaryCta: doc.showSecondaryCta ?? defaults.showSecondaryCta,
  }
}
