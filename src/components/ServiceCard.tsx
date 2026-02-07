import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

interface ServiceCardProps {
  href: string;
  name: string;
  category: string;
  summary: string;
  image?: string;
  ctaLabel?: string;
  duration?: string;
  priceNote?: string;
  variant?: 'default' | 'catalog';
}

export function ServiceCard({
  href,
  name,
  category,
  summary,
  image,
  ctaLabel = 'View treatment',
  duration,
  priceNote,
  variant = 'default'
}: ServiceCardProps) {
  if (variant === 'catalog') {
    return (
      <article className="section-card group overflow-hidden p-0 transition-transform hover:-translate-y-1">
        <div className="relative h-52 overflow-hidden bg-stone/25">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-text/55 via-text/10 to-transparent" />
          <p className="absolute left-4 top-4 inline-flex rounded-full border border-white/50 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-text/75">
            {category}
          </p>
        </div>
        <div className="p-6">
          <h3 className="font-heading text-3xl leading-tight text-text">{name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-text/75">{summary}</p>
          <div
            className={clsx(
              'mt-5 flex items-center gap-2 text-xs text-text/70',
              priceNote ? 'justify-between' : 'justify-start'
            )}
          >
            {duration ? <span>{duration}</span> : null}
            {priceNote ? <span className="font-semibold text-text">{priceNote}</span> : null}
          </div>
          <Link
            href={href}
            className="focus-ring mt-5 inline-flex items-center text-sm font-semibold text-accent hover:text-accentDark"
          >
            {ctaLabel} <span className="ml-2">→</span>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="section-card group overflow-hidden p-0 transition-transform hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden bg-stone/25">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-text/70 via-text/15 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/95 backdrop-blur-sm">
            {category}
          </p>
          <h3 className="mt-3 font-heading text-2xl leading-tight text-white">{name}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm leading-relaxed text-text/75">{summary}</p>
        <Link
          href={href}
          className="focus-ring mt-5 inline-flex items-center text-sm font-semibold text-accent hover:text-accentDark"
        >
          {ctaLabel} <span className="ml-2">→</span>
        </Link>
      </div>
    </article>
  );
}
