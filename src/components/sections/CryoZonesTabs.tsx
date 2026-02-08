'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

interface CryoZonesTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  }>;
}

export function CryoZonesTabs({ tabs }: CryoZonesTabsProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || '');

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) || tabs[0],
    [activeTabId, tabs]
  );

  if (!activeTab) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Zones traitees">
        {tabs.map((tab) => {
          const selected = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`zone-panel-${tab.id}`}
              id={`zone-tab-${tab.id}`}
              onClick={() => setActiveTabId(tab.id)}
              className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition ${
                selected
                  ? 'bg-accent text-white shadow-md shadow-accent/20'
                  : 'border border-stone/45 bg-white/80 text-text/80 hover:border-accent hover:text-accent'
              }`}
              data-analytics-id={`cryo-zone-tab-${tab.id}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`zone-panel-${activeTab.id}`}
        role="tabpanel"
        aria-labelledby={`zone-tab-${activeTab.id}`}
        className="mt-5 rounded-2xl border border-stone/35 bg-white/75 p-5"
      >
        <p className="text-sm leading-relaxed text-text/80">{activeTab.description}</p>
        <Link
          href={activeTab.ctaHref}
          className="focus-ring mt-4 inline-flex items-center rounded-full border border-text/20 bg-white/70 px-5 py-2 text-sm font-semibold text-text hover:border-accent hover:text-accent"
          data-analytics-id={`cryo-zone-cta-${activeTab.id}`}
          target={activeTab.ctaHref.startsWith('http') ? '_blank' : undefined}
          rel={activeTab.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {activeTab.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
