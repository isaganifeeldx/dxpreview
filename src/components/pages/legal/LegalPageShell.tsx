'use client';

import { type ReactNode } from 'react';

interface LegalPageShellProps {
  title: string;
  ariaLabel: string;
  children: ReactNode;
}

export default function LegalPageShell({ title, ariaLabel, children }: LegalPageShellProps) {
  return (
    <div className="min-h-screen">
      <section className="pb-10 pt-10 md:pb-12 md:pt-14" aria-labelledby="legal-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1
            id="legal-heading"
            className="title-heading-normal text-center text-[26px] text-[#2A3040] sm:text-[32px]"
            aria-label={ariaLabel}
          >
            {title}
          </h1>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
        <div className="bg-white mx-auto max-w-[1350px] !rounded-[16px] !p-6 sm:!p-8 lg:!p-10">
          {children}
        </div>
      </section>
    </div>
  );
}
