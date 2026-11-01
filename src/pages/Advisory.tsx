import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Building,
  Home,
  Sliders,
  Send,
  CheckCircle2,
  FileCheck,
  Palette,
  Truck
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { useGallery, FRAME_OPTIONS, FrameType } from '../context/GalleryContext';
import { artistsData } from '../data/artists';

export const Advisory: React.FC = () => {
  const { showToast, submitInquiry, formatPrice } = useGallery();

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectType, setProjectType] = useState<'residential' | 'corporate' | 'commission' | 'framing'>('residential');
  const [preferredArtist, setPreferredArtist] = useState('');
  const [budgetRange, setBudgetRange] = useState('₹2,00,000 - ₹5,00,000');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Framing demo simulator
  const [demoFrame, setDemoFrame] = useState<FrameType>('teak-floating');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    submitInquiry({
      fullName: clientName,
      email: clientEmail,
      phone: clientPhone,
      city: 'Mumbai / Global',
      message: `Project Type: ${projectType}. Preferred Artist: ${preferredArtist || 'Open to Curatorial Advice'}. Budget: ${budgetRange}. Notes: ${notes}`,
      inquiryType: 'advisory'
    });

    setSubmitted(true);
    showToast(
      'Advisory Request Received',
      'Our principal curator will contact you within 24 hours with a tailored curatorial dossier.',
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Art Advisory & Services' }]} />

        {/* Hero Section */}
        <div className="my-8 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-2">
            Curatorial Consultancy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
            Art Advisory & Bespoke Framing
          </h1>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            Elevating living environments and corporate architectures through curated fine art.
            From private estate collections to bespoke artist commissions and museum-grade framing.
          </p>
        </div>

        {/* 3 Core Services Pillars */}
        <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl bg-white p-7 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Residential Art Consultation
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Whether curating a single focal masterpiece for a living salon or building a cohesive
                multi-room collection, our advisors evaluate your floor plan, lighting, and aesthetic taste.
              </p>
            </div>
            <ul className="mt-6 pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-700" />
                <span>Virtual & in-home physical placement previews</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-700" />
                <span>Curated shortlists based on architectural finishes</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-7 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Corporate & Hospitality Curation
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We partner with leading interior architecture firms, luxury hotels, and corporate
                boardrooms to curate monumental artworks, metal murals, and sculpture pavilions that echo prestige.
              </p>
            </div>
            <ul className="mt-6 pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-700" />
                <span>Large-format monumental canvas sizing (8ft - 16ft)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-700" />
                <span>Corporate asset valuation and authentication catalog</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-7 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-amber-800 text-white flex items-center justify-center">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Custom Artist Commissions
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Can’t find the exact dimensions or subject? We liaise directly with senior artists like
                Amit Bhar, Paramesh Paul, or Jagannath Paul to create a bespoke masterpiece tailored to your vision.
              </p>
            </div>
            <ul className="mt-6 pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-700" />
                <span>Direct artist studio sketch approvals</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-700" />
                <span>Milestone photography during canvas creation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Custom Framing Studio Feature */}
        <div id="framing" className="my-16 bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block">
                Artisan Atelier
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900">
                Shine Gallery Framing Studio
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                A frame is not merely a border; it is an architectural threshold that honors the canvas.
                Our in-house master craftsmen utilize archival acid-free mats, UV-protective museum acrylic,
                and seasoned solid Burmese teakwood with shadow gap reveals.
              </p>

              {/* Framing Options Preview Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Interactive Framing Finishes
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {(Object.keys(FRAME_OPTIONS) as FrameType[]).map(key => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setDemoFrame(key)}
                      className={`p-3 rounded-xl border text-left transition ${
                        demoFrame === key
                          ? 'border-amber-700 bg-amber-50 font-bold text-stone-900 shadow-xs'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-semibold">{FRAME_OPTIONS[key].label}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {FRAME_OPTIONS[key].extraPriceINR === 0 ? 'Base option' : `+${formatPrice(FRAME_OPTIONS[key].extraPriceINR)}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Frame Preview Box */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-stone-100 rounded-2xl border border-stone-200">
              <div
                className={`transition-all duration-300 rounded-sm ${
                  demoFrame === 'teak-floating'
                    ? 'p-4 bg-[#b47a46] shadow-2xl ring-4 ring-[#8c5222]'
                    : demoFrame === 'museum-black'
                    ? 'p-4 bg-stone-900 shadow-2xl ring-4 ring-stone-950'
                    : demoFrame === 'stretched'
                    ? 'shadow-2xl ring-1 ring-stone-300'
                    : 'shadow-lg'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80"
                  alt="Framing preview sample"
                  className="max-h-64 object-contain shadow-md"
                />
              </div>
              <span className="text-xs text-stone-500 mt-4 text-center font-medium">
                Live Preview: {FRAME_OPTIONS[demoFrame].label}
              </span>
            </div>
          </div>
        </div>

        {/* Consultation Request Form */}
        <div className="my-16 bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-1">
              Connect With A Curator
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Request Bespoke Consultation
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Share details of your space, desired dimensions, or artists of interest.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-700 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-emerald-950">
                Inquiry Successfully Logged
              </h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                Thank you, {clientName}. Your advisory inquiry has been registered.
                Our chief curator will contact you shortly via email and phone.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Poddar"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+91 98200 00000"
                    value={clientPhone}
                    onChange={e => setClientPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Project Discipline</label>
                  <select
                    value={projectType}
                    onChange={e => setProjectType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700 bg-white"
                  >
                    <option value="residential">Residential Home Curation</option>
                    <option value="corporate">Corporate / Hotel Architecture</option>
                    <option value="commission">Custom Artist Commission</option>
                    <option value="framing">Restoration & Custom Framing</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Preferred Artist (Optional)</label>
                  <select
                    value={preferredArtist}
                    onChange={e => setPreferredArtist(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700 bg-white"
                  >
                    <option value="">Any / Curatorial Recommendation</option>
                    {artistsData.map(a => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Estimated Budget Range</label>
                  <select
                    value={budgetRange}
                    onChange={e => setBudgetRange(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700 bg-white"
                  >
                    <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 – ₹2,50,000</option>
                    <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 – ₹5,00,000</option>
                    <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 – ₹10,00,000</option>
                    <option value="Above ₹10,00,000">Above ₹10,00,000 (Major Masterworks)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Project Details / Vision</label>
                <textarea
                  rows={4}
                  placeholder="Describe your room dimensions, color scheme, natural light conditions, or specific themes (spiritual, abstract, figurative)..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full p-3 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-amber-900 px-8 py-3 text-xs font-semibold text-white shadow-md transition"
                >
                  <Send className="h-3.5 w-3.5 text-amber-400" />
                  <span>Submit Advisory Brief</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Mandatory Compact Advertisement Placeholder */}
        <AdPlaceholder slotName="Advisory Bottom Banner" />
      </div>
    </div>
  );
};
