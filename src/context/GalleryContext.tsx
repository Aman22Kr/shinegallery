import React, { createContext, useContext, useState, useEffect } from 'react';
import { artworksData, Artwork } from '../data/artworks';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // multiplier from INR
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { code: 'USD', symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.011, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0095, label: 'GBP (£)' }
};

export type FrameType = 'unframed' | 'stretched' | 'teak-floating' | 'museum-black';

export interface FrameOption {
  id: FrameType;
  label: string;
  extraPriceINR: number;
  description: string;
}

export const FRAME_OPTIONS: Record<FrameType, FrameOption> = {
  unframed: { id: 'unframed', label: 'Rolled Canvas (Unframed)', extraPriceINR: 0, description: 'Shipped safely in heavy-duty postal cylinder tube.' },
  stretched: { id: 'stretched', label: 'Stretched on Wooden Sub-frame', extraPriceINR: 8500, description: 'Ready to hang on wall with reinforced gallery pine stretcher bars.' },
  'teak-floating': { id: 'teak-floating', label: 'Natural Teak Floating Frame', extraPriceINR: 18000, description: 'Handcrafted solid Burmese teakwood with 8mm shadow gap reveal.' },
  'museum-black': { id: 'museum-black', label: 'Museum Matte Black Floating Frame', extraPriceINR: 15000, description: 'Sleek architectural black finish with UV protective sealant.' }
};

export interface BagItem {
  id: string; // unique item id
  artworkId: string;
  frame: FrameType;
  quantity: number;
  addedAt: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface InquirySubmission {
  id: string;
  artworkTitle?: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  inquiryType: 'general' | 'artwork' | 'advisory' | 'appointment' | 'bag';
  submittedAt: string;
}

interface GalleryContextType {
  // Currency
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (inrAmount: number) => string;
  convertPrice: (inrAmount: number) => number;

  // Wishlist
  wishlist: string[];
  addToWishlist: (artworkId: string) => void;
  removeFromWishlist: (artworkId: string) => void;
  toggleWishlist: (artworkId: string) => void;
  isInWishlist: (artworkId: string) => boolean;

  // Inquiry Bag
  bag: BagItem[];
  addToBag: (artworkId: string, frame?: FrameType) => void;
  removeFromBag: (bagItemId: string) => void;
  updateBagItemFrame: (bagItemId: string, frame: FrameType) => void;
  clearBag: () => void;
  bagTotalINR: number;

  // Recently viewed
  recentlyViewed: string[];
  addRecentlyViewed: (artworkId: string) => void;

  // Search history
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Modals
  quickViewArtwork: Artwork | null;
  setQuickViewArtwork: (artwork: Artwork | null) => void;
  visualizerArtwork: Artwork | null;
  setVisualizerArtwork: (artwork: Artwork | null) => void;
  inquiryArtwork: Artwork | null;
  setInquiryArtwork: (artwork: Artwork | null) => void;

  // Inquiries / Persistent submissions
  inquiries: InquirySubmission[];
  submitInquiry: (submission: Omit<InquirySubmission, 'id' | 'submittedAt'>) => void;

