'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageClosingCta from '@/components/pages/shared/PageClosingCta';
import type { ArticleItem, ArticlesPageContentData } from '@/lib/articles/types';

const SearchIcon = () => (
  <svg className="h-4 w-4 shrink-0 text-[#2A3040]" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden
  >
    <path
      d="M3 4.5L6 7.5L9 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function CategoryTag({ category }: { category: string }) {
  return (
    <span className="mt-4 inline-flex text-[10px] tracking-wide text-[#8A909C] border border-[#000000]/20 rounded-full py-0.5 px-2 w-fit">
      {category}
    </span>
  );
}

function ArticleCard({ article }: { article: ArticleItem }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex min-w-0 flex-col rounded-[16px] bg-white outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#2A3040]/30 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[16px]">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-[-15px] flex flex-col p-3 pt-7 sm:p-4 sm:pt-8">
        <h2 className="lao-mn text-[20px] leading-tight text-[#2A3040] sm:text-[22px] md:text-[24px]">
          {article.title}
        </h2>

        <p className="mt-2 text-[12px] tracking-wide text-[#8A909C]">{article.date}</p>

        <p className="mt-3 flex-1 text-[13px] leading-relaxed text-[#696969] line-clamp-3 sm:text-[15px]">
          {article.excerpt}
        </p>

        <CategoryTag category={article.category} />
      </div>
    </Link>
  );
}

type ArticlesPageContentProps = {
  content: ArticlesPageContentData;
};

export default function ArticlesPageContent({ content }: ArticlesPageContentProps) {
  const featured =
    content.articles.find((article) => article.featured) ?? content.articles[0];
  const gridItems = content.articles.filter((article) => article.id !== featured?.id);
  const categories = Array.from(new Set(content.articles.map((article) => article.category)));

  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return gridItems.filter((article) => {
      const matchesCategory =
        activeCategories.length === 0 || activeCategories.includes(article.category);

      if (!matchesCategory) return false;
      if (!query) return true;

      return (
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
      );
    });
  }, [gridItems, searchQuery, activeCategories]);

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    );
  };

  if (!featured) {
    return (
      <div className="min-h-screen px-4 py-16 text-center text-[#6A758C]">
        No articles published yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="px-4 pb-6 pt-8 sm:px-6 sm:pt-10 lg:px-10 lg:pb-8 lg:pt-14">
        <Link
          href={`/articles/${featured.slug}`}
          className="glass-panel group mx-auto grid max-w-[1350px] items-center gap-6 !rounded-[16px] !p-4 outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#2A3040]/30 focus-visible:ring-offset-4 sm:gap-8 sm:!p-6 lg:grid-cols-2 lg:gap-10 lg:!p-6"
        >
          <div className="relative aspect-[16/11] overflow-hidden rounded-[16px] sm:rounded-[20px]">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="px-1 sm:px-2 lg:px-4">
            <h1 className="lao-mn text-[22px] leading-[1.15] tracking-tight text-[#2A3040] transition-colors md:text-[32px]">
              {featured.title}
            </h1>
            <p className="mt-3 text-[12px] tracking-wide text-[#8A909C]">{featured.date}</p>
            <p className="mt-5 max-w-[480px] text-[13px] md:text-[16px] leading-relaxed text-[#696969]">
              {featured.excerpt}
            </p>
            <CategoryTag category={featured.category} />
          </div>
        </Link>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <div className="glass-panel mx-auto max-w-[1350px] !rounded-[16px] !p-4 sm:!p-6 lg:!p-8">
          <div className="mb-8 sm:mb-10">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
              <h2 className="shrink-0 text-[12px] font-medium uppercase tracking-[0.18em] text-[#8A909C]">
                {content.heading}
              </h2>

              <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                <label className="relative min-w-0 flex-1">
                  <span className="sr-only">Search articles</span>
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2A3040] sm:left-4">
                    <SearchIcon />
                  </span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={content.searchPlaceholder}
                    className="h-11 w-full rounded-full border border-[#000000]/20 bg-white/70 py-2.5 pl-10 pr-3 text-[16px] text-[#2A3040] placeholder:text-[#9AA1AD] backdrop-blur-sm transition-colors focus:border-[#BFB6AD] focus:outline-none sm:h-12 sm:pl-11 sm:pr-4 sm:text-[14px]"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setFilterOpen((open) => !open)}
                  aria-expanded={filterOpen}
                  className={`inline-flex h-11 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-[13px] transition-colors sm:h-12 sm:gap-2 sm:px-5 sm:text-[14px] ${
                    filterOpen || activeCategories.length > 0
                      ? 'border-[#2A3040] bg-[#2A3040] text-white'
                      : 'border-[#000000]/20 bg-white/70 text-[#2A3040] backdrop-blur-sm hover:border-[#BFB6AD]'
                  }`}
                >
                  <span>Filter</span>
                  {activeCategories.length > 0 ? (
                    <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[11px] leading-none">
                      {activeCategories.length}
                    </span>
                  ) : null}
                  <ChevronIcon open={filterOpen} />
                </button>
              </div>
            </div>

            {filterOpen ? (
              <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                {categories.map((category) => {
                  const active = activeCategories.includes(category);
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className={`min-h-9 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors sm:px-4 ${
                        active
                          ? 'border-[#2A3040] bg-[#2A3040] text-white'
                          : 'border-[#000000]/20 bg-white/70 text-[#5C6470] backdrop-blur-sm hover:border-[#BFB6AD] hover:text-[#2A3040]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
                {activeCategories.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setActiveCategories([])}
                    className="min-h-9 rounded-full px-3 py-1.5 text-[13px] text-[#6A758C] transition-colors hover:text-[#2A3040]"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>

          {filteredItems.length === 0 ? (
            <p className="py-16 text-center text-[15px] text-[#6A758C]">
              No articles found. Try a different search or filter.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
              {filteredItems.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      <PageClosingCta {...content.closing} />
    </div>
  );
}
