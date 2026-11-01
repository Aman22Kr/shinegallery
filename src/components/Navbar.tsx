import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Globe,
  SlidersHorizontal,
  Compass,
  ArrowRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { useGallery, CURRENCIES, CurrencyCode } from '../context/GalleryContext';
import { artworksData } from '../data/artworks';
import { artistsData } from '../data/artists';

export const Navbar: React.FC = () => {
  const {
    currency,
    setCurrency,
    wishlist,
    bag,
    formatPrice,
    recentSearches,
    addRecentSearch
  } = useGallery();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paintingsDropdownOpen, setPaintingsDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setPaintingsDropdownOpen(false);
  }, [location.pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Live search filtering
  const filteredArtworks = searchQuery.trim()
    ? artworksData.filter(art =>
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.style.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.medium.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const filteredArtists = searchQuery.trim()
    ? artistsData.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.signatureStyle.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery.trim());
      navigate(`/artworks?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchQuery(term);
    addRecentSearch(term);
    navigate(`/artworks?search=${encodeURIComponent(term)}`);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-all duration-300 border-b border-stone-200">
      {/* 1. Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-[11px] sm:text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="font-medium text-amber-300">New Autumn Curations:</span>
            <span className="truncate">Free Insured Worldwide Delivery • 100% Authenticity Guarantee With Every Original Work</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[11px] text-stone-300">
            <a href="tel:+912226488888" className="flex items-center gap-1.5 hover:text-amber-300 transition">
              <Phone className="h-3.5 w-3.5 text-amber-400" />
              <span>+91 22 2648 8888</span>
            </a>
            <a href="mailto:curator@shinegallery.com" className="flex items-center gap-1.5 hover:text-amber-300 transition">
              <Mail className="h-3.5 w-3.5 text-amber-400" />
              <span>curator@shinegallery.com</span>
            </a>
            <div className="flex items-center gap-1.5 text-stone-400">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              <span>Khar West, Mumbai</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Header / Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Wordmark */}
          <Link to="/" className="flex flex-col items-start group">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-stone-900 flex items-center justify-center text-amber-400 shadow-md group-hover:bg-amber-950 transition">
                <span className="font-serif font-bold text-lg leading-none">S</span>
              </div>
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 uppercase">
                shine<span className="text-amber-700">gallery</span>
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 font-medium pl-10 -mt-1 hidden sm:block">
              Modern & Contemporary Indian Fine Art
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-[13px] font-medium tracking-wide text-stone-700">
            <Link to="/" className="hover:text-amber-800 transition py-2">
              Home
            </Link>

            {/* Paintings Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                setPaintingsDropdownOpen(true);
              }}
              onMouseLeave={() => {
                dropdownTimeoutRef.current = setTimeout(() => {
                  setPaintingsDropdownOpen(false);
                }, 200);
              }}
            >
              <Link
                to="/paintings"
                className="flex items-center gap-1 hover:text-amber-800 transition py-2"
              >
                <span>Paintings</span>
                <ChevronDown className="h-3.5 w-3.5 text-stone-600" />
              </Link>

              {paintingsDropdownOpen && (
                <div className="absolute top-full -left-12 w-80 bg-white rounded-xl shadow-2xl border border-stone-200 p-4 transition-all duration-200 animate-fadeIn z-50">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-2 border-b border-stone-100 pb-1">
                    Browse Paintings By Style
                  </div>
                  <div className="space-y-1 mb-3">
                    <Link
                      to="/paintings?style=Abstract"
                      className="block px-2.5 py-1.5 rounded-md text-stone-700 hover:bg-stone-50 hover:text-amber-800 text-xs transition"
                    >
                      Abstract & Geometric Modernism
                    </Link>
                    <Link
                      to="/paintings?style=Figurative"
                      className="block px-2.5 py-1.5 rounded-md text-stone-700 hover:bg-stone-50 hover:text-amber-800 text-xs transition"
                    >
                      Contemporary Figurative & Romance
                    </Link>
                    <Link
                      to="/paintings?style=Landscapes %26 Ghats"
                      className="block px-2.5 py-1.5 rounded-md text-stone-700 hover:bg-stone-50 hover:text-amber-800 text-xs transition"
                    >
                      Sacred Ghats & Varanasi Vistas
                    </Link>
                    <Link
                      to="/paintings?style=Spiritual %26 Devotional"
                      className="block px-2.5 py-1.5 rounded-md text-stone-700 hover:bg-stone-50 hover:text-amber-800 text-xs transition"
                    >
                      Spiritual, Deities & Mythology
                    </Link>
                    <Link
                      to="/paintings?style=Cityscape"
                      className="block px-2.5 py-1.5 rounded-md text-stone-700 hover:bg-stone-50 hover:text-amber-800 text-xs transition"
                    >
                      Mumbai & Kolkata Monochromatic Cityscapes
                    </Link>
                  </div>

                  <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-2 border-b border-stone-100 pb-1">
                    By Medium
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Oil on Canvas', 'Acrylic on Canvas', 'Mixed Media', 'Charcoal'].map(med => (
                      <Link
                        key={med}
                        to={`/paintings?medium=${encodeURIComponent(med)}`}
                        className="text-[11px] bg-stone-100 hover:bg-amber-50 hover:text-amber-900 text-stone-600 px-2.5 py-1 rounded-md transition"
                      >
                        {med}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-stone-100 text-center">
                    <Link
                      to="/paintings"
                      className="text-xs font-semibold text-amber-800 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Explore All Original Works</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/sculptures" className="hover:text-amber-800 transition py-2">
              Sculptures
            </Link>
            <Link to="/serigraphs" className="hover:text-amber-800 transition py-2">
              Serigraphs
            </Link>
            <Link to="/artists" className="hover:text-amber-800 transition py-2">
              Artists
            </Link>
            <Link to="/exhibitions" className="hover:text-amber-800 transition py-2">
              Exhibitions
            </Link>
            <Link to="/advisory" className="hover:text-amber-800 transition py-2">
              Art Advisory
            </Link>
            <Link to="/about" className="hover:text-amber-800 transition py-2">
              About
            </Link>
            <Link to="/blog" className="hover:text-amber-800 transition py-2">
              Journal
            </Link>
            <Link to="/contact" className="hover:text-amber-800 transition py-2">
              Contact
            </Link>
          </nav>

          {/* Right Header Controls (Search, Currency, Wishlist, Bag, Mobile Menu) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Currency Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 transition"
                title="Select Currency"
              >
                <Globe className="h-3.5 w-3.5 text-stone-500" />
                <span>{currency}</span>
                <ChevronDown className="h-3 w-3 text-stone-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl border border-stone-200 py-1 z-50">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map(code => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-amber-50 hover:text-amber-900 transition ${
                        currency === code ? 'font-bold text-amber-800 bg-amber-50/50' : 'text-stone-700'
                      }`}
                    >
                      <span>{CURRENCIES[code].label}</span>
                      <span className="font-mono text-stone-400">{CURRENCIES[code].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition"
              title="Search Artworks and Artists"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition"
              title="View Favorites"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-700 text-[10px] font-bold text-white shadow">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Acquisition Bag / Cart Link */}
            <Link
              to="/cart"
              className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition"
              title="View Acquisition Bag"
            >
              <ShoppingBag className="h-5 w-5" />
              {bag.length > 0 && (
                <span className="absolute 1 top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white shadow">
                  {bag.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:bg-stone-100 rounded-lg lg:hidden transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Global Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity flex flex-col justify-start pt-16 px-4">
          <div className="max-w-3xl w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between gap-3">
              <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-3">
                <Search className="h-5 w-5 text-stone-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by artist, painting title, medium, or style..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full text-base sm:text-lg focus:outline-none text-stone-800 placeholder-stone-400"
                />
              </form>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 max-h-[70vh] overflow-y-auto">
              {searchQuery.trim() ? (
                <div>
                  {filteredArtworks.length === 0 && filteredArtists.length === 0 ? (
                    <div className="text-center py-8 text-stone-500">
                      <p className="text-sm">No artworks or artists match &quot;{searchQuery}&quot;</p>
                      <button
                        type="button"
                        onClick={() => {
                          navigate('/artworks');
                          setSearchOpen(false);
                        }}
                        className="mt-3 text-xs text-amber-800 font-semibold underline"
                      >
                        Browse all available inventory
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredArtworks.length > 0 && (
                        <div>
                          <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400 mb-2">
                            Matching Artworks
                          </h4>
                          <div className="divide-y divide-stone-100">
                            {filteredArtworks.map(art => (
                              <Link
                                key={art.id}
                                to={`/artwork/${art.slug}`}
                                onClick={() => setSearchOpen(false)}
                                className="flex items-center gap-3 py-2.5 px-2 hover:bg-stone-50 rounded-lg transition"
                              >
                                <img
                                  src={art.image}
                                  alt={art.title}
                                  className="h-12 w-12 object-cover rounded-md"
                                />
                                <div className="flex-1 min-w-0">
                                  <h5 className="text-sm font-semibold text-stone-900 truncate">
                                    {art.title}
                                  </h5>
                                  <p className="text-xs text-stone-500 truncate">
                                    {art.artistName} • {art.medium}
                                  </p>
                                </div>
                                <span className="text-xs font-semibold text-amber-800 whitespace-nowrap">
                                  {formatPrice(art.priceINR)}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {filteredArtists.length > 0 && (
                        <div>
                          <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400 mb-2">
                            Matching Artists
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {filteredArtists.map(artist => (
                              <Link
                                key={artist.id}
                                to={`/artist/${artist.slug}`}
                                onClick={() => setSearchOpen(false)}
                                className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-lg transition"
                              >
                                <img
                                  src={artist.image}
                                  alt={artist.name}
                                  className="h-10 w-10 object-cover rounded-full"
                                />
                                <div className="min-w-0">
                                  <h5 className="text-sm font-semibold text-stone-900 truncate">
                                    {artist.name}
                                  </h5>
                                  <span className="text-[11px] text-stone-500 truncate block">
                                    {artist.signatureStyle}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-400 block mb-2">
                      Popular Searches & Themes
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map(term => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => handleRecentSearchClick(term)}
                          className="px-3 py-1.5 rounded-full bg-stone-100 hover:bg-amber-100 hover:text-amber-900 text-xs text-stone-700 transition"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-stone-100 pt-4 flex items-center justify-between text-xs text-stone-500">
                    <span>Press <kbd className="px-1.5 py-0.5 rounded bg-stone-100 border text-[11px]">Enter</kbd> to see full catalogue results</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/artworks');
                        setSearchOpen(false);
                      }}
                      className="font-semibold text-amber-800 hover:underline"
                    >
                      View All 16+ Curated Works
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-2 text-sm font-medium text-stone-800">
            <Link
              to="/"
              className="py-2 px-3 rounded-lg hover:bg-stone-50 hover:text-amber-800 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/paintings"
              className="py-2 px-3 rounded-lg hover:bg-stone-50 hover:text-amber-800 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Paintings Catalog
            </Link>
            <Link
              to="/sculptures"
              className="py-2 px-3 rounded-lg hover:bg-stone-50 hover:text-amber-800 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sculptures & Murals
            </Link>
            <Link
              to="/serigraphs"
              className="py-2 px-3 rounded-lg hover:bg-stone-50 hover:text-amber-800 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Limited Edition Serigraphs
            </Link>
            <Link
              to="/artists"
              className="py-2 px-3 rounded-lg hover:bg-stone-50 hover:text-amber-800 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Artists Directory
            </Link>
            <Link
              to="/exhibitions"
              className="py-2 px-3 rounded-lg hover:bg-stone-50 hover:text-amber-800 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Exhibitions & Virtual Tour
            </Link>
            <Link
              to="/advisory"
              className="py-2 px-3 rounded-lg hover:bg-stone-50 hover:text-amber-800 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Art Advisory & Custom Framing
            </Link>
            <Link
              to="/about"
              className="py-2 px-3 rounded-lg hover:bg-stone-50 hover:text-amber-800 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Shine Gallery
            </Link>
            <Link
              to="/blog"
              className="py-2 px-3 rounded-lg hover:bg-stone-50 hover:text-amber-800 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Art Journal & Insights
            </Link>
            <Link
              to="/contact"
              className="py-2 px-3 rounded-lg hover:bg-stone-50 hover:text-amber-800 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact & Visit Gallery
            </Link>
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-col gap-2 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-700" />
              <span>100% Authenticity Guarantee on Every Work</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-stone-400" />
              <span>Mumbai Gallery: +91 22 2648 8888</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
