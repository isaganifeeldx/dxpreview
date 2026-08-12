import type { ComparisonCategoryIcon, PlanFeatureIcon, PlanIcon } from '@/lib/pricing/types'

export function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.2L6.4 11.1L12.5 4.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronIcon({ open, className = 'h-4 w-4' }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`${className} shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DashIcon() {
  return (
    <span className="inline-block h-px w-3.5 rounded-full bg-[#C5CAD3]" aria-hidden />
  )
}

export function CrownSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 19C5 18.4477 5.44772 18 6 18L18 18C18.5523 18 19 18.4477 19 19C19 19.5523 18.5523 20 18 20L6 20C5.44772 20 5 19.5523 5 19Z"
        fill="#2A3040"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.87867 4.70711C11.0502 3.53554 12.9497 3.53554 14.1213 4.70711L16.6878 7.27359C16.9922 7.57795 17.4571 7.6534 17.8421 7.46091L18.5528 7.10558C20.0877 6.33813 21.7842 7.80954 21.2416 9.43755L19.4045 14.9487C18.9962 16.1737 17.8498 17 16.5585 17H7.44151C6.15022 17 5.0038 16.1737 4.59546 14.9487L2.75842 9.43755C2.21575 7.80955 3.91231 6.33813 5.44721 7.10558L6.15787 7.46091C6.54286 7.6534 7.00783 7.57795 7.31219 7.27359L9.87867 4.70711Z"
        fill="#2A3040"
      />
    </svg>
  )
}

export function PlanFeatureSectionIcon({ icon }: { icon: PlanFeatureIcon }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 16 16',
    fill: 'none',
    'aria-hidden': true,
    className: 'shrink-0',
  } as const

  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  if (icon === 'history') {
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="5.2" {...stroke} />
        <path d="M8 5v3.2l2.2 1.3" {...stroke} />
      </svg>
    )
  }

  if (icon === 'users') {
    return (
      <svg {...common}>
        <circle cx="6" cy="5" r="1.7" {...stroke} />
        <circle cx="10.6" cy="5.4" r="1.3" {...stroke} />
        <path d="M2.8 12.2c.5-2 2-3.1 3.4-3.1s2.9 1.1 3.4 3.1M9.3 9.4c1.2 0 2.3.7 2.8 2.2" {...stroke} />
      </svg>
    )
  }

  if (icon === 'brand') {
    return (
      <svg {...common}>
        <path d="M3.4 13V5.4L8 3l4.6 2.4V13M6 13V8.2h4V13" {...stroke} />
      </svg>
    )
  }

  if (icon === 'shield') {
    return (
      <svg {...common}>
        <path d="M8 2.6 12.4 4.8v3.3c0 2.5-1.8 4.3-4.4 5.3-2.6-1-4.4-2.8-4.4-5.3V4.8L8 2.6Z" {...stroke} />
      </svg>
    )
  }

  if (icon === 'support') {
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="5.2" {...stroke} />
        <path d="M6.8 6.3A1.3 1.3 0 0 1 8.6 7.5c0 .8-.8 1.1-.8 1.8M8 11.3h.01" {...stroke} />
      </svg>
    )
  }

  if (icon === 'ai') {
    return (
      <svg {...common}>
        <path d="M8 2v2.2M8 11.8V14M2 8h2.2M11.8 8H14M4.1 4.1l1.6 1.6M10.3 10.3l1.6 1.6M11.9 4.1 10.3 5.7M5.7 10.3 4.1 11.9" {...stroke} />
        <circle cx="8" cy="8" r="2.1" {...stroke} />
      </svg>
    )
  }

  if (icon === 'spark') {
    return (
      <svg {...common}>
        <path d="M8 2.2 9.2 6.8 13.8 8 9.2 9.2 8 13.8 6.8 9.2 2.2 8 6.8 6.8 8 2.2Z" {...stroke} />
      </svg>
    )
  }

  return <CheckIcon className="h-3.5 w-3.5" />
}

export function CategoryIcon({ icon }: { icon: ComparisonCategoryIcon }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    fill: 'none',
    'aria-hidden': true,
    className: 'shrink-0',
  } as const

  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 1.3,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  if (icon === 'ai') {
    return (
      <svg {...common}>
        <path d="M8 2v2.2M8 11.8V14M2 8h2.2M11.8 8H14M4.1 4.1l1.6 1.6M10.3 10.3l1.6 1.6M11.9 4.1 10.3 5.7M5.7 10.3 4.1 11.9" {...stroke} />
        <circle cx="8" cy="8" r="2.1" {...stroke} />
      </svg>
    )
  }

  if (icon === 'image') {
    return (
      <svg {...common}>
        <rect x="2.5" y="3" width="11" height="10" rx="1.4" {...stroke} />
        <circle cx="5.6" cy="6.2" r="0.9" {...stroke} />
        <path d="M3.4 12.2 6.6 9l2 2 2.2-2.2 1.8 1.8" {...stroke} />
      </svg>
    )
  }

  if (icon === 'content') {
    return (
      <svg {...common}>
        <path d="M4 3.2h6.2L12.5 5.5v7.3H4V3.2Z" {...stroke} />
        <path d="M10.2 3.2V5.5h2.3M6 8h4M6 10.2h2.8" {...stroke} />
      </svg>
    )
  }

  if (icon === 'collaboration') {
    return (
      <svg {...common}>
        <circle cx="6" cy="5" r="1.7" {...stroke} />
        <circle cx="10.6" cy="5.4" r="1.3" {...stroke} />
        <path d="M2.8 12.2c.5-2 2-3.1 3.4-3.1s2.9 1.1 3.4 3.1M9.3 9.4c1.2 0 2.3.7 2.8 2.2" {...stroke} />
      </svg>
    )
  }

  if (icon === 'brand') {
    return (
      <svg {...common}>
        <path d="M3.4 13V5.4L8 3l4.6 2.4V13M6 13V8.2h4V13" {...stroke} />
      </svg>
    )
  }

  if (icon === 'team') {
    return (
      <svg {...common}>
        <path d="M8 7.6 13 5.1 8 2.6 3 5.1 8 7.6ZM3 8.8l5 2.5 5-2.5" {...stroke} />
      </svg>
    )
  }

  if (icon === 'security') {
    return (
      <svg {...common}>
        <path d="M8 2.6 12.4 4.8v3.3c0 2.5-1.8 4.3-4.4 5.3-2.6-1-4.4-2.8-4.4-5.3V4.8L8 2.6Z" {...stroke} />
        <path d="M6.2 8.1 7.5 9.4l2.6-2.6" {...stroke} />
      </svg>
    )
  }

  if (icon === 'storage') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="10" height="10" rx="2" {...stroke} />
        <path d="M6 8h4" {...stroke} />
      </svg>
    )
  }

  if (icon === 'support') {
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="5.2" {...stroke} />
        <path d="M6.8 6.3A1.3 1.3 0 0 1 8.6 7.5c0 .8-.8 1.1-.8 1.8M8 11.3h.01" {...stroke} />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <rect x="2.5" y="3" width="11" height="10" rx="1.4" {...stroke} />
      <path d="M4.5 6h7M4.5 8.5h4.5" {...stroke} />
    </svg>
  )
}

export function PlanIconMark({ icon }: { icon: PlanIcon }) {
  if (icon === 'none') return null

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 19C5 18.4477 5.44772 18 6 18L18 18C18.5523 18 19 18.4477 19 19C19 19.5523 18.5523 20 18 20L6 20C5.44772 20 5 19.5523 5 19Z"
        fill="#2A3040"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.87867 4.70711C11.0502 3.53554 12.9497 3.53554 14.1213 4.70711L16.6878 7.27359C16.9922 7.57795 17.4571 7.6534 17.8421 7.46091L18.5528 7.10558C20.0877 6.33813 21.7842 7.80954 21.2416 9.43755L19.4045 14.9487C18.9962 16.1737 17.8498 17 16.5585 17H7.44151C6.15022 17 5.0038 16.1737 4.59546 14.9487L2.75842 9.43755C2.21575 7.80955 3.91231 6.33813 5.44721 7.10558L6.15787 7.46091C6.54286 7.6534 7.00783 7.57795 7.31219 7.27359L9.87867 4.70711Z"
        fill="#2A3040"
      />
    </svg>
  )
}
