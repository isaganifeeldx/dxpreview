export type ArticleTocItem = {
  id: string
  text: string
  /** Heading level 2–6 */
  level: 2 | 3 | 4 | 5 | 6
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function slugifyHeading(text: string): string {
  const base = text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

  return base || 'section'
}

/**
 * Collect H2–H6 from article HTML, inject stable ids, return TOC + updated HTML.
 */
export function buildArticleToc(contentHtml: string): {
  contentHtml: string
  toc: ArticleTocItem[]
} {
  const toc: ArticleTocItem[] = []
  const usedIds = new Map<string, number>()

  const contentWithIds = contentHtml.replace(
    /<(h[2-6])(\s[^>]*)?>([\s\S]*?)<\/\1>/gi,
    (full, tag: string, attrs = '', inner: string) => {
      const level = Number(tag.slice(1)) as 2 | 3 | 4 | 5 | 6
      const text = stripTags(inner)
      if (!text) return full

      let id = slugifyHeading(text)
      const count = usedIds.get(id) ?? 0
      usedIds.set(id, count + 1)
      if (count > 0) id = `${id}-${count + 1}`

      toc.push({ id, text, level })

      const attrsWithoutId = String(attrs).replace(/\s*\bid\s*=\s*(["']).*?\1/i, '')
      return `<${tag}${attrsWithoutId} id="${id}">${inner}</${tag}>`
    },
  )

  return { contentHtml: contentWithIds, toc }
}
