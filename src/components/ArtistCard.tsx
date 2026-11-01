import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Palette } from 'lucide-react';
import { Artist } from '../data/artists';
import { artworksData } from '../data/artworks';

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const artworkCount = artworksData.filter(art => art.artistId === artist.id).length;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-white border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={artist.image}
          alt={artist.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${
            artist.category === 'Master'
              ? 'bg-amber-500/90 text-stone-950 font-bold'
              : 'bg-stone-900/80 text-amber-300'
          }`}>
            {artist.category === 'Master' ? 'Modern Master' : 'Contemporary Voice'}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-serif text-xl font-bold tracking-tight">
            {artist.name}
          </h3>
          <p className="text-xs text-stone-300 flex items-center gap-1.5 mt-0.5">
            <span>{artist.origin}</span>
            <span>•</span>
            <span>{artist.bornYear}{artist.diedYear ? ` – ${artist.diedYear}` : ''}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs text-amber-800 font-medium mb-2">
          <Palette className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{artist.signatureStyle}</span>
        </div>

        <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4 flex-1">
          {artist.bio}
        </p>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            {artworkCount > 0 ? `${artworkCount} Artwork${artworkCount > 1 ? 's' : ''} in Gallery` : 'Catalog Showcase'}
          </span>

          <Link
            to={`/artist/${artist.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-stone-900 hover:text-amber-800 transition"
          >
            <span>View Profile & Art</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
