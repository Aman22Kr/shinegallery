import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  Palette,
  Maximize2,
  Calendar,
  CheckCircle2,
  Star,
  Quote,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { artworksData, Artwork } from '../data/artworks';
import { artistsData } from '../data/artists';
import { exhibitionsData } from '../data/exhibitions';
import { ArtworkCard } from '../components/ArtworkCard';
import { ArtistCard } from '../components/ArtistCard';
import { YouTubePlaceholder } from '../components/YouTubePlaceholder';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { useGallery } from '../context/GalleryContext';

export const Home: React.FC = () => {
  const { setVisualizerArtwork, formatPrice } = useGallery();
  const [activeTab, setActiveTab] = useState<'all' | 'trending' | 'masters' | 'new' | 'affordable'>('all');

  const featuredExhibition = exhibitionsData[0];
  const spotlightArtist = artistsData.find(a => a.id === 'amit-bhar') || artistsData[0];

  // Tab filtering logic
  const getTabArtworks = (): Artwork[] => {
    switch (activeTab) {
      case 'trending':
        return artworksData.filter(a => a.trending).slice(0, 8);
      case 'masters':
        return artworksData.filter(a => a.artistId === 'sh-raza' || a.artistId === 'thota-vaikuntam').slice(0, 8);
      case 'new':
        return artworksData.filter(a => a.newArrival).slice(0, 8);
      case 'affordable':
        return artworksData.filter(a => a.priceINR <= 300000).slice(0, 8);
      case 'all':
      default:
        return artworksData.slice(0, 8);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Showcase Section */}
      <section className="relative overflow-hidden bg-stone-950 text-white">
        {/* Architectural backdrop gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(180,83,9,0.25),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold text-amber-300">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Premier Indian Modern & Contemporary Fine Art</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Curating timeless <br />
                <span className="italic font-normal text-amber-200">masterpieces</span> for <br />
                discerning collectors.
              </h1>

              <p className="text-base sm:text-lg text-stone-300 max-w-2xl font-light leading-relaxed">
                Step inside Shine Gallery—Mumbai’s esteemed sanctuary of authentic Indian art.
                From post-independence progressive legends to luminary contemporary voices, explore
                museum-grade paintings, bronze sculptures, and limited edition serigraphs.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/paintings"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-500 px-7 py-3.5 text-sm font-semibold text-stone-950 shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setVisualizerArtwork(artworksData[0])}
                  className="inline-flex items-center gap-2 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-400/60 px-6 py-3.5 text-sm font-semibold text-stone-200 hover:text-white transition"
                >
                  <Maximize2 className="h-4 w-4 text-amber-400" />
                  <span>Launch Wall AR Visualizer</span>
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-8 border-t border-stone-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <span className="font-serif text-2xl font-bold text-amber-400 block">35+</span>
                  <span className="text-xs text-stone-400 uppercase tracking-wider">Years of Curation</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-amber-400 block">160+</span>
                  <span className="text-xs text-stone-400 uppercase tracking-wider">Indian Masters</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-amber-400 block">100%</span>
                  <span className="text-xs text-stone-400 uppercase tracking-wider">Authenticity Certified</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Masterpiece Featured Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow ring */}
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-amber-600/30 to-amber-700/20 blur-xl opacity-70" />

                <div className="relative rounded-2xl bg-stone-900/90 border border-stone-700 p-4 shadow-2xl backdrop-blur-md">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-950">
                    <img
                      src={artworksData[0].image}
                      alt={artworksData[0].title}
                      className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-semibold text-amber-300">
                      Curator’s Choice of the Month
                    </div>
                  </div>

                  <div className="mt-4 p-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                        {artworksData[0].artistName}
                      </span>
                      <span className="text-xs text-stone-400">{artworksData[0].year}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-white">
                      {artworksData[0].title}
                    </h3>

                    <p className="text-xs text-stone-300">
                      {artworksData[0].medium} • {artworksData[0].widthInches} x {artworksData[0].heightInches} in
                    </p>

                    <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase text-stone-400 tracking-wider block">Price</span>
                        <span className="text-lg font-bold text-amber-300">
                          {formatPrice(artworksData[0].priceINR)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/artwork/${artworksData[0].slug}`}
                          className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-semibold text-stone-950 transition"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Category Explorations */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-2">
              Explore Our Galleries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Curated Mediums & Disciplines
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Browse specialized collections curated to complement heritage estates and modern interiors.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link
              to="/paintings"
              className="group relative h-64 overflow-hidden rounded-2xl bg-stone-900 p-6 flex flex-col justify-end shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80"
                alt="Paintings"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                  Original Oils & Acrylics
                </span>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition">
                  Paintings
                </h3>
                <span className="text-xs text-stone-300 mt-1 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Canvases <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>

            <Link
              to="/sculptures"
              className="group relative h-64 overflow-hidden rounded-2xl bg-stone-900 p-6 flex flex-col justify-end shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&q=80"
                alt="Sculptures"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                  Bronze, Brass & Stone
                </span>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition">
                  Sculptures
                </h3>
                <span className="text-xs text-stone-300 mt-1 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore 3D Art <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>

            <Link
              to="/serigraphs"
              className="group relative h-64 overflow-hidden rounded-2xl bg-stone-900 p-6 flex flex-col justify-end shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=600&q=80"
                alt="Serigraphs"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                  Signed & Numbered Editions
                </span>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition">
                  Serigraphs
                </h3>
                <span className="text-xs text-stone-300 mt-1 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Master Silkscreens <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>

            <Link
              to="/artists"
              className="group relative h-64 overflow-hidden rounded-2xl bg-stone-900 p-6 flex flex-col justify-end shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                alt="Artists"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                  160+ Master Portfolios
                </span>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition">
                  Artists Directory
                </h3>
                <span className="text-xs text-stone-300 mt-1 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Browse Profiles <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Featured Artworks with Filter Tabs */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-2">
                Curated Inventory
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                Featured Acquisitions
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Curations' },
                { id: 'trending', label: 'Trending Art' },
                { id: 'masters', label: 'Modern Masters' },
                { id: 'new', label: 'New Arrivals' },
                { id: 'affordable', label: 'Under ₹3 Lakh' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                    activeTab === tab.id
                      ? 'bg-stone-900 text-white shadow-md'
                      : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Artwork Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getTabArtworks().map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/paintings"
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-800 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition"
            >
              <span>View Full Gallery Catalog ({artworksData.length} Artworks)</span>
              <ArrowRight className="h-4 w-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Current Major Exhibition Feature */}
      <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.15),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                <span>On View Now Through {featuredExhibition.endDate}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {featuredExhibition.title}
              </h2>

              <p className="text-base text-stone-300 leading-relaxed font-light">
                {featuredExhibition.fullStatement}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-3">
                <Link
                  to={`/exhibition/${featuredExhibition.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-500 px-6 py-3 text-xs font-semibold text-stone-950 transition"
                >
                  <span>Explore Exhibition Catalogue</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-700 hover:border-stone-500 px-5 py-3 text-xs font-semibold text-stone-300 hover:text-white transition"
                >
                  <span>Book Private Gallery Tour</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
                <img
                  src={featuredExhibition.bannerImage}
                  alt={featuredExhibition.title}
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent p-6">
                  <span className="text-xs text-amber-300 uppercase tracking-wider font-semibold">
                    Venue: {featuredExhibition.venue}
                  </span>
                  <p className="text-sm text-stone-300 mt-1">
                    Curated by {featuredExhibition.curator} • {featuredExhibition.totalWorks} Original Works On View
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Master Artist Spotlight Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200">
                <img
                  src={spotlightArtist.image}
                  alt={spotlightArtist.name}
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent p-6 text-white">
                  <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                    Artist of the Season
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-1">
                    {spotlightArtist.name}
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    {spotlightArtist.origin} • Born {spotlightArtist.bornYear}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block">
                Master Artist Retrospective
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-snug">
                The Sacred Silence of Kashi: <br />
                Artistry of {spotlightArtist.name}
              </h2>

              <blockquote className="border-l-4 border-amber-700 pl-4 italic text-stone-700 text-sm sm:text-base leading-relaxed bg-amber-50/50 py-3 rounded-r-xl">
                &ldquo;{spotlightArtist.statement}&rdquo;
              </blockquote>

              <p className="text-sm text-stone-600 leading-relaxed">
                {spotlightArtist.bio}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs text-stone-500 block">Solo Exhibitions</span>
                  <span className="font-serif text-xl font-bold text-stone-900">{spotlightArtist.soloShowsCount} Shows</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs text-stone-500 block">Style Focus</span>
                  <span className="text-xs font-bold text-stone-900 block truncate">{spotlightArtist.signatureStyle}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 col-span-2 sm:col-span-1">
                  <span className="text-xs text-stone-500 block">Alma Mater</span>
                  <span className="text-xs font-bold text-stone-900 block truncate">Govt College of Art</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/artist/${spotlightArtist.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-amber-900 px-6 py-3 text-xs font-semibold text-white transition"
                >
                  <span>Explore All {spotlightArtist.name}&apos;s Canvases</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. YouTube Video Section (Blank Placeholder Reproducing Exact 16:9 Aspect Ratio) */}
      <section className="py-20 bg-stone-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-400 block">
            Inside the Atelier
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Curator Walkthrough & Master Artist Studio Insights
          </h2>
          <p className="text-sm text-stone-400 max-w-2xl mx-auto font-light leading-relaxed">
            Gain an intimate perspective on how our curatorial team uncovers rare gems, inspects
            canvas fiber conservation, and hosts private viewings at our Khar West gallery in Mumbai.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Reusable YouTube Placeholder component */}
          <YouTubePlaceholder
            title="Curator Walkthrough: Indian Modernism & The Sacred Ghats"
            duration="14:20"
            caption="Recorded in 4K at Shine Gallery Main Hall, Mumbai"
          />
        </div>
      </section>

      {/* 7. Collector Testimonials & Press Voices */}
      <section className="py-20 bg-stone-100 border-t border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-2">
              Collector Voices
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Trusted by Discerning Patrons Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-white p-7 shadow-xs border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;Acquiring our Amit Bhar canvas through Shine Gallery was an absolute delight.
                  The white-glove crating and insured transit to our London residence arrived within five
                  days, accompanied by verified provenance documents.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <h5 className="font-serif text-sm font-bold text-stone-900">Dr. Rajesh & Sunita K.</h5>
                <span className="text-xs text-stone-500">London, United Kingdom</span>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-xs border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;The room visualizer on Shine Gallery allowed our interior design team to test
                  three potential S.H. Raza serigraphs on our living room wall before finalizing the
                  bespoke teak floating frame. Truly world-class service.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <h5 className="font-serif text-sm font-bold text-stone-900">Meera Singhania</h5>
                <span className="text-xs text-stone-500">South Mumbai, India</span>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-xs border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;Their Khar West gallery provides a serene, unhurried atmosphere for private
                  viewings. The curatorial team’s knowledge of Bengal and Deccan art history is
                  exceptional and honest.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <h5 className="font-serif text-sm font-bold text-stone-900">Vikramaditya D.</h5>
                <span className="text-xs text-stone-500">New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Mandatory Compact Advertisement Placeholder Section */}
      <AdPlaceholder slotName="Homepage Bottom Sponsor" />
    </div>
  );
};
