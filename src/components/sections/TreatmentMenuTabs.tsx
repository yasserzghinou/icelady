'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { CTA } from '@/components/CTA';

type CardKind = 'programme' | 'signature' | 'treatment';

interface TreatmentCard {
  id: string;
  title: string;
  summary: string;
  idealFor: string;
  duration: string;
  priceNote: string;
  image?: string;
  discoverHref: string;
  reserveHref: string;
  discoverLabel: string;
  reserveLabel: string;
  badge?: string;
  kind: CardKind;
}

interface TabGroup {
  id: string;
  title: string;
  cards: TreatmentCard[];
}

interface TreatmentTab {
  id: string;
  label: string;
  intro: string;
  programsTitle?: string;
  programs?: TreatmentCard[];
  treatmentsTitle?: string;
  treatments?: TreatmentCard[];
  groupedTreatments?: TabGroup[];
}

interface TreatmentMenuTabsProps {
  title: string;
  subtitle: string;
  tabsLabel: string;
  tabs: TreatmentTab[];
  emptyState: string;
}

function Card({ card }: { card: TreatmentCard }) {
  return (
    <article className="section-card group overflow-hidden p-0">
      <div className="relative h-52 overflow-hidden bg-stone/20">
        {card.image ? (
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-text/65 via-text/20 to-transparent" />
        {card.badge ? (
          <span
            className={`absolute left-4 top-4 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
              card.kind === 'signature'
                ? 'bg-accent text-white'
                : 'border border-white/40 bg-white/85 text-text/85'
            }`}
          >
            {card.badge}
          </span>
        ) : null}
      </div>

      <div className="p-6">
        <h3 className="font-heading text-3xl leading-tight text-text">{card.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-text/75">{card.summary}</p>

        <div className="mt-5 space-y-2 rounded-2xl border border-stone/35 bg-white/75 p-4 text-sm text-text/80">
          <p>{card.idealFor}</p>
          <p>{card.duration}</p>
          <p>{card.priceNote}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <CTA href={card.reserveHref} label={card.reserveLabel} className="px-4 py-2" />
          <Link
            href={card.discoverHref}
            className="focus-ring inline-flex items-center rounded-full border border-text/20 bg-white/85 px-4 py-2 text-sm font-semibold text-text hover:border-accent hover:text-accent"
          >
            {card.discoverLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TreatmentMenuTabs({
  title,
  subtitle,
  tabsLabel,
  tabs,
  emptyState
}: TreatmentMenuTabsProps) {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || '');
  const activeTab = useMemo(() => tabs.find((tab) => tab.id === activeTabId) || tabs[0], [tabs, activeTabId]);

  if (!activeTab) {
    return null;
  }

  const filteredPrograms = activeTab.programs || [];
  const filteredTreatments = activeTab.treatments || [];
  const filteredGroups = activeTab.groupedTreatments || [];

  const hasContent =
    filteredPrograms.length > 0 ||
    filteredTreatments.length > 0 ||
    filteredGroups.some((group) => group.cards.length > 0);

  return (
    <section className="pb-14 pt-14">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">{tabsLabel}</p>
        <h1 className="mt-3 font-heading text-5xl">{title}</h1>
        <p className="mt-4 text-base text-text/75">{subtitle}</p>
      </div>

      <div className="mt-8 border-b border-stone/35">
        <div
          role="tablist"
          aria-label={tabsLabel}
          className="flex items-center gap-1 overflow-x-auto whitespace-nowrap pb-0"
        >
          {tabs.map((tab) => {
            const selected = tab.id === activeTab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`treatment-tab-${tab.id}`}
                aria-controls={`treatment-panel-${tab.id}`}
                aria-selected={selected}
                onClick={() => setActiveTabId(tab.id)}
                className={`focus-ring relative px-4 py-4 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  selected ? 'text-text' : 'text-text/55 hover:text-text/80'
                }`}
              >
                {tab.label}
                {selected ? <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent" /> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`treatment-panel-${activeTab.id}`}
        role="tabpanel"
        aria-labelledby={`treatment-tab-${activeTab.id}`}
        className="mt-7"
      >
        <div className="rounded-2xl border border-stone/35 bg-white/70 px-5 py-4 md:px-6">
          <h2 className="font-heading text-4xl leading-tight">{activeTab.label}</h2>
          <p className="mt-2 text-sm leading-relaxed text-text/75">{activeTab.intro}</p>
        </div>

        {hasContent ? (
          <>
            {filteredPrograms.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {activeTab.programsTitle}
                </h3>
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                  {filteredPrograms.map((card) => (
                    <Card key={card.id} card={card} />
                  ))}
                </div>
              </div>
            ) : null}

            {filteredTreatments.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {activeTab.treatmentsTitle}
                </h3>
                <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {filteredTreatments.map((card) => (
                    <Card key={card.id} card={card} />
                  ))}
                </div>
              </div>
            ) : null}

            {filteredGroups.length > 0 ? (
              <div className="mt-8 space-y-8">
                {filteredGroups.map((group) =>
                  group.cards.length > 0 ? (
                    <div key={group.id}>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{group.title}</h3>
                      <div className="mt-4 grid gap-5 md:grid-cols-2">
                        {group.cards.map((card) => (
                          <Card key={card.id} card={card} />
                        ))}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            ) : null}
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-stone/35 bg-white/70 p-6 text-sm text-text/75">{emptyState}</div>
        )}
      </div>
    </section>
  );
}
