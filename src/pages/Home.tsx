import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Trees, Waves, Castle, Droplets, Mail } from 'lucide-react';

import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';

import { useFeaturedRooms } from '../hooks/useRooms';

import { HeroSection } from '../components/sections/home/HeroSection';
import { CategoryTabs } from '../components/sections/home/CategoryTabs';
import { DestinationGrid } from '../components/sections/home/DestinationGrid';
import { TrendingSection } from '../components/sections/home/TrendingSection';
import { DifferenceGrid } from '../components/sections/home/DifferenceGrid';
import { EditorialGrid } from '../components/sections/home/EditorialGrid';
import { FAQSection } from '../components/sections/home/FAQSection';

const categories = [
  {
    id: 'all',
    label: 'All Stays',
    icon: HomeIcon,
  },
  {
    id: 'cabins',
    label: 'Cabins',
    icon: Trees,
  },
  {
    id: 'beachfront',
    label: 'Beachfront',
    icon: Waves,
  },
  {
    id: 'mansions',
    label: 'Mansions',
    icon: Castle,
  },
  {
    id: 'pools',
    label: 'Amazing Pools',
    icon: Droplets,
  },
];

const destinations = [
  {
    name: 'Paris',
    subtitle: 'France',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop',
    bestFor: 'Architecture',
    collection: 'Spring Collection',
  },
  {
    name: 'Bali',
    subtitle: 'Indonesia',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=800&fit=crop',
    bestFor: 'Seclusion',
    collection: 'Sanctuary Series',
  },
  {
    name: 'Maldives',
    subtitle: 'South Asia',
    image:
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=800&fit=crop',
    bestFor: 'Coastal Views',
    collection: 'Signature Series',
  },
  {
    name: 'Tuscany',
    subtitle: 'Italy',
    image:
      'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=600&h=800&fit=crop',
    bestFor: 'Historic Estates',
    collection: 'Autumn Collection',
  },
];

export function Home() {
  const navigate = useNavigate();

  const { rooms, isLoading } = useFeaturedRooms();

  const [activeCategory, setActiveCategory] = useState('all');

  const handleSelectCategory = (id: string) => {
    setActiveCategory(id);
    setTimeout(() => {
      const el = document.getElementById('trending-stays');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAISearch = (prompt: string) => {
    navigate(`/search?ai_prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className='min-h-screen bg-surface flex flex-col'>
      <Navbar />

      <main className='flex-1 pt-[72px]'>
        {/* Hero */}
        <HeroSection onSearch={handleAISearch} />

        {/* Explore Categories */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Curated Destinations */}
        <DestinationGrid destinations={destinations} />

        {/* Featured Residences */}
        <TrendingSection
          rooms={rooms}
          isLoading={isLoading}
          category={activeCategory}
        />

        {/* Why LuxeStay */}
        <DifferenceGrid />

        {/* Beyond Booking */}
        <EditorialGrid />

        {/* Common Questions */}
        <FAQSection />

        {/* Members Club */}
        <section className="max-w-page mx-auto px-6 lg:px-10 mb-24">
          <div className="btn-primary-gradient relative overflow-hidden rounded-[2rem] py-16 px-8 md:px-16 text-center text-white shadow-xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-extrabold mb-4">Join the Inner Circle</h2>
              <p className="text-white/90 text-sm md:text-base mb-8">
                Get early access to new property launches, exclusive member pricing, and private event invitations.
              </p>
              
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="relative w-full sm:w-80">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                  <input 
                    className="w-full pl-11 pr-4 py-3.5 rounded-full border-none text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-white/50 text-sm" 
                    placeholder="Enter your email" 
                    type="email"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-on-surface text-white hover:bg-black rounded-full font-bold text-sm tracking-wide transition-all shadow-lg active:scale-95"
                >
                  Request Access
                </button>
              </form>
              <p className="mt-4 text-[10px] text-white/50">By joining, you agree to our Terms and Privacy Policy.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
