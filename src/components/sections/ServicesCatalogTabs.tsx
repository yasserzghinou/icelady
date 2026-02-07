'use client';

import Link from 'next/link';
import { useState } from 'react';

import { CTA } from '@/components/CTA';
import { ServiceCard } from '@/components/ServiceCard';

interface CatalogService {
  slug: string;
  href: string;
  name: string;
  category: string;
  summary: string;
  image?: string;
  duration?: string;
  priceNote?: string;
}

interface CatalogTab {
  id: string;
  label: string;
  description: string;
  services: CatalogService[];
}

interface ConsultationCopy {
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
}

interface ServicesCatalogTabsProps {
  tabs: CatalogTab[];
  ctaLabel: string;
  tabAriaLabel: string;
  consultation: ConsultationCopy;
  contactHref: string;
  mapHref?: string;
}

export function ServicesCatalogTabs({
  tabs,
  ctaLabel,
  tabAriaLabel,
  consultation,
  contactHref,
  mapHref
}: ServicesCatalogTabsProps) {
  const [activeTabId, setActiveTabId] = useState<string>(() => tabs.find((tab) => tab.services.length > 0)?.id || tabs[0]?.id || '');
  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  if (!activeTab) {
    return null;
  }

  return (
    <div className="mt-10">
      <div className="rounded-3xl border border-stone/35 bg-white/70 p-2 md:p-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={tabAriaLabel}>
          {tabs.map((tab) => {
            const selected = tab.id === activeTab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`services-tab-${tab.id}`}
                aria-controls={`services-panel-${tab.id}`}
                aria-selected={selected}
                onClick={() => setActiveTabId(tab.id)}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition ${
                  selected
                    ? 'bg-accent text-white shadow-md shadow-accent/20'
                    : 'border border-stone/45 bg-white/85 text-text/80 hover:border-accent hover:text-accent'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`services-panel-${activeTab.id}`}
        role="tabpanel"
        aria-labelledby={`services-tab-${activeTab.id}`}
        className="mt-6"
      >
        <div className="rounded-2xl border border-stone/35 bg-white/70 px-5 py-4 md:px-6">
          <h2 className="font-heading text-4xl leading-tight">{activeTab.label}</h2>
          <p className="mt-2 text-sm leading-relaxed text-text/75">{activeTab.description}</p>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {activeTab.services.map((service) => (
            <ServiceCard
              key={service.slug}
              variant="catalog"
              href={service.href}
              name={service.name}
              category={service.category}
              summary={service.summary}
              image={service.image}
              duration={service.duration}
              priceNote={service.priceNote}
              ctaLabel={ctaLabel}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-[2rem] bg-text px-6 py-7 text-white md:flex md:items-end md:justify-between md:gap-12 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-white/70">Ice Lady Marrakech</p>
          <h3 className="mt-3 font-heading text-4xl leading-tight">{consultation.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80">{consultation.description}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
          <CTA href={contactHref} label={consultation.primaryCtaLabel} className="bg-accent text-white hover:bg-accentDark" />
          {mapHref ? (
            <Link
              href={mapHref}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center rounded-full border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold tracking-wide text-white hover:border-white hover:bg-white/10"
            >
              {consultation.secondaryCtaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
