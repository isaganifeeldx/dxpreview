'use client'

import { useEffect, useRef, type ReactNode } from 'react'

const ChevronDownIcon = () => (
  <svg className="h-2.5 w-2.5 shrink-0" viewBox="0 0 10 6" fill="currentColor" aria-hidden>
    <path d="M1 1L5 5L9 1" />
  </svg>
)

type FilterDropdownProps = {
  label: string
  isOpen: boolean
  isActive: boolean
  onToggle: () => void
  className?: string
  children: ReactNode
}

function FilterDropdown({
  label,
  isOpen,
  isActive,
  onToggle,
  className = '',
  children,
}: FilterDropdownProps) {
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`inline-flex min-h-10 items-center gap-1.5 py-2 text-[14px] transition-colors sm:min-h-9 ${
          isActive ? 'font-semibold text-[#2A3040]' : 'font-normal text-[#2A3040]'
        }`}
      >
        {label}
        <ChevronDownIcon />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-full z-20 mt-1 min-w-[200px] max-h-[280px] overflow-y-auto rounded-[8px] border border-[#ECEEF2] bg-white py-1 shadow-lg">
          {children}
        </div>
      ) : null}
    </div>
  )
}

type DropdownOptionProps = {
  label: string
  selected: boolean
  onSelect: () => void
}

function DropdownOption({ label, selected, onSelect }: DropdownOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center px-4 py-2.5 text-left text-[14px] transition-colors ${
        selected
          ? 'bg-[#F4F6FA] font-medium text-[#2A3040]'
          : 'text-[#5C6470] hover:bg-[#F7F8FB] hover:text-[#2A3040]'
      }`}
    >
      {label}
    </button>
  )
}

export type InspirationFilterDropdownsProps = {
  allSpacesLabel: string
  categories: string[]
  designStyles: string[]
  colors: string[]
  sortOptions: string[]
  filters: {
    space: string
    designStyle: string | null
    color: string | null
    sort: string
  }
  defaultSort: string
  onSpaceChange: (value: string) => void
  onDesignStyleChange: (value: string | null) => void
  onColorChange: (value: string | null) => void
  onSortChange: (value: string) => void
  openDropdown: string | null
  onOpenDropdownChange: (key: string | null) => void
}

export default function InspirationFilterDropdowns({
  allSpacesLabel,
  categories,
  designStyles,
  colors,
  sortOptions,
  filters,
  defaultSort,
  onSpaceChange,
  onDesignStyleChange,
  onColorChange,
  onSortChange,
  openDropdown,
  onOpenDropdownChange,
}: InspirationFilterDropdownsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!openDropdown) return undefined

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        onOpenDropdownChange(null)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [openDropdown, onOpenDropdownChange])

  const toggle = (key: string) => {
    onOpenDropdownChange(openDropdown === key ? null : key)
  }

  const closeAnd = (fn: () => void) => {
    fn()
    onOpenDropdownChange(null)
  }

  return (
    <div ref={containerRef} className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <FilterDropdown
        label="Spaces"
        isOpen={openDropdown === 'space'}
        isActive={filters.space !== allSpacesLabel}
        onToggle={() => toggle('space')}
      >
        {[allSpacesLabel, ...categories].map((option) => (
          <DropdownOption
            key={option}
            label={option}
            selected={filters.space === option}
            onSelect={() => closeAnd(() => onSpaceChange(option))}
          />
        ))}
      </FilterDropdown>

      <FilterDropdown
        label="Styles"
        isOpen={openDropdown === 'style'}
        isActive={Boolean(filters.designStyle)}
        onToggle={() => toggle('style')}
      >
        <DropdownOption
          label="All styles"
          selected={!filters.designStyle}
          onSelect={() => closeAnd(() => onDesignStyleChange(null))}
        />
        {designStyles.map((option) => (
          <DropdownOption
            key={option}
            label={option}
            selected={filters.designStyle === option}
            onSelect={() => closeAnd(() => onDesignStyleChange(option))}
          />
        ))}
      </FilterDropdown>

      <FilterDropdown
        label="Colors"
        isOpen={openDropdown === 'color'}
        isActive={Boolean(filters.color)}
        onToggle={() => toggle('color')}
      >
        <DropdownOption
          label="All colors"
          selected={!filters.color}
          onSelect={() => closeAnd(() => onColorChange(null))}
        />
        {colors.map((option) => (
          <DropdownOption
            key={option}
            label={option}
            selected={filters.color === option}
            onSelect={() => closeAnd(() => onColorChange(option))}
          />
        ))}
      </FilterDropdown>

      <FilterDropdown
        label="Latest"
        isOpen={openDropdown === 'sort'}
        isActive={filters.sort !== defaultSort}
        onToggle={() => toggle('sort')}
        className="basis-full sm:basis-auto"
      >
        {sortOptions.map((option) => (
          <DropdownOption
            key={option}
            label={option}
            selected={filters.sort === option}
            onSelect={() => closeAnd(() => onSortChange(option))}
          />
        ))}
      </FilterDropdown>
    </div>
  )
}
