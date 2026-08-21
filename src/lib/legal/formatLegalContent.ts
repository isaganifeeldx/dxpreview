import { formatLegalPlainTextToHtml } from '@/lib/legal/formatLegalPlainText'
import { sanitizeCmsHtml } from '@/lib/sanitize/sanitizeCmsHtml'

const HTML_CONTENT_PATTERN = /<\s*(p|h[1-6]|ul|ol|li|div|br|strong|em|a|span)\b/i

export const isLegalHtmlContent = (value: string) => HTML_CONTENT_PATTERN.test(value)

const normalizeLegalWysiwygHtml = (html: string) => {
  let normalized = html
    .replace(/\sdata-[a-z0-9-]+="[^"]*"/gi, '')
    .replace(/\sdata-[a-z0-9-]+='[^']*'/gi, '')
    .replace(/https?:\/\/(?:stagewp\.)?dxliving\.com\//gi, '/')
    .replace(/https?:\/\/(?:www\.)?dxliving\.com\//gi, '/')
    .replace(
      /href="https?:\/\/(?:stagewp\.)?dxliving\.com\/privacy-policy\/?"/gi,
      'href="/privacy-policy"',
    )

  if (!/\blegal-content\b/.test(normalized)) {
    normalized = `<div class="legal-content">${normalized}</div>`
  }

  return sanitizeCmsHtml(normalized)
}

/** Format legal content — HTML or plain-text fallback. */
export const formatLegalContent = (
  raw: string,
  options: { linkPrivacyPolicy?: boolean } = {},
) => {
  const trimmed = raw.trim()
  if (!trimmed) {
    return '<div class="legal-content"></div>'
  }

  if (isLegalHtmlContent(trimmed)) {
    return normalizeLegalWysiwygHtml(trimmed)
  }

  return sanitizeCmsHtml(formatLegalPlainTextToHtml(trimmed, options))
}

export const prepareLegalContentHtml = (
  raw: string,
  options: { linkPrivacyPolicy?: boolean } = {},
) => formatLegalContent(raw, options)
