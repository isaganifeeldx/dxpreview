import type { Metadata } from 'next';
import ArticlesPageContent from '@/components/pages/articles/ArticlesPageContent';
import JsonLdScripts from '@/components/seo/JsonLdScripts';
import { getArticlesPageContent } from '@/lib/articles/getArticlesPageContent';
import { buildArticlesListJsonLd } from '@/lib/seo/buildArticleJsonLd';
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getArticlesPageContent();

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/articles',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/render-1.jpg',
    siteName: 'DX Interiors',
    absoluteTitle: true,
  });
}

export default async function ArticlesPage() {
  const content = await getArticlesPageContent();
  const defaultJsonLd = buildArticlesListJsonLd(content.seo);

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <ArticlesPageContent content={content} />
    </>
  );
}
