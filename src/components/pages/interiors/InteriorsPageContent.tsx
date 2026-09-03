import Link from 'next/link'
import BusinessClosingCta from '@/components/pages/business/BusinessClosingCta'
import BusinessFeatures from '@/components/pages/business/BusinessFeatures'
import BusinessTestimonials from '@/components/pages/business/BusinessTestimonials'
import InteriorsCapabilityBar from '@/components/pages/interiors/InteriorsCapabilityBar'
import InteriorsCapabilityGrid from '@/components/pages/interiors/InteriorsCapabilityGrid'
import InteriorsComparison from '@/components/pages/interiors/InteriorsComparison'
import InteriorsSplitFeatureSection from '@/components/pages/interiors/InteriorsSplitFeatureSection'
import type { InteriorsPageContentData } from '@/lib/interiors/types'

const primaryButtonClass =
  'inline-flex items-center justify-center rounded-full bg-[#2A3040] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#111a2e]'

const outlineButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-full border border-[#2A3040]/20 bg-white px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#2A3040] transition-colors hover:bg-[#2A3040] hover:text-white'

type InteriorsPageContentProps = {
  content: InteriorsPageContentData
}

export default function InteriorsPageContent({ content }: InteriorsPageContentProps) {
  const {
    hero,
    capabilityPills,
    splitFeatures,
    capabilityGrid,
    comparison,
    stats,
    testimonials,
    features,
    closing,
  } = content

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-8 pb-8 sm:px-6 sm:pt-10 lg:px-10 lg:pt-16 lg:pb-12">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(1200px 520px at 50% -10%, rgba(174,200,255,0.45), transparent 60%), radial-gradient(900px 480px at 90% 20%, rgba(241,245,255,0.9), transparent 55%)',
          }}
        />
        <div className="mx-auto max-w-[860px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5B6C9A] sm:text-[12px] sm:tracking-[0.22em]">
            {hero.eyebrow}
          </p>
          <h1 className="title-heading-normal mt-3 !text-[28px] leading-[1.15] text-[#2A3040] sm:mt-4 sm:!text-[40px] lg:!text-[56px]">
            {hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[620px] text-[14px] leading-relaxed text-[#6A758C] sm:mt-5 sm:text-[17px]">
            {hero.description}
          </p>
          <div className="mx-auto mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:justify-center">
            <Link href={hero.primaryCta.href} className={`${primaryButtonClass} w-full sm:w-auto`}>
              {hero.primaryCta.label}
            </Link>
            <Link href={hero.secondaryCta.href} className={`${outlineButtonClass} w-full sm:w-auto`}>
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <InteriorsCapabilityBar eyebrow={capabilityPills.eyebrow} items={capabilityPills.items} />

      {splitFeatures[0] ? (
        <InteriorsSplitFeatureSection feature={splitFeatures[0]} />
      ) : null}

      <InteriorsCapabilityGrid
        title={capabilityGrid.title}
        subtitle={capabilityGrid.subtitle}
        items={capabilityGrid.items}
        footerLink={capabilityGrid.footerLink}
      />

      {splitFeatures.slice(1).map((feature) => (
        <InteriorsSplitFeatureSection key={feature.id} feature={feature} />
      ))}

      {/* Comparison */}
      <InteriorsComparison
        title={comparison.title}
        subtitle={comparison.subtitle}
        oldWay={comparison.oldWay}
        newWay={comparison.newWay}
      />

      {/* Stats */}
      <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 md:grid-cols-4 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.id} className="px-1 text-center sm:px-0">
                <p className="lao-mn text-[24px] leading-none text-[#2A3040] sm:text-[32px] md:text-[36px]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] uppercase leading-snug tracking-[0.12em] text-[#6A758C] sm:text-[12px] sm:tracking-[0.14em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BusinessTestimonials
        title={testimonials.title}
        items={testimonials.items}
        headingId="interiors-testimonials-heading"
        titleClassName="!text-[32px]"
      />
      <BusinessFeatures
        eyebrow={features.eyebrow}
        title={features.title}
        items={features.items}
        headingId="interiors-features-heading"
        titleClassName="!text-[32px]"
      />
      <BusinessClosingCta {...closing} variant="glass" titleClassName="!text-[32px]" />
    </div>
  )
}
