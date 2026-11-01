import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Maximize2,
  ShieldCheck,
  Truck,
  Check,
  Share2,
  Calendar,
  Layers,
  ArrowRight,
  Info,
  HelpCircle,
  Award
} from 'lucide-react';
import { artworksData, Artwork } from '../data/artworks';
import { artistsData } from '../data/artists';
import { useGallery, FRAME_OPTIONS, FrameType } from '../context/GalleryContext';
import { ArtworkCard } from '../components/ArtworkCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const ArtworkDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    isInWishlist,
    toggleWishlist,
    addToBag,
    formatPrice,
    setVisualizerArtwork,
    setInquiryArtwork,
    addRecentlyViewed,
    showToast
  } = useGallery();

  const artwork = artworksData.find(a => a.slug === slug || a.id === slug);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFrame, setSelectedFrame] = useState<FrameType>('teak-floating');
  const [zoomActive, setZoomActive] = useState(false);

  useEffect(() => {
    if (artwork) {
      setSelectedImage(artwork.image);
      setSelectedFrame(artwork.defaultFrame);
      addRecentlyViewed(artwork.id);
      window.scrollTo(0, 0);
    }
  }, [artwork?.id, slug]);

  if (!artwork) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl font-bold text-stone-900 mb-2">Artwork Not Found</h2>
        <p className="text-xs text-stone-500 mb-6">
          The requested artwork may have been acquired by a collector or archived.
        </p>
        <Link
          to="/paintings"
          className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-amber-900 transition"
        >
          Return to Paintings Catalog
        </Link>
      </div>
    );
  }

  const artist = artistsData.find(a => a.id === artwork.artistId);
  const isWishlisted = isInWishlist(artwork.id);
  const frameOpt = FRAME_OPTIONS[selectedFrame];
  const totalPrice = artwork.priceINR + frameOpt.extraPriceINR;

  const galleryImages = [artwork.image, ...(artwork.additionalImages || [])];

  // Related artworks
  const relatedArtworks = artworksData
    .filter(a => a.id !== artwork.id && (a.artistId === artwork.artistId || a.style === artwork.style))
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied to Clipboard', 'Share this original artwork link with your fellow art collectors.', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Catalog', path: '/paintings' },
            { label: artwork.artistName, path: `/artist/${artwork.artistId}` },
            { label: artwork.title }
          ]}
        />

        {/* Top Split Details Grid */}
        <div className="my-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery & Deep Zoom */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-white border border-stone-200 shadow-md p-4 flex items-center justify-center group">
              <div
                className={`relative overflow-hidden cursor-crosshair transition-all duration-300 ${
                  zoomActive ? 'scale-125' : 'scale-100'
                }`}
                onClick={() => setZoomActive(!zoomActive)}
                title="Click to toggle high resolution detail zoom"
              >
                <img
                  src={selectedImage}
                  alt={artwork.title}
                  onError={e => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85';
                  }}
                  className="max-h-[540px] w-auto object-contain rounded-lg"
                />
              </div>

              {/* Action buttons on image */}
              <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
                <button
                  type="button"
                  onClick={() => toggleWishlist(artwork.id)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur-md transition ${
                    isWishlisted ? 'bg-amber-800 text-white' : 'bg-white/90 text-stone-700 hover:bg-white'
                  }`}
                  title={isWishlisted ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md backdrop-blur-md hover:bg-white transition"
                  title="Share artwork"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* View in Room AR button */}
              <button
                type="button"
                onClick={() => setVisualizerArtwork(artwork)}
                className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-xl bg-stone-900/90 hover:bg-stone-950 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-amber-300 shadow-xl transition"
              >
                <Maximize2 className="h-4 w-4 text-amber-400" />
                <span>Simulate On Your Wall (AR)</span>
              </button>
            </div>

            {/* Thumbnail selector */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition ${
                      selectedImage === img ? 'border-amber-700 shadow-md ring-2 ring-amber-200' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail view" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Pricing, Specs & Framing Selection */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-stone-200 pb-5">
              <Link
                to={`/artist/${artwork.artistId}`}
                className="text-xs font-bold uppercase tracking-wider text-amber-800 hover:underline block mb-1"
              >
                {artwork.artistName}
              </Link>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-snug">
                {artwork.title}
              </h1>
              <p className="text-xs text-stone-500 mt-2">
                {artwork.style} • Completed in {artwork.year}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <span className="text-xs uppercase tracking-wider text-stone-600 font-semibold block">
                Acquisition Value
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="font-serif text-3xl font-bold text-stone-900">
                  {formatPrice(totalPrice)}
                </span>
                {frameOpt.extraPriceINR > 0 && (
                  <span className="text-xs text-stone-500">
                    (Includes {frameOpt.label})
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 mt-2">
                All applicable luxury art transit taxes, insurance, and export documentation included.
              </p>
            </div>

            {/* Framing Options Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Framing & Presentation
                </label>
                <Link to="/advisory#framing" className="text-[11px] text-amber-800 hover:underline">
                  Framing Guide
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {(Object.keys(FRAME_OPTIONS) as FrameType[]).map(key => {
                  const opt = FRAME_OPTIONS[key];
                  const isSelected = selectedFrame === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedFrame(key)}
                      className={`cursor-pointer p-3 rounded-xl border text-xs transition ${
                        isSelected
                          ? 'border-amber-700 bg-amber-50/60 shadow-xs'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-amber-800 bg-amber-800 text-white' : 'border-stone-300'
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                          </div>
                          <span className="font-semibold text-stone-900">{opt.label}</span>
                        </div>
                        <span className="font-medium text-stone-600">
                          {opt.extraPriceINR === 0 ? 'Included' : `+${formatPrice(opt.extraPriceINR)}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 pl-6 mt-1 leading-normal">
                        {opt.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Acquisition CTAs */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => addToBag(artwork.id, selectedFrame)}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-stone-900 hover:bg-amber-900 py-3.5 px-6 text-sm font-semibold text-white shadow-xl transition"
              >
                <ShoppingBag className="h-4 w-4 text-amber-400" />
                <span>Add Framed Artwork to Acquisition Bag</span>
              </button>

              <button
                type="button"
                onClick={() => setInquiryArtwork(artwork)}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 py-3 px-6 text-xs font-semibold text-stone-800 transition"
              >
                <span>Make a Private Curator Inquiry</span>
              </button>
            </div>

            {/* Authenticity Pledge Card */}
            <div className="rounded-xl bg-stone-100/90 border border-stone-200 p-4 space-y-2 text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Certificate of Authenticity</strong>
                  <span>{artwork.authenticity}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-stone-200">
                <Truck className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Insured White-Glove Shipping</strong>
                  <span>Museum-crated and tracked doorstep courier worldwide.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Curatorial & Technical Specifications */}
        <div className="my-12 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                  Curatorial Statement
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {artwork.curatorialNote}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  About This Composition
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">
                  Provenance & Heritage
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed italic">
                  {artwork.provenance}
                </p>
              </div>
            </div>

            {/* Specs Table */}
            <div className="md:col-span-4 bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-3 text-xs">
              <h4 className="font-serif text-base font-bold text-stone-900 pb-2 border-b border-stone-200">
                Artwork Specifications
              </h4>

              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Artist</span>
                <Link to={`/artist/${artwork.artistId}`} className="font-semibold text-amber-800 hover:underline">
                  {artwork.artistName}
                </Link>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Medium</span>
                <span className="font-semibold text-stone-800 text-right">{artwork.medium}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Dimensions (Inches)</span>
                <span className="font-semibold text-stone-800">{artwork.widthInches} x {artwork.heightInches} in</span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Dimensions (Metric)</span>
                <span className="font-semibold text-stone-800">{Math.round(artwork.widthInches * 2.54)} x {Math.round(artwork.heightInches * 2.54)} cm</span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Creation Year</span>
                <span className="font-semibold text-stone-800">{artwork.year}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Orientation</span>
                <span className="font-semibold text-stone-800">{artwork.orientation}</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-stone-500">Inventory Status</span>
                <span className="font-semibold text-emerald-700">Available In Mumbai Gallery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Artworks Carousel */}
        {relatedArtworks.length > 0 && (
          <div className="my-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-1">
                  You May Also Admire
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Related Curations
                </h3>
              </div>
              <Link
                to="/paintings"
                className="text-xs font-semibold text-stone-700 hover:text-amber-800 inline-flex items-center gap-1"
              >
                <span>View All In Catalog</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArtworks.map(art => (
                <ArtworkCard key={art.id} artwork={art} />
              ))}
            </div>
          </div>
        )}

        {/* Mandatory Compact Advertisement Placeholder */}
        <AdPlaceholder slotName="Artwork Detail Bottom Ad" />
      </div>
    </div>
  );
};
