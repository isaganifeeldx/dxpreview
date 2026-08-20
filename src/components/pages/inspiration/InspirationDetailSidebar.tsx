import Image from 'next/image'
import Link from 'next/link'
import type { InspirationCta, InspirationItem } from '@/lib/inspiration/types'

type InspirationDetailSidebarProps = {
  title: string
  cta: InspirationCta
  relatedItems: InspirationItem[]
}

export default function InspirationDetailSidebar({
  title,
  cta,
  relatedItems,
}: InspirationDetailSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-[16px] border border-[#ECEEF2] bg-white p-5 shadow-[0_8px_24px_rgba(42,48,64,0.06)] sm:p-6">
        <h2 className="title-heading-normal text-[18px] leading-snug text-[#2A3040] sm:text-[20px]">
          {title}
        </h2>

        <Link
          href={cta.href}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-5 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-primary-700 sm:text-[14px]"
        >
          {cta.label}
        </Link>

        {relatedItems.length > 0 ? (
          <div className="mt-8 border-t border-[#ECEEF2] pt-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A909C]">
              More like this
            </p>

            <ul className="mt-4 space-y-4">
              {relatedItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/inspiration/${item.slug}`}
                    className="group flex gap-3 rounded-[12px] outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#2A3040]/30 focus-visible:ring-offset-2"
                  >
                    <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[10px] bg-[#E8ECF2]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="72px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-[14px] font-semibold leading-snug text-[#2A3040] line-clamp-2">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-[#696969] line-clamp-2">
                        {item.overview}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </aside>
  )
}
