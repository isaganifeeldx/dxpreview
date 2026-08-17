import type { AboutPerkIcon } from '@/lib/about/types'

const iconClass = 'h-7 w-7'
const iconColor = '#2A3040'

export function AboutPerkGlyph({ icon }: { icon: AboutPerkIcon }) {
  switch (icon) {
    case 'health':
      return (
        <svg className={iconClass} viewBox="0 0 28 28" fill="none" aria-hidden>
          <circle cx="14" cy="14" r="11" stroke={iconColor} strokeWidth="1.6" />
          <path d="M14 9v10M9 14h10" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'equity':
      return (
        <svg className={iconClass} viewBox="0 0 28 28" fill="none" aria-hidden>
          <circle cx="14" cy="14" r="11" stroke={iconColor} strokeWidth="1.6" />
          <path d="M14 8.5v11M11 11.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5-1.3 2.5-3 2.5-3 1.1-3 2.5 1.3 2.5 3 2.5 3-1.1 3-2.5" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'growth':
      return (
        <svg className={iconClass} viewBox="0 0 28 28" fill="none" aria-hidden>
          <path d="M7 19 12.5 13.5 16 17l5-6" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 11h4v4" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'remote':
      return (
        <svg className={iconClass} viewBox="0 0 28 28" fill="none" aria-hidden>
          <rect x="5" y="8" width="18" height="12" rx="2" stroke={iconColor} strokeWidth="1.6" />
          <path d="M11 23h6" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'leave':
      return (
        <svg className={iconClass} viewBox="0 0 28 28" fill="none" aria-hidden>
          <rect x="6" y="8" width="16" height="14" rx="2" stroke={iconColor} strokeWidth="1.6" />
          <path d="M6 12h16M11 6v4M17 6v4" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'tools':
      return (
        <svg className={iconClass} viewBox="0 0 28 28" fill="none" aria-hidden>
          <path d="M16.5 8.5a4 4 0 0 0-5.6 5.6L7 18l3 3 3.9-3.9a4 4 0 0 0 5.6-5.6l-2.2 2.2-1.8-1.8 2-2Z" stroke={iconColor} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
    case 'team':
    default:
      return (
        <svg className={iconClass} viewBox="0 0 28 28" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="3" stroke={iconColor} strokeWidth="1.6" />
          <path d="M5.5 20c.6-2.8 2.6-4.2 5.5-4.2S16 17.2 16.5 20" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="18.5" cy="11.5" r="2.4" stroke={iconColor} strokeWidth="1.6" />
          <path d="M17.5 15.8c2 .4 3.5 1.6 4 4.2" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
  }
}
