import type { BusinessFeatureIcon } from '@/lib/business/types'

const iconClass = 'h-6 w-6 text-[#5B6C9A]'

export function BusinessFeatureGlyph({ icon }: { icon: BusinessFeatureIcon }) {
  switch (icon) {
    case 'lock':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'shield':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3 5 6.5v6.2c0 4 3 7.2 7 8.3 4-1.1 7-4.3 7-8.3V6.5L12 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'spark':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3v4M12 17v4M4.9 6.5l2.8 2.8M16.3 14.7l2.8 2.8M3 12h4M17 12h4M4.9 17.5l2.8-2.8M16.3 9.3l2.8-2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'users':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5S14 16 14.5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16 14.6c2.2.3 3.8 1.6 4.4 4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'template':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 9h16M9 9v11" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'globe':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 12h16M12 4c2.4 2.4 3.6 5.2 3.6 8s-1.2 5.6-3.6 8c-2.4-2.4-3.6-5.2-3.6-8s1.2-5.6 3.6-8Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'encrypt':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.6" />
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="16" r="1.4" fill="currentColor" />
        </svg>
      )
    case 'chart':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 19h16M7 16v-5M12 16V7M17 16v-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'plug':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 7v4M16 7v4M7 11h10v2a5 5 0 0 1-5 5h0a5 5 0 0 1-5-5v-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'support':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9.5 9.5a2.5 2.5 0 0 1 5 1c0 1.5-2.5 2-2.5 3.5M12 17.2h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'workflow':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3.5" y="4" width="7" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13.5" y="14" width="7" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 10v3.5A2.5 2.5 0 0 0 9.5 16H13.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'chat':
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H10l-4 3.2V6.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )
  }
}
