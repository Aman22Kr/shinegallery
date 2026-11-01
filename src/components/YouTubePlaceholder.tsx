import React from 'react';
import { Film, Play } from 'lucide-react';

interface YouTubePlaceholderProps {
  title?: string;
  duration?: string;
  caption?: string;
  className?: string;
}

export const YouTubePlaceholder: React.FC<YouTubePlaceholderProps> = ({
  title = 'Curator Walkthrough & Master Artist Studio Insights',
  duration = '12:45',
  caption = 'Explore the creative rhythm behind our latest Mumbai exhibition',
  className = ''
}) => {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-stone-800 bg-stone-950 shadow-2xl ${className}`}>
      {/* 16:9 Aspect Ratio Container */}
      <div className="relative w-full pb-[56.25%] bg-stone-900 overflow-hidden">
        {/* Subtle gallery grid pattern background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Blank placeholder overlay with subtle architectural lighting */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-stone-800/80 text-amber-400 border border-amber-500/30 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-105 cursor-default">
            <Play className="h-8 w-8 ml-1 fill-amber-400/20 text-amber-400" />
            <div className="absolute -inset-1 rounded-full border border-amber-400/20 animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-1 text-xs font-medium text-stone-300 border border-stone-700/60 mb-2">
            <Film className="h-3.5 w-3.5 text-amber-400" />
            <span>Video Stream Placeholder • {duration}</span>
          </div>

          <h4 className="text-lg sm:text-xl font-serif text-white max-w-xl font-medium tracking-wide">
            {title}
          </h4>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-md">
            {caption}
          </p>
        </div>

        {/* Video Player Controls Mock Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex items-center justify-between text-xs text-stone-300">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-mono text-[11px] text-stone-400">00:00 / {duration}</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-mono">
            SHINE GALLERY HD ARCHIVE
          </span>
        </div>
      </div>
    </div>
  );
};
