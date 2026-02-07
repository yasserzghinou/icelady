import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="section-shell py-16">
      <div className="section-card max-w-2xl p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-3 font-heading text-4xl">Page not found</h1>
        <p className="mt-3 text-sm text-text/75">
          The page you requested does not exist.
        </p>

        <Link
          href="/"
          className="focus-ring mt-6 inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accentDark"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
