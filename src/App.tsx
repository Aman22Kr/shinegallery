import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { GalleryProvider, useGallery } from './context/GalleryContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RoomVisualizerModal } from './components/RoomVisualizerModal';
import { QuickViewModal } from './components/QuickViewModal';
import { InquiryModal } from './components/InquiryModal';

// Pages
import { Home } from './pages/Home';
import { Artworks } from './pages/Artworks';
import { ArtworkDetail } from './pages/ArtworkDetail';
import { Sculptures } from './pages/Sculptures';
import { Serigraphs } from './pages/Serigraphs';
import { Artists } from './pages/Artists';
import { ArtistDetail } from './pages/ArtistDetail';
import { Exhibitions } from './pages/Exhibitions';
import { ExhibitionDetail } from './pages/ExhibitionDetail';
import { Advisory } from './pages/Advisory';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPost';
import { Wishlist } from './pages/Wishlist';
import { InquiryBag } from './pages/InquiryBag';
import { NotFound } from './pages/NotFound';

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global Toast Renderer
const ToastContainer: React.FC = () => {
  const { toast, hideToast } = useGallery();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-subtle pointer-events-auto">
      <div className="rounded-2xl bg-stone-900/95 text-white p-4 shadow-2xl border border-stone-700/80 backdrop-blur-md flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-amber-400" />}
          {toast.type === 'info' && <Info className="h-5 w-5 text-amber-300" />}
          {toast.type === 'warning' && <AlertCircle className="h-5 w-5 text-amber-500" />}
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="text-xs font-bold text-amber-300 truncate">{toast.title}</h5>
          <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={hideToast}
          className="p-1 text-stone-400 hover:text-white transition rounded-md"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Main Layout Component
const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans selection:bg-amber-100 selection:text-amber-900">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paintings" element={<Artworks pageTitle="Original Paintings" pageSubtitle="Explore vibrant acrylics, oils, and mixed media canvases from India's senior masters and emerging prodigies." />} />
          <Route path="/artworks" element={<Artworks />} />
          <Route path="/artwork/:slug" element={<ArtworkDetail />} />
          <Route path="/sculptures" element={<Sculptures />} />
          <Route path="/serigraphs" element={<Serigraphs />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artist/:slug" element={<ArtistDetail />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/exhibition/:slug" element={<ExhibitionDetail />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<InquiryBag />} />
          <Route path="/inquiry-bag" element={<InquiryBag />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Interactive Modals */}
      <RoomVisualizerModal />
      <QuickViewModal />
      <InquiryModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <GalleryProvider>
        <AppLayout />
      </GalleryProvider>
    </HashRouter>
  );
}
