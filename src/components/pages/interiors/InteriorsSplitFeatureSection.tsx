import Image from 'next/image'
import type { InteriorsSplitFeature } from '@/lib/interiors/types'

const CheckIcon = () => (
  <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#2A3040]" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M13.3333 4L6 11.3333L2.66667 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

type InteriorsSplitFeatureSectionProps = {
  feature: InteriorsSplitFeature
}

export default function InteriorsSplitFeatureSection({ feature }: InteriorsSplitFeatureSectionProps) {
  const imageFirst = feature.imagePosition === 'left'

  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[1350px] items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
        <div
          className={`order-1 overflow-hidden rounded-[16px] border border-white/70 bg-white shadow-[0_20px_60px_rgba(148,184,214,0.18)] sm:rounded-[20px] lg:rounded-[24px] ${
            imageFirst ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div className="relative aspect-[16/10] w-full sm:aspect-[4/3]">
            <Image
              src={feature.imageSrc}
              alt={feature.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div
          className={`order-2 flex flex-col justify-center ${imageFirst ? 'lg:order-2' : 'lg:order-1'}`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5B6C9A] sm:text-[12px] sm:tracking-[0.22em]">
            {feature.eyebrow}
          </p>
          <h2 className="title-heading-normal mt-2 !text-[32px] leading-tight text-[#2A3040] sm:mt-3">
            {feature.title}
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6A758C] sm:mt-4 sm:text-[16px]">
            {feature.description}
          </p>
          <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
            {feature.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[#4A5568] sm:gap-3 sm:text-[14px]"
              >
                <CheckIcon />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
