import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl font-semibold text-ink">404</p>
      <p className="mt-4 text-ink/65">This page could not be found.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white"
      >
        Back home
      </Link>
    </div>
  );
}
