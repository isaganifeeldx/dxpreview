import type { BusinessPageContentData } from '@/lib/business/types'
import BusinessClosingCta from './BusinessClosingCta'
import BusinessContactForm from './BusinessContactForm'
import BusinessFeatures from './BusinessFeatures'
import BusinessTestimonials from './BusinessTestimonials'

type BusinessPageContentProps = {
  content: BusinessPageContentData
}

export default function BusinessPageContent({ content }: BusinessPageContentProps) {
  const { hero, form, testimonials, features, closing } = content

  return (
    <div className="min-h-screen overflow-x-hidden">
      <section className="relative overflow-hidden px-4 pt-8 pb-10 sm:px-6 lg:px-10 lg:pt-16 lg:pb-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(1200px 520px at 12% -10%, rgba(174,200,255,0.45), transparent 60%), radial-gradient(900px 480px at 90% 10%, rgba(241,245,255,0.9), transparent 55%)',
          }}
        />
        <div className="mx-auto grid max-w-[1350px] items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5B6C9A] sm:text-[12px]">
              {hero.eyebrow}
            </p>
            <h1 className="title-heading-normal max-w-[440px] mt-3 !text-[26px] leading-[1.2] text-[#2A3040] sm:mt-4 sm:!text-[48px] lg:!text-[56px]">
              {hero.titleBefore}{' '}
              <span className="bg-[linear-gradient(183deg,#6A758C_0%,#6A758C_75%)] bg-clip-text text-transparent">
                {hero.titleAccent}
              </span>
            </h1>
            <p className="mt-4 max-w-[540px] text-[14px] leading-relaxed text-[#6A758C] sm:mt-5 sm:text-[17px]">
              {hero.description}
            </p>
            <div className="mt-6 grid max-w-[560px] grid-cols-3 gap-2 border-t border-[#2A3040]/10 pt-5 sm:mt-8 sm:gap-4 sm:pt-6">
              {hero.stats.map((stat) => (
                <div key={stat.id} className="min-w-0">
                  <p className="title-heading-normal !text-[18px] text-[#2A3040] sm:!text-[26px]">{stat.value}</p>
                  <p className="mt-1 text-[10px] leading-snug text-[#6A758C] sm:text-[13px]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="talk-to-team">
            <BusinessContactForm form={form} />
          </div>
        </div>
      </section>

      <BusinessTestimonials
        title={testimonials.title}
        items={testimonials.items}
        headingId="business-testimonials-heading"
      />
      <BusinessFeatures
        eyebrow={features.eyebrow}
        title={features.title}
        items={features.items}
        headingId="business-features-heading"
      />
      <BusinessClosingCta
        title={closing.title}
        primaryCta={closing.primaryCta}
        secondaryCta={closing.secondaryCta}
      />
    </div>
  )
}
