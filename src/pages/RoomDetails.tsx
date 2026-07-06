import React, { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Droplets, Flame, Wifi, Tv, ChefHat, Waves, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { useRoom } from '../hooks/useRooms';
import { useBookingStore } from '../store/bookingStore';
import { fadeIn } from '../lib/animations';
import { RoomGallery } from '../components/property/RoomGallery';
import { RoomCarouselModal } from '../components/property/RoomCarouselModal';
import { RoomBookingSidebar } from '../components/property/RoomBookingSidebar';
import { RoomStoryDetails } from '../components/property/RoomStoryDetails';

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
  const { room, isLoading, error } = useRoom(id || '');
  const { checkIn, checkOut, guests, setCheckIn, setCheckOut, setGuests } = useBookingStore();
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [is3dActive, setIs3dActive] = useState(false);
  const [searchParams] = useSearchParams();
  const fromAi = searchParams.get('from_ai') === 'true';

  const images = room && room.images && room.images.length > 0 ? room.images : [
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590490360182-c33d955f8ee1?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  ];

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
        <p className="text-error text-lg font-headline font-bold">Suite not found</p>
        <Link to="/search" className="btn-primary-gradient px-6 py-3 rounded-full flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </Link>
      </div>
    );
  }

  // Curated Amenities Block
  const amenitiesList = (
    <div>
      <h2 className="font-headline text-xl font-bold text-on-surface mb-5 italic">
        Curated Amenities
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {room.amenities.slice(0, 6).map((a) => {
          const Icon = getAmenityIcon(a.amenity.name);
          return (
            <div key={a.id} className="flex items-center gap-3 py-2 font-body">
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-sm text-on-surface">{a.amenity.name}</span>
            </div>
          );
        })}
        {room.amenities.length === 0 && (
          <>
            <div className="flex items-center gap-3 py-2 font-body">
              <Waves className="w-5 h-5 text-primary" />
              <span className="text-sm text-on-surface">Infinity Pool</span>
            </div>
            <div className="flex items-center gap-3 py-2 font-body">
              <Flame className="w-5 h-5 text-primary" />
              <span className="text-sm text-on-surface">Spa</span>
            </div>
            <div className="flex items-center gap-3 py-2 font-body">
              <Wifi className="w-5 h-5 text-primary" />
              <span className="text-sm text-on-surface">Private Terrace</span>
            </div>
            <div className="flex items-center gap-3 py-2 font-body">
              <ChefHat className="w-5 h-5 text-primary" />
              <span className="text-sm text-on-surface">Chef Service</span>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Reviews Block
  const reviewsList = (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-headline text-xl font-bold text-on-surface italic">
          Guest Impressions
        </h2>
        <Link to={`/room/${room.id}/review`} className="text-primary text-sm font-headline font-semibold hover:underline">
          View All Reviews
        </Link>
      </div>
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient border border-outline-variant/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-headline font-bold">JV</div>
          <div>
            <p className="font-headline font-bold text-sm text-on-surface">Julian V.</p>
            <p className="text-xs text-on-surface-variant uppercase tracking-wider font-body">London · April 2024</p>
          </div>
        </div>
        <p className="text-sm text-on-surface-variant leading-relaxed italic font-body">
          "An absolute masterpiece. Waking up to the view of the city from our private terrace felt like living inside a painting. The concierge service was impeccable."
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-[72px]">
        {/* ══════ PHOTO GALLERY ══════ */}
        <RoomGallery
          title={room.title}
          images={images}
          onOpenCarousel={(index) => {
            setActivePhotoIndex(index);
            setIsCarouselOpen(true);
          }}
        />

        {/* ══════ CAROUSEL OVERLAY MODAL ══════ */}
        <AnimatePresence>
          {isCarouselOpen && (
            <RoomCarouselModal
              isOpen={isCarouselOpen}
              onClose={() => setIsCarouselOpen(false)}
              title={room.title}
              city={room.city}
              images={images}
              activeIndex={activePhotoIndex}
              setActiveIndex={setActivePhotoIndex}
              onActivate3dTour={() => setIs3dActive(true)}
            />
          )}
        </AnimatePresence>

        {/* ══════ CONTENT SECTION ══════ */}
        <section className="max-w-page mx-auto px-6 lg:px-10 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            {/* Left Column — Immersive Narrative Story details */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <RoomStoryDetails
                room={room}
                is3dActive={is3dActive}
                setIs3dActive={setIs3dActive}
                amenitiesList={amenitiesList}
                reviewsList={reviewsList}
                fromAi={fromAi}
              />
            </motion.div>

            {/* Right Column — Booking Sidebar */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <RoomBookingSidebar
                roomId={room.id}
                pricePerNight={room.pricePerNight}
                rating={room.rating}
                maxGuests={room.maxGuests}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
                setCheckIn={setCheckIn}
                setCheckOut={setCheckOut}
                setGuests={setGuests}
              />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}