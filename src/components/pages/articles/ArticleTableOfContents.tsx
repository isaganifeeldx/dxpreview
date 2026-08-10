'use client'

import type { ArticleTocItem } from '@/lib/articles/buildArticleToc'

type ArticleTableOfContentsProps = {
  items: ArticleTocItem[]
}

export default function ArticleTableOfContents({ items }: ArticleTableOfContentsProps) {
  if (items.length === 0) return null

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // Keep URL shareable without jumping the page again.
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <nav
      aria-label="Table of contents"
      className="mt-6 rounded-[14px] border border-[#E6E8EC] bg-[#F8F9FB] px-4 py-4 sm:mt-8 sm:px-5 sm:py-5"
    >
      <p className="lao-mn text-[14px] tracking-[0.08em] text-[#6A758C] uppercase">
        Table of contents
      </p>
      <ol className="mt-3 columns-1 gap-x-6 space-y-1.5 sm:mt-4 sm:columns-2 sm:space-y-2">
        {items.map((item) => {
          // H2 = highest (least indent); H3–H6 step in.
          const indentRem = (item.level - 2) * 0.85
          return (
            <li
              key={item.id}
              className="break-inside-avoid"
              style={{ paddingLeft: `${indentRem}rem` }}
            >
              <button
                type="button"
                onClick={() => scrollToHeading(item.id)}
                className="text-left text-[13px] leading-snug text-[#2A3040] transition-colors hover:text-[#6A758C] sm:text-[14px]"
              >
                {item.text}
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
