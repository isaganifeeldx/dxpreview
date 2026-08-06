import type { Metadata } from 'next';
import LegalPageContent from '@/components/pages/legal/LegalPageContent';
import JsonLdScripts from '@/components/seo/JsonLdScripts';
import { resolveLegalBodyHtml } from '@/lib/legal/resolveLegalBodyHtml';
import { privacyPageDefaults } from '@/lib/privacy/defaults';
import { getPrivacyPageContent } from '@/lib/privacy/getPrivacyPageContent';
import { buildLegalPageJsonLd } from '@/lib/seo/buildLegalPageJsonLd';
import { buildMetadataFromSeo } from '@/lib/seo/buildMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPrivacyPageContent();

  return buildMetadataFromSeo({
    seo: content.seo,
    path: '/privacy-policy',
    fallbackTitle: content.seo.title,
    fallbackDescription: content.seo.description,
    fallbackImageUrl: content.seo.ogImageUrl ?? '/images/landing/render-1.jpg',
    siteName: 'DX Interiors',
    absoluteTitle: true,
  });
}

export default async function PrivacyPolicyPage() {
  const content = await getPrivacyPageContent();
  const contentHtml = resolveLegalBodyHtml(content.body, privacyPageDefaults.body as string);
  const defaultJsonLd = buildLegalPageJsonLd({
    path: '/privacy-policy',
    pageTitle: content.title,
    seo: content.seo,
  });

  return (
    <>
      <JsonLdScripts seo={content.seo} defaultJsonLd={defaultJsonLd} />
      <LegalPageContent
        title={content.title}
        ariaLabel="Privacy Policy"
        contentHtml={contentHtml}
      />
    </>
  );
}
