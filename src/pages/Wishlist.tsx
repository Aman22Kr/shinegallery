import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, Maximize2, ArrowRight, Share2 } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';
import { artworksData } from '../data/artworks';
import { ArtworkCard } from '../components/ArtworkCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist, addToBag, showToast } = useGallery();

  const favoriteArtworks = artworksData.filter(art => wishlist.includes(art.id));

  const handleShareWishlist = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Wishlist Link Copied', 'Your saved collection link has been copied.', 'success');
    }
  };

  const handleInquireAll = () => {
    showToast(
      'Bulk Curatorial Inquiry Prepared',
      `Our team will compile a private PDF dossier for all ${favoriteArtworks.length} saved artworks.`,
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Saved Artworks & Favorites' }]} />

        {/* Header */}
        <div className="my-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-1">
              Private Collector Portfolio
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 flex items-center gap-3">
              <span>Saved Masterpieces</span>
              <span className="text-sm font-sans font-medium text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                {favoriteArtworks.length} item{favoriteArtworks.length !== 1 ? 's' : ''}
              </span>
            </h1>
          </div>

          {favoriteArtworks.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleShareWishlist}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-300 bg-white text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share Collection</span>
              </button>

              <button
                type="button"
                onClick={handleInquireAll}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-stone-900 hover:bg-amber-900 text-xs font-semibold text-white transition shadow-sm"
              >
                <span>Inquire About All ({favoriteArtworks.length})</span>
                <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
              </button>
            </div>
          )}
        </div>

        {/* Empty state */}
        {favoriteArtworks.length === 0 ? (
          <div className="my-16 bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 max-w-xl mx-auto">
            <div className="h-16 w-16 mx-auto rounded-full bg-amber-50 text-amber-800 flex items-center justify-center">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Your Saved Art Collection is Empty
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed max-w-md mx-auto">
              As you browse paintings, sculptures, and fine serigraphs, click the heart icon on any piece
              to save it here for private consideration and room visualization.
            </p>
            <div className="pt-2">
              <Link
                to="/paintings"
                className="inline-flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-amber-900 px-7 py-3 text-xs font-semibold text-white shadow-md transition"
              >
                <span>Explore Paintings Catalog</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteArtworks.map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}

        {/* Mandatory Compact Advertisement Placeholder */}
        <AdPlaceholder slotName="Wishlist Bottom Banner" />
      </div>
    </div>
  );
};
