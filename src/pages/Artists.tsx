import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, Award } from 'lucide-react';
import { artistsData, Artist } from '../data/artists';
import { ArtistCard } from '../components/ArtistCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const Artists: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredArtists = useMemo(() => {
    return artistsData.filter(artist => {
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = artist.name.toLowerCase().includes(query);
        const matchesOrigin = artist.origin.toLowerCase().includes(query);
        const matchesStyle = artist.signatureStyle.toLowerCase().includes(query);
        if (!matchesName && !matchesOrigin && !matchesStyle) return false;
      }

      if (selectedCategory !== 'all' && artist.category !== selectedCategory) {
        return false;
      }

      if (selectedLetter !== 'all' && !artist.name.toUpperCase().startsWith(selectedLetter)) {
        return false;
      }

      return true;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm, selectedCategory, selectedLetter]);

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Artists Directory' }]} />

        {/* Header */}
        <div className="my-8 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-2">
            The Masters & The Innovators
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
            Shine Gallery Artists Directory
          </h1>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            Representing celebrated stalwarts of post-independence modernism alongside the most
            dynamic contemporary voices redefining South Asian art on global stages.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search artist by name, city, or style..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
              />
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: 'All Artists' },
                { id: 'Master', label: 'Modern Masters' },
                { id: 'Contemporary', label: 'Contemporary' },
                { id: 'Emerging', label: 'Emerging Voices' }
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedCategory === cat.id
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Alphabet Index Filter */}
          <div className="pt-3 border-t border-stone-100 flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            <button
              type="button"
              onClick={() => setSelectedLetter('all')}
              className={`px-2 py-1 rounded font-semibold shrink-0 transition ${
                selectedLetter === 'all'
                  ? 'bg-amber-700 text-white'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              All A-Z
            </button>
            {alphabet.map(letter => {
              const hasArtists = artistsData.some(a => a.name.toUpperCase().startsWith(letter));
              return (
                <button
                  key={letter}
                  type="button"
                  disabled={!hasArtists}
                  onClick={() => setSelectedLetter(letter)}
                  className={`h-7 w-7 rounded font-medium shrink-0 flex items-center justify-center transition ${
                    selectedLetter === letter
                      ? 'bg-amber-700 text-white font-bold'
                      : hasArtists
                      ? 'text-stone-700 hover:bg-amber-50 hover:text-amber-900'
                      : 'text-stone-300 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs text-stone-500 font-medium">
            Representing <strong className="text-stone-900">{filteredArtists.length}</strong> acclaimed artist{filteredArtists.length !== 1 ? 's' : ''}
          </span>
          {(searchTerm || selectedCategory !== 'all' || selectedLetter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLetter('all');
              }}
              className="text-xs font-semibold text-amber-800 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>

        {/* Mandatory Compact Advertisement Placeholder */}
        <AdPlaceholder slotName="Artists Page Bottom Banner" />
      </div>
    </div>
  );
};
