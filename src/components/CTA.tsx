import Link from 'next/link';
import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CTAProps {
  href: string;
  label: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  trackingId?: string;
  newTab?: boolean;
}

export function CTA({
  href,
  label,
  variant = 'primary',
  className,
  trackingId,
  newTab = false
}: CTAProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'focus-ring inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide',
        variant === 'primary'
          ? 'bg-accent text-white hover:bg-accentDark'
          : 'border border-text/20 bg-white/70 text-text hover:border-accent hover:text-accent',
        className
      )}
      data-analytics-id={trackingId}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
    >
      {label}
    </Link>
  );
}
