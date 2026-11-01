import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Download, Sparkles } from 'lucide-react';
import { exhibitionsData, Exhibition } from '../data/exhibitions';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { useGallery } from '../context/GalleryContext';

export const Exhibitions: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'All' | 'Current' | 'Upcoming' | 'Past'>('All');
  const { showToast } = useGallery();

  const filteredExhibitions = exhibitionsData.filter(exh => {
    if (filterStatus === 'All') return true;
    return exh.status === filterStatus;
  });

  const handleDownloadCatalogue = (catalogueName: string) => {
    showToast(
      'Exhibition Catalogue Ready',
      `Curatorial brochure "${catalogueName}" is compiled and ready for private collector viewing.`,
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Exhibitions & Viewing Rooms' }]} />

        {/* Header */}
        <div className="my-8 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-2">
            Curatorial Programs
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
            Exhibitions & Salons
          </h1>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            Experience our curated physical exhibitions at our Khar West gallery in Mumbai,
            alongside global digital viewing rooms celebrating Indian modernism and contemporary mastery.
          </p>
        </div>

        {/* Filter status tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-white rounded-xl border border-stone-200 shadow-xs">
            {['All', 'Current', 'Upcoming', 'Past'].map(status => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status as any)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterStatus === status
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {status} Exhibitions
              </button>
            ))}
          </div>
        </div>

        {/* Exhibitions List */}
        <div className="space-y-10">
          {filteredExhibitions.map(exh => (
            <div
              key={exh.id}
              className="group overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Banner Image */}
                <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-900">
                  <img
                    src={exh.bannerImage}
                    alt={exh.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider backdrop-blur-md ${
                        exh.status === 'Current'
                          ? 'bg-emerald-600/95 text-white'
                          : exh.status === 'Upcoming'
                          ? 'bg-amber-600/95 text-white'
                          : 'bg-stone-800/90 text-stone-300'
                      }`}
                    >
                      {exh.status} Show
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                      <Calendar className="h-4 w-4 text-amber-700" />
                      <span>{exh.startDate} – {exh.endDate}</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 group-hover:text-amber-800 transition">
                      {exh.title}
                    </h2>

                    <p className="text-xs sm:text-sm font-medium text-amber-900 mt-1">
                      {exh.subtitle}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-2">
                      <MapPin className="h-3.5 w-3.5 text-stone-400" />
                      <span>{exh.venue}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed line-clamp-3">
                      {exh.fullStatement}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-stone-500">
                      Curated by <strong>{exh.curator}</strong> • {exh.totalWorks} Works
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleDownloadCatalogue(exh.catalogueDownloadName)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-700 transition"
                      >
                        <Download className="h-3.5 w-3.5 text-stone-600" />
                        <span>Catalogue PDF</span>
                      </button>

                      <Link
                        to={`/exhibition/${exh.slug}`}
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-stone-900 hover:bg-amber-900 text-xs font-semibold text-white shadow-xs transition"
                      >
                        <span>View Exhibition</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Compact Advertisement Placeholder */}
        <AdPlaceholder slotName="Exhibitions Page Bottom Banner" />
      </div>
    </div>
  );
};
