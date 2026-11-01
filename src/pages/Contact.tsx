import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  MessageSquare,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { useGallery } from '../context/GalleryContext';

const FAQS = [
  {
    q: 'How are artworks authenticated before shipping?',
    a: 'Every original artwork acquired from Shine Gallery is accompanied by a physical, hologram-registered Certificate of Authenticity signed by the artist and our head curator. In addition, our archival database records high-resolution photography and provenance history.'
  },
  {
    q: 'Do you ship artworks internationally?',
    a: 'Yes, we provide fully insured worldwide shipping across North America, Europe, the Middle East, Southeast Asia, and Australia. Canvases can be shipped rolled in reinforced heavy-duty postal cylinders or stretched in custom museum crates.'
  },
  {
    q: 'Can I view the artwork in person before purchasing?',
    a: 'Absolutely. We welcome collectors to our physical gallery on Linking Road, Khar West, Mumbai. You can schedule a private, no-obligation viewing session with our curators.'
  },
  {
    q: 'What framing options do you offer?',
    a: 'We provide four primary options: Rolled Canvas (shipped in protective cylinder tube), Stretched Canvas on pine stretcher bars, Natural Burmese Teak Floating Frame with an 8mm shadow gap reveal, and Architectural Matte Black Floating Frame.'
  },
  {
    q: 'Can I commission a custom artwork by an Indian master?',
    a: 'Yes, Shine Gallery facilitates bespoke commissions with leading senior artists including Amit Bhar, Paramesh Paul, and Anand Panchal. We handle sizing, palette preferences, studio approvals, and progress updates.'
  }
];

export const Contact: React.FC = () => {
  const { showToast, submitInquiry } = useGallery();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Gallery Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    submitInquiry({
      fullName: name,
      email,
      phone,
      city: 'Mumbai / Web',
      message: `Subject: ${subject}. Message: ${message}`,
      inquiryType: 'general'
    });

    setSubmitted(true);
    showToast(
      'Message Received by Shine Gallery',
      'Thank you! A curatorial associate will get back to you within 4 business hours.',
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Contact & Visit Gallery' }]} />

        {/* Header */}
        <div className="my-8 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-2">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
            Contact & Gallery Visit
          </h1>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            We invite you to our Mumbai flagship gallery in Khar West. Our curatorial team is ready
            to assist you with acquisition inquiries, private viewing appointments, and bespoke commissions.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="my-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <MapPin className="h-5 w-5" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-sm">Gallery Location</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              3, Ramjanki, 356 Linking Road, Khar (West), Next to Only Parathas, Mumbai – 400052
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Phone className="h-5 w-5" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-sm">Direct Phone</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              +91 22 2648 8888<br />
              +91 98200 12345 (WhatsApp)
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Mail className="h-5 w-5" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-sm">Email Inquiries</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              curator@shinegallery.com<br />
              acquisitions@shinegallery.com
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-sm">Gallery Hours</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Monday – Sunday: 11:00 AM – 8:00 PM IST<br />
              Open 7 days a week
            </p>
          </div>
        </div>

        {/* Main Grid: Contact Form + Interactive Map Visualizer */}
        <div className="my-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact & Appointment Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-800 block mb-1">
              Send A Message
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6">
              Inquire or Schedule a Visit
            </h3>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-700 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-emerald-950">
                  Message Successfully Sent
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you, {name}. A member of our curatorial team will be in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Shah"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+91 98200 00000"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Inquiry Subject</label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700 bg-white"
                    >
                      <option value="General Gallery Inquiry">General Gallery Inquiry</option>
                      <option value="Book Private Viewing Appointment">Book Private Viewing Appointment</option>
                      <option value="International Shipping & Crating">International Shipping & Crating</option>
                      <option value="Artist Commission Inquiry">Artist Commission Inquiry</option>
                      <option value="Consignment & Appraisal">Consignment & Appraisal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the artwork you are interested in, questions regarding dimensions, or dates for visiting our gallery..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full p-3 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-700"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-amber-900 px-7 py-3 text-xs font-semibold text-white shadow-md transition"
                >
                  <Send className="h-3.5 w-3.5 text-amber-400" />
                  <span>Send Curatorial Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Map Visualizer & Khar West Guide */}
          <div className="lg:col-span-5 space-y-6">
            <div className="overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-xs p-6">
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-700" />
                <span>Gallery Map Location</span>
              </h4>

              {/* Stylized Architectural Map Simulation */}
              <div className="relative aspect-[4/3] rounded-2xl bg-stone-100 border border-stone-300 overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none shadow-inner">
                {/* Simulated street grid lines */}
                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:30px_30px]" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-amber-700 text-white flex items-center justify-center shadow-xl animate-bounce">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="mt-3 bg-stone-900/95 text-white px-4 py-2 rounded-xl shadow-lg border border-amber-500/40 text-xs">
                    <strong className="font-serif block text-amber-300 text-sm">Shine Gallery Mumbai</strong>
                    <span>3, Ramjanki, 356 Linking Road</span>
                  </div>
                  <span className="text-[10px] text-stone-500 mt-2 font-mono">
                    Khar West • Next to Only Parathas
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-600 space-y-2">
                <p>
                  <strong>Parking:</strong> Valet parking is available directly at the gallery entrance for all scheduled private viewing appointments.
                </p>
                <p>
                  <strong>Transit:</strong> 7 minutes from Khar Railway Station; 15 minutes from Bandra Bandstand and Western Express Highway.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="my-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-1">
              Collector Assistance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white border border-stone-200 overflow-hidden shadow-xs transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-semibold text-stone-900 hover:text-amber-800 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-800' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mandatory Compact Advertisement Placeholder */}
        <AdPlaceholder slotName="Contact Bottom Banner" />
      </div>
    </div>
  );
};
