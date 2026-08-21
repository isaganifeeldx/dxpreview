'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { HomeGalleryImage } from '@/lib/home/types'

type HomeGalleryCarouselProps = {
  images: HomeGalleryImage[]
  title?: string
}

type CarouselMetrics = {
  side1: number
  side2: number
  arrowOffset: number
  maxOffset: number
  angle: number
  scale1: number
  scale2: number
}

function relativeOffset(index: number, active: number, count: number) {
  let offset = index - active
  if (offset > count / 2) offset -= count
  if (offset < -count / 2) offset += count
  return offset
}

function getMetrics(width: number): CarouselMetrics {
  // Phones: 1 fully visible side card each way; steep angle avoids edge crop.
  if (width < 480) {
    return {
      side1: Math.round(width * 0.28),
      side2: Math.round(width * 0.28),
      arrowOffset: Math.round(width * 0.3),
      maxOffset: 1,
      angle: 68,
      scale1: 0.88,
      scale2: 0.88,
    }
  }

  // Large phones / small tablets
  if (width < 768) {
    return {
      side1: Math.round(width * 0.26),
      side2: Math.round(width * 0.26),
      arrowOffset: Math.round(width * 0.34),
      maxOffset: 1,
      angle: 64,
      scale1: 0.9,
      scale2: 0.9,
    }
  }

  // Tablets: still one clear side peek so nothing clips at the edges.
  if (width < 1024) {
    return {
      side1: 200,
      side2: 200,
      arrowOffset: 320,
      maxOffset: 1,
      angle: 60,
      scale1: 0.9,
      scale2: 0.9,
    }
  }

  // Desktop: cover-flow with 2 cards per side
  return {
    side1: 280,
    side2: 460,
    arrowOffset: 480,
    maxOffset: 2,
    angle: 55,
    scale1: 0.9,
    scale2: 0.8,
  }
}

function slideTransform(offset: number, metrics: CarouselMetrics) {
  const abs = Math.abs(offset)

  if (offset === 0) {
    return {
      x: '0px',
      rotateY: 0,
      z: 120,
      scale: 1,
      opacity: 1,
    }
  }

  const side = offset < 0 ? -1 : 1
  const distance = abs === 1 ? metrics.side1 : metrics.side2
  const x = side * distance
  const rotateY = side * -metrics.angle
  const z = abs === 1 ? -40 : -110
  const scale = abs === 1 ? metrics.scale1 : metrics.scale2

  return {
    x: `${x}px`,
    rotateY,
    z,
    scale,
    opacity: 1,
  }
}

const ChevronLeft = () => (
  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M10 3.5L5.5 8L10 12.5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ChevronRight = () => (
  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M6 3.5L10.5 8L6 12.5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function HomeGalleryCarousel({ images, title }: HomeGalleryCarouselProps) {
  const count = images.length
  const [active, setActive] = useState(0)
  const [metrics, setMetrics] = useState<CarouselMetrics>(() => getMetrics(1280))
  const touchStartX = useRef<number | null>(null)

  const goTo = (index: number) => {
    if (count === 0) return
    setActive(((index % count) + count) % count)
  }

  const goPrev = () => goTo(active - 1)
  const goNext = () => goTo(active + 1)

  useEffect(() => {
    const update = () => setMetrics(getMetrics(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (count === 0) return null

  const galleryLabel = title ?? 'Gallery'

  return (
    <div
      className="relative mx-auto mt-8 w-full max-w-[1350px] sm:mt-10"
      role="region"
      aria-roledescription="carousel"
      aria-label={galleryLabel}
    >
      <div
        className="relative mx-auto flex h-[220px] items-center justify-center overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#2A3040]/35 focus-visible:ring-offset-2 sm:h-[360px] md:h-[460px] lg:h-[560px]"
        style={{ perspective: '1600px', perspectiveOrigin: '50% 50%' }}
        tabIndex={0}
        aria-label={`${galleryLabel} stage. Use left and right arrow keys to change slides.`}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            goPrev()
          } else if (event.key === 'ArrowRight') {
            event.preventDefault()
            goNext()
          }
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current == null) return
          const endX = event.changedTouches[0]?.clientX
          if (endX == null) return
          const delta = endX - touchStartX.current
          touchStartX.current = null
          if (Math.abs(delta) < 40) return
          if (delta < 0) goNext()
          else goPrev()
        }}
      >
        <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
          {images.map((item, index) => {
            const offset = relativeOffset(index, active, count)
            const abs = Math.abs(offset)
            const isActive = offset === 0
            const hidden = abs > metrics.maxOffset
            const { x, rotateY, z, scale, opacity } = slideTransform(offset, metrics)

            return (
              <button
                key={`${item.src}-${item.alt}-${index}`}
                type="button"
                tabIndex={isActive ? 0 : -1}
                aria-label={`Show ${item.alt}`}
                aria-current={isActive ? 'true' : undefined}
                aria-hidden={hidden || undefined}
                onClick={() => goTo(index)}
                className="absolute left-1/2 top-1/2 w-[min(56vw,220px)] overflow-hidden rounded-[14px] border border-slate-200/80 bg-white shadow-[0_16px_40px_rgba(42,48,64,0.16)] outline-none transition-[transform,opacity] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-[#2A3040]/35 focus-visible:ring-offset-2 sm:w-[min(48vw,360px)] sm:rounded-[18px] md:w-[480px] lg:w-[680px]"
                style={{
                  aspectRatio: '16 / 10',
                  transformOrigin: 'center center',
                  transform: `translate3d(calc(-50% + ${x}), -50%, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex: isActive ? 30 : 20 - abs,
                  opacity: hidden ? 0 : opacity,
                  visibility: hidden ? 'hidden' : 'visible',
                  pointerEvents: hidden ? 'none' : 'auto',
                  backfaceVisibility: 'hidden',
                }}
              >
                <span className="relative block h-full w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 480px) 56vw, (max-width: 768px) 48vw, (max-width: 1024px) 480px, 680px"
                    className="object-cover"
                    priority={isActive || abs === 1}
                  />
                </span>
                {!isActive ? (
                  <span className="pointer-events-none absolute inset-0 bg-[#2A3040]/15" aria-hidden />
                ) : null}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          className="absolute left-1/2 top-1/2 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2A3040] shadow-md transition-colors hover:bg-[#F4F6FA] sm:h-11 sm:w-11 md:h-12 md:w-12"
          style={{ transform: `translate(-50%, -50%) translateX(-${metrics.arrowOffset}px)` }}
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="absolute left-1/2 top-1/2 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2A3040] shadow-md transition-colors hover:bg-[#F4F6FA] sm:h-11 sm:w-11 md:h-12 md:w-12"
          style={{ transform: `translate(-50%, -50%) translateX(${metrics.arrowOffset}px)` }}
        >
          <ChevronRight />
        </button>
      </div>

      <div
        className="mt-4 flex max-w-full flex-wrap items-center justify-center gap-1 px-2 sm:mt-6 sm:gap-1.5"
        role="group"
        aria-label="Choose gallery slide"
      >
        {images.map((item, index) => {
          const isActive = index === active
          return (
            <button
              key={`dot-${item.src}-${index}`}
              type="button"
              aria-label={`Go to slide ${index + 1} of ${count}: ${item.alt}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                isActive ? 'w-5 bg-[#2A3040] sm:w-7' : 'w-1.5 bg-[#C5CAD3] hover:bg-[#9AA1AD] sm:w-2'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}
