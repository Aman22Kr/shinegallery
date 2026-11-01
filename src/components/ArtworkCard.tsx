import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Maximize2, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Artwork } from '../data/artworks';
import { useGallery } from '../context/GalleryContext';

interface ArtworkCardProps {
  artwork: Artwork;
  showArtistLink?: boolean;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, showArtistLink = true }) => {
  const {
    isInWishlist,
    toggleWishlist,
    formatPrice,
    setQuickViewArtwork,
    setVisualizerArtwork,
    addToBag
  } = useGallery();

  const favorited = isInWishlist(artwork.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300">
      {/* 1. Artwork Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={artwork.image}
          alt={artwork.title}
          loading="lazy"
          onError={e => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85';
          }}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Subtle vignette gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {artwork.category === 'serigraph' && (
            <span className="rounded-md bg-stone-900/85 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300 shadow-xs">
              Limited Serigraph
            </span>
          )}
          {artwork.category === 'sculpture' && (
            <span className="rounded-md bg-stone-900/85 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300 shadow-xs">
              Sculpture
            </span>
          )}
          {artwork.newArrival && (
            <span className="rounded-md bg-amber-700/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-xs">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(artwork.id);
          }}
          className={`absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition shadow-md ${
            favorited
              ? 'bg-amber-800 text-white hover:bg-amber-900'
              : 'bg-white/90 text-stone-700 hover:bg-white hover:text-amber-800'
          }`}
          title={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`h-4 w-4 ${favorited ? 'fill-current text-white' : ''}`} />
        </button>

        {/* Hover Quick Action Buttons */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewArtwork(artwork);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-white/95 backdrop-blur-md px-3 py-2 text-xs font-semibold text-stone-900 shadow-lg hover:bg-white transition"
          >
            <Eye className="h-3.5 w-3.5 text-stone-600" />
            <span>Quick View</span>
          </button>

          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setVisualizerArtwork(artwork);
            }}
            className="flex items-center justify-center rounded-lg bg-stone-900/95 backdrop-blur-md px-3 py-2 text-xs font-semibold text-amber-400 shadow-lg hover:bg-stone-950 transition"
            title="View In Room Visualizer"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline ml-1">Room View</span>
          </button>
        </div>
      </div>

      {/* 2. Content Info */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {showArtistLink ? (
          <Link
            to={`/artist/${artwork.artistId}`}
            className="text-xs font-medium text-amber-800 hover:underline uppercase tracking-wider mb-1 line-clamp-1"
          >
            {artwork.artistName}
          </Link>
        ) : (
          <span className="text-xs font-medium text-amber-800 uppercase tracking-wider mb-1 line-clamp-1">
            {artwork.artistName}
          </span>
        )}

        <Link to={`/artwork/${artwork.slug}`} className="group-hover:text-amber-800 transition">
          <h3 className="font-serif text-base sm:text-lg font-medium text-stone-900 line-clamp-1 leading-snug">
            {artwork.title}
          </h3>
        </Link>

        <p className="text-xs text-stone-500 mt-1 line-clamp-1">
          {artwork.medium} • {artwork.widthInches} x {artwork.heightInches} in ({artwork.year})
        </p>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-600 font-medium block">
              Investment Value
            </span>
            <span className="text-base font-bold text-stone-900">
              {formatPrice(artwork.priceINR)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => addToBag(artwork.id, artwork.defaultFrame)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-amber-900 transition"
              title="Add to acquisition bag"
            >
              <ShoppingBag className="h-3.5 w-3.5 text-amber-400" />
              <span>Inquire / Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
