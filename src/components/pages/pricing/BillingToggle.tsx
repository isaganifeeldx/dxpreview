import type { BillingCycle } from '@/lib/pricing/types'

type BillingToggleProps = {
  value: BillingCycle
  monthlyLabel: string
  yearlyLabel: string
  yearlyBadge: string
  onChange: (value: BillingCycle) => void
}

export default function BillingToggle({
  value,
  monthlyLabel,
  yearlyLabel,
  yearlyBadge,
  onChange,
}: BillingToggleProps) {
  const isYearly = value === 'yearly'

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:mt-8 sm:gap-4">
      <span
        className={`text-[14px] sm:text-[15px] ${
          isYearly ? 'text-[#6A758C]' : 'font-medium text-[#2A3040]'
        }`}
      >
        {monthlyLabel}
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={isYearly}
        aria-label={`Billing cycle: ${isYearly ? yearlyLabel : monthlyLabel}`}
        onClick={() => onChange(isYearly ? 'monthly' : 'yearly')}
        className={`relative h-7 w-[52px] shrink-0 rounded-full transition-colors duration-300 ${
          isYearly ? 'bg-[#2A3040]' : 'bg-[#C5CAD3]'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-300 ${
            isYearly ? 'translate-x-[24px]' : 'translate-x-0'
          }`}
        />
      </button>

      <span
        className={`inline-flex flex-wrap items-center justify-center gap-2 text-[14px] sm:text-[15px] ${
          isYearly ? 'font-medium text-[#2A3040]' : 'text-[#6A758C]'
        }`}
      >
        {yearlyLabel}
        <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[11px] font-medium tracking-wide text-[#2A3040]">
          {yearlyBadge}
        </span>
      </span>
    </div>
  )
}
