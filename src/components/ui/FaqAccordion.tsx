'use client';

import { useState } from 'react';
import type { FaqItem } from '@/data/faqData';

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`h-4 w-4 shrink-0 text-[#6A758C] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface FaqAccordionProps {
  items: FaqItem[];
  /** When true, opens the first item by default. */
  openFirst?: boolean;
  className?: string;
}

export default function FaqAccordion({
  items,
  openFirst = true,
  className = '',
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    openFirst ? (items[0]?.id ?? null) : null,
  );

  if (items.length === 0) return null;

  return (
    <div className={`divide-y divide-[#E5E5E5] border-t border-[#E5E5E5] ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <details
            key={item.id}
            className="group py-5"
            open={isOpen}
            onToggle={(event) => {
              const el = event.currentTarget;
              if (el.open) {
                setOpenId(item.id);
              } else if (openId === item.id) {
                setOpenId(null);
              }
            }}
          >
            <summary className="faq-summary flex w-full cursor-pointer list-none items-start justify-between gap-4 text-left">
              <span
                className={`text-[16px] leading-snug md:text-[20px] ${
                  isOpen ? 'font-semibold text-[#2A3040]' : 'font-normal text-[#2A3040]'
                }`}
              >
                {item.question}
              </span>
              <ChevronIcon open={isOpen} />
            </summary>
            <p className="mt-4 pr-8 text-left leading-relaxed text-[#6A758C]">{item.answer}</p>
          </details>
        );
      })}
    </div>
  );
}
