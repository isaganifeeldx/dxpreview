import Image from 'next/image'
import Link from 'next/link'
import type { SpaceSenseHowToSection } from '@/lib/spacesense/types'

type SpaceSenseHowToProps = {
  section: SpaceSenseHowToSection
}

export default function SpaceSenseHowTo({ section }: SpaceSenseHowToProps) {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1350px]">
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="title-heading-normal !text-[24px] leading-tight text-[#2A3040] sm:!text-[28px] lg:!text-[32px]">
            {section.title}
          </h2>
          <div className="mt-6 sm:mt-8">
            <Link
              href={section.cta.href}
              className="inline-flex items-center justify-center rounded-full bg-[#2A3040] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#111a2e]"
            >
              {section.cta.label}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3">
          {section.steps.map((step) => (
            <article key={step.id} className="glass-panel flex h-full flex-col !rounded-[16px] !p-4 sm:!p-5">
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5B6C9A]">
                  Step {step.step}
                </p>
                <h3 className="mt-2 text-[16px] font-semibold leading-snug text-[#2A3040] sm:text-[17px]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6A758C]">{step.description}</p>
              </div>
              <div className="relative mt-4 aspect-[16/10] shrink-0 overflow-hidden rounded-[12px] sm:mt-5 sm:rounded-[14px]">
                <Image
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
