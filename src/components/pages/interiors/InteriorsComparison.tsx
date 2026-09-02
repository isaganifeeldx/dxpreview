import type { InteriorsComparisonSide } from '@/lib/interiors/types'

type InteriorsComparisonProps = {
  title: string
  subtitle: string
  oldWay: InteriorsComparisonSide
  newWay: InteriorsComparisonSide
}

const MinusIcon = () => (
  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FEE4E2] text-[#B42318]">
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </span>
)

const PlusIcon = () => (
  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D1FADF] text-[#039855]">
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M5 2v6M2 5h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </span>
)

function ComparisonCard({
  side,
  variant,
}: {
  side: InteriorsComparisonSide
  variant: 'old' | 'new'
}) {
  const Icon = variant === 'old' ? MinusIcon : PlusIcon

  return (
    <article className="glass-panel flex h-full flex-col !rounded-[16px] !p-4 sm:!rounded-[20px] sm:!p-6 lg:!p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5B6C9A] sm:text-[12px]">
        {side.title}
      </p>
      <ul className="mt-5 space-y-4 sm:mt-6">
        {side.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[14px] leading-relaxed text-[#4A5568]">
            <Icon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function InteriorsComparison({
  title,
  subtitle,
  oldWay,
  newWay,
}: InteriorsComparisonProps) {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1350px]">
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="title-heading-normal !text-[32px] text-[#2A3040]">
            {title}
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6A758C] sm:mt-4 sm:text-[16px]">{subtitle}</p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 lg:mt-12 lg:grid-cols-2 lg:gap-6">
          <ComparisonCard side={oldWay} variant="old" />
          <ComparisonCard side={newWay} variant="new" />
        </div>
      </div>
    </section>
  )
}
