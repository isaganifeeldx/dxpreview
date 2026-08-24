import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { SiteSettingsData } from '@/lib/settings/defaults';

const socialIcons: Record<
  SiteSettingsData['footer']['social'][number]['platform'],
  ReactNode
> = {
  facebook: (
    <svg className="block h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="1 0 16 16" aria-hidden>
      <path d="M7.2 16v-7.5h-2v-2.7h2c0 0 0-1.1 0-2.3 0-1.8 1.2-3.5 3.9-3.5 1.1 0 1.9 0.1 1.9 0.1l-0.1 2.5c0 0-0.8 0-1.7 0-1 0-1.1 0.4-1.1 1.2 0 0.6 0-1.3 0 2h2.9l-0.1 2.7h-2.8v7.5h-2.9z" />
    </svg>
  ),
  linkedin: (
    <svg className="block h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="-2 -1 24 24" aria-hidden>
      <path d="M19.959 11.719v7.379h-4.278v-6.885c0-1.73-.619-2.91-2.167-2.91-1.182 0-1.886.796-2.195 1.565-.113.275-.142.658-.142 1.043v7.187h-4.28s.058-11.66 0-12.869h4.28v1.824l-.028.042h.028v-.042c.568-.875 1.583-2.126 3.856-2.126 2.815 0 4.926 1.84 4.926 5.792zM2.421.026C.958.026 0 .986 0 2.249c0 1.235.93 2.224 2.365 2.224h.028c1.493 0 2.42-.989 2.42-2.224C4.787.986 3.887.026 2.422.026zM.254 19.098h4.278V6.229H.254v12.869z" />
    </svg>
  ),
  instagram: (
    <svg className="block h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  youtube: (
    <svg className="block h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M23,9.71a8.5,8.5,0,0,0-.91-4.13,2.92,2.92,0,0,0-1.72-1A78.36,78.36,0,0,0,12,4.27a78.45,78.45,0,0,0-8.34.3,2.87,2.87,0,0,0-1.46.74c-.9.83-1,2.25-1.1,3.45a48.29,48.29,0,0,0,0,6.48,9.55,9.55,0,0,0,.3,2,3.14,3.14,0,0,0,.71,1.36,2.86,2.86,0,0,0,1.49.78,45.18,45.18,0,0,0,6.5.33c3.5.05,6.57,0,10.2-.28a2.88,2.88,0,0,0,1.53-.78,2.49,2.49,0,0,0,.61-1,10.58,10.58,0,0,0,.52-3.4C23,13.69,23,10.31,23,9.71ZM9.74,14.85V8.66l5.92,3.11C14,12.69,11.81,13.73,9.74,14.85Z" />
    </svg>
  ),
};

const socialLabels: Record<keyof typeof socialIcons, string> = {
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  youtube: 'YouTube',
};

function FooterColumn({
  title,
  links,
  className = '',
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="lao-mn mb-3 text-[12px] tracking-[0.16em] text-[#6A758C] uppercase sm:mb-5 sm:text-[14px]">
        {title}
      </p>
      <ul className="space-y-2.5 text-[13px] text-[#6A758C] sm:space-y-3 sm:text-[14px]">
        {links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <Link href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

type FooterProps = {
  settings: SiteSettingsData['footer'];
};

export default function Footer({ settings }: FooterProps) {
  const {
    linkColumnTitle,
    linkColumn,
    resourcesColumnTitle,
    resourcesColumn,
    companyColumnTitle,
    companyColumn,
    contact,
    social,
    legalLinks,
    copyright,
  } = settings;

  return (
    <footer id="site-footer" className="bg-[#2A3040] text-slate-200 px-4 lg:px-10" aria-label="Footer">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-10 py-10 sm:gap-12 sm:px-6 sm:py-14 lg:flex-row lg:items-start lg:justify-between lg:gap-16  lg:py-16">
        <div className="flex flex-col gap-6 lg:min-h-[160px] sm:justify-between lg:min-w-[220px] items-center lg:items-start">
          <Image
            src="/images/landing/logo-w.svg"
            alt="DX Interiors"
            width={223}
            height={21}
            className="h-auto w-[180px]"
          />
          <div className="flex items-center justify-center gap-3 md:justify-start lg:mt-auto">
            {social.map((item) => (
              <a
                key={`${item.platform}-${item.href}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${socialLabels[item.platform]} page`}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-[#BFB6AD] p-0 text-[#BFB6AD] transition-colors hover:bg-[#BFB6AD] hover:text-white"
              >
                {socialIcons[item.platform]}
              </a>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-1 flex-wrap items-start justify-center gap-x-6 gap-y-8 sm:gap-x-10 lg:flex-nowrap lg:justify-between lg:gap-x-8 xl:gap-x-12 max-w-[300px] mx-auto md:max-w-[820px]">
          <FooterColumn
            title={linkColumnTitle}
            links={linkColumn}
            className="w-[calc(50%-0.75rem)] sm:w-auto"
          />
          <FooterColumn
            title={resourcesColumnTitle}
            links={resourcesColumn}
            className="w-[calc(50%-0.75rem)] sm:w-auto"
          />
          <FooterColumn
            title={companyColumnTitle}
            links={companyColumn}
            className="w-[calc(50%-0.75rem)] sm:w-auto"
          />
          <div className="w-[calc(50%-0.75rem)] sm:w-auto">
            <p className="lao-mn mb-3 text-[12px] tracking-[0.16em] text-[#6A758C] uppercase sm:mb-5 sm:text-[14px]">
              Contact
            </p>
            <ul className="space-y-2.5 text-[13px] text-[#6A758C] sm:space-y-3 sm:text-[14px]">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="transition-colors hover:text-white">
                  {contact.phone}
                </a>
              </li>
              <li>{contact.location}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-500/30">
        <div className="mx-auto flex max-w-[1380px]  gap-3 px-4 py-4 text-[10px] tracking-[0.12em] text-slate-400 uppercase sm:px-6 sm:text-[11px] flex-col sm:flex-row md:flex-col lg:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="text-center md:text-left text-[#EAEAEA]">{copyright}</p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 sm:gap-6">
            {legalLinks.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="text-[#6A758C] transition-colors hover:text-slate-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
