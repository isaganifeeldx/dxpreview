'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { SpaceSenseModelsSection } from '@/lib/spacesense/types'

const SWIPE_THRESHOLD = 24
const SWIPE_DISTANCE_RATIO = 0.1
const SWIPE_LOCK_THRESHOLD = 6
const SWIPE_HORIZONTAL_RATIO = 0.45
const SWIPE_COOLDOWN_MS = 180
const SLIDE_TRANSITION = 'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'

type TouchPoint = { x: number; y: number }

type SpaceSenseModelShowcaseProps = {
  section: SpaceSenseModelsSection
}

function ModelSlideContent({
  item,
  blockClickAfterSwipe,
}: {
  item: SpaceSenseModelsSection['items'][number]
  blockClickAfterSwipe: (event: React.MouseEvent) => void
}) {
  return (
    <>
      <h3 className="title-heading-normal !text-[18px] text-white sm:!text-[22px] lg:!text-[26px]">
        {item.name}
      </h3>
      <p className="mt-1.5 max-w-md text-[12px] leading-relaxed text-white/85 sm:mt-3 sm:text-[14px]">
        {item.description}
      </p>
      <Link
        href={item.cta.href}
        onClick={blockClickAfterSwipe}
        className="mt-2 inline-flex w-fit text-[12px] text-white underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white sm:mt-4 sm:text-[13px]"
      >
        More on {item.name}
      </Link>
      <Link
        href={item.cta.href}
        onClick={blockClickAfterSwipe}
        className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#2A3040] transition-colors hover:bg-[#F4F6F9] sm:mt-6"
      >
        {item.cta.label}
        <span aria-hidden>→</span>
      </Link>
    </>
  )
}

