export type MenuLink = {
  label: string
  href: string
}

export type SiteSettingsData = {
  header: {
    navLinks: MenuLink[]
    resourcesLabel: string
    resourceLinks: MenuLink[]
    login: MenuLink
    demo: MenuLink
    startFree: MenuLink
  }
  footer: {
    linkColumnTitle: string
    linkColumn: MenuLink[]
    resourcesColumnTitle: string
    resourcesColumn: MenuLink[]
    companyColumnTitle: string
    companyColumn: MenuLink[]
    contact: {
      email: string
      phone: string
      phoneHref: string
      location: string
    }
    social: Array<{
      platform: 'facebook' | 'linkedin' | 'instagram' | 'youtube'
      href: string
    }>
    legalLinks: MenuLink[]
    copyright: string
  }
  tracking: {
    googleTagHead: string
    googleTagBody: string
    metaPixel: string
    ahrefs: string
  }
}

export const siteSettingsDefaults: SiteSettingsData = {
  header: {
    navLinks: [
      { label: 'Product', href: '#' },
      { label: 'Plans', href: '/pricing' },
      { label: 'Business', href: '/business' },
    ],
    resourcesLabel: 'Resources',
    resourceLinks: [
      { label: 'Articles', href: '/articles' },
      { label: 'Tutorials', href: '#' },
      { label: 'Inspiration', href: '#' },
      { label: 'Help', href: '#' },
    ],
    login: { label: 'Log in', href: '#' },
    demo: { label: 'Get a demo', href: '/contact' },
    startFree: { label: 'Start Free', href: '/login' },
  },
  footer: {
    linkColumnTitle: 'Link',
    linkColumn: [
      { label: 'Product', href: '#' },
      { label: 'Plans', href: '/pricing' },
      { label: 'Business', href: '/business' },
      { label: 'FAQs', href: '/faq' },
    ],
    resourcesColumnTitle: 'Resources',
    resourcesColumn: [
      { label: 'Articles', href: '/articles' },
      { label: 'Tutorials', href: '#' },
      { label: 'Inspiration', href: '#' },
      { label: 'Help', href: '#' },
    ],
    companyColumnTitle: 'Company',
    companyColumn: [
      { label: 'About us', href: '#' },
      { label: 'Request a demo', href: '/contact' },
      { label: 'DX Living', href: '#' },
      { label: 'FeelDX', href: '#' },
    ],
    contact: {
      email: 'sales@dxinteriors.ai',
      phone: '1800 333 539',
      phoneHref: 'tel:1800333539',
      location: 'Victoria, Australia',
    },
    social: [
      { platform: 'facebook', href: 'https://www.facebook.com/dxlivingaustralia' },
      { platform: 'linkedin', href: 'https://www.linkedin.com/company/108389291' },
      { platform: 'instagram', href: 'https://www.instagram.com/dxliving.au/' },
      { platform: 'youtube', href: 'https://www.youtube.com/@DXLivingofficial' },
    ],
    legalLinks: [
      { label: 'Terms & Conditions', href: '/terms-of-service' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'User Agreement', href: '#' },
    ],
    copyright: '© 2026 DX Living. All rights reserved',
  },
  tracking: {
    googleTagHead: '',
    googleTagBody: '',
    metaPixel: '',
    ahrefs: '',
  },
}
