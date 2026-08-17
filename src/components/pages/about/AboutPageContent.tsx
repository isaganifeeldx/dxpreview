import Image from 'next/image'
import Link from 'next/link'
import type { AboutPageContentData } from '@/lib/about/types'
import AboutCultureSlider from './AboutCultureSlider'
import AboutVoicesCarousel from './AboutVoicesCarousel'
import { AboutPerkGlyph } from './icons'

const siteGradient =
  'radial-gradient(1200px 520px at 12% -10%, rgba(174,200,255,0.45), transparent 60%), radial-gradient(900px 480px at 90% 10%, rgba(241,245,255,0.9), transparent 55%)'

const primaryButtonClass =
  'inline-flex w-fit items-center justify-center rounded-full bg-[#2A3040] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#111a2e]'

type AboutPageContentProps = {
  content: AboutPageContentData
}

export default function AboutPageContent({ content }: AboutPageContentProps) {
  const { hero, mission, culture, locations, voices, perks } = content

  return (
    <div className="min-h-screen overflow-x-clip">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-12 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />
        <div className="mx-auto max-w-[980px] text-center">
          <h1 className="title-heading-normal !text-[26px] leading-[1.15] text-[#2A3040] sm:!text-[32px]">
            {hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[640px] text-[14px] leading-relaxed text-[#6A758C] sm:mt-5 sm:text-[16px]">
            {hero.description}
          </p>
          <div className="mt-6 flex justify-center sm:mt-8">
            <Link href={hero.cta.href} className={primaryButtonClass}>
              {hero.cta.label}
            </Link>
          </div>
        </div>

        {/* Mobile / tablet: balanced 2-col collage */}
        <div className="mx-auto mt-10 grid max-w-[1052px] grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:hidden">
          {hero.images.slice(0, 4).map((image) => (
            <div key={image.src + image.alt} className="relative aspect-[4/5] overflow-hidden rounded-[16px] sm:rounded-[20px]">
              <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="50vw" />
            </div>
          ))}
          {hero.images[4] ? (
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-[16px] sm:rounded-[20px]">
              <Image
                src={hero.images[4].src}
                alt={hero.images[4].alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ) : null}
        </div>

        {/* Desktop: staggered bento */}
        <div className="mx-auto mt-14 hidden max-w-[1052px] grid-cols-4 gap-4 lg:grid lg:grid-rows-[minmax(220px,260px)_minmax(220px,260px)]">
          <div className="relative row-span-2 overflow-hidden rounded-[20px]">
            <Image src={hero.images[0]?.src ?? ''} alt={hero.images[0]?.alt ?? ''} fill className="object-cover" sizes="25vw" />
          </div>
          <div className="relative col-span-2 overflow-hidden rounded-[20px]">
            <Image src={hero.images[1]?.src ?? ''} alt={hero.images[1]?.alt ?? ''} fill className="object-cover" sizes="50vw" />
          </div>
          <div className="relative overflow-hidden rounded-[20px]">
            <Image src={hero.images[2]?.src ?? ''} alt={hero.images[2]?.alt ?? ''} fill className="object-cover" sizes="25vw" />
          </div>
          <div className="relative overflow-hidden rounded-[20px]">
            <Image src={hero.images[3]?.src ?? ''} alt={hero.images[3]?.alt ?? ''} fill className="object-cover" sizes="25vw" />
          </div>
          <div className="relative col-span-2 overflow-hidden rounded-[20px]">
            <Image src={hero.images[4]?.src ?? ''} alt={hero.images[4]?.alt ?? ''} fill className="object-cover" sizes="50vw" />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />
        <div className="mx-auto grid max-w-[1350px] items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5B6C9A] sm:text-[12px]">
              {mission.eyebrow}
            </p>
            <h2 className="title-heading-normal mt-3 !text-[26px] leading-tight text-[#2A3040] sm:!text-[32px]">
              {mission.title}
            </h2>
            <div className="mx-auto mt-5 max-w-[560px] space-y-4 text-[14px] leading-relaxed text-[#6A758C] sm:text-[15px] lg:mx-0">
              {mission.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-[16px] sm:rounded-[20px] lg:mx-0 lg:max-w-none lg:aspect-[5/4]">
            <Image
              src={mission.image.src}
              alt={mission.image.alt}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="relative overflow-hidden py-12 sm:py-14 lg:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />
        <div className="mx-auto max-w-[820px] px-4 text-center sm:px-6 lg:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5B6C9A] sm:text-[12px]">
            {culture.eyebrow}
          </p>
          <h2 className="title-heading-normal mt-3 !text-[26px] leading-tight text-[#2A3040] sm:!text-[32px]">
            {culture.title}
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-[#6A758C] sm:mt-5 sm:text-[15px]">{culture.description}</p>
        </div>
        <AboutCultureSlider images={culture.images} />
      </section>

      {/* Locations */}
      <section className="bg-[#F7F8FB] px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5B6C9A] sm:text-[12px]">
            {locations.eyebrow}
          </p>
          <h2 className="title-heading-normal mt-3 !text-[26px] text-[#2A3040] sm:!text-[32px]">
            {locations.title}
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-[#6A758C] sm:text-[15px]">{locations.description}</p>
          <div className="mt-6 flex justify-center sm:mt-7">
            <Link href={locations.cta.href} className={primaryButtonClass}>
              {locations.cta.label}
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-8 grid max-w-[1350px] grid-cols-2 gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-4">
          {locations.items.map((item) => (
            <article key={item.id}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] sm:rounded-[16px]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="mt-2.5 text-[14px] font-semibold text-[#2A3040] sm:mt-3 sm:text-[15px]">{item.name}</h3>
              <p className="mt-0.5 text-[12px] text-[#6A758C] sm:text-[13px]">{item.role}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Voices */}
      <section className="overflow-hidden bg-[#F7F8FB] px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1350px] items-start gap-8 lg:grid-cols-12 lg:gap-4">
          <div className="text-center lg:col-span-4 lg:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5B6C9A] sm:text-[12px]">
              {voices.eyebrow}
            </p>
            <h2 className="title-heading-normal mt-3 !text-[26px] text-[#2A3040] sm:!text-[32px]">
              {voices.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[420px] text-[14px] leading-relaxed text-[#6A758C] sm:text-[15px] lg:mx-0 lg:max-w-[380px]">
              {voices.description}
            </p>
            <div className="mt-6 flex justify-center sm:mt-7 lg:justify-start">
              <Link href={voices.cta.href} className={primaryButtonClass}>
                {voices.cta.label}
              </Link>
            </div>
          </div>
          <div className="relative -mx-4 min-w-0 sm:-mx-6 lg:col-span-8 lg:mx-0">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#F7F8FB] via-[#F7F8FB]/85 to-transparent sm:w-16 lg:w-24"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#F7F8FB] to-transparent sm:w-14 lg:w-20"
              aria-hidden
            />
            <AboutVoicesCarousel items={voices.items} />
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: siteGradient }} />
        <div className="mx-auto max-w-[820px] text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5B6C9A] sm:text-[12px]">
            {perks.eyebrow}
          </p>
          <h2 className="title-heading-normal mt-3 !text-[26px] text-[#2A3040] sm:!text-[32px]">
            {perks.title}
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-[#6A758C] sm:text-[15px]">{perks.description}</p>
          <div className="mt-6 flex justify-center sm:mt-7">
            <Link href={perks.cta.href} className={primaryButtonClass}>
              {perks.cta.label}
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-[1100px] flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
          {perks.items.map((item) => (
            <article
              key={item.id}
              className="glass-panel w-full !rounded-[16px] !p-5 sm:w-[calc(50%-0.5rem)] sm:!p-6 lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-3rem)/4)]"
            >
              <AboutPerkGlyph icon={item.icon} />
              <h3 className="mt-4 text-[15px] font-semibold text-[#2A3040]">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6A758C]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
