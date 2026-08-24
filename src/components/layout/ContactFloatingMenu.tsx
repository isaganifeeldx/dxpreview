'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import type { SiteSettingsData } from '@/lib/settings/defaults'

type ContactFloatingMenuProps = {
  settings: SiteSettingsData['floatingCta']
}

type MenuAction = {
  id: string
  label: string
  href: string
  external: boolean
  tone: 'brand' | 'muted'
  icon: 'whatsapp' | 'messenger' | 'support' | 'mail' | 'call'
}

const IconWhatsApp = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.96.55 3.8 1.51 5.38L2 22l4.95-1.6a9.86 9.86 0 0 0 5.09 1.4h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm0 17.94h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.98 1.02-2.98-.2-.31a8.05 8.05 0 0 1-1.24-4.3c0-4.46 3.66-8.08 8.17-8.08 4.5 0 8.16 3.62 8.16 8.08 0 4.46-3.66 8.08-8.16 8.08Zm4.48-6.05c-.25-.12-1.46-.72-1.68-.8-.23-.08-.4-.12-.56.12-.17.25-.64.8-.79.96-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74 2.49 1.07 2.49.71 2.94.67.45-.04 1.46-.6 1.66-1.17.21-.58.21-1.07.14-1.17-.06-.1-.23-.17-.48-.29Z" />
  </svg>
)

const IconMessenger = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.9 1.43 5.48 3.67 7.18V22l3.36-1.85c.94.26 1.94.4 2.97.4 5.64 0 10.2-4.13 10.2-9.85C22.2 6.13 17.64 2 12 2Zm1.01 13.25-2.6-2.78-5.08 2.78 5.58-5.92 2.66 2.78 5.02-2.78-5.58 5.92Z" />
  </svg>
)

const IconSupport = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M7.5 18.5h.8l1.4 1.7c.5.6 1.4.6 1.9 0l1.4-1.7h3.5c1.7 0 3-1.3 3-3v-6c0-1.7-1.3-3-3-3h-9c-1.7 0-3 1.3-3 3v6c0 1.7 1.3 3 3 3Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M9 10.5h6M9 13.5h4"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
)

const IconMail = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
    <path
      d="M4.5 7.5 12 12.5l7.5-5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconCall = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M8.2 4.8c.4-.4.9-.6 1.4-.5l2 .4c.6.1 1 .6 1.1 1.2l.4 2.1c.1.5-.1 1-.5 1.3l-1.1.9c.8 1.6 2.1 2.9 3.7 3.7l.9-1.1c.3-.4.8-.6 1.3-.5l2.1.4c.6.1 1.1.6 1.2 1.1l.4 2c.1.5-.1 1-.5 1.4l-1.1 1.1c-.5.5-1.2.7-1.9.6-3.7-.6-7.1-2.7-9.5-5.1S4.6 9.1 4 5.4c-.1-.7.1-1.4.6-1.9l1.6-.7Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
  </svg>
)

const IconChat = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M7.5 18.5h.8l1.4 1.7c.5.6 1.4.6 1.9 0l1.4-1.7h3.5c1.7 0 3-1.3 3-3v-6c0-1.7-1.3-3-3-3h-9c-1.7 0-3 1.3-3 3v6c0 1.7 1.3 3 3 3Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M9 10.5h6M9 13.5h4"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
)

const IconClose = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M7 7l10 10M17 7 7 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

function ActionIcon({ name }: { name: MenuAction['icon'] }) {
  switch (name) {
    case 'whatsapp':
      return <IconWhatsApp />
    case 'messenger':
      return <IconMessenger />
    case 'support':
      return <IconSupport />
    case 'mail':
      return <IconMail />
    case 'call':
      return <IconCall />
    default:
      return null
  }
}

function isExternalHref(href: string) {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  )
}

