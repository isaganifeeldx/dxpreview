import type { Metadata } from 'next';
import HomePageContent from '@/components/pages/home/HomePageContent';
import JsonLdScripts from '@/components/seo/JsonLdScripts';
import { getHomePageContent } from '@/lib/home/getHomePageContent';
import { buildHomeJsonLd } from '@/lib/seo/buildHomeJsonLd';
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomePageContent();

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/render-1.jpg',
    absoluteTitle: true,
  });
}

export default async function HomePage() {
  const content = await getHomePageContent();
  const defaultJsonLd = buildHomeJsonLd({ seo: content.seo });

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <HomePageContent content={content} />
    </>
  );
}
