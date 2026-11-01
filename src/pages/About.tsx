import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  MapPin,
  Heart,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'About Shine Gallery' }]} />

        {/* Hero Section */}
        <div className="my-10 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-2">
            Our Heritage & Vision
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
            Celebrating 35 Years of Authentic Indian Fine Art
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-4 leading-relaxed font-light">
            Founded with an enduring mission to demystify fine art collection, bridge master painters
            with global patrons, and provide museum-caliber authentication for original Indian art.
          </p>
        </div>

        {/* Main Origin Story Grid */}
        <div className="my-12 bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 text-stone-700 text-sm leading-relaxed">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                The Shine Gallery Journey
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                From a Historic Mumbai Salon to a Global Art Platform
              </h2>
              <p>
                Established in 1987 in Mumbai, Shine Gallery began as an intimate curatorial space
                dedicated to championing Indian regional masters whose extraordinary canvases spoke
                of rural memories, sacred architecture, and bold modern abstraction.
              </p>
              <p>
                Over the decades, we have evolved into a distinguished international art enterprise.
                Through our flagship gallery at <strong>356 Linking Road, Khar West, Mumbai</strong>,
                and our online platform, we welcome senior collectors, first-time homebuyers, and
                corporate curators from London, New York, Dubai, Singapore, and Mumbai.
              </p>
              <p>
                Our philosophy is simple: authentic art should not feel distant or opaque. Every painting,
                sculpture, and serigraph we represent is curated directly from the artist’s easel or
                verified estates, accompanied by complete transparency and lifetime provenance authentication.
              </p>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                  alt="Shine Gallery Curatorial Salon"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                  <span className="font-serif font-bold text-base block text-amber-300">
                    Khar West Flagship Gallery
                  </span>
                  <span>An unhurried space for contemplative art viewing in Mumbai</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Guiding Pillars */}
        <div className="my-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-1">
              Curatorial Integrity
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              The Shine Gallery Guarantee
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-stone-900">Archival Certificate</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every original piece carries a tamper-evident, hologram-registered Certificate of Authenticity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-stone-900">Verified Provenance</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                We maintain direct studio relationships with over 160 artists, ensuring pristine chain of custody.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-800 text-white flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-stone-900">Insured Doorstep Transit</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Specialized crating and international insurance ensure your artwork arrives in museum condition.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-stone-900">Artisan Framing</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Solid Burmese teakwood and UV acrylic conservation methods applied by in-house framing specialists.
              </p>
            </div>
          </div>
        </div>

        {/* Visit our Mumbai Gallery Invitation */}
        <div className="my-16 bg-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Personalized Private Viewings
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Visit Us in Khar West, Mumbai
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Experience canvases in physical scale under tailored gallery lighting. Our team is available
              seven days a week for unhurried, private appointments.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-500 px-6 py-3 text-xs font-semibold text-stone-950 transition whitespace-nowrap"
          >
            <span>Book Private Appointment</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mandatory Compact Advertisement Placeholder */}
        <AdPlaceholder slotName="About Page Bottom Banner" />
      </div>
    </div>
  );
};
