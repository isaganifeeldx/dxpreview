import type { BusinessFeature } from '@/lib/business/types'
import { BusinessFeatureGlyph } from './icons'

type BusinessFeaturesProps = {
  eyebrow: string
  title: string
  items: BusinessFeature[]
  headingId?: string
  titleClassName?: string
}

export default function BusinessFeatures({
  eyebrow,
  title,
  items,
  headingId = 'features-heading',
  titleClassName = '!text-[26px] sm:!text-[32px]',
}: BusinessFeaturesProps) {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-10 lg:py-16" aria-labelledby={headingId}>
      <div className="mx-auto max-w-[1350px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5B6C9A] sm:text-[12px]">
          {eyebrow}
        </p>
        <h2
          id={headingId}
          className={`title-heading-normal mt-3 text-[#2A3040] ${titleClassName}`}
        >
          {title}
        </h2>
        <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item.id} className="glass-panel rounded-[16px] !p-4 sm:!p-6">
              <BusinessFeatureGlyph icon={item.icon} />
              <h3 className="mt-3 text-[15px] font-semibold text-[#2A3040] sm:mt-4 sm:text-[16px]">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6A758C]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
