import React, { useState } from 'react';
import { X, Send, ShieldCheck, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const InquiryModal: React.FC = () => {
  const { inquiryArtwork, setInquiryArtwork, submitInquiry } = useGallery();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!inquiryArtwork) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setSubmitting(true);
    setTimeout(() => {
      submitInquiry({
        artworkTitle: inquiryArtwork.title,
        fullName,
        email,
        phone,
        city,
        message: message || `I am inquiring about "${inquiryArtwork.title}" by ${inquiryArtwork.artistName}. Please provide availability and shipping details.`,
        inquiryType: 'artwork'
      });
      setSubmitting(false);
      setInquiryArtwork(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-stone-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800">
              Direct Curatorial Inquiry
            </span>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Acquisition & Pricing Details
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setInquiryArtwork(null)}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Selected Artwork Summary Pill */}
        <div className="flex items-center gap-3 p-4 bg-stone-100 border-b border-stone-200">
          <img
            src={inquiryArtwork.image}
            alt={inquiryArtwork.title}
            className="h-14 w-14 object-cover rounded-md shadow-xs"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-stone-900 truncate">
              {inquiryArtwork.title}
            </h4>
            <p className="text-xs text-stone-500">
              {inquiryArtwork.artistName} • {inquiryArtwork.medium}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohini Mehta"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Phone / WhatsApp Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                <input
                  type="tel"
                  placeholder="+91 98200 00000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                City / Country of Delivery
              </label>
              <input
                type="text"
                placeholder="e.g. Mumbai / London / New York"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Collector Note or Questions
            </label>
            <div className="relative">
              <textarea
                rows={3}
                placeholder="Inquire about framing, insured shipping quotes, high-resolution close-ups, or private viewing at our Khar West gallery..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full p-3 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
            <ShieldCheck className="h-4 w-4 text-amber-700 shrink-0" />
            <span>
              Your inquiry is handled with strict gallery confidentiality. No automated spam.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setInquiryArtwork(null)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-amber-900 transition disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5 text-amber-400" />
              <span>{submitting ? 'Submitting Inquiry...' : 'Send Private Inquiry'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
