import type { Metadata } from 'next';
import LegalPageContent from '@/components/pages/legal/LegalPageContent';
import JsonLdScripts from '@/components/seo/JsonLdScripts';
import { resolveLegalBodyHtml } from '@/lib/legal/resolveLegalBodyHtml';
import { buildLegalPageJsonLd } from '@/lib/seo/buildLegalPageJsonLd';
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata';
import { termsPageDefaults } from '@/lib/terms/defaults';
import { getTermsPageContent } from '@/lib/terms/getTermsPageContent';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTermsPageContent();

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/terms-of-service',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/render-1.jpg',
    siteName: 'DX Interiors',
    absoluteTitle: true,
  });
}

export default async function TermsOfServicePage() {
  const content = await getTermsPageContent();
  const contentHtml = resolveLegalBodyHtml(content.body, termsPageDefaults.body as string, {
    linkPrivacyPolicy: true,
  });
  const defaultJsonLd = buildLegalPageJsonLd({
    path: '/terms-of-service',
    pageTitle: content.title,
    seo: content.seo,
  });

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <LegalPageContent
        title={content.title}
        ariaLabel="Terms of Service"
        contentHtml={contentHtml}
      />
    </>
  );
}
