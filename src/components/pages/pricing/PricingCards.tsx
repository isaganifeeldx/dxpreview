'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { BillingCycle, PricingPlan } from '@/lib/pricing/types'
import { CheckIcon, ChevronIcon, PlanFeatureSectionIcon, PlanIconMark } from './icons'

type PricingCardsProps = {
  plans: PricingPlan[]
  billing: BillingCycle
}

function formatPrice(plan: PricingPlan, billing: BillingCycle) {
  if (plan.priceLabel) {
    return { amount: plan.priceLabel, suffix: plan.priceSuffix, billed: '' }
  }

  const amount = billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice
  const billed =
    billing === 'yearly' && plan.yearlyPrice !== plan.monthlyPrice && amount !== 0
      ? 'billed annually'
      : ''

  return {
    amount: amount === 0 ? '$0' : `$${amount}`,
    suffix: plan.priceSuffix,
    billed,
  }
}

function planCardClassName(planId: PricingPlan['id']) {
  const base = 'relative flex h-full flex-col rounded-[20px] p-5 sm:p-6 lg:p-7'

  if (planId === 'pro') {
    return `${base} border border-white/80 bg-white`
  }

  if (planId === 'business') {
    return `${base} border border-[#2A3040] bg-white`
  }

  if (planId === 'enterprise') {
    return `${base} border border-white/80 bg-[linear-gradient(138deg,#FFFFFF_0%,#AEC8FF_50%)]`
  }

  return `glass-panel ${base} !rounded-[20px] !p-5 sm:!p-6 lg:!p-7`
}

function getColumnsPerRow(width: number) {
  if (width >= 1280) return 4
  if (width >= 640) return 2
  return 1
}

/** Collapse key features on laptop and below; always expanded from large laptop (xl+) up. */
function shouldCollapseFeatures(width: number) {
  return width < 1280
}

function PlanFeatureBody({ plan }: { plan: PricingPlan }) {
  return (
    <div className="space-y-5 pt-4">
      <p className="text-[13px] font-medium text-[#2A3040]">{plan.featureHeading}</p>
      {plan.featureSections.map((section) => (
        <div key={section.id}>
          {section.heading ? (
            <p className="mb-2.5 flex items-center gap-2 text-[12px] font-semibold tracking-wide text-[#2A3040] uppercase">
              {section.icon ? (
                <span className="text-[#6A758C]">
                  <PlanFeatureSectionIcon icon={section.icon} />
                </span>
              ) : null}
              {section.heading}
            </p>
          ) : null}
          <ul className="space-y-2.5">
            {section.items.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-[13px] leading-snug text-[#4A5568]"
              >
                <span className="mt-0.5 text-[#2A3040]">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function PricingCards({ plans, billing }: PricingCardsProps) {
  const [columnsPerRow, setColumnsPerRow] = useState(1)
  const [collapseEnabled, setCollapseEnabled] = useState(true)
  const [openByPlanId, setOpenByPlanId] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth
      setColumnsPerRow(getColumnsPerRow(width))
      setCollapseEnabled(shouldCollapseFeatures(width))
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  const toggleRowForPlan = (planIndex: number) => {
    const planId = plans[planIndex]?.id
    if (!planId) return

    const rowStart = Math.floor(planIndex / columnsPerRow) * columnsPerRow
    const rowPlanIds = plans.slice(rowStart, rowStart + columnsPerRow).map((plan) => plan.id)
    const nextOpen = !openByPlanId[planId]

    setOpenByPlanId((prev) => {
      const next = { ...prev }
      for (const id of rowPlanIds) {
        next[id] = nextOpen
      }
      return next
    })
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 pt-3 sm:mt-10 sm:grid-cols-2 xl:mt-12 xl:grid-cols-4 xl:gap-4">
      {plans.map((plan, planIndex) => {
        const price = formatPrice(plan, billing)
        const isRecommended = Boolean(plan.recommended)
        const isOpen = !collapseEnabled || Boolean(openByPlanId[plan.id])

        return (
          <article key={plan.id} className={planCardClassName(plan.id)}>
            {isRecommended && plan.recommendedLabel ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#2A3040] px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-white uppercase">
                {plan.recommendedLabel}
              </span>
            ) : null}

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="text-[20px] font-semibold text-[#2A3040] sm:text-[22px] lg:text-[24px]">
                  {plan.name}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6A758C] sm:line-clamp-3 sm:min-h-[calc(3*1.625em)] sm:text-[14px]">
                  {plan.description}
                </p>
              </div>
              {plan.icon !== 'none' ? (
                <span className="mt-0.5 shrink-0">
                  <PlanIconMark icon={plan.icon} />
                </span>
              ) : null}
            </div>

            <div className="mt-5 sm:mt-6">
              <p className="lao-mn text-[26px] leading-none tracking-normal text-[#2A3040] sm:text-[32px]">
                {price.amount}
              </p>
              {price.suffix ? (
                <p className="mt-2 text-[12px] text-[#6A758C]">{price.suffix}</p>
              ) : (
                <p className="mt-2 hidden text-[12px] text-transparent sm:block">.</p>
              )}
              <p
                className={`mt-1 text-[11px] ${
                  price.billed ? 'text-[#6A758C]' : 'hidden text-transparent sm:block'
                }`}
              >
                {price.billed || '.'}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2 xl:min-h-[84px]">
              <Link
                href={plan.cta.href}
                className="inline-flex w-full items-center justify-center rounded-[10px] bg-[#2A3040] px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#111a2e]"
              >
                {plan.cta.label}
              </Link>

              {plan.secondaryCta ? (
                <Link
                  href={plan.secondaryCta.href}
                  className="inline-flex w-full items-center justify-center rounded-[10px] border border-[#D5DAE3] bg-white/50 px-4 py-2 text-[13px] font-medium text-[#2A3040] transition-colors hover:bg-white/80"
                >
                  {plan.secondaryCta.label}
                </Link>
              ) : (
                <span
                  className="invisible hidden w-full items-center justify-center rounded-[10px] border px-4 py-2 text-[13px] xl:inline-flex"
                  aria-hidden
                >
                  Placeholder
                </span>
              )}
            </div>

            <div className="mt-6 border-t border-[#E8EBF0] pt-4">
              {collapseEnabled ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggleRowForPlan(planIndex)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <span className="text-[13px] font-medium text-[#2A3040]">Key Feature</span>
                    <ChevronIcon open={isOpen} className="h-4 w-4 text-[#6A758C]" />
                  </button>
                  {isOpen ? <PlanFeatureBody plan={plan} /> : null}
                </>
              ) : (
                <PlanFeatureBody plan={plan} />
              )}
            </div>

            <a
              href="#compare-features"
              className="mt-auto hidden pt-5 text-[13px] font-medium text-[#2A3040] underline decoration-[#C5CAD3] underline-offset-4 transition-colors hover:decoration-[#2A3040] xl:inline"
            >
              {plan.learnMoreLabel}
            </a>
          </article>
        )
      })}
    </div>
  )
}
