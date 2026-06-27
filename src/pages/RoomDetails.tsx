import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Droplets, Flame, Wifi, Tv, ChefHat, Waves, Image as ImageIcon, ArrowLeft, X, ChevronLeft, ChevronRight, Share2, Download, Maximize2, Clock, Compass } from 'lucide-react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { useRoom } from '../hooks/useRooms';
import { useBookingStore } from '../store/bookingStore';
import { formatCurrency } from '../lib/utils';
import { fadeIn } from '../lib/animations';

const amenityIcons: Record<string, React.ElementType> = {
  pool: Waves,
  spa: Flame,
  wifi: Wifi,
  tv: Tv,
  kitchen: ChefHat,
  default: Droplets,
};

function getAmenityIcon(name: string) {
  const key = Object.keys(amenityIcons).find((k) =>
    name.toLowerCase().includes(k)
  );
  return key ? amenityIcons[key] : amenityIcons.default;
}

export function RoomDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { room, isLoading, error } = useRoom(id || '');
  const { checkIn, checkOut, guests, setCheckIn, setCheckOut, setGuests } = useBookingStore();
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'gallery' | 'video' | 'floor'>('gallery');
  const [is3dActive, setIs3dActive] = useState(false);

  const images = room && room.images && room.images.length > 0 ? room.images : [
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590490360182-c33d955f8ee1?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  ];

  useEffect(() => {
    if (!isCarouselOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'Escape') {
        setIsCarouselOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCarouselOpen, images.length]);

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
      : 5;
  const subtotal = room ? room.pricePerNight * nights : 0;
  const cleaningFee = 120;
  const serviceFee = Math.round(subtotal * 0.065);
  const total = subtotal + cleaningFee + serviceFee;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4">
        <p className="text-error text-lg">Room not found</p>
        <Link to="/search" className="btn-primary-gradient px-6 py-3 rounded-full">
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-[72px]">
        {/* ══════ PHOTO GALLERY ══════ */}
        <section className="max-w-page mx-auto px-6 lg:px-10 pt-6">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] lg:h-[480px] rounded-xl overflow-hidden">
            {/* Main Image */}
            <div 
              className="col-span-2 row-span-2 relative img-hover-zoom cursor-pointer"
              onClick={() => {
                setActivePhotoIndex(0);
                setIsCarouselOpen(true);
              }}
            >
              <img src={images[0]} alt={room.title} className="w-full h-full object-cover" />
            </div>
            {/* Side Images */}
            {images.slice(1, 5).map((img, i) => (
              <div 
                key={i} 
                className="relative img-hover-zoom cursor-pointer"
                onClick={() => {
                  setActivePhotoIndex(i + 1);
                  setIsCarouselOpen(true);
                }}
              >
                <img src={img} alt={`${room.title} ${i + 2}`} className="w-full h-full object-cover" />
                {i === 3 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex(0);
                      setIsCarouselOpen(true);
                    }}
                    className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-semibold text-[#1a1c1c] hover:bg-white transition-colors animate-fade-in"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    View All Photos
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ══════ FULLSCREEN CAROUSEL MODAL ══════ */}
        <AnimatePresence>
          {isCarouselOpen && (
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
                    onClick={() => setIsCarouselOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="font-headline font-bold text-lg leading-tight">{room.title}</h2>
                    <p className="text-xs text-white/60">{room.city} · Premier Host</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Explore Stays Saved Pill */}
                  <div className="hidden lg:flex items-center gap-6 px-6 py-2 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider uppercase select-none">
                    <span className="hover:text-[#ba0036] cursor-pointer transition-colors">Explore</span>
                    <span className="opacity-30">·</span>
                    <span className="text-primary hover:text-primary-container cursor-pointer transition-colors">Stays</span>
                    <span className="opacity-30">·</span>
                    <span className="hover:text-[#ba0036] cursor-pointer transition-colors">Saved</span>
                  </div>

                  <button
                    onClick={() => {
                      setIsCarouselOpen(false);
                      setIs3dActive(true);
                      setTimeout(() => {
                        const element = document.getElementById('3d-tour-section');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }, 100);
                    }}
                    className="flex items-center gap-2 bg-[#ba0036] hover:bg-[#ba0036]/90 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-lg"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    3D Tour
                  </button>

                  <button
                    onClick={() => setIsCarouselOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Slider */}
              <div className="relative flex-1 flex items-center justify-center px-4 md:px-16 py-4">
                {/* Left navigation arrow */}
                {activeTab === 'gallery' && (
                  <button
                    onClick={() => setActivePhotoIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-6 w-12 h-12 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 flex items-center justify-center transition-all duration-300 z-10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Main Active Media */}
                <div className="relative w-full h-[80vh] flex items-center justify-center">
                  {activeTab === 'gallery' && (
                    <>
                      <motion.img
                        key={activePhotoIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        src={images[activePhotoIndex]}
                        alt={`${room.title} - Fullscreen View`}
                        className="w-full max-w-7xl h-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                      />

                      {/* Photo Index Indicator */}
                      <div className="absolute top-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white">
                        {activePhotoIndex + 1} / {images.length}
                      </div>
                    </>
                  )}

                  {activeTab === 'video' && (
                    <div className="flex flex-col items-center justify-center text-center p-8 bg-white/5 border border-white/10 rounded-2xl max-w-md shadow-ambient backdrop-blur-md">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#ba0036]">
                        <Clock className="w-6 h-6 animate-pulse text-white" />
                      </div>
                      <h3 className="font-headline text-lg font-bold text-white mb-2">Cinematic Video Tour</h3>
                      <p className="text-xs text-white/60 leading-relaxed">
                        Upcoming Feature: We are currently curating and producing a high-fidelity video walk-through for this suite. It will be available shortly.
                      </p>
                    </div>
                  )}

                  {activeTab === 'floor' && (
                    <div className="flex flex-col items-center justify-center text-center p-8 bg-white/5 border border-white/10 rounded-2xl max-w-md shadow-ambient backdrop-blur-md">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#ba0036]">
                        <Compass className="w-6 h-6 animate-pulse text-white" />
                      </div>
                      <h3 className="font-headline text-lg font-bold text-white mb-2">Interactive Floor Plan</h3>
                      <p className="text-xs text-white/60 leading-relaxed">
                        Upcoming Feature: Detailed architectural blueprint layouts and spatial mappings are currently in review and will be uploaded soon.
                      </p>
                    </div>
                  )}
                </div>

                {/* Right navigation arrow */}
                {activeTab === 'gallery' && (
                  <button
                    onClick={() => setActivePhotoIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-6 w-12 h-12 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 flex items-center justify-center transition-all duration-300 z-10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Bottom Carousel Controls & Thumbnails */}
              <div className="bg-gradient-to-t from-black/90 to-transparent pt-6 pb-2 px-6 flex flex-col items-center w-full">
                {/* Horizontal Scroll Thumbnails */}
                {activeTab === 'gallery' && (
                  <div className="flex gap-2 overflow-x-auto hide-scrollbar max-w-full py-2 mb-4 scroll-smooth">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative w-20 h-14 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                          activePhotoIndex === idx
                            ? 'border-[#ba0036] scale-105 shadow-md shadow-[#ba0036]/30'
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
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeTab === 'gallery'
                        ? 'bg-[#ba0036] text-white'
                        : 'bg-white/10 text-white/75 hover:bg-white/20'
                    }`}
                  >
                    Gallery
                  </button>
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeTab === 'video'
                        ? 'bg-[#ba0036] text-white'
                        : 'bg-white/10 text-white/75 hover:bg-white/20'
                    }`}
                  >
                    Video Tour
                  </button>
                  <button
                    onClick={() => setActiveTab('floor')}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeTab === 'floor'
                        ? 'bg-[#ba0036] text-white'
                        : 'bg-white/10 text-white/75 hover:bg-white/20'
                    }`}
                  >
                    Floor Plan
                  </button>
                </div>

                {/* Footer Content */}
                <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 py-2 border-t border-white/10">
                  {/* Left Label */}
                  <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-white/60">
                    <span className="text-[#ba0036] font-extrabold text-[15px] leading-none">•</span>
                    <span>{activePhotoIndex === 0 ? 'Master Suite' : activePhotoIndex === 1 ? 'Living Space' : activePhotoIndex === 2 ? 'Terrace & View' : 'Guest Area'}</span>
                    <span className="opacity-30">|</span>
                    <span>{room.city}</span>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-4 text-white/80">
                    <button className="flex items-center gap-2 hover:text-[#ba0036] transition-colors p-2 text-xs font-bold uppercase tracking-wider">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                    <button className="flex items-center gap-2 hover:text-[#ba0036] transition-colors p-2 text-xs font-bold uppercase tracking-wider">
                      <Heart className="w-4 h-4" /> Favorite
                    </button>
                    <button className="flex items-center gap-2 hover:text-white transition-colors p-2 text-xs font-bold uppercase tracking-wider">
                      <Download className="w-4 h-4" /> Save
                    </button>
                    <button className="flex items-center justify-center hover:text-white transition-colors p-2">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Full Width Progress Line */}
              <div className="w-full h-1.5 bg-white/10 relative">
                <div
                  className="absolute left-0 top-0 h-full bg-[#ba0036] transition-all duration-300 ease-out"
                  style={{ width: `${((activePhotoIndex + 1) / images.length) * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════ CONTENT ══════ */}
        <section className="max-w-page mx-auto px-6 lg:px-10 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            {/* Left Column — Info */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8">
              {/* Badge + Rating */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="status-badge bg-surface-container-high text-[10px] text-[#1a1c1c]">
                  Premier Collection
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#1a1c1c] text-[#1a1c1c]" />
                  <span className="font-semibold text-sm">{room.rating.toFixed(2)}</span>
                  <span className="text-sm text-[#5c3f41]">({room.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title + Description */}
              <div>
                <h1 className="font-headline text-3xl md:text-4xl font-bold text-[#1a1c1c] mb-4">
                  {room.title}
                </h1>
                <p className="text-[#5c3f41] leading-relaxed text-[15px]">{room.description}</p>
              </div>

              {/* Host */}
              <div className="flex items-center gap-4 py-6 border-t border-b border-outline-variant/10">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-lg font-semibold text-[#1a1c1c]">
                  H
                </div>
                <div>
                  <p className="font-semibold text-[#1a1c1c]">Hosted by LuxeStay</p>
                  <p className="text-xs text-[#5c3f41] uppercase tracking-wider mt-0.5">
                    Master Concierge · {room.city}
                  </p>
                </div>
              </div>

              {/* Curated Amenities */}
              <div>
                <h2 className="font-headline text-xl font-bold text-[#1a1c1c] mb-5" style={{ fontStyle: 'italic' }}>
                  Curated Amenities
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {room.amenities.slice(0, 6).map((a) => {
                    const Icon = getAmenityIcon(a.amenity.name);
                    return (
                      <div key={a.id} className="flex items-center gap-3 py-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="text-sm text-[#1a1c1c]">{a.amenity.name}</span>
                      </div>
                    );
                  })}
                  {room.amenities.length === 0 && (
                    <>
                      <div className="flex items-center gap-3 py-2">
                        <Waves className="w-5 h-5 text-primary" />
                        <span className="text-sm text-[#1a1c1c]">Infinity Pool</span>
                      </div>
                      <div className="flex items-center gap-3 py-2">
                        <Flame className="w-5 h-5 text-primary" />
                        <span className="text-sm text-[#1a1c1c]">Spa</span>
                      </div>
                      <div className="flex items-center gap-3 py-2">
                        <Wifi className="w-5 h-5 text-primary" />
                        <span className="text-sm text-[#1a1c1c]">Private Terrace</span>
                      </div>
                      <div className="flex items-center gap-3 py-2">
                        <ChefHat className="w-5 h-5 text-primary" />
                        <span className="text-sm text-[#1a1c1c]">Chef Service</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ══════ 3D VIRTUAL TOUR SECTION ══════ */}
              <div id="3d-tour-section" className="pt-8 border-t border-outline-variant/10">
                <h2 className="font-headline text-xl font-bold text-[#1a1c1c] mb-4" style={{ fontStyle: 'italic' }}>
                  3D Space Walkthrough
                </h2>
                
                {is3dActive ? (
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-ambient bg-black">
                    <iframe
                      src={room.tour3dUrl || 'https://my.matterport.com/show/?m=JGPnGqyB6Ax'}
                      className="w-full h-full border-none"
                      allowFullScreen
                      allow="xr-spatial-tracking"
                    />
                    <button
                      onClick={() => setIs3dActive(false)}
                      className="absolute top-4 right-4 bg-white/95 text-[#1a1c1c] text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-white uppercase tracking-wider transition-colors z-20 flex items-center gap-1 shadow"
                    >
                      <X className="w-3.5 h-3.5" /> Close Tour
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => setIs3dActive(true)}
                    className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-ambient bg-[#1a1c1c] group cursor-pointer"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=450&fit=crop"
                      alt="3D Space Preview"
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 blur-[1px]"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                      <span className="w-14 h-14 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 mb-4">
                        <Star className="w-6 h-6 fill-current" />
                      </span>
                      <h3 className="text-white font-headline text-lg font-bold mb-1">Immersive Spatial Walkthrough</h3>
                      <p className="text-white/80 text-xs max-w-md leading-relaxed mb-6">
                        Explore every corner of the property virtually before your arrival. Rotate 360° and move between rooms.
                      </p>
                      <button className="btn-primary-gradient text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300">
                        Launch 3D Tour
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Guest Reviews */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-headline text-xl font-bold text-[#1a1c1c]" style={{ fontStyle: 'italic' }}>
                    Guest Impressions
                  </h2>
                  <Link to={`/room/${room.id}/review`} className="text-primary text-sm font-semibold hover:underline">
                    View All Reviews
                  </Link>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-semibold">JV</div>
                    <div>
                      <p className="font-semibold text-sm text-[#1a1c1c]">Julian V.</p>
                      <p className="text-xs text-[#5c3f41] uppercase tracking-wider">London · April 2024</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#5c3f41] leading-relaxed italic">
                    "An absolute masterpiece. Waking up to the view of the city from our private terrace felt like living inside a painting. The concierge service was impeccable."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column — Booking Sidebar */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <div className="sticky top-24 bg-surface-container-lowest rounded-xl shadow-ambient p-6 space-y-5">
                {/* Price + Rating */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold text-[#1a1c1c]">{formatCurrency(room.pricePerNight, 'EUR')}</span>
                    <span className="text-sm text-[#5c3f41] ml-1">/ night</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#1a1c1c] text-[#1a1c1c]" />
                    <span className="text-sm font-semibold">{room.rating.toFixed(2)}</span>
                  </div>
                </div>

                {/* Date/Guest Inputs */}
                <div className="border border-outline-variant/20 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-2 divide-x divide-outline-variant/20">
                    <div className="p-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1c1c]">Check-in</p>
                      <input
                        type="date"
                        value={checkIn || ''}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="text-sm text-[#1a1c1c] outline-none bg-transparent w-full mt-0.5"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1c1c]">Check-out</p>
                      <input
                        type="date"
                        value={checkOut || ''}
                        min={checkIn || new Date().toISOString().split('T')[0]}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="text-sm text-[#1a1c1c] outline-none bg-transparent w-full mt-0.5"
                      />
                    </div>
                  </div>
                  <div className="border-t border-outline-variant/20 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1c1c]">Guests</p>
                    <select
                      value={guests || 2}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="text-sm text-[#1a1c1c] outline-none bg-transparent w-full mt-0.5"
                    >
                      {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {checkIn && checkOut ? (
                  <>
                    {/* Reserve Button */}
                    <button
                      onClick={() => navigate(`/checkout/${room.id}`)}
                      className="w-full btn-primary-gradient py-4 rounded-xl text-white font-bold uppercase tracking-wider btn-hover"
                    >
                      Reserve Suite
                    </button>

                    <p className="text-center text-xs text-[#5c3f41]">You won't be charged yet</p>

                    {/* Price Breakdown */}
                    <div className="space-y-3 pt-4 border-t border-outline-variant/10">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#5c3f41]">{formatCurrency(room.pricePerNight, 'EUR')} × {nights} nights</span>
                        <span className="text-[#1a1c1c]">{formatCurrency(subtotal, 'EUR')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#5c3f41]">Cleaning fee</span>
                        <span className="text-[#1a1c1c]">{formatCurrency(cleaningFee, 'EUR')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#5c3f41]">Editorial service fee</span>
                        <span className="text-[#1a1c1c]">{formatCurrency(serviceFee, 'EUR')}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-outline-variant/10">
                        <span className="font-bold text-[#1a1c1c]">Total</span>
                        <span className="text-xl font-bold text-[#1a1c1c]">{formatCurrency(total, 'EUR')}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-[#ba0036]/5 border border-[#ba0036]/10 rounded-xl p-4 text-center">
                    <p className="text-xs text-[#5c3f41] font-semibold leading-relaxed">
                      Select check-in and check-out dates above to check pricing and availability.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}