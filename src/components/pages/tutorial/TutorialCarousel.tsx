'use client'

import { useRef } from 'react'
import type { TutorialCourse } from '@/lib/tutorial/types'
import TutorialCourseCard from './TutorialCourseCard'

const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d={direction === 'left' ? 'M10 3.5L5.5 8L10 12.5' : 'M6 3.5L10.5 8L6 12.5'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

type TutorialCarouselProps = {
  heading?: string
  courses: TutorialCourse[]
}

export default function TutorialCarousel({ heading, courses }: TutorialCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  if (courses.length === 0) return null

  const scrollByCard = (direction: -1 | 1) => {
    const node = scrollerRef.current
    if (!node) return
    const card = node.querySelector<HTMLElement>('[data-carousel-card]')
    const amount = (card?.offsetWidth ?? 280) + 24
    node.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {heading ? (
        <h3 className="mb-4 lao-mn text-[20px] text-[#2A3040] sm:mb-5 sm:text-[22px]">{heading}</h3>
      ) : null}

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous courses"
          className="absolute left-0 top-[38%] z-[1] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#000000]/15 bg-white text-[#2A3040] shadow-sm transition-colors hover:bg-[#F4F6FA] sm:flex"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next courses"
          className="absolute right-0 top-[38%] z-[1] hidden h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#000000]/15 bg-white text-[#2A3040] shadow-sm transition-colors hover:bg-[#F4F6FA] sm:flex"
        >
          <ArrowIcon direction="right" />
        </button>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scroll-padding-inline:1rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 lg:[scroll-padding-inline:0]"
        >
          {courses.map((course) => (
            <div
              key={course.id}
              data-carousel-card
              className="flex w-[85%] max-w-[310px] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] sm:max-w-none lg:w-[calc((100%-4.5rem)/4)]"
            >
              <TutorialCourseCard course={course} titleLines={2} showLessonCount />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
