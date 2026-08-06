import type { Metadata } from 'next';
import ContactPageContent from '@/components/pages/contact/ContactPageContent';
import JsonLdScripts from '@/components/seo/JsonLdScripts';
import { getContactPageContent } from '@/lib/contact/getContactPageContent';
import { buildContactPageJsonLd } from '@/lib/seo/buildContactPageJsonLd';
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContactPageContent();

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/contact',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/render-1.jpg',
    siteName: 'DX Interiors',
    absoluteTitle: true,
  });
}

export default async function ContactPage() {
  const content = await getContactPageContent();
  const defaultJsonLd = buildContactPageJsonLd(content);

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <ContactPageContent content={content} />
    </>
  );
}
