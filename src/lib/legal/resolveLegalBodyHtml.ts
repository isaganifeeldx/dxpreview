import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { prepareLegalContentHtml } from '@/lib/legal/formatLegalContent'

function isLexicalState(value: unknown): value is SerializedEditorState {
  return (
    typeof value === 'object' &&
    value !== null &&
    'root' in value &&
    typeof (value as { root?: unknown }).root === 'object'
  )
}

function isEmptyLexical(data: SerializedEditorState): boolean {
  const children = data.root?.children
  if (!Array.isArray(children) || children.length === 0) return true

  const plain = convertLexicalToHTML({ data })
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()

  return plain.length === 0
}

/**
 * Resolve CMS Terms body (Lexical rich text, HTML string, or plain text) to
 * legal-page HTML ready for rendering.
 */
export function resolveLegalBodyHtml(
  cmsBody: unknown,
  fallbackPlainOrHtml: string,
  options: { linkPrivacyPolicy?: boolean } = {},
): string {
  if (isLexicalState(cmsBody) && !isEmptyLexical(cmsBody)) {
    const html = convertLexicalToHTML({ data: cmsBody })
    return prepareLegalContentHtml(html, options)
  }

  if (typeof cmsBody === 'string' && cmsBody.trim()) {
    return prepareLegalContentHtml(cmsBody, options)
  }

  return prepareLegalContentHtml(fallbackPlainOrHtml, options)
}
