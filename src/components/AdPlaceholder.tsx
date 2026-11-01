import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface AdPlaceholderProps {
  slotName?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slotName = 'Sponsor Showcase' }) => {
  return (
    <aside
      aria-label="Advertisement placeholder"
      className="w-full max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-gradient-to-r from-stone-100 via-amber-50/40 to-stone-100 p-4 sm:p-5 shadow-xs transition-all duration-300 hover:border-amber-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-600 bg-stone-200 px-2 py-0.5 rounded">
                  Sponsored Partner
                </span>
                <span className="text-xs text-stone-600">Cultural & Architectural Digest</span>
              </div>
              <p className="text-sm font-medium text-stone-800 mt-0.5">
                Curated Luxury Living: Handcrafted Bespoke Framing & Museum Lighting Solutions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-stone-600 italic hidden md:inline">
              Ad slot • 728x90 responsive
            </span>
            <button
              type="button"
              onClick={() => window.open('#/advisory', '_self')}
              className="inline-flex items-center gap-1.5 rounded-md bg-stone-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-900 focus:outline-none"
            >
              <span>Explore Partner Offer</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
