'use client'

import Image from 'next/image'
import type { AboutImage } from '@/lib/about/types'

type AboutCultureSliderProps = {
  images: AboutImage[]
}

export default function AboutCultureSlider({ images }: AboutCultureSliderProps) {
  if (images.length === 0) return null

  const loop = [...images, ...images]

  return (
    <div className="relative mt-8 w-full overflow-hidden sm:mt-10 lg:mt-12" aria-label="Culture gallery">
      <div className="about-culture-track flex gap-3 sm:gap-4">
        {loop.map((image, index) => {
          const isClone = index >= images.length
          return (
            <div
              key={`${image.src}-${index}`}
              className="relative h-[200px] w-[260px] shrink-0 overflow-hidden rounded-[16px] sm:h-[280px] sm:w-[380px] sm:rounded-[18px] lg:h-[400px] lg:w-[533px] lg:rounded-[20px]"
              aria-hidden={isClone}
            >
              <Image
                src={image.src}
                alt={isClone ? '' : image.alt}
                fill
                loading="eager"
                className="object-cover"
                sizes="(max-width:640px) 260px, (max-width:1024px) 380px, 533px"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
