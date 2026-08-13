'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { BillingCycle, PricingPageContentData } from '@/lib/pricing/types'
import BillingToggle from './BillingToggle'
import FeatureComparison from './FeatureComparison'
import PricingCards from './PricingCards'
import PricingFaq from './PricingFaq'
import PromoBanners from './PromoBanners'

type PricingPageContentProps = {
  content: PricingPageContentData
}

export default function PricingPageContent({ content }: PricingPageContentProps) {
  const [billing, setBilling] = useState<BillingCycle>('yearly')

  return (
    <div className="min-h-screen">
      <section className="px-4 pt-8 pb-4 sm:px-6 lg:px-10 lg:pt-14" aria-labelledby="pricing-heading">
        <div className="mx-auto max-w-[1350px]">
          <h1
            id="pricing-heading"
            className="title-heading-normal text-center text-[26px] text-[#2A3040] sm:text-[32px]"
          >
            {content.title}
          </h1>
          <BillingToggle
            value={billing}
            monthlyLabel={content.billing.monthlyLabel}
            yearlyLabel={content.billing.yearlyLabel}
            yearlyBadge={content.billing.yearlyBadge}
            onChange={setBilling}
          />
          <PricingCards plans={content.plans} billing={billing} />

          {content.planFootnotes.length > 0 ? (
            <div className="mx-auto mt-8 max-w-[920px] space-y-3 px-1 text-center sm:mt-10">
              {content.planFootnotes.map((note) => (
                <p key={note} className="text-[11px] leading-relaxed text-[#6A758C] sm:text-[13px]">
                  {note}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <div className="hidden xl:block">
        <FeatureComparison
          title={content.comparison.title}
          categories={content.comparison.categories}
          plans={content.plans}
        />
      </div>

      <section className="px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
        <div className="glass-panel mx-auto max-w-[1100px] !rounded-[16px] !p-6 text-center sm:!p-8 lg:!p-10">
          <p className="text-[14px] text-[#6A758C] sm:text-[16px]">{content.socialProof.title}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 opacity-70 grayscale sm:mt-8 sm:gap-x-12 sm:gap-y-5">
            {content.socialProof.logos.map((logo) =>
              logo.imageSrc ? (
                <Image
                  key={logo.name}
                  src={logo.imageSrc}
                  alt={logo.name}
                  width={180}
                  height={32}
                  className="h-6 w-auto max-w-[140px] object-contain sm:h-8 sm:max-w-[180px]"
                />
              ) : (
                <span
                  key={logo.name}
                  className="lao-mn text-[15px] tracking-[0.08em] text-[#6A758C] sm:text-[20px]"
                >
                  {logo.mark}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <PromoBanners promos={content.promos} />
      <PricingFaq title={content.faq.title} items={content.faq.items} />
    </div>
  )
}
