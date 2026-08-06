import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

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

/** Convert Lexical rich text (or HTML string) to HTML for article bodies. */
export function resolveRichTextHtml(
  value: unknown,
  fallbackHtml = '',
): string {
  if (isLexicalState(value) && !isEmptyLexical(value)) {
    return convertLexicalToHTML({ data: value })
  }

  if (typeof value === 'string' && value.trim()) {
    return value.trim()
  }

  return fallbackHtml
}
