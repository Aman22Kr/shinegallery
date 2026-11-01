import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-12 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto space-y-6">
        <div className="h-20 w-20 mx-auto rounded-3xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200 shadow-sm">
          <Compass className="h-10 w-10 animate-spin-slow" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-800 block">
          Error 404 • Curatorial Archive Notice
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          The Canvas You Seek Is Not In This Room
        </h1>

        <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed font-light">
          The page or artwork slug may have been renamed, archived into a private collection,
          or the link was mistyped. Let us guide you back to our curated salons.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-amber-900 px-6 py-3 text-xs font-semibold text-white shadow-md transition"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/paintings"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 px-6 py-3 text-xs font-semibold text-stone-800 transition"
          >
            <Search className="h-4 w-4" />
            <span>Explore Original Paintings</span>
          </Link>
        </div>

        {/* Popular destinations */}
        <div className="pt-10 border-t border-stone-200 max-w-md mx-auto text-xs text-stone-500 space-y-2">
          <span className="font-semibold text-stone-700 block">Curated Shortcuts:</span>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/sculptures" className="px-3 py-1 rounded-full bg-white border border-stone-200 hover:text-amber-800">
              Sculptures
            </Link>
            <Link to="/serigraphs" className="px-3 py-1 rounded-full bg-white border border-stone-200 hover:text-amber-800">
              Serigraphs
            </Link>
            <Link to="/artists" className="px-3 py-1 rounded-full bg-white border border-stone-200 hover:text-amber-800">
              Artists Directory
            </Link>
            <Link to="/exhibitions" className="px-3 py-1 rounded-full bg-white border border-stone-200 hover:text-amber-800">
              Exhibitions
            </Link>
            <Link to="/contact" className="px-3 py-1 rounded-full bg-white border border-stone-200 hover:text-amber-800">
              Visit Mumbai Gallery
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <AdPlaceholder slotName="404 Page Bottom Banner" />
      </div>
    </div>
  );
};
