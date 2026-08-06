import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface SiteShellProps {
  children: React.ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="dashboard-gradient-surface flex min-h-screen flex-col text-slate-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
