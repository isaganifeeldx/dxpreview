import type { BusinessCta } from '@/lib/business/types'

type BusinessClosingCtaProps = {
  title: string
  primaryCta: BusinessCta
  secondaryCta: BusinessCta
}

export default function BusinessClosingCta({
  title,
  primaryCta,
  secondaryCta,
}: BusinessClosingCtaProps) {
  return (
    <section className="px-4 pb-10 sm:px-6 lg:px-10 lg:pb-16">
      <div className="mx-auto flex max-w-[1350px] flex-col items-center rounded-[20px] bg-white px-5 py-10 text-center sm:rounded-[24px] sm:px-10 sm:py-20">
        <h2 className="title-heading-normal max-w-[720px] !text-[26px] text-[#2A3040] sm:!text-[32px]">
          {title}
        </h2>
        <div className="mt-6 flex w-full flex-col items-center gap-2 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <a
            href={primaryCta.href}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#2A3040] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#111a2e] sm:w-fit"
          >
            {primaryCta.label}
          </a>
          <a
            href={secondaryCta.href}
            className="inline-flex w-full items-center justify-center rounded-full border border-[#000000]/20 bg-white px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#2A3040] transition-colors hover:bg-[#111a2e] hover:text-white sm:w-fit"
          >
            {secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  )
}
