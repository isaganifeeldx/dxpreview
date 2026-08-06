'use client';

import { useMemo, useState } from 'react';
import FaqAccordion from '@/components/ui/FaqAccordion';
import type { FaqPageContentData } from '@/lib/faq/types';

const SearchIcon = () => (
  <svg className="h-5 w-5 text-[#6A758C]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

type FaqPageContentProps = {
  content: FaqPageContentData;
};

export default function FaqPageContent({ content }: FaqPageContentProps) {
  const { title, intro, searchPlaceholder, items } = content;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return items;

    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query),
    );
  }, [items, searchQuery]);

  // Remount accordion when search results change so first match opens by default.
  const accordionKey = useMemo(
    () => filteredItems.map((item) => item.id).join('|') || 'empty',
    [filteredItems],
  );

  return (
    <div className="min-h-screen">
      <section className="pb-10 pt-10 md:pb-12 md:pt-14" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-[920px] px-4 sm:px-6 lg:px-8">
          <h1
            id="faq-heading"
            className="title-heading-normal text-center text-[26px] text-[#2A3040] sm:text-[32px]"
          >
            {title}
          </h1>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
        <div className="bg-white mx-auto max-w-[1350px] !rounded-[16px] !p-6 sm:!p-8 lg:!p-10">
          <div className="relative mx-auto mb-8 max-w-[640px]">
            <label htmlFor="faq-search" className="sr-only">
              Search FAQs
            </label>
            <input
              id="faq-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-[10px] border border-[#000000]/20 bg-white px-4 py-3 pr-12 text-[15px] text-[#696969] transition-colors placeholder:text-[#696969] focus:border-[#BFB6AD] focus:outline-none"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </span>
          </div>

          <p className="mx-auto mb-12 max-w-[720px] text-center text-[15px] leading-relaxed text-[#6A758C] md:mb-16 md:text-[16px]">
            {intro}
          </p>

          {filteredItems.length === 0 ? (
            <p className="border-t border-[#E5E5E5] py-10 text-center text-[15px] text-[#6A758C]">
              No results found. Try a different search.
            </p>
          ) : (
            <FaqAccordion key={accordionKey} items={filteredItems} openFirst />
          )}
        </div>
      </section>
    </div>
  );
}
