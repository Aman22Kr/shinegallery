import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, Maximize2, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { useGallery, FRAME_OPTIONS, FrameType } from '../context/GalleryContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewArtwork,
    setQuickViewArtwork,
    setVisualizerArtwork,
    isInWishlist,
    toggleWishlist,
    addToBag,
    formatPrice
  } = useGallery();

  const [selectedFrame, setSelectedFrame] = useState<FrameType>('teak-floating');

  if (!quickViewArtwork) return null;

  const artwork = quickViewArtwork;
  const isWishlisted = isInWishlist(artwork.id);
  const frameOpt = FRAME_OPTIONS[selectedFrame];
  const totalPrice = artwork.priceINR + frameOpt.extraPriceINR;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-stone-200">
        <button
          type="button"
          onClick={() => setQuickViewArtwork(null)}
          className="absolute top-4 right-4 z-20 rounded-full p-2 text-stone-500 bg-white/80 backdrop-blur-md hover:bg-stone-100 hover:text-stone-900 transition shadow-xs"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image with Zoom Hover */}
          <div className="relative bg-stone-100 flex items-center justify-center p-6 min-h-[340px] overflow-hidden group">
            <img
              src={artwork.image}
              alt={artwork.title}
              onError={e => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85';
              }}
              className="max-h-[420px] w-auto object-contain rounded-md shadow-lg transition-transform duration-500 group-hover:scale-105"
            />

            <button
              type="button"
              onClick={() => {
                const art = artwork;
                setQuickViewArtwork(null);
                setVisualizerArtwork(art);
              }}
              className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-lg bg-stone-900/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-amber-400 hover:bg-stone-950 transition"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Preview on Wall</span>
            </button>
          </div>

          {/* Right: Info & Acquisition */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <Link
                to={`/artist/${artwork.artistId}`}
                onClick={() => setQuickViewArtwork(null)}
                className="text-xs font-semibold uppercase tracking-wider text-amber-800 hover:underline"
              >
                {artwork.artistName}
              </Link>

              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                {artwork.title}
              </h2>

              <p className="text-xs text-stone-500 mt-1">
                {artwork.medium} • {artwork.widthInches}&quot; x {artwork.heightInches}&quot; in • {artwork.year}
              </p>

              <div className="my-4 pt-3 border-t border-stone-100">
                <span className="text-xs text-stone-400 uppercase tracking-wider block">
                  Price Value
                </span>
                <span className="text-2xl font-bold text-stone-900">
                  {formatPrice(totalPrice)}
                </span>
                {frameOpt.extraPriceINR > 0 && (
                  <span className="text-xs text-stone-500 block mt-0.5">
                    Includes {frameOpt.label} (+{formatPrice(frameOpt.extraPriceINR)})
                  </span>
                )}
              </div>

              {/* Framing Options */}
              <div className="space-y-1.5 my-4">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Select Framing Finish
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(FRAME_OPTIONS) as FrameType[]).map(key => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedFrame(key)}
                      className={`text-left p-2 rounded-lg border text-xs transition ${
                        selectedFrame === key
                          ? 'border-amber-700 bg-amber-50/50 text-stone-900 font-semibold'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{FRAME_OPTIONS[key].label}</span>
                        {selectedFrame === key && <Check className="h-3.5 w-3.5 text-amber-700 shrink-0" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                {artwork.description}
              </p>

              <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <ShieldCheck className="h-4 w-4 text-amber-700 shrink-0" />
                <span>Certificate of Authenticity and insured global transit included.</span>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="pt-6 border-t border-stone-100 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  addToBag(artwork.id, selectedFrame);
                  setQuickViewArtwork(null);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-amber-900 transition"
              >
                <ShoppingBag className="h-4 w-4 text-amber-400" />
                <span>Add to Acquisition Bag</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(artwork.id)}
                className={`p-2.5 rounded-xl border transition ${
                  isWishlisted
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
                title="Save to favorites"
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current text-amber-800' : ''}`} />
              </button>

              <Link
                to={`/artwork/${artwork.slug}`}
                onClick={() => setQuickViewArtwork(null)}
                className="p-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 transition"
                title="Full artwork page"
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
