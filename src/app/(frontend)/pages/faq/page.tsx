import type { Metadata } from 'next';
import FaqPageContent from '@/components/pages/faq/FaqPageContent';
import JsonLdScripts from '@/components/seo/JsonLdScripts';
import { getFaqPageContent } from '@/lib/faq/getFaqPageContent';
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata';
import { buildFaqPageJsonLd } from '@/lib/seo/faqSchema';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getFaqPageContent();

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/faq',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/render-1.jpg',
    siteName: 'DX Interiors',
    absoluteTitle: true,
  });
}

export default async function FaqPage() {
  const content = await getFaqPageContent();
  const defaultJsonLd = buildFaqPageJsonLd({
    items: content.items,
    seo: content.seo,
  });

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <FaqPageContent content={content} />
    </>
  );
}
