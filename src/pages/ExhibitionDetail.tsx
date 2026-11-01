import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, User, Download, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { exhibitionsData } from '../data/exhibitions';
import { artistsData } from '../data/artists';
import { artworksData } from '../data/artworks';
import { ArtworkCard } from '../components/ArtworkCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { useGallery } from '../context/GalleryContext';

export const ExhibitionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { showToast, submitInquiry } = useGallery();

  const exhibition = exhibitionsData.find(e => e.slug === slug || e.id === slug);

  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpDate, setRsvpDate] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [submittedRsvp, setSubmittedRsvp] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!exhibition) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl font-bold text-stone-900 mb-2">Exhibition Not Found</h2>
        <p className="text-xs text-stone-500 mb-6">
          The requested curatorial exhibition could not be located in our records.
        </p>
        <Link
          to="/exhibitions"
          className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-amber-900 transition"
        >
          View All Exhibitions
        </Link>
      </div>
    );
  }

  // Artists participating
  const participatingArtists = artistsData.filter(a =>
    exhibition.featuredArtistIds.includes(a.id)
  );

  // Artworks for this exhibition
  const exhibitionArtworks = artworksData.filter(a =>
    exhibition.featuredArtistIds.includes(a.artistId)
  );

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail) return;

    submitInquiry({
      fullName: rsvpName,
      email: rsvpEmail,
      phone: rsvpPhone,
      city: 'Mumbai',
      message: `RSVP Booking for "${exhibition.title}". Preferred date: ${rsvpDate || 'Upcoming Weekend'}. Number of guests: ${rsvpGuests}.`,
      inquiryType: 'appointment'
    });

    setSubmittedRsvp(true);
    showToast(
      'Private Viewing Reservation Confirmed',
      'Our gallery manager will reach out with your personalized vernissage pass.',
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Exhibitions', path: '/exhibitions' },
            { label: exhibition.title }
          ]}
        />

        {/* Hero Banner Header */}
        <div className="my-8 overflow-hidden rounded-3xl bg-stone-950 text-white relative shadow-xl">
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden">
            <img
              src={exhibition.bannerImage}
              alt={exhibition.title}
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-stone-950">
                  {exhibition.status} Exhibition
                </span>
                <span className="text-xs text-stone-300 font-mono">
                  {exhibition.startDate} – {exhibition.endDate}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl">
                {exhibition.title}
              </h1>

              <p className="text-sm sm:text-base text-amber-200 font-light max-w-3xl">
                {exhibition.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Curatorial Statement & Roster */}
        <div className="my-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Statement & Curatorial Notes */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block">
                Curatorial Note
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                About The Exhibition
              </h2>

              <p className="text-sm text-stone-700 leading-relaxed">
                {exhibition.fullStatement}
              </p>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Curator: <strong className="text-stone-900">{exhibition.curator}</strong></span>
                <span>Venue: <strong className="text-stone-900">{exhibition.venue}</strong></span>
              </div>
            </div>

            {/* Featured Artists on View */}
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-4">
                Artists in this Exhibition
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {participatingArtists.map(artist => (
                  <Link
                    key={artist.id}
                    to={`/artist/${artist.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-stone-200 hover:border-amber-700/60 transition shadow-xs group"
                  >
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="h-16 w-16 object-cover rounded-xl"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 group-hover:text-amber-800 transition">
                        {artist.name}
                      </h4>
                      <p className="text-xs text-stone-500">
                        {artist.signatureStyle}
                      </p>
                      <span className="text-[11px] text-amber-800 font-semibold inline-flex items-center gap-1 mt-1">
                        View Artist Profile <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Book Private Viewing RSVP Box */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4 sticky top-28">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-800 block">
                Private Viewing Pass
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Reserve Gallery Walkthrough
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Reserve an unhurried, private walkthrough with our senior curator at our Khar West gallery.
              </p>

              {submittedRsvp ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                    <span>Reservation Confirmed</span>
                  </div>
                  <p>Thank you, {rsvpName}! Our gallery host will send your entry details via email and WhatsApp.</p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Birla"
                      value={rsvpName}
                      onChange={e => setRsvpName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={rsvpEmail}
                      onChange={e => setRsvpEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98200 12345"
                      value={rsvpPhone}
                      onChange={e => setRsvpPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={rsvpDate}
                        onChange={e => setRsvpDate(e.target.value)}
                        className="w-full px-2 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Number of Guests</label>
                      <select
                        value={rsvpGuests}
                        onChange={e => setRsvpGuests(e.target.value)}
                        className="w-full px-2 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700 bg-white"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3-5">3 - 5 Guests</option>
                        <option value="group">Private Family / Corporate</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-amber-900 text-white font-semibold shadow-md transition"
                  >
                    Confirm Gallery Viewing RSVP
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Artworks on view */}
        <div className="my-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-1">
                Catalogue Inventory
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Works in this Exhibition
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              {exhibitionArtworks.length} Works Displayed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {exhibitionArtworks.map(art => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        </div>

        {/* Mandatory Compact Advertisement Placeholder */}
        <AdPlaceholder slotName="Exhibition Detail Bottom Banner" />
      </div>
    </div>
  );
};
