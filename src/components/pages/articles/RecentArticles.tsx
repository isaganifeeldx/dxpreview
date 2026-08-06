import Image from 'next/image';
import Link from 'next/link';
import type { ArticleItem } from '@/lib/articles/types';

interface RecentArticlesProps {
  articles: ArticleItem[];
}

function CategoryTag({ category }: { category: string }) {
  return (
    <span className="mt-4 inline-flex w-fit rounded-full border border-[#000000]/20 px-2 py-0.5 text-[10px] tracking-wide text-[#8A909C]">
      {category}
    </span>
  );
}

export default function RecentArticles({ articles }: RecentArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-6 sm:mt-8">
      <div className="glass-panel mx-auto max-w-[1350px] !rounded-[16px] !p-4 sm:!p-8 lg:!p-10">
        <div className="mb-6 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
          <h2 className="title-heading-normal text-[22px] text-[#2A3040] sm:text-[28px] md:text-[32px]">
            Recent Articles
          </h2>
          <Link
            href="/articles"
            className="inline-flex min-h-11 items-center text-[13px] font-medium text-[#6A758C] transition-colors hover:text-[#2A3040] sm:min-h-0"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-x-10">
          {articles.map((article) => (
            <Link
              key={article.id}
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
                <h3 className="title-heading-normal text-[20px] leading-tight text-[#2A3040] sm:text-[22px] md:text-[24px]">
                  {article.title}
                </h3>

                <p className="mt-2 text-[12px] tracking-wide text-[#8A909C]">{article.date}</p>

                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[#696969] line-clamp-3 sm:text-[15px]">
                  {article.excerpt}
                </p>

                <CategoryTag category={article.category} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
