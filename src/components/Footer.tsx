import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  Award,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Heart,
  Github
} from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const Footer: React.FC = () => {
  const { showToast } = useGallery();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast(
        'Subscribed to Gallery Gazette',
        'Thank you! You will now receive private previews of new acquisitions and exhibition vernissages.',
        'success'
      );
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      {/* 1. Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-800 text-amber-400 border border-stone-700">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif font-medium text-white text-base">100% Guaranteed Authentic</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Every original painting & serigraph includes an archival Certificate of Authenticity.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-800 text-amber-400 border border-stone-700">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif font-medium text-white text-base">Insured Global Delivery</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Museum-grade specialized crating and fully insured door-to-door worldwide shipping.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-800 text-amber-400 border border-stone-700">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif font-medium text-white text-base">Curatorial Excellence</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Direct partnerships with India’s foremost modern masters and rising contemporary artists.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-800 text-amber-400 border border-stone-700">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif font-medium text-white text-base">Bespoke Art Advisory</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Personalized consultation for private residences, luxury hotels, and corporate collections.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <span className="font-serif font-bold text-lg leading-none">S</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white uppercase">
                shine<span className="text-amber-500">gallery</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Shine Gallery is a premier destination for Modern and Contemporary Indian Fine Art.
              Bridging the timeless spirit of Bengal, Deccan, and Western Indian master painters with
              global collectors through museum-quality exhibitions and bespoke curation.
            </p>

            <div className="pt-2 space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>3, Ramjanki, 356 Linking Road, Khar (West), Mumbai – 400052, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                <span>+91 22 2648 8888 / +91 98200 12345</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                <span>contact@shinegallery.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Mon – Sun: 11:00 AM – 8:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Artworks
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/paintings" className="hover:text-amber-400 transition">
                  Original Paintings
                </Link>
              </li>
              <li>
                <Link to="/sculptures" className="hover:text-amber-400 transition">
                  Bronze & Metal Sculptures
                </Link>
              </li>
              <li>
                <Link to="/serigraphs" className="hover:text-amber-400 transition">
                  Signed Fine Serigraphs
                </Link>
              </li>
              <li>
                <Link to="/paintings?style=Abstract" className="hover:text-amber-400 transition">
                  Abstract & Modernism
                </Link>
              </li>
              <li>
                <Link to="/paintings?style=Landscapes %26 Ghats" className="hover:text-amber-400 transition">
                  Varanasi Ghats Collection
                </Link>
              </li>
              <li>
                <Link to="/paintings?style=Spiritual %26 Devotional" className="hover:text-amber-400 transition">
                  Spiritual & Sacred Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Gallery & Services */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Services & Stories
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/artists" className="hover:text-amber-400 transition">
                  Artists Directory (A-Z)
                </Link>
              </li>
              <li>
                <Link to="/exhibitions" className="hover:text-amber-400 transition">
                  Current & Past Exhibitions
                </Link>
              </li>
              <li>
                <Link to="/advisory" className="hover:text-amber-400 transition">
                  Art Advisory & Consultation
                </Link>
              </li>
              <li>
                <Link to="/advisory#framing" className="hover:text-amber-400 transition">
                  Custom Framing Studio
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition">
                  About Our 35-Year Heritage
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-amber-400 transition">
                  Art Journal & Collector Guides
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition">
                  Book Private Gallery Viewing
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter signup */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Collector Gazette
            </h5>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Receive private invitations to new exhibitions, master artist retrospectives, and newly released prints.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="w-full rounded-lg bg-stone-800 border border-stone-700 px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 px-3 py-2 text-xs font-semibold text-stone-950 transition"
              >
                <span>Subscribe Privately</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
            <p className="text-[10px] text-stone-400 mt-2">
              Strictly confidential. No spam, ever.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal, LocalStorage Note & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} Shine Gallery (shinegallery). All rights reserved.</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-[11px] text-stone-400">
            Client-side static application with browser localStorage persistence.
          </span>
        </div>

        <div className="flex items-center gap-4 text-stone-400">
          <a
            href="https://github.com/Aman22kr/shinegallery"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-stone-400 hover:text-white transition"
          >
            <Github className="h-4 w-4" />
            <span>GitHub / Aman22kr</span>
          </a>
          <span>•</span>
          <Link to="/about" className="hover:text-white transition">
            Privacy & Terms
          </Link>
          <span>•</span>
          <Link to="/contact" className="hover:text-white transition">
            Visit Khar West
          </Link>
        </div>
      </div>
    </footer>
  );
};
