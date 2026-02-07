import Link from 'next/link';
import clsx from 'clsx';

interface CTAProps {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  trackingId?: string;
}

export function CTA({ href, label, variant = 'primary', className, trackingId }: CTAProps) {
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
    >
      {label}
    </Link>
  );
}
