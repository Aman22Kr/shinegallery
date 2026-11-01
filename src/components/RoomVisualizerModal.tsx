import React, { useState } from 'react';
import { X, Check, ShoppingBag, Info, Sliders, Palette, Home, Sparkles } from 'lucide-react';
import { useGallery, FRAME_OPTIONS, FrameType } from '../context/GalleryContext';

interface RoomStyle {
  id: string;
  name: string;
  furnitureType: 'living' | 'office' | 'bedroom' | 'gallery';
  description: string;
}

const ROOM_STYLES: RoomStyle[] = [
  { id: 'living', name: 'Contemporary Living Room', furnitureType: 'living', description: 'Over luxury linen couch & modern brass floor lamp' },
  { id: 'office', name: 'Executive Suite & Boardroom', furnitureType: 'office', description: 'Over minimal marble console & architectural walnut panel' },
  { id: 'bedroom', name: 'Master Suite Bedroom', furnitureType: 'bedroom', description: 'Centered above velvet upholstered headboard' },
  { id: 'gallery', name: 'Museum Salon Wall', furnitureType: 'gallery', description: 'Under dedicated 3000K museum spotlighting with parquet flooring' }
];

const WALL_COLORS = [
  { id: 'linen', name: 'Warm Linen', hex: '#f0ede6', textDark: true },
  { id: 'stone', name: 'Architectural Greige', hex: '#d6d3d1', textDark: true },
  { id: 'navy', name: 'Royal Midnight Blue', hex: '#1e293b', textDark: false },
  { id: 'terracotta', name: 'Jaipur Terracotta', hex: '#7c2d12', textDark: false },
  { id: 'sage', name: 'Udaipur Sage Green', hex: '#374151', textDark: false }
];

