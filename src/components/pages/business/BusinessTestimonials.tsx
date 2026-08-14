import type { BusinessTestimonial } from '@/lib/business/types'

type BusinessTestimonialsProps = {
  title: string
  items: BusinessTestimonial[]
  headingId?: string
}

export default function BusinessTestimonials({
  title,
  items,
  headingId = 'testimonials-heading',
}: BusinessTestimonialsProps) {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-10 lg:py-16" aria-labelledby={headingId}>
      <div className="mx-auto max-w-[1350px]">
        <h2
          id={headingId}
          className="title-heading-normal !text-[26px] text-[#2A3040] sm:!text-[32px]"
        >
          {title}
        </h2>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-3">
          {items.map((item) => (
            <blockquote
              key={item.id}
              className="glass-panel flex h-full flex-col !rounded-[16px] !p-5 sm:!p-6"
            >
              <p className="flex-1 text-[14px] leading-relaxed text-[#4A5568] sm:text-[15px]">“{item.quote}”</p>
              <div className="mt-5 border-t border-[#2A3040]/10 pt-4 sm:mt-6">
                <p className="text-[13px] font-semibold text-[#2A3040]">{item.role}</p>
                <p className="mt-0.5 text-[12px] text-[#6A758C]">{item.company}</p>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
