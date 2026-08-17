import Image from 'next/image';
import Link from 'next/link';
import LividEmbed from '@/components/ui/LividEmbed';
import BusinessClosingCta from '@/components/pages/business/BusinessClosingCta';
import BusinessFeatures from '@/components/pages/business/BusinessFeatures';
import BusinessTestimonials from '@/components/pages/business/BusinessTestimonials';
import type { HomePageContentData, HomeProcessCard } from '@/lib/home/types';

const heroFeatureIcons = [
  (
    <svg
      key="surface"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="h-4 w-4"
      aria-hidden
    >
      <path
        d="M11 3.66667H11.6667C12.4033 3.66667 13 3.93 13 4.66667V6C13 6.35362 12.8595 6.69276 12.6095 6.94281C12.3594 7.19286 12.0203 7.33333 11.6667 7.33333H7C6.82319 7.33333 6.65362 7.40357 6.5286 7.5286C6.40357 7.65362 6.33333 7.82319 6.33333 8V13.3333C6.33333 13.5101 6.40357 13.6797 6.5286 13.8047C6.65362 13.9298 6.82319 14 7 14H7.66667M11 3.66667V2.66667C11 2.48986 10.9298 2.32029 10.8047 2.19526C10.6797 2.07024 10.5101 2 10.3333 2H3.66667C3.48986 2 3.32029 2.07024 3.19526 2.19526C3.07024 2.32029 3 2.48986 3 2.66667V4.66667C3 4.84348 3.07024 5.01305 3.19526 5.13807C3.32029 5.2631 3.48986 5.33333 3.66667 5.33333H10.3333C10.5101 5.33333 10.6797 5.2631 10.8047 5.13807C10.9298 5.01305 11 4.84348 11 4.66667V3.66667Z"
        stroke="#2A3040"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  (
    <svg
      key="cleanup"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="h-4 w-4"
      aria-hidden
    >
      <path
        d="M6.35533 8.43409C6.24259 8.54685 6.15317 8.68072 6.0922 8.82806C6.03123 8.97539 5.9999 9.1333 6 9.29276V11.0008H7.71867C8.04067 11.0008 8.35 10.8728 8.578 10.6448L13.6447 5.57542C13.7576 5.46272 13.8473 5.32883 13.9084 5.18143C13.9696 5.03403 14.0011 4.87601 14.0011 4.71642C14.0011 4.55684 13.9696 4.39882 13.9084 4.25142C13.8473 4.10402 13.7576 3.97013 13.6447 3.85742L13.144 3.35676C13.0313 3.24367 12.8974 3.15395 12.7499 3.09273C12.6024 3.03151 12.4443 3 12.2847 3C12.125 3 11.9669 3.03151 11.8194 3.09273C11.672 3.15395 11.5381 3.24367 11.4253 3.35676L6.35533 8.43409Z"
        stroke="#2A3040"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 9C14 11.8287 14 13.2427 13.1213 14.1213C12.2427 15 10.828 15 8 15C5.172 15 3.75733 15 2.87867 14.1213C2 13.2427 2 11.828 2 9C2 6.172 2 4.75733 2.87867 3.87867C3.75733 3 5.172 3 8 3"
        stroke="#2A3040"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  (
    <svg
      key="staging"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="h-[18px] w-[18px]"
      aria-hidden
    >
      <path
        d="M5.92308 7.40599L8.88499 8.88694M11.8469 7.40599V10.3679L8.88499 11.8488L5.92308 10.3679V7.40599L8.88499 5.92504L11.8469 7.40599ZM8.88499 8.88694L11.8469 7.40599M8.88499 8.88694V11.8488M6.95975 15.5512C5.30108 15.5512 4.47175 15.5512 3.8379 15.2284C3.28061 14.9444 2.82751 14.4913 2.54355 13.934C2.2207 13.3002 2.2207 12.4708 2.2207 10.8122M15.5493 10.8122C15.5493 12.4708 15.5493 13.3002 15.2264 13.934C14.9425 14.4913 14.4894 14.9444 13.9321 15.2284C13.2982 15.5512 12.4689 15.5512 10.8102 15.5512M10.8102 2.22266C12.4689 2.22266 13.2982 2.22266 13.9321 2.5455C14.4894 2.82947 14.9425 3.28256 15.2264 3.83986C15.5493 4.4737 15.5493 5.30304 15.5493 6.9617M6.95975 2.22266C5.30108 2.22266 4.47175 2.22266 3.8379 2.5455C3.28061 2.82947 2.82751 3.28256 2.54355 3.83986C2.2207 4.4737 2.2207 5.30304 2.2207 6.9617"
        stroke="#2A3040"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  (
    <svg
      key="renders"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="h-[18px] w-[18px]"
      aria-hidden
    >
      <path
        d="M15.4954 7.39981C10.6008 6.72746 6.38009 10.3617 6.66369 15.1822M4.8125 5.92626C4.8125 6.31904 4.96853 6.69572 5.24626 6.97346C5.52399 7.25119 5.90068 7.40722 6.29345 7.40722C6.68623 7.40722 7.06291 7.25119 7.34064 6.97346C7.61838 6.69572 7.7744 6.31904 7.7744 5.92626C7.7744 5.53349 7.61838 5.15681 7.34064 4.87907C7.06291 4.60134 6.68623 4.44531 6.29345 4.44531C5.90068 4.44531 5.52399 4.60134 5.24626 4.87907C4.96853 5.15681 4.8125 5.53349 4.8125 5.92626Z"
        stroke="#2A3040"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.2207 9.67754C4.27923 9.39246 6.12671 10.3869 7.12562 11.973"
        stroke="#2A3040"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.2207 6.9617C2.2207 5.30304 2.2207 4.4737 2.54355 3.83986C2.82751 3.28256 3.28061 2.82947 3.8379 2.5455C4.47175 2.22266 5.30108 2.22266 6.95975 2.22266H10.8102C12.4689 2.22266 13.2982 2.22266 13.9321 2.5455C14.4894 2.82947 14.9425 3.28256 15.2264 3.83986C15.5493 4.4737 15.5493 5.30304 15.5493 6.9617V10.8122C15.5493 12.4708 15.5493 13.3002 15.2264 13.934C14.9425 14.4913 14.4894 14.9444 13.9321 15.2284C13.2982 15.5512 12.4689 15.5512 10.8102 15.5512H6.95975C5.30108 15.5512 4.47175 15.5512 3.8379 15.2284C3.28061 14.9444 2.82751 14.4913 2.54355 13.934C2.2207 13.3002 2.2207 12.4708 2.2207 10.8122V6.9617Z"
        stroke="#2A3040"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
];

const GALLERY_COLUMN_COUNT = 4;

const primaryButtonClass =
  'w-fit md:w-auto inline-flex items-center justify-center rounded-full bg-[#2A3040] px-5 py-2.5 text-[10px] font-medium tracking-[0.18em] text-white uppercase transition-colors hover:bg-[#111a2e]';

function HeroAiLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="96"
      height="64"
      viewBox="0 0 102 69"
      fill="none"
      className="my-4 h-16 w-24"
      aria-label="AI"
      role="img"
    >
      <path d="M90.4023 1.51953H101.703V68.7136H90.4023V1.51953Z" fill="url(#paint0_linear_hero_ai)" />
      <path
        d="M49.4061 0L81.0268 68.7143H69.5238L59.2876 46.3163H30.4539L19.863 68.7143H14.1875L46.5683 0H49.4061ZM32.4302 41.9583H57.2099L44.9974 15.3543L32.4302 41.9583Z"
        fill="url(#paint1_linear_hero_ai)"
      />
      <path
        d="M12.9726 2.22656L17.1005 11.0713L25.9452 15.1992L17.1005 19.327L12.9726 28.1718L8.84475 19.327L0 15.1992L8.84475 11.0713L12.9726 2.22656Z"
        fill="url(#paint2_linear_hero_ai)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_hero_ai"
          x1="96.0525"
          y1="1.51953"
          x2="96.0525"
          y2="68.7136"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A3040" />
          <stop offset="1" stopColor="#6A758C" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_hero_ai"
          x1="47.6072"
          y1="0"
          x2="47.6072"
          y2="68.7143"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A3040" />
          <stop offset="1" stopColor="#6A758C" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_hero_ai"
          x1="12.9726"
          y1="2.22656"
          x2="12.9726"
          y2="28.1718"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A3040" />
          <stop offset="1" stopColor="#6A758C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ProcessCard({
  card,
  index,
}: {
  card: HomeProcessCard;
  index: number;
}) {
  const isRightColumn = index % 2 === 1;
  const numberOnRight = card.numberSide === 'right';

  return (
    <article className="glass-panel relative flex w-full flex-col !rounded-[22px] !bg-[#AEC8FF]/35 !p-5 sm:!rounded-[28px] sm:!p-6 md:!p-8">
      <div
        className={`relative z-10 flex items-start justify-between gap-3 sm:gap-4 ${
          numberOnRight ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        <h3
          className={`lao-mn min-w-0 text-[20px] leading-tight bg-gradient-to-b from-[#2A3040] to-[#6A758C] bg-clip-text text-transparent sm:text-[24px] md:text-[28px] !tracking-[0em] ${
            isRightColumn
              ? 'flex-1 text-left md:text-right'
              : 'max-w-[70%] text-left sm:max-w-[55%]'
          }`}
        >
          {card.title}
        </h3>
        <Image
          src={card.numberIcon}
          alt=""
          width={100}
          height={132}
          className="mt-[-40px] h-[72px] w-auto shrink-0 sm:mt-[-60px] sm:h-[100px] md:mt-[-80px] md:h-[120px]"
          aria-hidden
        />
      </div>

      <p
        className={`relative z-10 mt-3 w-full text-[13px] leading-6 text-[#4A5568] sm:text-[14px] md:text-[15px] ${
          isRightColumn
            ? 'text-left md:text-right'
            : index === 0
              ? 'max-w-[380px] text-left'
              : 'max-w-full text-left sm:max-w-[90%]'
        }`}
      >
        {card.description}
      </p>

      <div className="relative z-10 mt-5 overflow-hidden rounded-[14px] border border-white/70 bg-white shadow-[0_12px_32px_rgba(42,48,64,0.08)] sm:mt-6 sm:rounded-[18px]">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={card.imageSrc}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </article>
  );
}

type HomePageContentProps = {
  content: HomePageContentData;
};

export default function HomePageContent({ content }: HomePageContentProps) {
  const { hero, trust, process: processSection, discover, gallery, lessons } = content;

  const galleryColumns = Array.from({ length: GALLERY_COLUMN_COUNT }, (_, columnIndex) =>
    gallery.images.filter((_, index) => index % GALLERY_COLUMN_COUNT === columnIndex),
  );

  return (
    <>
      <section className="px-4 pb-12 pt-8 sm:px-6 lg:px-10 lg:pb-20 lg:pt-14">
        <div className="glass-panel mx-auto grid max-w-[1350px] items-stretch gap-4 !rounded-[16px] !p-4 sm:gap-6 sm:!p-6 xl:grid-cols-[auto_minmax(0,1fr)] lg:gap-6 lg:!p-6">
          <div className="mx-auto flex xl:w-[455px] max-w-full flex-col lg:flex-row xl:flex-col gap-4 items-center justify-center rounded-[16px] border border-white/80 bg-white p-5 shadow-[0_20px_60px_rgba(148,184,214,0.18)] sm:p-6 lg:mx-0">
            <div className="flex flex-col items-center justify-center w-full max-w-[400px]">
              <span className="title-heading-normal text-[#2A3040] flex flex-wrap items-center justify-center gap-3 text-center text-[28px] leading-tight sm:text-3xl md:text-[24px]">
                {hero.lineOne}
              </span>
              <HeroAiLogo />
              <h1 className="title-heading-normal text-[#2A3040] text-center text-[28px] leading-tight sm:text-3xl md:text-[24px]">
                {hero.title}
              </h1>
            </div>

            <div className="">
              <p className="mt-3 text-center text-[#696969] text-[12px]">{hero.description}</p>

              <div className="mt-6 grid w-full grid-cols-2 gap-x-3 gap-y-5 rounded-[16px] bg-[#AEC8FF]/25 p-3 py-6 sm:mt-8 sm:grid-cols-4 sm:gap-x-4 sm:p-4 sm:pb-8 sm:pt-4">
                {hero.features.map((feature, index) => (
                  <div key={feature.label} className="flex flex-col items-center gap-2.5 text-center">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-primary-300">
                      {heroFeatureIcons[index % heroFeatureIcons.length]}
                    </span>
                    <p className="inter text-[12px] leading-4 text-[#2A3040] lg:text-[8px]">
                      {feature.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex w-full items-stretch gap-2 sm:mt-[-17px] justify-center flex-row sm:items-center">
                <Link href={hero.primaryCta.href} className={primaryButtonClass}>
                  {hero.primaryCta.label}
                </Link>
                <Link
                  href={hero.secondaryCta.href}
                  className={`${primaryButtonClass} border border-[#000000]/20 !bg-white !text-[#2A3040]`}
                >
                  {hero.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[16px] border border-white/70 shadow-[0_20px_60px_rgba(148,184,214,0.2)]">
            <LividEmbed
              videoId={hero.videoId}
              title="DX Interiors hero"
              fill
              background
              autoplay={false}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-[700px] text-center">
          <p className="text-[15px] leading-relaxed text-[#696969] sm:text-[18px] md:text-[20px]">
            {trust.intro}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:mt-12 sm:gap-10 md:grid-cols-4 md:gap-8">
            {trust.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <p className="lao-mn text-[26px] leading-none tracking-normal text-[#2A3040] sm:text-[28px] md:text-[32px]">
                  {stat.value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#696969] sm:text-[12px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 lg:px-10 lg:py-14 pb-0 lg:pb-20">
        <div className="mx-auto max-w-[1350px]">
          <h2 className="title-heading-normal text-[#2A3040] px-2 text-center text-[26px] text-primary-300 sm:text-[28px] md:text-[32px]">
            {processSection.title}
          </h2>

          <div className="mt-10 flex flex-col gap-10 sm:mt-14 sm:gap-12 md:hidden">
            {processSection.cards.map((card, index) => (
              <ProcessCard key={card.title} card={card} index={index} />
            ))}
          </div>

          <div className="mt-14 hidden gap-x-10 pt-12 md:grid md:grid-cols-2">
            <div className="flex flex-col gap-20">
              {processSection.cards
                .filter((_, index) => index % 2 === 0)
                .map((card, columnIndex) => (
                  <ProcessCard key={card.title} card={card} index={columnIndex * 2} />
                ))}
            </div>
            <div className="flex flex-col gap-20 pt-40">
              {processSection.cards
                .filter((_, index) => index % 2 === 1)
                .map((card, columnIndex) => (
                  <ProcessCard key={card.title} card={card} index={columnIndex * 2 + 1} />
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-10 lg:py-20">
        <div className="glass-panel mx-auto grid max-w-[1350px] items-center gap-6 !rounded-[16px] !p-5 sm:gap-8 sm:!p-6 lg:grid-cols-[3fr_7fr]">
          <div className="lg:max-w-lg px-2 sm:px-6 lg:px-10">
            <h2 className="title-heading-normal text-[#2A3040] text-[26px] leading-tight text-slate-900 sm:text-3xl md:text-[34px] text-center lg:text-left">
              {discover.title}
            </h2>
            <p className="mt-4 lg:max-w-[290px] text-[16px] leading-6 text-[#2A3040] sm:text-[16px] text-center lg:text-left">
              {discover.description}
            </p>
            <div className="mt-8 text-center lg:text-left">
              <Link href={discover.cta.href} className={primaryButtonClass}>
                {discover.cta.label}
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[16px] border border-white/70 shadow-[0_20px_60px_rgba(148,184,214,0.2)]">
            <LividEmbed
              videoId={discover.videoId}
              title={discover.title}
              fill
              background
              autoplay={false}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-10 lg:pb-20 lg:py-16">
        <h2 className="title-heading-normal px-2 text-center text-[26px] text-slate-900 sm:text-[32px]">
          {gallery.title}
        </h2>
        <div className="mx-auto mt-8 flex max-w-7xl flex-wrap gap-3 sm:mt-10 sm:gap-4 lg:flex-nowrap">
          {galleryColumns.map((column, columnIndex) => (
            <div
              key={`gallery-column-${columnIndex}`}
              className="flex w-[calc(50%-0.375rem)] flex-col gap-3 sm:w-[calc(50%-0.5rem)] sm:gap-4 lg:min-h-[860px] lg:w-auto lg:flex-1"
            >
              {column.map((item, index) => (
                <div
                  key={`${item.alt}-${columnIndex}-${index}`}
                  className="relative aspect-video w-full shrink-0 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm sm:rounded-[26px] lg:aspect-auto lg:min-h-0 lg:shrink lg:flex-[var(--gallery-grow)_1_0%]"
                  style={{ ['--gallery-grow' as string]: item.grow }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1350px] items-center gap-8 lg:grid-cols-[4fr_6fr] lg:gap-16">
          <div className="sm:max-w-[500px] lg:max-w-[420px] mx-auto lg:mx-0">
            <h2 className="title-heading-normal text-[#2A3040] text-[26px] leading-tight text-slate-900 sm:text-[32px] text-center lg:text-left">
              {lessons.title}
            </h2>
            <p className="mt-4 text-[16px] leading-6 text-[#2A3040] sm:text-[16px] text-center lg:text-left">
              {lessons.description}
            </p>
            <div className="mt-8 text-center lg:text-left">
              <Link href={lessons.cta.href} className={`${primaryButtonClass} px-6 sm:w-auto sm:px-10`}>
                {lessons.cta.label}
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-slate-200 shadow-[0_20px_60px_rgba(148,184,214,0.18)] sm:rounded-[24px]">
            <LividEmbed
              videoId={lessons.videoId}
              title={lessons.title}
              fill
              background
              autoplay={false}
            />
          </div>
        </div>
      </section>

      <BusinessTestimonials
        title={content.testimonials.title}
        items={content.testimonials.items}
        headingId="home-testimonials-heading"
      />
      <BusinessFeatures
        eyebrow={content.features.eyebrow}
        title={content.features.title}
        items={content.features.items}
        headingId="home-features-heading"
      />
      <BusinessClosingCta
        title={content.closing.title}
        primaryCta={content.closing.primaryCta}
        secondaryCta={content.closing.secondaryCta}
        variant="glass"
      />
    </>
  );
}
