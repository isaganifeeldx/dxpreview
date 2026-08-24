import Image from 'next/image'
import Link from 'next/link'
import type { UserGuideCard, UserGuidePageContentData } from '@/lib/user-guide/types'

const siteGradient =
  'radial-gradient(1200px 520px at 12% -10%, rgba(174,200,255,0.45), transparent 60%), radial-gradient(900px 480px at 90% 10%, rgba(241,245,255,0.9), transparent 55%)'

const primaryButtonClass =
  'inline-flex w-full items-center justify-center rounded-full bg-[#2A3040] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#111a2e] sm:w-fit'

const outlineButtonClass =
  'inline-flex w-full items-center justify-center rounded-full border border-[#2A3040]/30 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#2A3040] transition-colors hover:bg-[#2A3040] hover:text-white sm:w-fit'

function CategoryTag({ category }: { category: string }) {
  return (
    <span className="mt-4 inline-flex w-fit rounded-full border border-[#000000]/20 px-2 py-0.5 text-[10px] tracking-wide text-[#8A909C]">
      {category}
    </span>
  )
}

function GuideCard({ guide }: { guide: UserGuideCard }) {
  return (
    <Link
      href={guide.href}
      className="group flex min-w-0 flex-col rounded-[16px] bg-white outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#2A3040]/30 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[16px]">
        <Image
          src={guide.image}
          alt={guide.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-[-15px] flex flex-col p-3 pt-7 sm:p-4 sm:pt-8">
        <h2 className="lao-mn text-[20px] leading-tight text-[#2A3040] sm:text-[22px] md:text-[24px]">
          {guide.title}
        </h2>
        <p className="mt-3 flex-1 text-[13px] leading-relaxed text-[#696969] line-clamp-3 sm:text-[15px]">
          {guide.description}
        </p>
        <CategoryTag category={guide.category} />
      </div>
    </Link>
  )
}

type UserGuidePageContentProps = {
  content: UserGuidePageContentData
}

export default function UserGuidePageContent({ content }: UserGuidePageContentProps) {
  const { hero, featured, guides, closing } = content

  return (
    <div className="min-h-screen overflow-x-clip">
      <section className="relative overflow-hidden px-4 pb-6 pt-8 sm:px-6 sm:pt-10 lg:px-10 lg:pb-8 lg:pt-14">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />

        <div className="mx-auto max-w-[820px] pb-6 text-center sm:pb-8">
          <h1 className="title-heading-normal !text-[26px] leading-[1.15] text-[#2A3040] sm:!text-[32px]">
            {hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[640px] text-[14px] leading-relaxed text-[#6A758C] sm:mt-5 sm:text-[16px]">
            {hero.description}
          </p>
        </div>

        <Link
          href={featured.href}
          className="glass-panel group mx-auto grid max-w-[1350px] items-center gap-6 !rounded-[16px] !p-4 outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#2A3040]/30 focus-visible:ring-offset-4 sm:gap-8 sm:!p-6 lg:grid-cols-2 lg:gap-10 lg:!p-6"
        >
          <div className="relative aspect-[16/11] overflow-hidden rounded-[16px] sm:rounded-[20px]">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="px-1 sm:px-2 lg:px-4">
            <h2 className="lao-mn text-[22px] leading-[1.15] tracking-tight text-[#2A3040] transition-colors md:text-[32px]">
              {featured.title}
            </h2>
            <p className="mt-3 text-[12px] tracking-wide text-[#8A909C]">{featured.meta}</p>
            <p className="mt-5 max-w-[480px] text-[13px] leading-relaxed text-[#696969] md:text-[16px]">
              {featured.description}
            </p>
            <CategoryTag category={featured.category} />
          </div>
        </Link>
      </section>

      <section className="relative overflow-hidden px-4 pb-8 sm:px-6 lg:px-10 lg:pb-10">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />
        <div className="glass-panel mx-auto max-w-[1350px] !rounded-[16px] !p-4 sm:!p-6 lg:!p-8">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
            {guides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 pb-12 sm:px-6 sm:pb-14 lg:px-10 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />
        <div className="glass-panel mx-auto flex max-w-[1350px] flex-col items-center !rounded-[16px] !px-5 !py-10 text-center sm:!px-10 sm:!py-16">
          <h2 className="title-heading-normal max-w-[720px] !text-[26px] text-[#2A3040] sm:!text-[32px]">
            {closing.title}
          </h2>
          <p className="mt-4 max-w-[720px] text-[14px] leading-relaxed text-[#6A758C] sm:text-[15px]">
            {closing.description}
          </p>
          <div className="mt-7 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href={closing.primaryCta.href} className={primaryButtonClass}>
              {closing.primaryCta.label}
            </Link>
            {closing.showSecondaryCta ? (
              <Link href={closing.secondaryCta.href} className={outlineButtonClass}>
                {closing.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
