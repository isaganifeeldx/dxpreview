import Image from 'next/image'
import Link from 'next/link'
import type { TutorialCourse } from '@/lib/tutorial/types'

const PlayIcon = () => (
  <svg className="h-10 w-10 drop-shadow-md sm:h-12 sm:w-12" viewBox="0 0 48 48" fill="none" aria-hidden>
    <circle cx="24" cy="24" r="23" fill="rgba(255,255,255,0.92)" />
    <path d="M20 16.5L33 24L20 31.5V16.5Z" fill="#2A3040" />
  </svg>
)

type TutorialCourseCardProps = {
  course: TutorialCourse
  titleLines?: 1 | 2
  showLessonCount?: boolean
}

export default function TutorialCourseCard({
  course,
  titleLines = 1,
  showLessonCount = false,
}: TutorialCourseCardProps) {
  const lessonCount = course.lessons.length

  return (
    <Link
      href={`/tutorial/${course.slug}`}
      className="group flex h-full min-w-0 w-full flex-col rounded-[16px] bg-white text-left outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#2A3040]/30 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-[16px]">
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          <PlayIcon />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3
          className={`lao-mn text-[18px] leading-tight text-[#2A3040] sm:text-[20px] ${
            titleLines === 2 ? 'line-clamp-2 min-h-[2.5em]' : 'truncate'
          }`}
        >
          {course.title}
        </h3>
        <p className="mt-2 text-[12px] tracking-wide text-[#8A909C]">{course.category}</p>
        {showLessonCount ? (
          <p className="mt-3 flex items-center gap-1 text-[12px] text-[#6A758C]">
            {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M4.5 2.5L8 6L4.5 9.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        ) : (
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[#696969]">{course.description}</p>
        )}
      </div>
    </Link>
  )
}
