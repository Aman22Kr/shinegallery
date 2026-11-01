import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Filter,
  SlidersHorizontal,
  X,
  Search,
  Grid3X3,
  LayoutGrid,
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { artworksData, Artwork } from '../data/artworks';
import { artistsData } from '../data/artists';
import { ArtworkCard } from '../components/ArtworkCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { useGallery } from '../context/GalleryContext';

interface ArtworksPageProps {
  initialCategory?: 'painting' | 'sculpture' | 'serigraph';
  pageTitle?: string;
  pageSubtitle?: string;
}

export const Artworks: React.FC<ArtworksPageProps> = ({
  initialCategory,
  pageTitle = 'Fine Art Catalogue',
  pageSubtitle = 'Original paintings, master sculptures, and limited edition serigraphs by acclaimed Indian artists.'
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { formatPrice } = useGallery();

  // URL query params
  const querySearch = searchParams.get('search') || '';
  const queryStyle = searchParams.get('style') || '';
  const queryMedium = searchParams.get('medium') || '';
  const queryArtist = searchParams.get('artist') || '';

  // Filter States
  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedStyle, setSelectedStyle] = useState<string>(queryStyle || 'all');
  const [selectedMedium, setSelectedMedium] = useState<string>(queryMedium || 'all');
  const [selectedArtist, setSelectedArtist] = useState<string>(queryArtist || 'all');
  const [selectedOrientation, setSelectedOrientation] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);

  // Sync state if URL search params change
  useEffect(() => {
    if (querySearch !== searchTerm) setSearchTerm(querySearch);
    if (queryStyle) setSelectedStyle(queryStyle);
    if (queryMedium) setSelectedMedium(queryMedium);
    if (queryArtist) setSelectedArtist(queryArtist);
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [querySearch, queryStyle, queryMedium, queryArtist, initialCategory]);

  // Unique filter option extractions
  const stylesList = useMemo(() => {
    const set = new Set<string>();
    artworksData.forEach(a => set.add(a.style));
    return Array.from(set);
  }, []);

  const mediumsList = useMemo(() => {
    const set = new Set<string>();
    artworksData.forEach(a => set.add(a.medium));
    return Array.from(set);
  }, []);

  // Filter & Sort Logic
  const filteredArtworks = useMemo(() => {
    return artworksData.filter(art => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = art.title.toLowerCase().includes(term);
        const matchesArtist = art.artistName.toLowerCase().includes(term);
        const matchesStyle = art.style.toLowerCase().includes(term);
        const matchesMedium = art.medium.toLowerCase().includes(term);
        if (!matchesTitle && !matchesArtist && !matchesStyle && !matchesMedium) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all' && art.category !== selectedCategory) {
        return false;
      }

      // Style
      if (selectedStyle !== 'all' && art.style !== selectedStyle) {
        return false;
      }

      // Medium
      if (selectedMedium !== 'all' && !art.medium.toLowerCase().includes(selectedMedium.toLowerCase())) {
        return false;
      }

      // Artist
      if (selectedArtist !== 'all' && art.artistId !== selectedArtist) {
        return false;
      }

      // Orientation
      if (selectedOrientation !== 'all' && art.orientation !== selectedOrientation) {
        return false;
      }

      // Price Range
      if (selectedPriceRange === 'under-250k' && art.priceINR >= 250000) return false;
      if (selectedPriceRange === '250k-400k' && (art.priceINR < 250000 || art.priceINR > 400000)) return false;
      if (selectedPriceRange === 'above-400k' && art.priceINR <= 400000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
      if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      // 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [
    searchTerm,
    selectedCategory,
    selectedStyle,
    selectedMedium,
    selectedArtist,
    selectedOrientation,
    selectedPriceRange,
    sortBy
  ]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory(initialCategory || 'all');
    setSelectedStyle('all');
    setSelectedMedium('all');
    setSelectedArtist('all');
    setSelectedOrientation('all');
    setSelectedPriceRange('all');
    setSortBy('featured');
    setSearchParams({});
  };

  const activeFilterCount =
    (searchTerm ? 1 : 0) +
    (selectedCategory !== (initialCategory || 'all') ? 1 : 0) +
    (selectedStyle !== 'all' ? 1 : 0) +
    (selectedMedium !== 'all' ? 1 : 0) +
    (selectedArtist !== 'all' ? 1 : 0) +
    (selectedOrientation !== 'all' ? 1 : 0) +
    (selectedPriceRange !== 'all' ? 1 : 0);

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Catalog', path: '/artworks' },
            ...(initialCategory ? [{ label: initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1) }] : [])
          ]}
        />

        {/* Page Header */}
        <div className="my-6 border-b border-stone-200 pb-6">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-1">
            Curated Fine Art
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            {pageTitle}
          </h1>
          <p className="text-sm text-stone-600 mt-2 max-w-2xl">
            {pageSubtitle}
          </p>
        </div>

        {/* Search & Quick Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by title, artist, or style..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700 text-stone-800"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Right: Sort & Grid toggle & Filter toggle */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>

            {/* Sort selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-600 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="rounded-lg border border-stone-300 bg-white px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-amber-700"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Year: Newest First</option>
                <option value="title-asc">Title: A to Z</option>
              </select>
            </div>

            {/* Grid density toggle */}
            <div className="hidden sm:flex items-center border border-stone-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setGridColumns(3)}
                className={`p-1.5 transition ${gridColumns === 3 ? 'bg-stone-900 text-white' : 'text-stone-500 hover:bg-stone-100'}`}
                title="3 Columns Grid"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridColumns(4)}
                className={`p-1.5 transition ${gridColumns === 4 ? 'bg-stone-900 text-white' : 'text-stone-500 hover:bg-stone-100'}`}
                title="4 Columns Grid"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Section with Sidebar Filters & Artwork Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1 space-y-6 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs h-fit`}>
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-stone-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Filter Artworks
                </h3>
              </div>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-[11px] font-semibold text-amber-800 hover:underline inline-flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            {!initialCategory && (
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-2">Category</label>
                <div className="space-y-1">
                  {[
                    { id: 'all', label: 'All Categories' },
                    { id: 'painting', label: 'Paintings' },
                    { id: 'sculpture', label: 'Sculptures' },
                    { id: 'serigraph', label: 'Serigraphs & Prints' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition ${
                        selectedCategory === cat.id
                          ? 'bg-stone-900 text-white font-semibold'
                          : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Style Filter */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-2">Artistic Style</label>
              <select
                value={selectedStyle}
                onChange={e => setSelectedStyle(e.target.value)}
                className="w-full text-xs rounded-lg border border-stone-300 p-2 bg-white text-stone-800 focus:outline-none focus:border-amber-700"
              >
                <option value="all">All Styles</option>
                {stylesList.map(st => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Medium Filter */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-2">Medium</label>
              <select
                value={selectedMedium}
                onChange={e => setSelectedMedium(e.target.value)}
                className="w-full text-xs rounded-lg border border-stone-300 p-2 bg-white text-stone-800 focus:outline-none focus:border-amber-700"
              >
                <option value="all">All Mediums</option>
                {mediumsList.map(med => (
                  <option key={med} value={med}>
                    {med}
                  </option>
                ))}
              </select>
            </div>

            {/* Artist Filter */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-2">Artist</label>
              <select
                value={selectedArtist}
                onChange={e => setSelectedArtist(e.target.value)}
                className="w-full text-xs rounded-lg border border-stone-300 p-2 bg-white text-stone-800 focus:outline-none focus:border-amber-700"
              >
                <option value="all">All Artists ({artistsData.length})</option>
                {artistsData.map(artist => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name} ({artist.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-2">Price Value</label>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Price Ranges' },
                  { id: 'under-250k', label: 'Under ₹2,50,000' },
                  { id: '250k-400k', label: '₹2,50,000 – ₹4,00,000' },
                  { id: 'above-400k', label: 'Above ₹4,00,000' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedPriceRange(item.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition ${
                      selectedPriceRange === item.id
                        ? 'bg-amber-100 text-amber-900 font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orientation Filter */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-2">Orientation</label>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {['all', 'Horizontal', 'Vertical', 'Square'].map(ori => (
                  <button
                    key={ori}
                    type="button"
                    onClick={() => setSelectedOrientation(ori)}
                    className={`px-2 py-1 text-[11px] rounded border transition ${
                      selectedOrientation === ori
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {ori === 'all' ? 'Any' : ori}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Artworks List View */}
          <main className="lg:col-span-3">
            {/* Results count & active tags */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-stone-500 font-medium">
                Showing <strong className="text-stone-900">{filteredArtworks.length}</strong> artwork{filteredArtworks.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Empty State */}
            {filteredArtworks.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  No artworks matched your criteria
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                  Try adjusting or clearing your filters, or search with different keywords like
                  artist names, &quot;Varanasi&quot;, &quot;Abstract&quot;, or &quot;Ghats&quot;.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-amber-900 transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  gridColumns === 3
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                }`}
              >
                {filteredArtworks.map(artwork => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Mandatory Compact Advertisement Placeholder */}
        <AdPlaceholder slotName="Catalogue Bottom Banner" />
      </div>
    </div>
  );
};