export const RoomVisualizerModal: React.FC = () => {
  const { visualizerArtwork, setVisualizerArtwork, addToBag, formatPrice } = useGallery();

  const [selectedRoom, setSelectedRoom] = useState<string>('living');
  const [selectedWallColor, setSelectedWallColor] = useState(WALL_COLORS[0]);
  const [selectedFrame, setSelectedFrame] = useState<FrameType>('teak-floating');

  if (!visualizerArtwork) return null;

  const artwork = visualizerArtwork;
  const frameOpt = FRAME_OPTIONS[selectedFrame];
  const totalItemPrice = artwork.priceINR + frameOpt.extraPriceINR;

  // Frame styling classes
  const getFrameClasses = () => {
    switch (selectedFrame) {
      case 'teak-floating':
        return 'p-3 bg-[#b47a46] shadow-2xl ring-4 ring-[#8c5222] ring-offset-2';
      case 'museum-black':
        return 'p-3 bg-stone-900 shadow-2xl ring-4 ring-stone-950 ring-offset-2';
      case 'stretched':
        return 'shadow-2xl ring-1 ring-stone-300';
      case 'unframed':
      default:
        return 'shadow-xl';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <span>View On Your Wall Simulator</span>
                <span className="text-xs font-sans font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  Interactive Room AR
                </span>
              </h3>
              <p className="text-xs text-stone-500">
                {artwork.title} by {artwork.artistName} ({artwork.widthInches} x {artwork.heightInches} in)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setVisualizerArtwork(null)}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Interactive Virtual Room Viewport */}
        <div
          className="relative flex-1 min-h-[360px] sm:min-h-[420px] transition-colors duration-500 flex flex-col items-center justify-center p-8 overflow-hidden select-none"
          style={{ backgroundColor: selectedWallColor.hex }}
        >
          {/* Subtle museum track lighting cone effect */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

          {/* Wall scale indicator tag */}
          <div
            className={`absolute top-4 left-4 text-[11px] font-mono rounded-md px-2.5 py-1 backdrop-blur-md border ${
              selectedWallColor.textDark
                ? 'bg-white/80 border-stone-300 text-stone-700'
                : 'bg-stone-900/80 border-stone-700 text-stone-300'
            }`}
          >
            Dimensions: {artwork.widthInches}&quot; x {artwork.heightInches}&quot; ({Math.round(artwork.widthInches * 2.54)} x {Math.round(artwork.heightInches * 2.54)} cm)
          </div>

          {/* Centered Scaled Artwork in Selected Frame */}
          <div className="relative z-10 transition-all duration-300 max-w-[70%] max-h-[60%] flex items-center justify-center">
            <div className={`transition-all duration-300 rounded-sm ${getFrameClasses()}`}>
              <img
                src={artwork.image}
                alt={artwork.title}
                className="max-h-[220px] sm:max-h-[280px] max-w-full object-contain shadow-md"
              />
            </div>
          </div>

          {/* Architectural Simulated Furniture Bottom Layer */}
          <div className="absolute bottom-0 inset-x-0 flex flex-col items-center pointer-events-none">
            {selectedRoom === 'living' && (
              <div className="w-full max-w-2xl h-16 sm:h-20 bg-gradient-to-t from-stone-800 to-stone-700 rounded-t-3xl shadow-2xl border-t border-stone-600 flex items-center justify-center text-xs text-stone-400 font-sans tracking-wide">
                <span className="opacity-60">[ Contemporary Italian Designer Sofa ]</span>
              </div>
            )}
            {selectedRoom === 'office' && (
              <div className="w-full max-w-xl h-12 sm:h-16 bg-gradient-to-t from-stone-900 to-stone-800 rounded-t-xl shadow-2xl border-t border-amber-600/30 flex items-center justify-center text-xs text-amber-300 font-sans">
                <span className="opacity-60">[ Minimalist Marble & Walnut Executive Console ]</span>
              </div>
            )}
            {selectedRoom === 'bedroom' && (
              <div className="w-full max-w-xl h-14 sm:h-18 bg-gradient-to-t from-stone-700 to-stone-600 rounded-t-2xl shadow-xl flex items-center justify-center text-xs text-stone-300 font-sans">
                <span className="opacity-60">[ Fluted Velvet Master Headboard ]</span>
              </div>
            )}
            {selectedRoom === 'gallery' && (
              <div className="w-full h-8 bg-gradient-to-t from-amber-950/60 to-transparent flex items-center justify-center text-[10px] text-amber-200/60 font-mono">
                [ Polished Oak Gallery Parquet Floor ]
              </div>
            )}
          </div>
        </div>

        {/* Customization Controls Panel */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Room Preset */}
            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Home className="h-3.5 w-3.5 text-stone-500" />
                <span>Interior Setting</span>
              </label>
              <select
                value={selectedRoom}
                onChange={e => setSelectedRoom(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:border-amber-700"
              >
                {ROOM_STYLES.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Wall Paint Swatches */}
            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-stone-500" />
                <span>Wall Color ({selectedWallColor.name})</span>
              </label>
              <div className="flex items-center gap-2">
                {WALL_COLORS.map(color => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedWallColor(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`h-8 w-8 rounded-full border-2 transition-transform ${
                      selectedWallColor.id === color.id
                        ? 'border-amber-700 scale-110 shadow-md ring-2 ring-amber-300'
                        : 'border-white hover:scale-105'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* 3. Framing Selector */}
            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-stone-500" />
                <span>Custom Framing</span>
              </label>
              <select
                value={selectedFrame}
                onChange={e => setSelectedFrame(e.target.value as FrameType)}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:border-amber-700"
              >
                {(Object.keys(FRAME_OPTIONS) as FrameType[]).map(key => (
                  <option key={key} value={key}>
                    {FRAME_OPTIONS[key].label} {FRAME_OPTIONS[key].extraPriceINR > 0 ? `(+${formatPrice(FRAME_OPTIONS[key].extraPriceINR)})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs text-stone-500 block">Total Investment (Artwork + Selected Frame):</span>
              <span className="font-serif text-xl font-bold text-stone-900">
                {formatPrice(totalItemPrice)}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  addToBag(artwork.id, selectedFrame);
                  setVisualizerArtwork(null);
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-amber-900 transition"
              >
                <ShoppingBag className="h-4 w-4 text-amber-400" />
                <span>Acquire / Add Framed Work to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
