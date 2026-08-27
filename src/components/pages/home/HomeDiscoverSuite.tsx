'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { HomeDiscoverItem } from '@/lib/home/types'

type HomeDiscoverSuiteProps = {
  title: string
  items: HomeDiscoverItem[]
}

const FADE_MS = 220

const IconMic = () => (
  <svg
    className="h-7 w-7 sm:h-[29px] sm:w-[29px]"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29 29"
    fill="none"
    aria-hidden
  >
    <path
      d="M17.9104 8.52955C17.9104 6.45649 16.3074 4.77637 14.3282 4.77637C12.3491 4.77637 10.7461 6.45649 10.7461 8.52955V14.1577C10.7461 16.2307 12.3491 17.9109 14.3282 17.9109C16.3074 17.9109 17.9104 16.2307 17.9104 14.1577V8.52955Z"
      stroke="#2A3040"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.16406 13.1348C7.16406 14.1226 7.34937 15.1008 7.70941 16.0135C8.06945 16.9262 8.59716 17.7554 9.26243 18.454C9.92769 19.1525 10.7175 19.7066 11.5867 20.0846C12.4559 20.4627 13.3875 20.6572 14.3283 20.6572M14.3283 20.6572C15.2692 20.6572 16.2008 20.4627 17.07 20.0846C17.9392 19.7066 18.729 19.1525 19.3942 18.454C20.0595 17.7554 20.5872 16.9262 20.9473 16.0135C21.3073 15.1008 21.4926 14.1226 21.4926 13.1348M14.3283 20.6572V23.8812M10.2345 23.8812H18.4222"
      stroke="#2A3040"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconArrowUp = () => (
  <svg
    className="h-7 w-7 sm:h-[29px] sm:w-[29px]"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29 29"
    fill="none"
    aria-hidden
  >
    <path
      d="M2.6875 14.3285C2.6875 20.7584 7.8995 25.9704 14.3294 25.9704C20.7594 25.9704 25.9714 20.7584 25.9714 14.3285C25.9714 7.89853 20.7594 2.68652 14.3294 2.68652C7.8995 2.68652 2.6875 7.89853 2.6875 14.3285ZM9.51743 12.5016L13.6966 8.32241C13.8645 8.15471 14.0921 8.06051 14.3294 8.06051C14.5668 8.06051 14.7944 8.15471 14.9623 8.32241L19.1414 12.5016C19.2294 12.5836 19.3 12.6824 19.3489 12.7923C19.3979 12.9021 19.4242 13.0207 19.4263 13.141C19.4284 13.2612 19.4063 13.3806 19.3613 13.4921C19.3162 13.6037 19.2492 13.705 19.1642 13.79C19.0791 13.875 18.9778 13.9421 18.8663 13.9871C18.7548 14.0321 18.6354 14.0543 18.5151 14.0521C18.3949 14.05 18.2763 14.0237 18.1665 13.9748C18.0566 13.9258 17.9577 13.8552 17.8757 13.7673L15.225 11.1165V19.7017C15.225 19.9392 15.1306 20.167 14.9627 20.3349C14.7947 20.5028 14.5669 20.5972 14.3294 20.5972C14.0919 20.5972 13.8641 20.5028 13.6962 20.3349C13.5283 20.167 13.4339 19.9392 13.4339 19.7017V11.1165L10.7831 13.7673C10.6134 13.9254 10.3888 14.0116 10.1568 14.0075C9.92482 14.0034 9.70346 13.9094 9.53938 13.7453C9.3753 13.5812 9.28132 13.3599 9.27722 13.1279C9.27313 12.8959 9.35925 12.6713 9.51743 12.5016Z"
      fill="#2A3040"
    />
  </svg>
)

const IconUpload = () => (
  <svg
    className="h-4 w-4 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
  >
    <path
      d="M2.66797 10.6693V11.3333C2.66797 11.8638 2.87868 12.3725 3.25376 12.7475C3.62883 13.1226 4.13754 13.3333 4.66797 13.3333H11.3346C11.8651 13.3333 12.3738 13.1226 12.7488 12.7475C13.1239 12.3725 13.3346 11.8638 13.3346 11.3333V10.6667M8.0013 10.3333V3M5.66797 5.33333L8.0013 3L10.3346 5.33333"
      stroke="#2A3040"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconCamera = () => (
  <svg
    className="h-4 w-4 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
  >
    <path
      d="M10.6667 2.00026H12.6667M13.68 13.6096C13.8853 13.3596 14 13.0203 14 12.6669V4.66692C14 4.31359 13.8853 3.97359 13.68 3.72426C13.4767 3.47359 13.1993 3.33359 12.91 3.33359H6.92267C5.77267 3.33359 5.55 2.17959 4.55133 2.01759C4.37533 1.98892 4.19267 2.00026 4.01467 2.00026C3.37933 2.00026 3.062 2.00026 2.812 2.10626C2.49399 2.24143 2.24087 2.49478 2.106 2.81292C2 3.06159 2 3.37892 2 4.01426V12.6669C2 13.0203 2.11467 13.3603 2.32 13.6096C2.524 13.8596 2.80133 14.0003 3.09067 14.0003H12.9093C13.1987 14.0003 13.4753 13.8603 13.68 13.6096Z"
      stroke="#2A3040"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.8843 10.5523C10.3842 11.0524 9.70594 11.3333 8.9987 11.3333C8.29145 11.3333 7.61318 11.0524 7.11308 10.5523C6.61298 10.0522 6.33203 9.37391 6.33203 8.66667C6.33203 7.95942 6.61298 7.28115 7.11308 6.78105C7.61318 6.28095 8.29145 6 8.9987 6C9.70594 6 10.3842 6.28095 10.8843 6.78105C11.3844 7.28115 11.6654 7.95942 11.6654 8.66667C11.6654 9.37391 11.3844 10.0522 10.8843 10.5523Z"
      stroke="#2A3040"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function renderPrompt(prompt: string) {
  const parts = prompt.split(/(#[\w-]+|@[\w-]+)/g)
  return parts.map((part, index) => {
    if (part.startsWith('#') || part.startsWith('@')) {
      return (
        <span key={`${part}-${index}`} className="text-[#3B82F6]">
          {part}
        </span>
      )
    }
    return <span key={`${part}-${index}`}>{part}</span>
  })
}

export default function HomeDiscoverSuite({ title, items }: HomeDiscoverSuiteProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const [displayedId, setDisplayedId] = useState(items[0]?.id ?? '')
  const [visible, setVisible] = useState(true)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const navRef = useRef<HTMLElement>(null)
  const skipInitialTabScroll = useRef(true)

  const displayedItem = useMemo(
    () => items.find((item) => item.id === displayedId) ?? items[0],
    [displayedId, items],
  )

  useEffect(() => {
    if (activeId === displayedId) return undefined

    setVisible(false)
    const timeout = window.setTimeout(() => {
      setDisplayedId(activeId)
      setVisible(true)
    }, FADE_MS)

    return () => window.clearTimeout(timeout)
  }, [activeId, displayedId])

  useEffect(() => {
    const activeTab = tabRefs.current[activeId]
    const nav = navRef.current
    if (!activeTab || !nav) return

    if (skipInitialTabScroll.current) {
      skipInitialTabScroll.current = false
      return
    }

    const isHorizontalNav = nav.scrollWidth > nav.clientWidth
    if (!isHorizontalNav) return

    const tabCenter = activeTab.offsetLeft + activeTab.offsetWidth / 2
    nav.scrollTo({
      left: tabCenter - nav.clientWidth / 2,
      behavior: 'smooth',
    })
  }, [activeId])

  if (!displayedItem) return null

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1350px]">
        <h2 className="title-heading-normal mx-auto max-w-[820px] px-1 text-center !text-[22px] leading-tight text-[#2A3040] sm:!text-[34px] lg:!text-[40px] xl:!text-[65px]">
          {title}
        </h2>

        <div className="mt-8 grid items-start gap-5 sm:mt-10 sm:gap-8 lg:mt-14 lg:grid-cols-[minmax(200px,260px)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-16">
          <nav
            ref={navRef}
            aria-label="Discover capabilities"
            className="-mx-4 flex snap-x snap-mandatory flex-row gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-2 lg:overflow-visible lg:px-0 lg:pb-0 lg:snap-none [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => {
              const isActive = item.id === activeId
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[item.id] = node
                  }}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-pressed={isActive}
                  className={`inline-flex min-h-11 shrink-0 snap-center items-center gap-2 rounded-full px-4 py-2.5 text-left text-[13px] transition-colors sm:min-h-0 sm:text-[15px] ${
                    isActive
                      ? 'bg-white text-[#2A3040] shadow-[0_8px_24px_rgba(42,48,64,0.08)]'
                      : 'bg-transparent text-[#6A758C] hover:bg-white/60 hover:text-[#2A3040]'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.badge ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide ${
                        isActive ? 'bg-[#2A3040]/8 text-[#6A758C]' : 'bg-[#2A3040]/10 text-[#6A758C]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </nav>

          <div className="relative min-w-0 overflow-hidden rounded-[18px] sm:rounded-[28px]">
            <div
              className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center blur-2xl transition-opacity duration-200"
              style={{
                backgroundImage: `url(${displayedItem.imageSrc})`,
                opacity: visible ? 0.5 : 0,
              }}
              aria-hidden
            />
            <div
              className="group/image relative aspect-[4/3] w-full overflow-hidden rounded-[18px] transition-opacity duration-200 sm:aspect-[16/9] sm:rounded-[28px]"
              style={{ opacity: visible ? 1 : 0 }}
            >
              <Image
                src={displayedItem.imageSrc}
                alt={displayedItem.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1000px"
                className="object-cover"
                priority={false}
              />

              <div className="absolute bottom-2 left-1/2 w-[88%] max-w-[340px] -translate-x-1/2 opacity-100 transition-opacity duration-200 group-hover/image:opacity-10 hover:opacity-100 sm:bottom-4 sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px]">
                <div className="rounded-[18px] border border-white/50 bg-[#D7E6FF]/55 p-1.5 shadow-[0_18px_40px_rgba(42,48,64,0.18)] backdrop-blur-md sm:rounded-[24px] sm:p-2.5">
                  <div className="rounded-[14px] border border-[#E8EDF5] bg-white px-3 py-3 sm:rounded-[20px] sm:px-5 sm:py-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <p className="min-w-0 flex-1 line-clamp-2 text-[12px] leading-relaxed text-[#8A909C] sm:line-clamp-3 sm:text-[14px]">
                        {renderPrompt(displayedItem.prompt)}
                      </p>
                      <div className="hidden shrink-0 items-center gap-1.5 xl:flex xl:gap-2">
                        <span className="inline-flex shrink-0 items-center justify-center">
                          <IconMic />
                        </span>
                        <span
                          aria-hidden
                          className="inline-flex shrink-0 items-center justify-center"
                        >
                          <IconArrowUp />
                        </span>
                      </div>
                    </div>

                    <div className="my-3 hidden h-px bg-[#D5DBE6] xl:my-3.5 xl:block" />

                    <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 xl:mt-0">
                      <div className="hidden flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#6A758C] sm:text-[13px] xl:flex">
                        <span className="inline-flex items-center gap-1.5">
                          <IconUpload />
                          <span>Upload image</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <IconCamera />
                          <span>Take a picture</span>
                        </span>
                      </div>
                      <p className="lao-mn text-[11px] text-[#2A3040] sm:text-[13px]">
                        SpaceSense AI 1.01 PRO
                      </p>
                    </div>
                  </div>

                  <p className="hidden px-1 pb-1 pt-2 text-center text-[10px] italic leading-snug text-[#6A758C] xl:block xl:pt-2.5 xl:text-[12px]">
                    *SpaceSense AI is here to inspire. Refine the details your way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
