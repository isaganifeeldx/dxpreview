import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RecentArticles from '@/components/pages/articles/RecentArticles';
import JsonLdScripts from '@/components/seo/JsonLdScripts';
import {
  getAllArticles,
  getArticleBySlug,
  getRecentArticles,
} from '@/lib/articles/getArticles';
import { buildArticleJsonLd } from '@/lib/seo/buildArticleJsonLd';
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata';

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article | DX Interiors' };

  return buildMetadataFromSeo({
    seo: article.seo,
    path: `/articles/${article.slug}`,
    fallbackTitle: article.seo.title || `${article.title} | DX Interiors`,
    fallbackDescription: article.seo.description || article.excerpt,
    fallbackImageUrl: article.seo.ogImageUrl ?? article.image,
    siteName: 'DX Interiors',
    absoluteTitle: true,
  });
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = await getAllArticles();
  const recentArticles = getRecentArticles(allArticles, article.slug, 3);
  const defaultJsonLd = buildArticleJsonLd(article);

  return (
    <>
      <JsonLdScripts seo={article.seo} defaultJsonLd={defaultJsonLd} />
      <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
        <article className="bg-white mx-auto max-w-[1350px] !rounded-[16px] !p-4 sm:!p-8 lg:!p-10">
          <Link
            href="/articles"
            className="inline-flex min-h-11 items-center text-[13px] font-medium text-[#6A758C] transition-colors hover:text-[#2A3040] sm:min-h-0"
          >
            ← Back to Articles
          </Link>

          <header className="sm:mt-10">
            <h1 className="title-heading-normal text-[22px] leading-tight text-[#2A3040] sm:text-[28px] md:text-[32px]">
              {article.title}
            </h1>

            <p className="mt-2 text-[12px] tracking-wide text-[#8A909C]">{article.date}</p>

            <p className="mt-4 inline-flex w-fit rounded-full border border-[#000000]/20 px-2 py-0.5 text-[10px] tracking-wide text-[#2A3040]">
              {article.category}
            </p>
          </header>

          <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[14px] sm:mt-10 sm:aspect-[16/9] sm:rounded-[20px]">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1350px) 100vw, 1350px"
              className="object-cover"
            />
          </div>

          <div
            className="article-content mt-6 sm:mt-10"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </article>

        <RecentArticles articles={recentArticles} />
      </div>
    </>
  );
}
