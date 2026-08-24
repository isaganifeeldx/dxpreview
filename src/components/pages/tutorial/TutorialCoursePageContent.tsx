'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { PageClosingCtaData } from '@/lib/cta/defaults'
import type { TutorialCourse, TutorialLesson } from '@/lib/tutorial/types'
import { youtubeEmbedUrl } from '@/lib/tutorial/youtube'
import PageClosingCta from '@/components/pages/shared/PageClosingCta'
import TutorialCourseCard from './TutorialCourseCard'

const siteGradient =
  'radial-gradient(1200px 520px at 12% -10%, rgba(174,200,255,0.45), transparent 60%), radial-gradient(900px 480px at 90% 10%, rgba(241,245,255,0.9), transparent 55%)'

const PlayIcon = () => (
  <svg className="h-14 w-14 drop-shadow-md sm:h-16 sm:w-16" viewBox="0 0 48 48" fill="none" aria-hidden>
    <circle cx="24" cy="24" r="23" fill="rgba(255,255,255,0.92)" />
    <path d="M20 16.5L33 24L20 31.5V16.5Z" fill="#2A3040" />
  </svg>
)

type TutorialCoursePageContentProps = {
  course: TutorialCourse
  otherCourses: TutorialCourse[]
  otherHeading: string
  otherDescription: string
  closing: PageClosingCtaData
  initialLessonSlug?: string
}

export default function TutorialCoursePageContent({
  course,
  otherCourses,
  otherHeading,
  otherDescription,
  closing,
  initialLessonSlug,
}: TutorialCoursePageContentProps) {
  const initialLesson =
    course.lessons.find((lesson) => lesson.slug === initialLessonSlug) ?? course.lessons[0]
  const [activeLesson, setActiveLesson] = useState<TutorialLesson>(initialLesson)

  const embedUrl = useMemo(
    () => (activeLesson.videoUrl ? youtubeEmbedUrl(activeLesson.videoUrl) : null),
    [activeLesson],
  )
  const activeIndex = course.lessons.findIndex((lesson) => lesson.id === activeLesson.id)

  return (
    <div className="min-h-screen overflow-x-clip">
      <section className="relative overflow-hidden px-4 pb-6 pt-8 sm:px-6 sm:pt-10 lg:px-10 lg:pb-8 lg:pt-14">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />

        <div className="mx-auto max-w-[1350px]">
          <Link
            href="/tutorial"
            className="inline-flex min-h-11 items-center text-[13px] font-medium text-[#6A758C] transition-colors hover:text-[#2A3040] sm:min-h-0"
          >
            ← Back to Tutorials
          </Link>

          <h1 className="title-heading-normal mt-4 !text-[26px] leading-[1.15] text-[#2A3040] sm:mt-8 sm:!text-[32px]">
            {course.title}
          </h1>
          <p className="mt-3 max-w-[720px] text-[14px] leading-relaxed text-[#6A758C] sm:text-[16px]">
            {course.description}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 pb-8 sm:px-6 lg:px-10 lg:pb-10">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />
        <div className="mx-auto grid max-w-[1350px] gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6">
          <div className="min-w-0">
            <div className="overflow-hidden rounded-[16px] bg-black">
              <div className="relative w-full overflow-hidden pt-[56.25%]">
                {embedUrl ? (
                  <iframe
                    key={activeLesson.id}
                    src={embedUrl}
                    title={activeLesson.title}
                    width={16}
                    height={9}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <>
                    <Image
                      src={activeLesson.image}
                      alt={activeLesson.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-cover"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <PlayIcon />
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 rounded-[16px] bg-white px-5 py-6 sm:mt-8 sm:px-6 sm:py-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8A909C]">Now playing</p>
              <h2 className="lao-mn mt-2 text-[20px] leading-tight text-[#2A3040] sm:text-[24px]">
                {activeLesson.title}
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed tracking-wide text-[#8A909C]">
                Lesson {activeIndex + 1} of {course.lessons.length}
                <span className="mx-2 text-[#D0D4DC]">·</span>
                {course.category}
              </p>
              {!embedUrl ? (
                <p className="mt-3 text-[14px] leading-relaxed text-[#6A758C]">
                  Video playback will be connected when tutorials are added in CMS.
                </p>
              ) : null}
            </div>
          </div>

          <aside className="rounded-[16px] bg-white p-4 sm:p-5 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto">
            <h2 className="lao-mn text-[20px] text-[#2A3040] sm:text-[22px]">Lesson list</h2>
            <ul className="mt-4 flex flex-col gap-1.5 sm:gap-2">
              {course.lessons.map((lesson, index) => {
                const active = lesson.id === activeLesson.id
                return (
                  <li key={lesson.id}>
                    <button
                      type="button"
                      onClick={() => setActiveLesson(lesson)}
                      className={`flex min-h-11 w-full min-w-0 items-start gap-3 rounded-[12px] px-3 py-3 text-left transition-colors ${
                        active
                          ? 'bg-[#F4F6FA] ring-1 ring-[#2A3040]/20'
                          : 'hover:bg-[#F7F8FB]'
                      }`}
                    >
                      <span className="mt-0.5 w-6 shrink-0 text-[12px] font-medium text-[#8A909C]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-medium leading-snug text-[#2A3040]">
                          {lesson.title}
                        </span>
                        <span className="mt-1 block text-[12px] text-[#8A909C]">Lesson {index + 1}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>
        </div>
      </section>

      {otherCourses.length > 0 ? (
        <section className="relative overflow-hidden px-4 pb-12 sm:px-6 sm:pb-14 lg:px-10 lg:pb-20">
          <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />
          <div className="glass-panel mx-auto max-w-[1350px] !rounded-[16px] !p-4 sm:!p-6 lg:!p-8">
            <h2 className="title-heading-normal !text-[22px] text-[#2A3040] sm:!text-[26px]">{otherHeading}</h2>
            <p className="mt-2 text-[14px] text-[#6A758C] sm:text-[15px]">{otherDescription}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
              {otherCourses.map((item) => (
                <TutorialCourseCard key={item.id} course={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <PageClosingCta {...closing} />
    </div>
  )
}
