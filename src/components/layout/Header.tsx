'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import type { MenuLink, SiteSettingsData } from '@/lib/settings/defaults';

type HeaderProps = {
  settings: SiteSettingsData['header'];
};

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden
    className={`transition-transform ${open ? 'rotate-180' : ''}`}
  >
    <path
      d="M3 4.5L6 7.5L9 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function NavDropdown({
  label,
  links,
  isOpen,
  onToggle,
  onClose,
  buttonRef,
  menuRef,
  menuPosition,
}: {
  label: string;
  links: MenuLink[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  menuRef: React.RefObject<HTMLDivElement | null>;
  menuPosition: { top: number; left: number };
}) {
  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-slate-900"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={onToggle}
        >
          {label}
          <ChevronIcon open={isOpen} />
        </button>
      </div>
      {isOpen
        ? createPortal(
            <div
              ref={menuRef}
              role="menu"
              className="header-glass !fixed z-[100] min-w-[200px] -translate-x-1/2 rounded-[16px] p-2"
              style={{ top: menuPosition.top, left: menuPosition.left }}
            >
              {links.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  role="menuitem"
                  onClick={onClose}
                  className="relative z-10 block rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-white/55 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function MobileNavAccordion({
  label,
  links,
  isOpen,
  onToggle,
  onNavigate,
}: {
  label: string;
  links: MenuLink[];
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-white/55 hover:text-slate-900"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        {label}
        <ChevronIcon open={isOpen} />
      </button>
      {isOpen ? (
        <div className="relative ml-2 mt-1 space-y-1 rounded-[14px] border border-white/50 bg-white/40 p-2">
          {links.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              onClick={onNavigate}
              className="relative z-10 block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-white/55"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default function Header({ settings }: HeaderProps) {
  const {
    navLinks,
    productLabel,
    productLinks,
    resourcesLabel,
    resourceLinks,
    login,
    demo,
    startFree,
  } = settings;

  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [productMenuPosition, setProductMenuPosition] = useState({ top: 0, left: 0 });
  const [resourcesMenuPosition, setResourcesMenuPosition] = useState({ top: 0, left: 0 });
  const [mobileMenuTop, setMobileMenuTop] = useState(0);
  const [mounted, setMounted] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const productButtonRef = useRef<HTMLButtonElement>(null);
  const productMenuRef = useRef<HTMLDivElement>(null);
  const resourcesButtonRef = useRef<HTMLButtonElement>(null);
  const resourcesMenuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileProductOpen(false);
    setMobileResourcesOpen(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (!menuOpen || !headerRef.current) return;

    const updateMobileMenuTop = () => {
      const rect = headerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMobileMenuTop(rect.bottom);
    };

    updateMobileMenuTop();
    window.addEventListener('resize', updateMobileMenuTop);
    window.addEventListener('scroll', updateMobileMenuTop, true);
    return () => {
      window.removeEventListener('resize', updateMobileMenuTop);
      window.removeEventListener('scroll', updateMobileMenuTop, true);
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    if (!productOpen || !productButtonRef.current) return;

    const updatePosition = () => {
      const rect = productButtonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setProductMenuPosition({ top: rect.bottom + 12, left: rect.left + rect.width / 2 });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [productOpen]);

  useLayoutEffect(() => {
    if (!resourcesOpen || !resourcesButtonRef.current) return;

    const updatePosition = () => {
      const rect = resourcesButtonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setResourcesMenuPosition({ top: rect.bottom + 12, left: rect.left + rect.width / 2 });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [resourcesOpen]);

  useEffect(() => {
    if (!productOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!productButtonRef.current?.contains(target) && !productMenuRef.current?.contains(target)) {
        setProductOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setProductOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [productOpen]);

  useEffect(() => {
    if (!resourcesOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !resourcesButtonRef.current?.contains(target) &&
        !resourcesMenuRef.current?.contains(target)
      ) {
        setResourcesOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setResourcesOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [resourcesOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedToggle = mobileToggleRef.current?.contains(target);
      const clickedMenu = mobileMenuRef.current?.contains(target);
      if (!clickedToggle && !clickedMenu) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    const handleResize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const toggleProduct = () => {
    setProductOpen((open) => !open);
    setResourcesOpen(false);
  };

  const toggleResources = () => {
    setResourcesOpen((open) => !open);
    setProductOpen(false);
  };

  const mobileMenu =
    mounted && menuOpen
      ? createPortal(
          <div
            ref={mobileMenuRef}
            className="header-glass !fixed inset-x-0 z-[100] !rounded-none border-t border-white/50 px-4 pb-4 pt-2 sm:px-6 lg:hidden"
            style={{ top: mobileMenuTop }}
          >
            <nav className="relative z-10 flex flex-col gap-1" aria-label="Mobile">
              <MobileNavAccordion
                label={productLabel}
                links={productLinks}
                isOpen={mobileProductOpen}
                onToggle={() => {
                  setMobileProductOpen((open) => !open);
                  setMobileResourcesOpen(false);
                }}
                onNavigate={closeMenu}
              />

              {navLinks.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-white/55 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}

              <MobileNavAccordion
                label={resourcesLabel}
                links={resourceLinks}
                isOpen={mobileResourcesOpen}
                onToggle={() => {
                  setMobileResourcesOpen((open) => !open);
                  setMobileProductOpen(false);
                }}
                onNavigate={closeMenu}
              />
            </nav>
            <div className="relative z-10 mt-3 flex flex-col gap-2 border-t border-slate-200/60 pt-3">
              <Link
                href={login.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-white/55 md:hidden"
              >
                {login.label}
              </Link>
              <Link
                href={demo.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-white/55"
              >
                {demo.label}
              </Link>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header ref={headerRef} className="header-glass !sticky top-0 z-50 rounded-none p-0">
        <div className="relative mx-auto flex max-w-[1380px] items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-10">
          <Link href="/" aria-label="DX Interiors home" onClick={closeMenu} className="relative z-10 shrink-0">
            <Image
              src="/images/landing/logo.svg"
              alt="DX Interiors"
              width={173}
              height={16}
              className="h-auto w-[128px] sm:w-[160px]"
              priority
            />
          </Link>

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm text-slate-600 lg:flex"
            aria-label="Main"
          >
            {mounted ? (
              <NavDropdown
                label={productLabel}
                links={productLinks}
                isOpen={productOpen}
                onToggle={toggleProduct}
                onClose={() => setProductOpen(false)}
                buttonRef={productButtonRef}
                menuRef={productMenuRef}
                menuPosition={productMenuPosition}
              />
            ) : (
              <span>{productLabel}</span>
            )}

            {navLinks.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="transition-colors hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}

            {mounted ? (
              <NavDropdown
                label={resourcesLabel}
                links={resourceLinks}
                isOpen={resourcesOpen}
                onToggle={toggleResources}
                onClose={() => setResourcesOpen(false)}
                buttonRef={resourcesButtonRef}
                menuRef={resourcesMenuRef}
                menuPosition={resourcesMenuPosition}
              />
            ) : (
              <span>{resourcesLabel}</span>
            )}
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-1.5 sm:gap-3">
            <Link
              href={login.href}
              className="hidden rounded-full px-4 py-1.5 text-sm text-slate-700 transition-colors hover:text-slate-900 md:inline-flex"
            >
              {login.label}
            </Link>
            <Link
              href={demo.href}
              className="hidden rounded-full px-4 py-1.5 text-sm text-slate-700 transition-colors hover:text-slate-900 lg:inline-flex"
            >
              {demo.label}
            </Link>
            <Link
              href={startFree.href}
              className="inline-flex shrink-0 whitespace-nowrap rounded-full bg-[#2A3040] px-2.5 py-1.5 text-xs text-white transition-colors hover:bg-[#111a2e] sm:px-4 sm:text-sm"
            >
              {startFree.label}
            </Link>

            <button
              ref={mobileToggleRef}
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:border-slate-400 lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}
