import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Palette,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { artistsData } from '../data/artists';
import { artworksData } from '../data/artworks';
import { ArtworkCard } from '../components/ArtworkCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const ArtistDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const artist = artistsData.find(a => a.slug === slug || a.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!artist) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl font-bold text-stone-900 mb-2">Artist Profile Not Found</h2>
        <p className="text-xs text-stone-500 mb-6">
          The requested artist could not be located in our roster.
        </p>
        <Link
          to="/artists"
          className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-amber-900 transition"
        >
          View All Artists
        </Link>
      </div>
    );
  }

  const artistArtworks = artworksData.filter(a => a.artistId === artist.id);

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Artists', path: '/artists' },
            { label: artist.name }
          ]}
        />

        {/* Hero Biography Profile Card */}
        <div className="my-8 overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
            {/* Left: Portrait */}
            <div className="lg:col-span-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-stone-900">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                    artist.category === 'Master'
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-stone-900 text-amber-300'
                  }`}>
                    {artist.category === 'Master' ? 'Modern Master' : 'Contemporary Voice'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Bio & Curatorial Profile */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold uppercase tracking-wider mb-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{artist.origin} • Born {artist.bornYear}{artist.diedYear ? ` – ${artist.diedYear}` : ''}</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                  {artist.name}
                </h1>

                <p className="text-sm font-medium text-stone-600 mt-1 flex items-center gap-2">
                  <Palette className="h-4 w-4 text-amber-700" />
                  <span>Signature Style: {artist.signatureStyle}</span>
                </p>

                <blockquote className="my-5 border-l-4 border-amber-700 pl-4 py-2 italic text-stone-700 text-sm sm:text-base leading-relaxed bg-amber-50/50 rounded-r-xl">
                  &ldquo;{artist.statement}&rdquo;
                </blockquote>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {artist.bio}
                </p>
              </div>

              {/* Education, Shows, Awards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl">
                  <div className="flex items-center gap-1.5 text-stone-500 mb-1">
                    <BookOpen className="h-3.5 w-3.5 text-amber-700" />
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Education</span>
                  </div>
                  <span className="font-medium text-stone-800 block">{artist.education.join(', ')}</span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl">
                  <div className="flex items-center gap-1.5 text-stone-500 mb-1">
                    <Calendar className="h-3.5 w-3.5 text-amber-700" />
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Exhibitions</span>
                  </div>
                  <span className="font-medium text-stone-800 block">
                    {artist.soloShowsCount} Solo Shows • {artist.groupShowsCount} Group Invocations
                  </span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl">
                  <div className="flex items-center gap-1.5 text-stone-500 mb-1">
                    <Award className="h-3.5 w-3.5 text-amber-700" />
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Key Honors</span>
                  </div>
                  <span className="font-medium text-stone-800 block truncate" title={artist.awards.join(', ')}>
                    {artist.awards[0] || 'National Recognition'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/advisory"
                  className="inline-flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-amber-900 px-5 py-2.5 text-xs font-semibold text-white transition"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-amber-400" />
                  <span>Request Custom Commission by {artist.name}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Artworks by Artist */}
        <div className="my-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-1">
                Gallery Roster
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Original Artworks by {artist.name}
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              {artistArtworks.length} Work{artistArtworks.length !== 1 ? 's' : ''} Currently Cataloged
            </span>
          </div>

          {artistArtworks.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
              <p className="text-sm text-stone-600 mb-3">
                All currently available works by {artist.name} have been acquired by collectors.
              </p>
              <Link
                to="/contact"
                className="text-xs font-semibold text-amber-800 hover:underline"
              >
                Inquire with our curatorial team to source upcoming works by this artist
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artistArtworks.map(art => (
                <ArtworkCard key={art.id} artwork={art} showArtistLink={false} />
              ))}
            </div>
          )}
        </div>

        {/* Mandatory Compact Advertisement Placeholder */}
        <AdPlaceholder slotName="Artist Detail Bottom Banner" />
      </div>
    </div>
  );
};
