import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sliders,
  CheckCircle2,
  FileCheck,
  Globe,
  Info
} from 'lucide-react';
import { useGallery, FRAME_OPTIONS, FrameType } from '../context/GalleryContext';
import { artworksData } from '../data/artworks';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const InquiryBag: React.FC = () => {
  const {
    bag,
    removeFromBag,
    updateBagItemFrame,
    clearBag,
    bagTotalINR,
    formatPrice,
    submitInquiry,
    currency
  } = useGallery();

  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutCity, setCheckoutCity] = useState('');
  const [checkoutCountry, setCheckoutCountry] = useState('India');
  const [specialNotes, setSpecialNotes] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<string | null>(null);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail) return;

    const orderRef = `SHINE-${Date.now().toString().slice(-6)}`;
    const itemsSummary = bag
      .map(item => {
        const art = artworksData.find(a => a.id === item.artworkId);
        return `"${art?.title}" (${FRAME_OPTIONS[item.frame].label})`;
      })
      .join('; ');

    submitInquiry({
      fullName: checkoutName,
      email: checkoutEmail,
      phone: checkoutPhone,
      city: `${checkoutCity}, ${checkoutCountry}`,
      message: `Order Ref: ${orderRef}. Items: ${itemsSummary}. Total: ${formatPrice(bagTotalINR)}. Delivery Address: ${checkoutAddress}. Notes: ${specialNotes}`,
      inquiryType: 'bag'
    });

    setSubmittedOrder(orderRef);
    clearBag();
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Acquisition & Inquiry Bag' }]} />

        {/* Confirmation Screen */}
        {submittedOrder ? (
          <div className="my-16 max-w-2xl mx-auto bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-lg text-center space-y-5">
            <div className="h-16 w-16 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Order Ref: {submittedOrder}
            </span>

            <h1 className="font-serif text-3xl font-bold text-stone-900">
              Acquisition Request Received
            </h1>

            <p className="text-sm text-stone-600 leading-relaxed max-w-lg mx-auto">
              Thank you, <strong>{checkoutName}</strong>. Your fine art acquisition dossier has been
              registered with Shine Gallery&apos;s senior curator. You will receive an invoice receipt
              and video inspection link at <strong>{checkoutEmail}</strong> within 4 hours.
            </p>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-500 space-y-1 text-left">
              <div className="flex justify-between">
                <span>Authenticity Certificate:</span>
                <span className="font-bold text-stone-800">Included with physical holographic seal</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Method:</span>
                <span className="font-bold text-stone-800">Insured Doorstep White-Glove Courier</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery City:</span>
                <span className="font-bold text-stone-800">{checkoutCity}, {checkoutCountry}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <Link
                to="/paintings"
                className="inline-flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-amber-900 px-6 py-3 text-xs font-semibold text-white shadow-md transition"
              >
                <span>Browse More Artworks</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="my-8 flex items-baseline justify-between border-b border-stone-200 pb-5">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-1">
                  Private Acquisition Dossier
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                  Art Acquisition Bag
                </h1>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                {bag.length} Piece{bag.length !== 1 ? 's' : ''} in Bag
              </span>
            </div>

            {bag.length === 0 ? (
              <div className="my-16 bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 max-w-xl mx-auto shadow-xs">
                <div className="h-16 w-16 mx-auto rounded-full bg-stone-100 text-stone-400 flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Your Acquisition Bag is Empty
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed max-w-md mx-auto">
                  Explore original paintings, bronze sculptures, and limited edition serigraphs
                  from India&apos;s leading masters.
                </p>
                <div className="pt-2">
                  <Link
                    to="/paintings"
                    className="inline-flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-amber-900 px-7 py-3 text-xs font-semibold text-white shadow-md transition"
                  >
                    <span>Browse Catalog</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="my-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left 7 cols: Item list & Frame selectors */}
                <div className="lg:col-span-7 space-y-4">
                  {bag.map(item => {
                    const artwork = artworksData.find(a => a.id === item.artworkId);
                    if (!artwork) return null;

                    const frameOpt = FRAME_OPTIONS[item.frame];
                    const itemTotal = (artwork.priceINR + frameOpt.extraPriceINR) * item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row gap-5"
                      >
                        {/* Artwork Thumbnail */}
                        <Link
                          to={`/artwork/${artwork.slug}`}
                          className="h-28 w-28 sm:h-36 sm:w-36 rounded-xl overflow-hidden bg-stone-100 shrink-0"
                        >
                          <img
                            src={artwork.image}
                            alt={artwork.title}
                            className="h-full w-full object-cover"
                          />
                        </Link>

                        {/* Item Details */}
                        <div className="flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                                  {artwork.artistName}
                                </span>
                                <Link
                                  to={`/artwork/${artwork.slug}`}
                                  className="font-serif text-lg font-bold text-stone-900 hover:text-amber-800 transition block"
                                >
                                  {artwork.title}
                                </Link>
                                <span className="text-xs text-stone-500">
                                  {artwork.medium} • {artwork.widthInches} x {artwork.heightInches} in
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromBag(item.id)}
                                className="p-1.5 text-stone-400 hover:text-red-700 transition"
                                title="Remove piece from bag"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Framing Options Dropdown for this item */}
                            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between gap-3 text-xs">
                              <span className="text-stone-600 font-semibold flex items-center gap-1.5">
                                <Sliders className="h-3.5 w-3.5 text-stone-400" />
                                <span>Framing:</span>
                              </span>
                              <select
                                value={item.frame}
                                onChange={e => updateBagItemFrame(item.id, e.target.value as FrameType)}
                                className="rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:border-amber-700"
                              >
                                {(Object.keys(FRAME_OPTIONS) as FrameType[]).map(key => (
                                  <option key={key} value={key}>
                                    {FRAME_OPTIONS[key].label} {FRAME_OPTIONS[key].extraPriceINR > 0 ? `(+${formatPrice(FRAME_OPTIONS[key].extraPriceINR)})` : ''}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Price & Quantity display */}
                          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-xs text-stone-500">
                              Qty: {item.quantity}
                            </span>
                            <span className="font-serif text-lg font-bold text-stone-900">
                              {formatPrice(itemTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right 5 cols: Summary & Checkout Form */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Summary Card */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
                    <h3 className="font-serif text-lg font-bold text-stone-900 pb-3 border-b border-stone-200">
                      Acquisition Summary
                    </h3>

                    <div className="space-y-2 text-xs text-stone-600">
                      <div className="flex justify-between">
                        <span>Original Artworks Total:</span>
                        <span className="font-semibold text-stone-900">{formatPrice(bagTotalINR)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>White-Glove Insured Transit:</span>
                        <span className="font-semibold text-emerald-700">Complimentary (Shine Gallery Global)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Archival Certificate Hologram:</span>
                        <span className="font-semibold text-emerald-700">Complimentary Included</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-200 flex items-baseline justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
                          Total Payable:
                        </span>
                        <span className="text-[10px] text-stone-400">Currency: {currency}</span>
                      </div>
                      <span className="font-serif text-2xl font-bold text-amber-900">
                        {formatPrice(bagTotalINR)}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <Info className="h-3.5 w-3.5 text-amber-700" />
                        <span>Client-Side Static Demonstration</span>
                      </div>
                      <p>
                        This is a client-side prototype. Submitting logs your acquisition inquiry
                        into browser localStorage and does not process real credit card data.
                      </p>
                    </div>
                  </div>

                  {/* Checkout & Delivery Form */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 text-xs">
                    <h4 className="font-serif text-base font-bold text-stone-900">
                      Collector & Delivery Details
                    </h4>

                    <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                      <div>
                        <label className="font-semibold text-stone-700 block mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Meera Singhania"
                          value={checkoutName}
                          onChange={e => setCheckoutName(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-stone-700 block mb-1">Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="meera@domain.com"
                            value={checkoutEmail}
                            onChange={e => setCheckoutEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-stone-700 block mb-1">Phone</label>
                          <input
                            type="tel"
                            placeholder="+91 98200 00000"
                            value={checkoutPhone}
                            onChange={e => setCheckoutPhone(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-stone-700 block mb-1">Delivery Address</label>
                        <input
                          type="text"
                          placeholder="Residence / Villa / Penthouse Address"
                          value={checkoutAddress}
                          onChange={e => setCheckoutAddress(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-stone-700 block mb-1">City</label>
                          <input
                            type="text"
                            placeholder="Mumbai / London / New York"
                            value={checkoutCity}
                            onChange={e => setCheckoutCity(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-stone-700 block mb-1">Country</label>
                          <input
                            type="text"
                            placeholder="India / UK / USA / UAE"
                            value={checkoutCountry}
                            onChange={e => setCheckoutCountry(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-stone-700 block mb-1">Special Curation Notes</label>
                        <textarea
                          rows={2}
                          placeholder="Wall hanging preferences, delivery timing, or private viewing requests..."
                          value={specialNotes}
                          onChange={e => setSpecialNotes(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-stone-900 hover:bg-amber-900 text-white font-semibold text-xs shadow-md transition"
                      >
                        Submit Acquisition & Reserve Artworks
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mandatory Compact Advertisement Placeholder */}
        <AdPlaceholder slotName="Bag Page Bottom Banner" />
      </div>
    </div>
  );
};
