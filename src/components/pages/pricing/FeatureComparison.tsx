'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import type {
  ComparisonCategory,
  FeatureValue,
  PlanId,
  PricingPlan,
} from '@/lib/pricing/types'
import { CategoryIcon, CheckIcon, ChevronIcon, CrownSmallIcon, DashIcon } from './icons'

type FeatureComparisonProps = {
  title: string
  categories: ComparisonCategory[]
  plans: PricingPlan[]
}

const PLAN_ORDER: PlanId[] = ['free', 'pro', 'business', 'enterprise']
const STICKY_TOP_PX = 72
const STICKY_CLEARANCE_PX = 12

function FeatureCell({ value }: { value: FeatureValue }) {
  if (value === true) {
    return (
      <span className="inline-flex text-[#2A3040]">
        <CheckIcon className="h-4 w-4" />
        <span className="sr-only">Included</span>
      </span>
    )
  }

  if (value === false) {
    return (
      <>
        <DashIcon />
        <span className="sr-only">Not included</span>
      </>
    )
  }

  return <span className="text-[13px] leading-snug text-[#4A5568]">{value}</span>
}

function formatIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

export default function FeatureComparison({
  title,
  categories,
  plans,
}: FeatureComparisonProps) {
  const [expandedId, setExpandedId] = useState<string | null>(categories[0]?.id ?? null)
  const [isStuck, setIsStuck] = useState(false)
  const stickySentinelRef = useRef<HTMLDivElement>(null)
  const stickyHeaderRef = useRef<HTMLDivElement>(null)
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const pendingScrollIdRef = useRef<string | null>(null)

  const plansById = useMemo(
    () => Object.fromEntries(plans.map((plan) => [plan.id, plan])) as Record<PlanId, PricingPlan>,
    [plans],
  )

  useEffect(() => {
    const sentinel = stickySentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: `-${STICKY_TOP_PX}px 0px 0px 0px`,
        threshold: 0,
      },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  // When switching accordions, collapsing the previous one jumps content under the sticky bar.
  // After layout, nudge scroll so the opened section sits just below it.
  useLayoutEffect(() => {
    const id = pendingScrollIdRef.current
    if (!id) return
    pendingScrollIdRef.current = null

    const section = categoryRefs.current[id]
    const stickyEl = stickyHeaderRef.current
    if (!section || !stickyEl) return

    const stickyBottom = stickyEl.getBoundingClientRect().bottom
    const sectionTop = section.getBoundingClientRect().top
    const clearTop = stickyBottom + STICKY_CLEARANCE_PX

    if (sectionTop < clearTop) {
      window.scrollBy({ top: sectionTop - clearTop, behavior: 'auto' })
    }
  }, [expandedId])

  const toggleCategory = (id: string) => {
    setExpandedId((prev) => {
      if (prev === id) return null
      pendingScrollIdRef.current = id
      return id
    })
  }

  return (
    <section
      id="compare-features"
      className="scroll-mt-28 px-4 py-10 sm:px-6 lg:px-10 lg:py-14"
      aria-labelledby="compare-features-heading"
    >
      <div className="glass-panel mx-auto max-w-[1350px] !rounded-[16px] !px-0 !py-6 sm:!py-8 lg:!py-10">
        <h2 id="compare-features-heading" className="sr-only">
          {title}
        </h2>

        <div className="pricing-compare-scroll xl:overflow-visible">
          <div className="min-w-[760px] sm:min-w-[820px] xl:min-w-[880px]">
            <div ref={stickySentinelRef} className="h-px w-full" aria-hidden />

            <div
              ref={stickyHeaderRef}
              className="sticky z-20"
              style={{ top: STICKY_TOP_PX }}
              data-stuck={isStuck ? 'true' : 'false'}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 left-1.5 right-1.5 rounded-[14px] transition-[background-color,box-shadow,opacity] duration-200 sm:left-3 sm:right-3 ${
                  isStuck
                    ? 'bg-white opacity-100 shadow-[0_8px_24px_rgba(42,48,64,0.08)]'
                    : 'bg-transparent opacity-0 shadow-none'
                }`}
              />

              <div
                className={`pricing-compare-grid relative items-end px-4 py-4 transition-[border-color] duration-200 sm:px-6 sm:py-5 lg:px-10 ${
                  isStuck ? 'border-b border-transparent' : 'border-b border-white/50'
                }`}
              >
                <p className="pricing-compare-label relative z-[1] bg-transparent title-heading-normal text-[18px] leading-tight text-[#2A3040] sm:text-[26px] lg:text-[32px]">
                  {title}
                </p>
                {PLAN_ORDER.map((id) => {
                  const plan = plansById[id]
                  const muted = Boolean(plan.compareCta.muted)
                  return (
                    <div key={id} className="relative z-[1] text-center">
                      <p className="inline-flex items-center justify-center gap-1 text-[13px] font-semibold text-[#2A3040] sm:gap-1.5 sm:text-[15px]">
                        {plan.icon === 'crown' ? (
                          <CrownSmallIcon />
                        ) : null}
                        {plan.name}
                      </p>
                      <Link
                        href={plan.compareCta.href}
                        className={`mt-2 inline-flex w-full items-center justify-center rounded-full px-2 py-1.5 text-[11px] font-medium transition-colors sm:mt-3 sm:px-3 sm:text-[12px] ${
                          muted
                            ? 'border border-[#D5DAE3] bg-[#F4F5F7] text-[#2A3040] hover:bg-[#EAECEF]'
                            : 'bg-[#2A3040] text-white hover:bg-[#111a2e]'
                        }`}
                      >
                        {plan.compareCta.label}
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>

            <p className="mt-2 px-4 text-[11px] text-[#6A758C] sm:hidden">
              Swipe sideways to compare all plans
            </p>

            <div className="mt-3 space-y-2.5 px-4 sm:mt-4 sm:px-6 lg:px-10">
              {categories.map((category, index) => {
                const isOpen = expandedId === category.id
                return (
                  <div
                    key={category.id}
                    ref={(node) => {
                      categoryRefs.current[category.id] = node
                    }}
                    style={{ scrollMarginTop: STICKY_TOP_PX + 96 }}
                    className="overflow-hidden rounded-[12px] border border-[#D8DEE8] bg-white/55"
                  >
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      aria-expanded={isOpen}
                      className={`flex w-full items-center gap-2 px-3 py-3 text-left transition-colors hover:bg-[#AEC8FF]/25 sm:gap-3 sm:px-4 sm:py-3.5 ${
                        isOpen ? 'border-b border-[#D8DEE8] bg-[#AEC8FF]/25' : ''
                      }`}
                    >
                      <span className="w-6 shrink-0 text-[12px] font-medium text-[#6A758C] sm:w-7 sm:text-[13px]">
                        {formatIndex(index)}
                      </span>
                      <span className="shrink-0 text-[#2A3040]">
                        <CategoryIcon icon={category.icon} />
                      </span>
                      <span className="min-w-0 flex-1 text-[14px] font-semibold text-[#2A3040] sm:text-[15px]">
                        {category.label}
                      </span>
                      <ChevronIcon open={isOpen} className="h-4 w-4 shrink-0 text-[#6A758C]" />
                    </button>

                    {isOpen ? (
                      <div className="bg-white/35">
                        {category.rows.map((row, rowIndex) => {
                          const isLast = rowIndex === category.rows.length - 1
                          return (
                            <div
                              key={row.id}
                              className={`pricing-compare-grid pricing-compare-grid--table items-center ${
                                isLast ? '' : 'border-b border-[#E2E6EE]'
                              } ${rowIndex % 2 === 0 ? 'bg-white/50' : 'bg-[#F5F7FA]/70'}`}
                            >
                              <p
                                className={`pricing-compare-label text-[12px] text-[#2A3040] sm:text-[14px] ${
                                  rowIndex % 2 === 0 ? 'bg-white/50' : 'bg-[#F5F7FA]/70'
                                }`}
                              >
                                {row.label}
                              </p>
                              {PLAN_ORDER.map((id) => (
                                <div key={id} className="flex justify-center">
                                  <FeatureCell value={row.values[id]} />
                                </div>
                              ))}
                            </div>
                          )
                        })}
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