  // Toast
  toast: ToastMessage | null;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  hideToast: () => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Currency state
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('shinegallery_currency');
      if (saved && saved in CURRENCIES) return saved as CurrencyCode;
    } catch (e) {
      console.warn('LocalStorage unavailable for currency');
    }
    return 'INR';
  });

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('shinegallery_currency', c);
    } catch (e) {
      console.warn('Failed to save currency to localStorage');
    }
  };

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('shinegallery_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse wishlist from localStorage');
    }
    return ['art-001', 'art-007']; // Sample initial favorite masterpieces
  });

  useEffect(() => {
    try {
      localStorage.setItem('shinegallery_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to persist wishlist to localStorage');
    }
  }, [wishlist]);

  // Bag state
  const [bag, setBag] = useState<BagItem[]>(() => {
    try {
      const saved = localStorage.getItem('shinegallery_inquiry_bag');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse inquiry bag from localStorage');
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('shinegallery_inquiry_bag', JSON.stringify(bag));
    } catch (e) {
      console.warn('Failed to persist inquiry bag to localStorage');
    }
  }, [bag]);

  // Recently Viewed state
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('shinegallery_recently_viewed');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse recently viewed from localStorage');
    }
    return ['art-002', 'art-005'];
  });

  const addRecentlyViewed = (artworkId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== artworkId);
      const updated = [artworkId, ...filtered].slice(0, 8);
      try {
        localStorage.setItem('shinegallery_recently_viewed', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  // Recent Searches state
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('shinegallery_recent_searches');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse recent searches');
    }
    return ['Varanasi Ghats', 'S.H. Raza', 'Bronze Sculptures', 'Telangana'];
  });

  const addRecentSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 6);
      try {
        localStorage.setItem('shinegallery_recent_searches', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('shinegallery_recent_searches');
    } catch (e) {
      // ignore
    }
  };

  // Inquiries history state
  const [inquiries, setInquiries] = useState<InquirySubmission[]>(() => {
    try {
      const saved = localStorage.getItem('shinegallery_inquiries');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse inquiries from localStorage');
    }
    return [];
  });

  const submitInquiry = (submission: Omit<InquirySubmission, 'id' | 'submittedAt'>) => {
    const newRecord: InquirySubmission = {
      ...submission,
      id: `inq-${Date.now()}`,
      submittedAt: new Date().toLocaleString()
    };
    const updated = [newRecord, ...inquiries];
    setInquiries(updated);
    try {
      localStorage.setItem('shinegallery_inquiries', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
    showToast('Inquiry Submitted Successfully', 'Our chief curator will reach out to you within 4 business hours.', 'success');
  };

  // Toast state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ id: `toast-${Date.now()}`, title, message, type });
  };

  const hideToast = () => setToast(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Modal states
  const [quickViewArtwork, setQuickViewArtwork] = useState<Artwork | null>(null);
  const [visualizerArtwork, setVisualizerArtwork] = useState<Artwork | null>(null);
  const [inquiryArtwork, setInquiryArtwork] = useState<Artwork | null>(null);

  // Price conversion helpers
  const convertPrice = (inrAmount: number): number => {
    const conf = CURRENCIES[currency];
    return Math.round(inrAmount * conf.rate);
  };

  const formatPrice = (inrAmount: number): string => {
    const conf = CURRENCIES[currency];
    const converted = convertPrice(inrAmount);
    if (currency === 'INR') {
      return `${conf.symbol}${converted.toLocaleString('en-IN')}`;
    }
    return `${conf.symbol}${converted.toLocaleString('en-US')}`;
  };

  // Wishlist actions
  const addToWishlist = (artworkId: string) => {
    if (!wishlist.includes(artworkId)) {
      setWishlist(prev => [...prev, artworkId]);
      const art = artworksData.find(a => a.id === artworkId);
      showToast('Saved to Favorites', `"${art?.title || 'Artwork'}" has been added to your collection.`, 'success');
    }
  };

  const removeFromWishlist = (artworkId: string) => {
    setWishlist(prev => prev.filter(id => id !== artworkId));
    const art = artworksData.find(a => a.id === artworkId);
    showToast('Removed from Favorites', `"${art?.title || 'Artwork'}" was removed.`, 'info');
  };

  const toggleWishlist = (artworkId: string) => {
    if (wishlist.includes(artworkId)) {
      removeFromWishlist(artworkId);
    } else {
      addToWishlist(artworkId);
    }
  };

  const isInWishlist = (artworkId: string) => wishlist.includes(artworkId);

  // Bag actions
  const addToBag = (artworkId: string, frame: FrameType = 'teak-floating') => {
    const existingIndex = bag.findIndex(item => item.artworkId === artworkId && item.frame === frame);
    const art = artworksData.find(a => a.id === artworkId);

    if (existingIndex > -1) {
      setBag(prev => prev.map((item, idx) => idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item));
      showToast('Inquiry Bag Updated', `Increased quantity for "${art?.title || 'Artwork'}".`, 'success');
    } else {
      const newItem: BagItem = {
        id: `bag-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        artworkId,
        frame,
        quantity: 1,
        addedAt: Date.now()
      };
      setBag(prev => [...prev, newItem]);
      showToast('Added to Acquisition Bag', `"${art?.title || 'Artwork'}" with ${FRAME_OPTIONS[frame].label} added.`, 'success');
    }
  };

  const removeFromBag = (bagItemId: string) => {
    setBag(prev => prev.filter(item => item.id !== bagItemId));
    showToast('Removed from Bag', 'Artwork was removed from your inquiry bag.', 'info');
  };

  const updateBagItemFrame = (bagItemId: string, frame: FrameType) => {
    setBag(prev => prev.map(item => item.id === bagItemId ? { ...item, frame } : item));
    showToast('Framing Updated', `Changed frame to ${FRAME_OPTIONS[frame].label}.`, 'info');
  };

  const clearBag = () => {
    setBag([]);
  };

  const bagTotalINR = bag.reduce((total, item) => {
    const art = artworksData.find(a => a.id === item.artworkId);
    if (!art) return total;
    const frameCost = FRAME_OPTIONS[item.frame]?.extraPriceINR || 0;
    return total + (art.priceINR + frameCost) * item.quantity;
  }, 0);

  return (
    <GalleryContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        bag,
        addToBag,
        removeFromBag,
        updateBagItemFrame,
        clearBag,
        bagTotalINR,
        recentlyViewed,
        addRecentlyViewed,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        quickViewArtwork,
        setQuickViewArtwork,
        visualizerArtwork,
        setVisualizerArtwork,
        inquiryArtwork,
        setInquiryArtwork,
        inquiries,
        submitInquiry,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
