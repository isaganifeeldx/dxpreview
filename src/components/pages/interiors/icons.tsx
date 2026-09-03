import type { InteriorsCapabilityIcon } from '@/lib/interiors/types'

const iconClass = 'h-4 w-4'

export function InteriorsCapabilityGlyph({ icon }: { icon: InteriorsCapabilityIcon }) {
  switch (icon) {
    case 'cleanup':
      return (
        <svg className={iconClass} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M6.355 8.434a.667.667 0 0 0-.263.395v2.708h1.719c.322 0 .631-.128.859-.356l5.067-5.07a.667.667 0 0 0 0-.943l-.5-.5a.667.667 0 0 0-.943 0L6.355 8.434Z"
            stroke="#2A3040"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 9c0 2.829 0 4.243-.879 5.121S10.828 15 8 15s-4.243 0-5.121-.879S2 11.828 2 9s0-4.243.879-5.121S5.172 3 8 3"
            stroke="#2A3040"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'staging':
      return (
        <svg className={iconClass} viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M5.923 7.406 8.885 8.887l2.962-1.481V10.368l-2.962 1.481-2.962-1.481V7.406l2.962-1.481 2.962 1.481ZM8.885 8.887V11.849M6.96 15.551c-1.659 0-2.488 0-3.122-.323a2.667 2.667 0 0 1-1.294-1.294C2.221 13.3 2.221 12.471 2.221 10.812M15.549 10.812c0 1.659 0 2.488-.323 3.122a2.667 2.667 0 0 1-1.294 1.294c-.634.323-1.463.323-3.122.323M10.81 2.223c1.659 0 2.488 0 3.122.322a2.667 2.667 0 0 1 1.294 1.294c.323.634.323 1.463.323 3.122v3.85c0 1.659 0 2.488-.323 3.122a2.667 2.667 0 0 1-1.294 1.294c-.634.323-1.463.323-3.122.323H6.96c-1.659 0-2.488 0-3.122-.323a2.667 2.667 0 0 1-1.294-1.294C2.221 12.471 2.221 11.641 2.221 10.812V6.962c0-1.659 0-2.488.323-3.122a2.667 2.667 0 0 1 1.294-1.294c.634-.323 1.463-.323 3.122-.323h3.85Z"
            stroke="#2A3040"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'renders':
      return (
        <svg className={iconClass} viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M15.495 7.4C10.601 6.727 6.38 10.362 6.664 15.182M4.813 5.926a.667.667 0 1 0 1.334 0 .667.667 0 0 0-1.334 0ZM2.221 9.678c2.059-.285 3.906.709 4.905 2.295M2.221 6.962c0-1.659 0-2.488.323-3.122a2.667 2.667 0 0 1 1.294-1.294C4.472 2.223 5.301 2.223 6.96 2.223h3.85c1.659 0 2.488 0 3.122.322a2.667 2.667 0 0 1 1.294 1.294c.323.634.323 1.463.323 3.122v3.85c0 1.659 0 2.488-.323 3.122a2.667 2.667 0 0 1-1.294 1.294c-.634.323-1.463.323-3.122.323H6.96c-1.659 0-2.488 0-3.122-.323a2.667 2.667 0 0 1-1.294-1.294C2.221 12.471 2.221 11.641 2.221 10.812V6.962Z"
            stroke="#2A3040"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'style':
      return (
        <svg className={iconClass} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M8 2v12M2 8h12M4.343 4.343l7.314 7.314M11.657 4.343 4.343 11.657"
            stroke="#2A3040"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'layout':
      return (
        <svg className={iconClass} viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="2" y="2" width="5.5" height="12" rx="1" stroke="#2A3040" />
          <rect x="8.5" y="2" width="5.5" height="5.5" rx="1" stroke="#2A3040" />
          <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="#2A3040" />
        </svg>
      )
    case 'layers':
      return (
        <svg className={iconClass} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M8 3 13.5 6 8 9 2.5 6 8 3ZM3.2 8.2 8 11l4.8-2.8M3.2 10.6 8 13.4l4.8-2.8"
            stroke="#2A3040"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'spark':
      return (
        <svg className={iconClass} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M8 2.5 8.9 6.1 12.5 7 8.9 7.9 8 11.5 7.1 7.9 3.5 7 7.1 6.1 8 2.5ZM12.2 10.2l.4 1.6 1.6.4-1.6.4-.4 1.6-.4-1.6-1.6-.4 1.6-.4.4-1.6Z"
            stroke="#2A3040"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'surface':
    default:
      return (
        <svg className={iconClass} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M11 3.667H11.667C12.403 3.667 13 3.93 13 4.667V6c0 .354-.14.693-.39.943S12.02 7.333 11.667 7.333H7c-.177 0-.346.07-.471.195S6.333 7.823 6.333 8v5.333c0 .177.07.346.195.471S6.823 14 7 14h.667M11 3.667V2.667C11 2.49 10.93 2.32 10.805 2.195S10.51 2 10.333 2H3.667C3.49 2 3.32 2.07 3.195 2.195S3 2.49 3 2.667v2c0 .177.07.346.195.471S3.49 5.333 3.667 5.333h6.666c.177 0 .347-.07.472-.195S11 4.843 11 4.667V3.667Z"
            stroke="#2A3040"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
  }
}
