import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin/session';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: {
    index: false,
    follow: false
  }
};

const errorMessageByCode: Record<string, string> = {
  credentials: 'Incorrect password.',
  rate: 'Too many attempts. Please wait and try again.',
  origin: 'Request blocked for security reasons.'
};

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams?: { returnTo?: string; error?: string };
}) {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthenticated = await verifyAdminSessionToken(token);
  if (isAuthenticated) {
    redirect('/admin');
  }

  const returnTo = searchParams?.returnTo?.startsWith('/') ? searchParams.returnTo : '/admin';
  const error = searchParams?.error ? errorMessageByCode[searchParams.error] : null;

  return (
    <section className="section-shell flex min-h-[70vh] items-center justify-center py-16">
      <div className="section-card w-full max-w-md p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Private Access</p>
        <h1 className="mt-3 font-heading text-4xl">Ice Lady Admin</h1>
        <p className="mt-3 text-sm text-text/75">
          This area is restricted. Enter the admin password to continue.
        </p>

        {error ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        ) : null}

        <form action="/api/admin/login" method="post" className="mt-6 space-y-4">
          <input type="hidden" name="returnTo" value={returnTo} />

          <div>
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.12em] text-text/70">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              className="mt-1 w-full rounded-2xl border border-stone/50 bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-accent"
            />
          </div>

          <button
            type="submit"
            className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold tracking-wide text-white hover:bg-accentDark"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-xs text-text/60">
          <Link href="/" className="focus-ring underline decoration-stone-400 underline-offset-4 hover:text-accent">
            Back to website
          </Link>
        </p>
      </div>
    </section>
  );
}
