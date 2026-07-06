import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Share2, Heart, Download, Maximize2, Clock, Compass, Star } from 'lucide-react';

interface RoomCarouselModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  city: string;
  images: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onActivate3dTour: () => void;
}

export const RoomCarouselModal: React.FC<RoomCarouselModalProps> = ({
  isOpen,
  onClose,
  title,
  city,
  images,
  activeIndex,
  setActiveIndex,
  onActivate3dTour,
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'video' | 'floor'>('gallery');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveIndex((activeIndex + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, images.length]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-[#1a1c1c] text-white flex flex-col select-none"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-headline font-bold text-lg leading-tight">{title}</h2>
            <p className="text-xs text-white/60 font-body">{city} · Premier Host</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6 px-6 py-2 rounded-full bg-white/10 text-white text-xs font-headline font-bold tracking-wider uppercase">
            <span className="hover:text-primary cursor-pointer transition-colors">Explore</span>
            <span className="opacity-30">·</span>
            <span className="text-primary hover:text-primary/80 cursor-pointer transition-colors">Stays</span>
            <span className="opacity-30">·</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Saved</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onActivate3dTour();
            }}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-full text-xs font-headline font-bold tracking-wider uppercase transition-colors shadow-lg"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            3D Tour
          </button>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Active Media */}
      <div className="relative flex-1 flex items-center justify-center px-4 md:px-16 py-4">
        {activeTab === 'gallery' && (
          <button
            onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
            className="absolute left-6 w-12 h-12 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 flex items-center justify-center transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="relative w-full h-[70vh] flex items-center justify-center">
          {activeTab === 'gallery' && (
            <>
              <motion.img
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                src={images[activeIndex]}
                alt={`${title} - Fullscreen View`}
                className="w-full max-w-7xl h-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="absolute top-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-headline font-bold tracking-wider text-white">
                {activeIndex + 1} / {images.length}
              </div>
            </>
          )}

          {activeTab === 'video' && (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-white/5 border border-white/10 rounded-2xl max-w-md shadow-ambient backdrop-blur-md">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4 text-primary">
                <Clock className="w-6 h-6 animate-pulse text-white" />
              </div>
              <h3 className="font-headline text-lg font-bold text-white mb-2">Cinematic Video Tour</h3>
              <p className="text-xs text-white/60 leading-relaxed font-body">
                Upcoming Feature: We are currently curating and producing a high-fidelity video walk-through for this suite. It will be available shortly.
              </p>
            </div>
          )}

          {activeTab === 'floor' && (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-white/5 border border-white/10 rounded-2xl max-w-md shadow-ambient backdrop-blur-md">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4 text-primary">
                <Compass className="w-6 h-6 animate-pulse text-white" />
              </div>
              <h3 className="font-headline text-lg font-bold text-white mb-2">Interactive Floor Plan</h3>
              <p className="text-xs text-white/60 leading-relaxed font-body">
                Upcoming Feature: Detailed architectural blueprint layouts and spatial mappings are currently in review and will be uploaded soon.
              </p>
            </div>
          )}
        </div>

        {activeTab === 'gallery' && (
          <button
            onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
            className="absolute right-6 w-12 h-12 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 flex items-center justify-center transition-all duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Carousel Controls & Thumbnails */}
      <div className="bg-gradient-to-t from-black/90 to-transparent pt-6 pb-2 px-6 flex flex-col items-center w-full">
        {activeTab === 'gallery' && (
          <div className="flex gap-2 overflow-x-auto hide-scrollbar max-w-full py-2 mb-4 scroll-smooth">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-20 h-14 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                  activeIndex === idx
                    ? 'border-primary scale-105 shadow-md shadow-primary/30'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* View Options Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {(['gallery', 'video', 'floor'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-xs font-headline font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-white/75 hover:bg-white/20'
              }`}
            >
              {tab === 'gallery' ? 'Gallery' : tab === 'video' ? 'Video Tour' : 'Floor Plan'}
            </button>
          ))}
        </div>

        {/* Footer Content */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 py-2 border-t border-white/10">
          <div className="flex items-center gap-3 text-xs font-headline font-bold tracking-widest uppercase text-white/60">
            <span className="text-primary font-extrabold text-[15px] leading-none">•</span>
            <span>
              {activeIndex === 0
                ? 'Master Suite'
                : activeIndex === 1
                ? 'Living Space'
                : activeIndex === 2
                ? 'Terrace & View'
                : 'Guest Area'}
            </span>
            <span className="opacity-30">|</span>
            <span>{city}</span>
          </div>

          <div className="flex items-center gap-4 text-white/80">
            <button className="flex items-center gap-2 hover:text-primary transition-colors p-2 text-xs font-headline font-bold uppercase tracking-wider">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition-colors p-2 text-xs font-headline font-bold uppercase tracking-wider">
              <Heart className="w-4 h-4" /> Favorite
            </button>
            <button className="flex items-center gap-2 hover:text-white transition-colors p-2 text-xs font-headline font-bold uppercase tracking-wider">
              <Download className="w-4 h-4" /> Save
            </button>
            <button className="flex items-center justify-center hover:text-white transition-colors p-2">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full h-1 bg-white/10 relative">
        <div
          className="absolute left-0 top-0 h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${((activeIndex + 1) / images.length) * 100}%` }}
        />
      </div>
    </motion.div>
  );
};
