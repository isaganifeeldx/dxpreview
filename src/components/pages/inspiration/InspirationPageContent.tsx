'use client'

import { useEffect, useMemo, useState } from 'react'
import type { InspirationFilters, InspirationPageContentData } from '@/lib/inspiration/types'
import InspirationCard from './InspirationCard'
import InspirationFilterDropdowns from './InspirationFilterDropdowns'
import InspirationFilterPanel from './InspirationFilterPanel'

const siteGradient =
  'radial-gradient(1200px 520px at 12% -10%, rgba(174,200,255,0.45), transparent 60%), radial-gradient(900px 480px at 90% 10%, rgba(241,245,255,0.9), transparent 55%)'

const PAGE_SIZE = 20

const SearchIcon = () => (
  <svg className="h-4 w-4 shrink-0 text-[#2A3040]" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const FilterIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M2 4h12M4.5 8h7M6.5 12h3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

function pageList(current: number, total: number): Array<number | '…'> {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)

  const pages: Array<number | '…'> = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  if (start > 2) pages.push('…')
  for (let page = start; page <= end; page += 1) pages.push(page)
  if (end < total - 1) pages.push('…')
  pages.push(total)
  return pages
}

type InspirationPageContentProps = {
  content: InspirationPageContentData
}

export default function InspirationPageContent({ content }: InspirationPageContentProps) {
  const {
    hero,
    items,
    categories,
    designStyles,
    colors,
    sortOptions,
    searchPlaceholder,
    allSpacesLabel,
  } = content

  const defaultSort = sortOptions[0] ?? 'Latest'

  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<InspirationFilters>({
    space: allSpacesLabel,
    designStyle: null,
    color: null,
    sort: defaultSort,
  })
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [page, setPage] = useState(1)

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    const matched = items.filter((item) => {
      const matchesSpace = filters.space === allSpacesLabel || item.category === filters.space
      const matchesStyle = !filters.designStyle || item.designStyle === filters.designStyle
      const matchesColor = !filters.color || item.color === filters.color
      if (!matchesSpace || !matchesStyle || !matchesColor) return false
      if (!query) return true
      return (
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.designStyle.toLowerCase().includes(query) ||
        item.color.toLowerCase().includes(query)
      )
    })

    if (filters.sort === 'Oldest') {
      return [...matched].reverse()
    }

    return matched
  }, [items, searchQuery, filters, allSpacesLabel])

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pagedItems = filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [searchQuery, filters])

  const updateFilters = (patch: Partial<InspirationFilters>) => {
    setFilters((current) => ({ ...current, ...patch }))
  }

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.space !== allSpacesLabel) count += 1
    if (filters.designStyle) count += 1
    if (filters.color) count += 1
    if (filters.sort !== defaultSort) count += 1
    return count
  }, [filters, allSpacesLabel, defaultSort])

  const openFilterPanel = () => {
    setOpenDropdown(null)
    setFilterPanelOpen(true)
  }

  return (
    <div className="min-h-screen overflow-x-clip">
      <section className="relative overflow-hidden px-4 pb-6 pt-8 sm:px-6 sm:pt-10 lg:px-10 lg:pb-8 lg:pt-14">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />
        <div className="mx-auto max-w-[920px] pb-2 text-center sm:pb-4">
          <h1 className="title-heading-normal !text-[26px] leading-[1.15] text-[#2A3040] sm:!text-[32px]">
            {hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[720px] text-[14px] leading-relaxed text-[#6A758C] sm:mt-5 sm:text-[16px]">
            {hero.description}
          </p>
        </div>
      </section>

      <section className="relative px-4 pb-12 sm:px-6 sm:pb-14 lg:px-10 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />
        <div className="glass-panel mx-auto max-w-[1350px] !rounded-[16px] !p-4 sm:!p-6 lg:!p-8">
          <div className="flex w-full items-center justify-between gap-2 sm:gap-4">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search inspiration</span>
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 sm:left-5">
                <SearchIcon />
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-11 w-full rounded-full border border-[#000000]/20 bg-white/70 py-2.5 pl-10 pr-3 text-[16px] text-[#2A3040] placeholder:text-[#9AA1AD] backdrop-blur-sm transition-colors focus:border-[#BFB6AD] focus:outline-none sm:h-[52px] sm:pl-12 sm:pr-4 sm:text-[14px]"
              />
            </label>

            <button
              type="button"
              onClick={openFilterPanel}
              aria-label="Open filters"
              className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#000000]/20 bg-white/70 text-[#2A3040] backdrop-blur-sm transition-colors hover:border-[#BFB6AD] sm:h-[52px] sm:w-[52px]"
            >
              <FilterIcon />
              {activeFilterCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E53935] px-1 text-[10px] font-semibold text-white">
                  {activeFilterCount}
                </span>
              ) : null}
            </button>
          </div>

          {/* lg and below: dropdown filters */}
          <div className="mt-4 xl:hidden sm:mt-5">
            <InspirationFilterDropdowns
              allSpacesLabel={allSpacesLabel}
              categories={categories}
              designStyles={designStyles}
              colors={colors}
              sortOptions={sortOptions}
              filters={filters}
              defaultSort={defaultSort}
              onSpaceChange={(value) => updateFilters({ space: value })}
              onDesignStyleChange={(value) => updateFilters({ designStyle: value })}
              onColorChange={(value) => updateFilters({ color: value })}
              onSortChange={(value) => updateFilters({ sort: value })}
              openDropdown={openDropdown}
              onOpenDropdownChange={setOpenDropdown}
            />
          </div>

          {/* xl+: category chips */}
          <div className="mt-4 hidden xl:block sm:mt-5">
            <div className="flex flex-wrap items-center gap-2">
              {[allSpacesLabel, ...categories].map((category) => {
                const active = filters.space === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => updateFilters({ space: category })}
                    className={`min-h-10 shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors sm:min-h-9 sm:px-4 ${
                      active
                        ? 'border-[#2A3040] bg-[#2A3040] text-white'
                        : 'border-[#000000]/20 bg-white/70 text-[#5C6470] backdrop-blur-sm hover:border-[#BFB6AD] hover:text-[#2A3040]'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>

          {pagedItems.length === 0 ? (
            <p className="py-16 text-center text-[15px] text-[#6A758C]">
              No inspiration found. Try a different search or filter.
            </p>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {pagedItems.map((item) => (
                <InspirationCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <nav className="mt-10 flex items-center justify-center gap-1 sm:mt-12 sm:gap-1.5" aria-label="Inspiration pages">
              <button
                type="button"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#2A3040] transition-colors hover:bg-white disabled:opacity-30 sm:h-9 sm:w-9"
              >
                ‹
              </button>
              {pageList(currentPage, totalPages).map((item, index) =>
                item === '…' ? (
                  <span key={`ellipsis-${index}`} className="px-1 text-[13px] text-[#8A909C]">
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPage(item)}
                    aria-current={item === currentPage ? 'page' : undefined}
                    className={`inline-flex h-11 min-w-11 items-center justify-center rounded-full px-2 text-[13px] transition-colors sm:h-9 sm:min-w-9 ${
                      item === currentPage
                        ? 'bg-[#2A3040] text-white'
                        : 'text-[#2A3040] hover:bg-white'
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#2A3040] transition-colors hover:bg-white disabled:opacity-30 sm:h-9 sm:w-9"
              >
                ›
              </button>
            </nav>
          ) : null}
        </div>
      </section>

      <InspirationFilterPanel
        open={filterPanelOpen}
        onClose={() => setFilterPanelOpen(false)}
        allSpacesLabel={allSpacesLabel}
        categories={categories}
        designStyles={designStyles}
        colors={colors}
        sortOptions={sortOptions}
        filters={filters}
        onApply={setFilters}
      />
    </div>
  )
}
