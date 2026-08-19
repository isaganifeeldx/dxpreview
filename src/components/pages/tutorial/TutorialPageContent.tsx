'use client'

import { useEffect, useMemo, useState } from 'react'
import { flattenTutorialLessons } from '@/lib/tutorial/flattenTutorialLessons'
import type { TutorialPageContentData } from '@/lib/tutorial/types'
import TutorialCarousel from './TutorialCarousel'
import TutorialLessonCard from './TutorialLessonCard'

const siteGradient =
  'radial-gradient(1200px 520px at 12% -10%, rgba(174,200,255,0.45), transparent 60%), radial-gradient(900px 480px at 90% 10%, rgba(241,245,255,0.9), transparent 55%)'

const PAGE_SIZE = 9

const SearchIcon = () => (
  <svg className="h-4 w-4 shrink-0 text-[#2A3040]" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

type TutorialPageContentProps = {
  content: TutorialPageContentData
}

export default function TutorialPageContent({ content }: TutorialPageContentProps) {
  const { hero, courses, videosHeading, allHeading, searchPlaceholder } = content

  const allLessons = useMemo(() => flattenTutorialLessons(courses), [courses])

  const categories = useMemo(
    () => Array.from(new Set(allLessons.map((lesson) => lesson.category))),
    [allLessons],
  )

  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [page, setPage] = useState(1)

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return courses

    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query),
    )
  }, [courses, searchQuery])

  const filteredLessons = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return allLessons.filter((lesson) => {
      const matchesCategory = activeCategory === 'All' || lesson.category === activeCategory
      if (!matchesCategory) return false
      if (!query) return true
      return (
        lesson.title.toLowerCase().includes(query) ||
        lesson.category.toLowerCase().includes(query) ||
        lesson.courseTitle.toLowerCase().includes(query)
      )
    })
  }, [allLessons, searchQuery, activeCategory])

  const totalPages = Math.max(1, Math.ceil(filteredLessons.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pagedLessons = filteredLessons.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [searchQuery, activeCategory])

  return (
    <div className="min-h-screen overflow-x-clip">
      <section className="relative overflow-hidden px-4 pb-6 pt-8 sm:px-6 sm:pt-10 lg:px-10 lg:pb-8 lg:pt-14">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />
        <div className="mx-auto max-w-[820px] pb-2 text-center sm:pb-4">
          <h1 className="title-heading-normal !text-[26px] leading-[1.15] text-[#2A3040] sm:!text-[32px]">
            {hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[640px] text-[14px] leading-relaxed text-[#6A758C] sm:mt-5 sm:text-[16px]">
            {hero.description}
          </p>
        </div>
      </section>

      <section className="relative px-4 pb-8 sm:px-6 lg:px-10 lg:pb-10">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />
        <div className="glass-panel mx-auto max-w-[1350px] !rounded-[16px] !p-4 sm:!p-6 lg:!p-8">
          <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <h2 className="title-heading-normal !text-[22px] text-[#2A3040] sm:!text-[26px]">
              {videosHeading}
            </h2>
            <label className="relative w-full sm:max-w-[360px]">
              <span className="sr-only">Search courses and lessons</span>
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 sm:left-4">
                <SearchIcon />
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-11 w-full rounded-full border border-[#000000]/20 bg-white/70 py-2.5 pl-10 pr-3 text-[16px] text-[#2A3040] placeholder:text-[#9AA1AD] backdrop-blur-sm transition-colors focus:border-[#BFB6AD] focus:outline-none sm:h-12 sm:pl-11 sm:pr-4 sm:text-[14px]"
              />
            </label>
          </div>

          <TutorialCarousel courses={filteredCourses} />
        </div>
      </section>

      <section className="relative overflow-hidden px-4 pb-12 sm:px-6 sm:pb-14 lg:px-10 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />
        <div className="glass-panel mx-auto max-w-[1350px] !rounded-[16px] !p-4 sm:!p-6 lg:!p-8">
          <h2 className="title-heading-normal !text-[22px] text-[#2A3040] sm:!text-[26px]">{allHeading}</h2>

          <div className="mt-4 -mx-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mt-5 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
              {['All', ...categories].map((category) => {
                const active = activeCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`min-h-11 shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors sm:min-h-9 sm:px-4 ${
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

          {pagedLessons.length === 0 ? (
            <p className="py-16 text-center text-[15px] text-[#6A758C]">
              No lessons found. Try a different search or filter.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
              {pagedLessons.map((lesson) => (
                <TutorialLessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <nav className="mt-10 flex items-center justify-center gap-1 sm:mt-12 sm:gap-1.5" aria-label="Lesson pages">
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
    </div>
  )
}
