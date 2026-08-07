import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getSiteSettings } from '@/lib/settings/getSiteSettings';

interface SiteShellProps {
  children: React.ReactNode;
}

export default async function SiteShell({ children }: SiteShellProps) {
  const settings = await getSiteSettings();

  return (
    <div className="dashboard-gradient-surface flex min-h-screen flex-col text-slate-900">
      <Header settings={settings.header} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings.footer} />
    </div>
  );
}