export default function ContactFloatingMenu({ settings }: ContactFloatingMenuProps) {
  const [open, setOpen] = useState(false)
  const [overFooter, setOverFooter] = useState(false)
  const [nearPageBottom, setNearPageBottom] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  const actions: MenuAction[] = [
    {
      id: 'whatsapp',
      label: settings.whatsapp.label,
      href: settings.whatsapp.href,
      tone: 'muted' as const,
      icon: 'whatsapp' as const,
    },
    {
      id: 'messenger',
      label: settings.messenger.label,
      href: settings.messenger.href,
      tone: 'brand' as const,
      icon: 'messenger' as const,
    },
    {
      id: 'support',
      label: settings.support.label,
      href: settings.support.href,
      tone: 'brand' as const,
      icon: 'support' as const,
    },
    {
      id: 'form',
      label: settings.submitForm.label,
      href: settings.submitForm.href,
      tone: 'brand' as const,
      icon: 'mail' as const,
    },
    {
      id: 'call',
      label: settings.call.label,
      href: settings.call.href,
      tone: 'brand' as const,
      icon: 'call' as const,
    },
  ]
    .filter((action) => Boolean(action.href?.trim()))
    .map((action) => ({
      ...action,
      external: isExternalHref(action.href),
    }))

  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    const footer = document.getElementById('site-footer')
    const menu = rootRef.current
    if (!footer || !menu) return undefined

    const updateOverlap = () => {
      const footerRect = footer.getBoundingClientRect()
      const menuRect = menu.getBoundingClientRect()
      const overlaps =
        menuRect.bottom > footerRect.top + 8 && menuRect.top < footerRect.bottom - 8
      setOverFooter(overlaps)

      const scrollBottom = window.scrollY + window.innerHeight
      const pageHeight = document.documentElement.scrollHeight
      setNearPageBottom(scrollBottom >= pageHeight - 520)
    }

    updateOverlap()
    window.addEventListener('scroll', updateOverlap, { passive: true })
    window.addEventListener('resize', updateOverlap)
    return () => {
      window.removeEventListener('scroll', updateOverlap)
      window.removeEventListener('resize', updateOverlap)
    }
  }, [])

  if (!settings?.enabled || actions.length === 0) return null

  const toggleClass = open
    ? overFooter || nearPageBottom
      ? 'bg-[#2A3040] text-white hover:bg-[#111a2e]'
      : 'bg-white text-[#2A3040] hover:bg-[#F4F6FA]'
    : overFooter
      ? 'bg-white text-[#2A3040] ring-1 ring-[#000000]/10 hover:bg-[#F4F6FA]'
      : 'bg-[#2A3040] text-white hover:bg-[#111a2e]'

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
    >
      <div
        id={menuId}
        className={`pointer-events-auto flex flex-col items-end gap-3 transition-all duration-300 ${
          open
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2 opacity-0'
        }`}
        aria-hidden={!open}
      >
        {actions.map((action) => {
          const className = `group flex items-center gap-2.5 ${open ? '' : 'invisible'}`
          const buttonClass =
            action.tone === 'muted'
              ? 'flex h-12 w-12 items-center justify-center rounded-full bg-[#8B92A3] text-white shadow-[0_8px_24px_rgba(42,48,64,0.22)] transition-transform duration-200 group-hover:scale-105'
              : 'flex h-12 w-12 items-center justify-center rounded-full bg-[#2A3040] text-white shadow-[0_8px_24px_rgba(42,48,64,0.22)] transition-transform duration-200 group-hover:scale-105'

          const label = (
            <span className="relative mr-0.5 rounded-lg bg-white px-3 py-1.5 text-[13px] font-medium text-[#6B7280] shadow-[0_6px_18px_rgba(42,48,64,0.14)]">
              {action.label}
              <span
                className="absolute right-[-5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-white shadow-[2px_2px_4px_rgba(42,48,64,0.06)]"
                aria-hidden
              />
            </span>
          )

          if (action.external) {
            return (
              <a
                key={action.id}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={className}
                tabIndex={open ? 0 : -1}
              >
                {label}
                <span className={buttonClass}>
                  <ActionIcon name={action.icon} />
                </span>
              </a>
            )
          }

          return (
            <Link key={action.id} href={action.href} className={className} tabIndex={open ? 0 : -1}>
              {label}
              <span className={buttonClass}>
                <ActionIcon name={action.icon} />
              </span>
            </Link>
          )
        })}
      </div>

      <button
        type="button"
        className={`pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full shadow-[0_10px_28px_rgba(42,48,64,0.28)] transition-colors duration-200 ${toggleClass}`}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <IconClose /> : <IconChat />}
      </button>
    </div>
  )
}
