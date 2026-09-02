import Image from 'next/image'
import Link from 'next/link'
import type { InteriorsCapabilityCard } from '@/lib/interiors/types'

type InteriorsCapabilityGridProps = {
  title: string
  subtitle: string
  items: InteriorsCapabilityCard[]
  footerLink: { label: string; href: string }
}

function CustomTemplatePreview() {
  return (
    <div className="flex aspect-[16/10] items-center justify-center rounded-[12px] border-2 border-dashed border-[#2A3040]/15 bg-white/50 sm:aspect-auto sm:min-h-[220px] sm:flex-1 sm:rounded-[16px]">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden className="text-[#6A758C]">
        <path
          d="M16 8v16M8 16h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

function CapabilityCard({ item }: { item: InteriorsCapabilityCard }) {
  const spanClass = item.span === 'wide' ? 'lg:col-span-2' : ''
  const isCustom = item.variant === 'custom'

  return (
    <article
      className={`glass-panel group flex h-full flex-col overflow-hidden !rounded-[16px] !p-4 sm:!rounded-[20px] sm:!p-5 lg:!rounded-[24px] lg:!p-6 ${spanClass}`}
    >
      <div className="relative z-10 flex h-full flex-1 flex-col">
        {isCustom ? (
          <CustomTemplatePreview />
        ) : (
          <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] sm:aspect-auto sm:min-h-[220px] sm:flex-1 sm:rounded-[16px]">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}

        <div className="mt-4 shrink-0 sm:mt-5 lg:mt-6">
          <h3 className="text-[16px] font-semibold leading-tight text-[#2A3040] sm:text-[18px]">{item.title}</h3>
          <p className="mt-1.5 text-[12px] leading-relaxed text-[#6A758C] sm:mt-2 sm:text-[13px]">{item.description}</p>
        </div>
      </div>
    </article>
  )
}

export default function InteriorsCapabilityGrid({
  title,
  subtitle,
  items,
  footerLink,
}: InteriorsCapabilityGridProps) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1350px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="title-heading-normal !text-[32px] text-[#2A3040]">
            {title}
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6A758C] sm:mt-4 sm:text-[16px]">{subtitle}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:mt-12 lg:auto-rows-fr lg:grid-cols-3">
          {items.map((item) => (
            <CapabilityCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-8 text-center sm:mt-10">
          <Link
            href={footerLink.href}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#6A758C] transition-colors hover:text-[#2A3040]"
          >
            {footerLink.label}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
