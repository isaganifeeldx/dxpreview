import sanitizeHtml from 'sanitize-html'

/** Safe subset for Lexical/CMS body HTML rendered via dangerouslySetInnerHTML. */
const CMS_BODY_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'img',
    'figure',
    'figcaption',
    'picture',
    'source',
    'table',
    'thead',
    'tbody',
    'tfoot',
    'tr',
    'th',
    'td',
    'colgroup',
    'col',
    'hr',
    'blockquote',
    'pre',
    'code',
    'span',
    'div',
    'section',
    'iframe',
  ],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: ['href', 'name', 'target', 'rel', 'class', 'title'],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'class', 'loading'],
    source: ['src', 'srcset', 'type', 'media'],
    td: ['colspan', 'rowspan', 'class'],
    th: ['colspan', 'rowspan', 'class', 'scope'],
    col: ['span', 'class'],
    iframe: ['src', 'title', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'loading', 'class'],
    '*': ['class', 'id'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: {
    img: ['http', 'https', 'data'],
  },
  allowProtocolRelative: false,
  allowedIframeHostnames: [
    'www.youtube.com',
    'youtube.com',
    'www.youtube-nocookie.com',
    'player.vimeo.com',
  ],
  transformTags: {
    a: (tagName, attribs) => {
      const next = { ...attribs }
      if (next.target === '_blank') {
        const rel = new Set((next.rel || '').split(/\s+/).filter(Boolean))
        rel.add('noopener')
        rel.add('noreferrer')
        next.rel = Array.from(rel).join(' ')
      }
      return { tagName, attribs: next }
    },
  },
}

/**
 * Sanitize CMS / Lexical HTML for safe rendering in the browser.
 * Strips scripts, event handlers, and dangerous URLs.
 */
export function sanitizeCmsHtml(html: string): string {
  if (!html?.trim()) return ''
  return sanitizeHtml(html, CMS_BODY_OPTIONS)
}
