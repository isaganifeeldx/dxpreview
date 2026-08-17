'use client'

import type { AboutVoice } from '@/lib/about/types'

type AboutVoicesCarouselProps = {
  items: AboutVoice[]
}

export default function AboutVoicesCarousel({ items }: AboutVoicesCarouselProps) {
  if (items.length === 0) return null

  const loop = items.length > 2 ? [...items, ...items] : items

  return (
    <div className="about-voices-carousel relative w-full overflow-hidden" aria-label="Team voices">
      <div className="about-voices-track flex gap-3 px-4 sm:gap-4 sm:px-6 lg:px-0">
        {loop.map((item, index) => {
          const isClone = index >= items.length
          return (
            <blockquote
              key={`${item.id}-${index}`}
              className="flex h-[340px] w-[260px] shrink-0 flex-col justify-between rounded-[16px] bg-[#E4E8F0] p-5 sm:h-[400px] sm:w-[320px] sm:p-6 lg:h-[472px] lg:w-[360px]"
              aria-hidden={isClone}
            >
              <p className="text-[15px] leading-relaxed text-[#2A3040] sm:leading-7">
                {item.quote}
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#AEC8FF]/50 text-[11px] font-semibold text-[#2A3040] sm:h-10 sm:w-10 sm:text-[12px]">
                  {item.avatarInitials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium leading-1 tracking-tight text-[#2A3040] sm:text-[12px] lg:text-[15px]">
                    {item.name}
                  </p>
                  <p className="truncate text-[13px] leading-6 text-[#2A3040]/50 sm:text-[12px]">{item.role}</p>
                </div>
              </div>
            </blockquote>
          )
        })}
      </div>
    </div>
  )
}
