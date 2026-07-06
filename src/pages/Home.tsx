import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Trees, Waves, Castle, Droplets } from 'lucide-react';

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
import { InnerCircleSection } from '../components/sections/home/InnerCircleSection';

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
          onSelectCategory={setActiveCategory}
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
        <InnerCircleSection />
      </main>

      <Footer />
    </div>
  );
}
