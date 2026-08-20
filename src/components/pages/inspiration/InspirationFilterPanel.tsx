'use client'

import { useEffect, useState } from 'react'
import type { InspirationFilters } from '@/lib/inspiration/types'

const CloseIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`h-4 w-4 text-[#8A909C] transition-transform ${open ? 'rotate-180' : ''}`}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const RemoveIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

type FilterSection = 'designStyle' | 'space' | 'color' | 'sort'

type InspirationFilterPanelProps = {
  open: boolean
  onClose: () => void
  allSpacesLabel: string
  categories: string[]
  designStyles: string[]
  colors: string[]
  sortOptions: string[]
  filters: InspirationFilters
  onApply: (filters: InspirationFilters) => void
}

export default function InspirationFilterPanel({
  open,
  onClose,
  allSpacesLabel,
  categories,
  designStyles,
  colors,
  sortOptions,
  filters,
  onApply,
}: InspirationFilterPanelProps) {
  const [draft, setDraft] = useState<InspirationFilters>(filters)
  const [expanded, setExpanded] = useState<FilterSection | null>(null)

  useEffect(() => {
    if (open) {
      setDraft(filters)
      setExpanded(null)
    }
  }, [open, filters])

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const activeTags: Array<{ key: FilterSection | 'sort'; label: string; onRemove: () => void }> = [
    {
      key: 'space',
      label: draft.space,
      onRemove: () => setDraft((current) => ({ ...current, space: allSpacesLabel })),
    },
    {
      key: 'sort',
      label: draft.sort,
      onRemove: () => setDraft((current) => ({ ...current, sort: sortOptions[0] ?? 'Latest' })),
    },
  ]

  if (draft.designStyle) {
    activeTags.push({
      key: 'designStyle',
      label: draft.designStyle,
      onRemove: () => setDraft((current) => ({ ...current, designStyle: null })),
    })
  }

  if (draft.color) {
    activeTags.push({
      key: 'color',
      label: draft.color,
      onRemove: () => setDraft((current) => ({ ...current, color: null })),
    })
  }

  const toggleSection = (section: FilterSection) => {
    setExpanded((current) => (current === section ? null : section))
  }

  const sections: Array<{
    id: FilterSection
    label: string
    options: string[]
    value: string | null
    onSelect: (value: string | null) => void
    allowClear?: boolean
  }> = [
    {
      id: 'designStyle',
      label: 'Design Style',
      options: designStyles,
      value: draft.designStyle,
      onSelect: (value) => setDraft((current) => ({ ...current, designStyle: value })),
      allowClear: true,
    },
    {
      id: 'space',
      label: 'Space',
      options: [allSpacesLabel, ...categories],
      value: draft.space,
      onSelect: (value) => setDraft((current) => ({ ...current, space: value ?? allSpacesLabel })),
    },
    {
      id: 'color',
      label: 'Color',
      options: colors,
      value: draft.color,
      onSelect: (value) => setDraft((current) => ({ ...current, color: value })),
      allowClear: true,
    },
    {
      id: 'sort',
      label: 'Latest',
      options: sortOptions,
      value: draft.sort,
      onSelect: (value) => setDraft((current) => ({ ...current, sort: value ?? sortOptions[0] ?? 'Latest' })),
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close filters"
        className="absolute inset-0 bg-[#2A3040]/30 backdrop-blur-[1px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inspiration-filter-title"
        className="relative flex h-full w-full max-w-none flex-col bg-white shadow-2xl sm:max-w-[420px]"
      >
        <div className="flex items-center justify-between border-b border-[#ECEEF2] px-5 py-4">
          <h2 id="inspiration-filter-title" className="text-[18px] font-semibold text-[#2A3040]">
            Search
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#2A3040] transition-colors hover:bg-[#F4F6FA]"
          >
            <CloseIcon />
          </button>
        </div>

        {activeTags.length > 0 ? (
          <div className="flex flex-wrap gap-2 border-b border-[#ECEEF2] px-5 py-4">
            {activeTags.map((tag) => (
              <button
                key={`${tag.key}-${tag.label}`}
                type="button"
                onClick={tag.onRemove}
                className="inline-flex items-center gap-2 rounded-[6px] bg-[#F4F6FA] px-3 py-1.5 text-[13px] text-[#2A3040] transition-colors hover:bg-[#ECEEF2]"
              >
                {tag.label}
                <RemoveIcon />
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex-1 overflow-y-auto">
          {sections.map((section) => {
            const isOpen = expanded === section.id
            return (
              <div key={section.id} className="border-b border-[#ECEEF2]">
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-[15px] font-medium text-[#2A3040]">{section.label}</span>
                  <ChevronIcon open={isOpen} />
                </button>

                {isOpen ? (
                  <div className="space-y-1 px-5 pb-4">
                    {section.allowClear ? (
                      <button
                        type="button"
                        onClick={() => section.onSelect(null)}
                        className={`flex w-full items-center rounded-[8px] px-3 py-2.5 text-left text-[14px] transition-colors ${
                          section.value === null
                            ? 'bg-[#F4F6FA] font-medium text-[#2A3040]'
                            : 'text-[#5C6470] hover:bg-[#F7F8FB]'
                        }`}
                      >
                        All
                      </button>
                    ) : null}
                    {section.options.map((option) => {
                      const selected =
                        section.id === 'designStyle' || section.id === 'color'
                          ? section.value === option
                          : section.value === option
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => section.onSelect(option)}
                          className={`flex w-full items-center rounded-[8px] px-3 py-2.5 text-left text-[14px] transition-colors ${
                            selected
                              ? 'bg-[#F4F6FA] font-medium text-[#2A3040]'
                              : 'text-[#5C6470] hover:bg-[#F7F8FB]'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="border-t border-[#ECEEF2] px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => {
              onApply(draft)
              onClose()
            }}
            className="h-11 w-full rounded-[8px] bg-[#1677FF] text-[15px] font-medium text-white transition-opacity hover:opacity-95"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
