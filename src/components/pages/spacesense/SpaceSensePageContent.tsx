import Image from 'next/image'
import Link from 'next/link'
import BusinessClosingCta from '@/components/pages/business/BusinessClosingCta'
import FaqAccordion from '@/components/ui/FaqAccordion'
import SpaceSenseHowTo from '@/components/pages/spacesense/SpaceSenseHowTo'
import SpaceSenseModelShowcase from '@/components/pages/spacesense/SpaceSenseModelShowcase'
import type { SpaceSensePageContentData } from '@/lib/spacesense/types'

type SpaceSensePageContentProps = {
  content: SpaceSensePageContentData
}

export default function SpaceSensePageContent({ content }: SpaceSensePageContentProps) {
  const { hero, models, whatIs, howTo, faq, closing } = content

  const faqItems = faq.items.map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
    category: 'general' as const,
  }))

  return (
    <div className="min-h-screen overflow-x-hidden">
      <section className="relative isolate overflow-hidden px-4 pb-44 pt-10 sm:flex sm:min-h-[calc(100dvh-var(--site-header-height,60px))] sm:items-start sm:px-6 sm:pb-16 sm:pt-16 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={hero.imageSrc}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-contain object-bottom sm:object-center"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[72%] bg-gradient-to-b from-[#FAFBFD] from-40% via-[#FAFBFD]/92 via-70% to-transparent sm:hidden"
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-[860px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2A3040] sm:text-[12px] sm:tracking-[0.22em]">
            {hero.eyebrow}
          </p>
          <h1 className="title-heading-normal mt-2 !text-[28px] leading-[1.15] text-[#2A3040] sm:mt-4 sm:!text-[40px] lg:!text-[56px]">
            {hero.title}
          </h1>
          <p className="mx-auto mt-3 max-w-[620px] text-[14px] leading-relaxed text-[#2A3040] sm:mt-5 sm:text-[17px]">
            {hero.description}
          </p>
          <div className="mx-auto mt-5 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-[#2A3040] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#111a2e]"
            >
              {hero.primaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <SpaceSenseModelShowcase section={models} />

      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1350px] items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <h2 className="title-heading-normal !text-[24px] leading-tight text-[#2A3040] sm:!text-[28px] lg:!text-[32px]">
              {whatIs.title}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#6A758C] sm:mt-4 sm:text-[16px]">
              {whatIs.description}
            </p>
            <div className="mt-6 sm:mt-8">
              <Link
                href={whatIs.cta.href}
                className="inline-flex items-center justify-center rounded-full bg-[#2A3040] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#111a2e]"
              >
                {whatIs.cta.label}
              </Link>
            </div>
          </div>

          <div className="relative order-1 overflow-hidden rounded-[16px] border border-white/70 shadow-[0_20px_60px_rgba(148,184,214,0.18)] sm:rounded-[20px] lg:order-2">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <Image
                src={whatIs.imageSrc}
                alt={whatIs.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <SpaceSenseHowTo section={howTo} />

      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[860px]">
          <h2 className="title-heading-normal text-center !text-[24px] leading-tight text-[#2A3040] sm:!text-[28px] lg:!text-[32px]">
            {faq.title}
          </h2>
          <div className="mt-8 sm:mt-10">
            <FaqAccordion items={faqItems} openFirst />
          </div>
        </div>
      </section>

      <BusinessClosingCta
        {...closing}
        variant="glass"
        titleClassName="!text-[24px] leading-tight sm:!text-[28px] lg:!text-[32px]"
      />
    </div>
  )
}