export default function SpaceSenseModelShowcase({ section }: SpaceSenseModelShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const swipeZoneRef = useRef<HTMLDivElement>(null)
  const bgTrackRef = useRef<HTMLDivElement>(null)
  const contentTrackRef = useRef<HTMLDivElement>(null)
  const tabRowRef = useRef<HTMLDivElement>(null)
  const tabTrackRef = useRef<HTMLUListElement>(null)
  const didSwipe = useRef(false)
  const tabCentersRef = useRef<number[]>([])
  const activeIndexRef = useRef(0)
  const slideCountRef = useRef(section.items.length)
  const isDraggingRef = useRef(false)
  const isAnimatingRef = useRef(false)
  const hasMountedRef = useRef(false)

  const activeModel = section.items[activeIndex]

  activeIndexRef.current = activeIndex
  slideCountRef.current = section.items.length

  const measureTabCenters = useCallback(() => {
    const track = tabTrackRef.current
    if (!track) return

    const buttons = track.querySelectorAll<HTMLButtonElement>('button')
    tabCentersRef.current = [...buttons].map(
      (button) => button.offsetLeft + button.offsetWidth / 2,
    )
  }, [])

  const getTabTranslateX = useCallback((index: number) => {
    const row = tabRowRef.current
    const track = tabTrackRef.current
    if (!row || !track) return 0

    const center = tabCentersRef.current[index] ?? 0
    const rowWidth = row.clientWidth
    const trackWidth = track.scrollWidth
    const x = rowWidth / 2 - center

    if (trackWidth <= rowWidth) {
      return (rowWidth - trackWidth) / 2
    }

    const minX = rowWidth - trackWidth
    return Math.max(minX, Math.min(0, x))
  }, [])

  const applyTabTransform = useCallback((index: number, animate: boolean) => {
    const track = tabTrackRef.current
    if (!track) return

    if (window.matchMedia('(min-width: 1024px)').matches) {
      track.style.transition = 'none'
      track.style.transform = 'none'
      return
    }

    const x = getTabTranslateX(index)
    track.style.transition = animate ? SLIDE_TRANSITION : 'none'
    track.style.transform = `translate3d(${x}px, 0, 0)`
  }, [getTabTranslateX])

  const applySlideTransform = useCallback((index: number, offsetPx: number, animate: boolean) => {
    const transform = `translate3d(calc(-${index * 100}% + ${offsetPx}px), 0, 0)`
    const transition = animate ? SLIDE_TRANSITION : 'none'

    for (const track of [bgTrackRef.current, contentTrackRef.current]) {
      if (!track) continue
      track.style.transition = transition
      track.style.transform = transform
    }
  }, [])

  const applySettledTransform = useCallback(
    (index: number, animate: boolean) => {
      applySlideTransform(index, 0, animate)

      if (animate) {
        isAnimatingRef.current = true
        window.setTimeout(() => {
          isAnimatingRef.current = false
        }, 420)
      }

      applyTabTransform(index, animate)
    },
    [applySlideTransform, applyTabTransform],
  )

  const goToIndex = useCallback(
    (index: number) => {
      if (section.items.length === 0) return
      const nextIndex = ((index % section.items.length) + section.items.length) % section.items.length
      isDraggingRef.current = false
      setActiveIndex(nextIndex)
    },
    [section.items.length],
  )

  useLayoutEffect(() => {
    measureTabCenters()
    if (!isDraggingRef.current) {
      const animate = hasMountedRef.current
      hasMountedRef.current = true
      applySettledTransform(activeIndex, animate)
    }
  }, [activeIndex, measureTabCenters, applySettledTransform, section.items])

  useEffect(() => {
    const row = tabRowRef.current
    if (!row) return

    const observer = new ResizeObserver(() => {
      measureTabCenters()
      if (!isDraggingRef.current && !isAnimatingRef.current) {
        applyTabTransform(activeIndexRef.current, false)
      }
    })

    observer.observe(row)
    return () => observer.disconnect()
  }, [measureTabCenters, applyTabTransform])

  useEffect(() => {
    const zone = swipeZoneRef.current
    if (!zone) return

    let start: TouchPoint | null = null
    let lockedHorizontal = false
    let activePointerId: number | null = null
    let lastSwipeAt = 0
    let gestureStartTime = 0

    const isHorizontalGesture = (deltaX: number, deltaY: number) =>
      lockedHorizontal || Math.abs(deltaX) > Math.abs(deltaY) * SWIPE_HORIZONTAL_RATIO

    const passedSwipeDistance = (deltaX: number) => {
      const width = zone.clientWidth || 1
      return Math.abs(deltaX) >= SWIPE_THRESHOLD || Math.abs(deltaX) >= width * SWIPE_DISTANCE_RATIO
    }

    const isQuickFlick = (deltaX: number, deltaY: number) => {
      const duration = Date.now() - gestureStartTime
      return (
        duration < 320 &&
        Math.abs(deltaX) >= 16 &&
        Math.abs(deltaX) > Math.abs(deltaY) * SWIPE_HORIZONTAL_RATIO
      )
    }

    const clampDrag = (deltaX: number) => {
      const maxDrag = zone.clientWidth * 0.45
      const index = activeIndexRef.current
      const count = slideCountRef.current
      const resisted =
        index === 0 && deltaX > 0
          ? deltaX * 0.3
          : index === count - 1 && deltaX < 0
            ? deltaX * 0.3
            : deltaX

      return Math.max(-maxDrag, Math.min(maxDrag, resisted))
    }

    const scheduleDragTransform = (offsetPx: number) => {
      applySlideTransform(activeIndexRef.current, offsetPx, false)
    }

    const snapBack = () => {
      isDraggingRef.current = false
      applySlideTransform(activeIndexRef.current, 0, true)
    }

    const commitSwipe = (deltaX: number, deltaY: number) => {
      isDraggingRef.current = false

      const horizontal = isHorizontalGesture(deltaX, deltaY)
      const passed = passedSwipeDistance(deltaX) || isQuickFlick(deltaX, deltaY)

      if (!horizontal || !passed) {
        snapBack()
        return
      }

      if (Date.now() - lastSwipeAt < SWIPE_COOLDOWN_MS) {
        snapBack()
        return
      }

      const index = activeIndexRef.current
      const count = slideCountRef.current
      let nextIndex = index

      if (deltaX < 0 && index < count - 1) nextIndex = index + 1
      else if (deltaX > 0 && index > 0) nextIndex = index - 1
      else {
        snapBack()
        return
      }

      lastSwipeAt = Date.now()
      didSwipe.current = true
      window.setTimeout(() => {
        didSwipe.current = false
      }, 400)

      setActiveIndex(nextIndex)
    }

    const updateDrag = (clientX: number, clientY: number) => {
      if (!start) return

      const deltaX = clientX - start.x
      const deltaY = clientY - start.y
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      if (!lockedHorizontal) {
        if (absY > absX && absY > 14) return
        if (absX > SWIPE_LOCK_THRESHOLD && absX >= absY * SWIPE_HORIZONTAL_RATIO) {
          lockedHorizontal = true
          isDraggingRef.current = true
        }
      }

      if (!lockedHorizontal) return

      scheduleDragTransform(clampDrag(deltaX))
    }

    const isInteractiveTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false
      return Boolean(target.closest('button, a, input, textarea, select, label'))
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      if (event.pointerType === 'mouse' && event.button !== 0) return
      if (isInteractiveTarget(event.target)) return
      start = { x: event.clientX, y: event.clientY }
      lockedHorizontal = false
      activePointerId = event.pointerId
      gestureStartTime = Date.now()
      didSwipe.current = false
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      if (!start || event.pointerId !== activePointerId) return

      const wasLocked = lockedHorizontal
      updateDrag(event.clientX, event.clientY)

      if (!wasLocked && lockedHorizontal) {
        zone.setPointerCapture(event.pointerId)
      }

      if (lockedHorizontal) event.preventDefault()
    }

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      if (!start || event.pointerId !== activePointerId) return

      const deltaX = event.clientX - start.x
      const deltaY = event.clientY - start.y

      if (zone.hasPointerCapture(event.pointerId)) {
        zone.releasePointerCapture(event.pointerId)
      }

      start = null
      lockedHorizontal = false
      activePointerId = null

      commitSwipe(deltaX, deltaY)
    }

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return
      if (isInteractiveTarget(event.target)) return
      const touch = event.touches[0]
      if (!touch) return
      start = { x: touch.clientX, y: touch.clientY }
      lockedHorizontal = false
      gestureStartTime = Date.now()
      didSwipe.current = false
    }

    const onTouchMove = (event: TouchEvent) => {
      if (!start || event.touches.length !== 1) return
      const touch = event.touches[0]
      if (!touch) return

      updateDrag(touch.clientX, touch.clientY)

      if (lockedHorizontal) event.preventDefault()
    }

    const onTouchEnd = (event: TouchEvent) => {
      if (!start) return
      const touch = event.changedTouches[0]
      if (!touch) return

      const deltaX = touch.clientX - start.x
      const deltaY = touch.clientY - start.y

      start = null
      lockedHorizontal = false

      commitSwipe(deltaX, deltaY)
    }

    const onTouchCancel = () => {
      start = null
      lockedHorizontal = false
      snapBack()
    }

    zone.addEventListener('pointerdown', onPointerDown)
    zone.addEventListener('pointermove', onPointerMove, { passive: false })
    zone.addEventListener('pointerup', onPointerUp)
    zone.addEventListener('pointercancel', onTouchCancel)
    zone.addEventListener('touchstart', onTouchStart, { passive: true })
    zone.addEventListener('touchmove', onTouchMove, { passive: false })
    zone.addEventListener('touchend', onTouchEnd, { passive: true })
    zone.addEventListener('touchcancel', onTouchCancel, { passive: true })

    return () => {
      zone.removeEventListener('pointerdown', onPointerDown)
      zone.removeEventListener('pointermove', onPointerMove)
      zone.removeEventListener('pointerup', onPointerUp)
      zone.removeEventListener('pointercancel', onTouchCancel)
      zone.removeEventListener('touchstart', onTouchStart)
      zone.removeEventListener('touchmove', onTouchMove)
      zone.removeEventListener('touchend', onTouchEnd)
      zone.removeEventListener('touchcancel', onTouchCancel)
    }
  }, [applySlideTransform])

  const blockClickAfterSwipe = (event: React.MouseEvent) => {
    if (didSwipe.current) event.preventDefault()
  }

  if (!activeModel) return null

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1350px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="title-heading-normal !text-[24px] leading-tight text-[#2A3040] sm:!text-[28px] lg:!text-[32px]">
            {section.title}
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6A758C] sm:mt-4 sm:text-[16px]">
            {section.subtitle}
          </p>
          <div className="mt-6 sm:mt-8">
            <Link
              href={section.cta.href}
              className="inline-flex items-center justify-center rounded-full bg-[#2A3040] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#111a2e]"
            >
              {section.cta.label}
            </Link>
          </div>
        </div>

        <div
          ref={swipeZoneRef}
          className="relative mx-auto mt-8 h-[min(520px,78dvh)] min-h-[440px] overflow-hidden rounded-[16px] sm:mt-10 sm:h-[560px] sm:min-h-0 sm:rounded-[20px] lg:mt-12 lg:h-[614px]"
          role="region"
          aria-roledescription="carousel"
          aria-label={section.title}
        >
          <div className="absolute inset-0 lg:hidden">
            <div ref={bgTrackRef} className="flex h-full will-change-transform">
              {section.items.map((item, index) => (
                <div key={item.id} className="relative h-full w-full shrink-0">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="100vw"
                    priority={index === 0}
                    className="pointer-events-none object-cover object-center select-none"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {section.items.map((item, index) => (
            <Image
              key={`desktop-${item.id}`}
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 1350px) 100vw, 1350px"
              priority={index === 0}
              className={`hidden object-cover object-center transition-opacity duration-700 ease-in-out lg:block ${
                index === activeIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
            />
          ))}

          <div className="pointer-events-none absolute inset-0 z-20 bg-[#2A3040]/15" />

          <div className="absolute inset-2 z-30 flex sm:inset-5 lg:inset-10">
            <div className="flex w-full max-w-full flex-col overflow-hidden rounded-[12px] border border-white/20 bg-[#2A3040]/35 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:max-w-[92%] sm:flex-row sm:rounded-[14px] lg:max-w-[60%] lg:rounded-[16px]">
              <div className="shrink-0 border-b border-white/15 p-3 sm:p-5 lg:w-[42%] lg:border-b-0 lg:border-r lg:p-6">
                <p className="text-[12px] font-semibold text-white sm:text-[14px]">{section.sidebarTitle}</p>
                <div
                  ref={tabRowRef}
                  className="mt-2 overflow-hidden sm:mt-4 lg:overflow-visible"
                >
                  <ul
                    ref={tabTrackRef}
                    className="flex w-max gap-1.5 will-change-transform sm:gap-2 lg:w-full lg:translate-x-0 lg:flex-col lg:gap-0.5 lg:transition-none"
                  >
                    {section.items.map((item, index) => {
                      const isActive = index === activeIndex
                      return (
                        <li key={item.id} className="shrink-0 lg:shrink">
                          <button
                            type="button"
                            onClick={() => goToIndex(index)}
                            aria-current={isActive ? 'true' : undefined}
                            className={`whitespace-nowrap rounded-[10px] px-2.5 py-2 text-left text-[11px] font-medium transition-colors sm:px-3.5 sm:py-2.5 sm:text-[13px] lg:w-full lg:whitespace-normal ${
                              isActive
                                ? 'bg-white/15 text-white'
                                : 'text-white/65 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {item.name}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden lg:hidden">
                <div ref={contentTrackRef} className="flex h-full will-change-transform">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex w-full shrink-0 flex-col justify-center p-3 sm:p-5"
                    >
                      <ModelSlideContent item={item} blockClickAfterSwipe={blockClickAfterSwipe} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden min-h-0 flex-1 flex-col justify-center overflow-y-auto p-3 sm:p-5 lg:flex lg:p-6 lg:pl-8">
                <ModelSlideContent item={activeModel} blockClickAfterSwipe={blockClickAfterSwipe} />
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-4 flex items-center justify-center gap-2 lg:hidden"
          role="tablist"
          aria-label="Model slides"
        >
          {section.items.map((item, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-label={`Go to ${item.name}`}
                aria-selected={isActive}
                onClick={() => goToIndex(index)}
                className={`rounded-full transition-all duration-300 ${
                  isActive ? 'h-2 w-6 bg-[#2A3040]' : 'h-2 w-2 bg-[#2A3040]/30 hover:bg-[#2A3040]/50'
                }`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
