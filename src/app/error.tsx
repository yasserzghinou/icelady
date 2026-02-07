'use client';

export default function AppError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="section-shell py-16">
      <div className="section-card max-w-2xl p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Error</p>
        <h1 className="mt-3 font-heading text-4xl">Something went wrong</h1>
        <p className="mt-3 text-sm text-text/75">
          The page failed to render. Please try again.
        </p>

        <p className="mt-4 rounded-xl border border-stone/35 bg-white/70 px-4 py-3 text-xs text-text/70">
          {error?.message || 'Unknown error'}
        </p>

        <button
          type="button"
          onClick={reset}
          className="focus-ring mt-6 inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accentDark"
        >
          Retry
        </button>
      </div>
    </main>
  );
}
