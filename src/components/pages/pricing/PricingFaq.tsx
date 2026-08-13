'use client'

import { useState } from 'react'
import type { PricingFaqItem } from '@/lib/pricing/types'
import { ChevronIcon } from './icons'

type PricingFaqProps = {
  title: string
  items: PricingFaqItem[]
}

export default function PricingFaq({ title, items }: PricingFaqProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-10 lg:py-16" aria-labelledby="pricing-faq-heading">
      <div className="glass-panel mx-auto grid max-w-[1350px] gap-6 !rounded-[16px] !p-5 sm:gap-8 sm:!p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-16 lg:!p-10">
        <h2
          id="pricing-faq-heading"
          className="title-heading-normal max-w-none text-[26px] leading-tight text-[#2A3040] sm:max-w-[280px] sm:text-[32px]"
        >
          {title}
        </h2>

        <div className="divide-y divide-[#E5E5E5] border-t border-[#E5E5E5]">
          {items.map((item) => {
            const isOpen = openId === item.id
            return (
              <details
                key={item.id}
                className="group py-4 sm:py-5"
                open={isOpen}
                onToggle={(event) => {
                  const el = event.currentTarget
                  if (el.open) {
                    setOpenId(item.id)
                  } else if (openId === item.id) {
                    setOpenId(null)
                  }
                }}
              >
                <summary className="faq-summary flex w-full cursor-pointer list-none items-start justify-between gap-3 text-left sm:gap-4">
                  <span
                    className={`text-[15px] leading-snug sm:text-[16px] md:text-[18px] ${
                      isOpen ? 'font-semibold text-[#2A3040]' : 'font-normal text-[#2A3040]'
                    }`}
                  >
                    {item.question}
                  </span>
                  <ChevronIcon open={isOpen} className="mt-1 h-4 w-4 shrink-0 text-[#6A758C]" />
                </summary>
                <p className="mt-3 pr-4 text-[14px] leading-relaxed text-[#6A758C] sm:mt-4 sm:max-w-[640px] sm:pr-8 sm:text-[15px]">
                  {item.answer}
                </p>
              </details>
            )
          })}
        </div>
      </div>
    </section>
  )
}
