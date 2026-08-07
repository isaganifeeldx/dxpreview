import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TrackingScripts from '@/components/layout/TrackingScripts'
import { getSiteSettings } from '@/lib/settings/getSiteSettings'

interface SiteShellProps {
  children: React.ReactNode
}

export default async function SiteShell({ children }: SiteShellProps) {
  const settings = await getSiteSettings()
  const { googleTagHead, googleTagBody, metaPixel } = settings.tracking
  const headHtml = [googleTagHead, metaPixel].filter(Boolean).join('\n')

  return (
    <div className="dashboard-gradient-surface flex min-h-screen flex-col text-slate-900">
      <TrackingScripts headHtml={headHtml} bodyHtml={googleTagBody} />
      <Header settings={settings.header} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings.footer} />
    </div>
  )
}
