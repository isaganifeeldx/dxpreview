import { InteriorsCapabilityGlyph } from '@/components/pages/interiors/icons'
import type { InteriorsCapabilityIcon, InteriorsCapabilityPill } from '@/lib/interiors/types'

const FALLBACK_ICONS: InteriorsCapabilityIcon[] = [
  'surface',
  'cleanup',
  'staging',
  'renders',
  'style',
  'layout',
  'layers',
  'spark',
]

function fallbackIcon(id: string): InteriorsCapabilityIcon {
  if (FALLBACK_ICONS.includes(id as InteriorsCapabilityIcon)) {
    return id as InteriorsCapabilityIcon
  }
  return 'surface'
}

type InteriorsCapabilityBarProps = {
  eyebrow: string
  items: InteriorsCapabilityPill[]
}

export default function InteriorsCapabilityBar({ eyebrow, items }: InteriorsCapabilityBarProps) {
  return (
    <section className="border-y border-[#2A3040]/8 bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-[1350px]">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#9AA3B5] sm:text-[11px] sm:tracking-[0.24em]">
          {eyebrow}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5 lg:gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#2A3040]/10 bg-white">
                {item.iconSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element -- CMS icons may be SVG; next/image needs special SVG config
                  <img
                    src={item.iconSrc}
                    alt={item.iconAlt || ''}
                    className="h-4 w-4 object-contain"
                    draggable={false}
                  />
                ) : (
                  <InteriorsCapabilityGlyph icon={fallbackIcon(item.id)} />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold leading-tight text-[#2A3040] sm:text-[14px]">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-[#9AA3B5] sm:text-[12px]">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
