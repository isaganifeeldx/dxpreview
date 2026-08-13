import Link from 'next/link'
import type { PromoBanner } from '@/lib/pricing/types'

export default function PromoBanners({ promos }: { promos: PromoBanner[] }) {
  return (
    <section className="px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1350px] gap-5 lg:grid-cols-2">
        {promos.map((promo) => (
          <article
            key={promo.id}
            className="overflow-hidden rounded-[20px] border border-[#E2E6EE] bg-white p-5 sm:p-7 lg:p-8"
          >
            <div className="max-w-[420px]">
              <h3 className="text-[20px] leading-snug font-semibold text-[#2A3040] sm:text-[22px] lg:text-[26px]">
                {promo.title}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-[#6A758C] sm:text-[14px]">{promo.description}</p>
              <Link
                href={promo.cta.href}
                className="mt-5 inline-flex text-[14px] font-medium text-[#2A3040] underline decoration-[#C5CAD3] underline-offset-4 hover:decoration-[#2A3040]"
              >
                {promo.cta.label}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
