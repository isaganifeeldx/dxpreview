import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactFloatingMenu from '@/components/layout/ContactFloatingMenu'
import TrackingScripts from '@/components/layout/TrackingScripts'
import { getSiteSettings } from '@/lib/settings/getSiteSettings'
import { siteSettingsDefaults } from '@/lib/settings/defaults'

interface SiteShellProps {
  children: React.ReactNode
}

export default async function SiteShell({ children }: SiteShellProps) {
  const settings = await getSiteSettings()
  const { googleTagHead, googleTagBody, metaPixel, ahrefs } = settings.tracking
  const headHtml = [googleTagHead, metaPixel, ahrefs].filter(Boolean).join('\n')

  return (
    <div className="dashboard-gradient-surface flex min-h-screen flex-col text-slate-900">
      <TrackingScripts headHtml={headHtml} bodyHtml={googleTagBody} />
      <Header settings={settings.header} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings.footer} />
      <ContactFloatingMenu settings={settings.floatingCta ?? siteSettingsDefaults.floatingCta} />
    </div>
  )
}
