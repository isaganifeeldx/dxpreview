'use client';

import LegalPageShell from '@/components/pages/legal/LegalPageShell';

export interface LegalPageContentProps {
  title: string;
  ariaLabel: string;
  contentHtml: string;
}

export default function LegalPageContent({ title, ariaLabel, contentHtml }: LegalPageContentProps) {
  return (
    <LegalPageShell title={title} ariaLabel={ariaLabel}>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </LegalPageShell>
  );
}
