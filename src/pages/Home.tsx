import { useState, useEffect } from 'react';
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
  const [showWelcome, setShowWelcome] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('luxestay_welcome_viewed');
    if (!hasVisited) {
      setShowWelcome(true);
      // Auto-advance after 7 seconds
      const timer = setTimeout(() => {
        handleEnter();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowWelcome(false);
      localStorage.setItem('luxestay_welcome_viewed', 'true');
    }, 1000); // 1s fade-out duration
  };

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
    <div className='min-h-screen bg-surface flex flex-col relative'>
      {showWelcome && (
        <div 
          className={`fixed inset-0 z-[9999] flex flex-col justify-between items-center p-8 bg-[#0a0a0c] transition-opacity duration-1000 ${
            isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <style>{`
            @keyframes kenburns {
              0% { transform: scale(1.05); }
              50% { transform: scale(1.12) translate(0.5%, -0.5%); }
              100% { transform: scale(1.05); }
            }
            @keyframes fadeInSpread {
              0% { opacity: 0; letter-spacing: 0.2em; filter: blur(10px); }
              40% { opacity: 0.3; }
              100% { opacity: 1; letter-spacing: 0.5em; filter: blur(0); }
            }
            @keyframes fadeUp {
              0% { opacity: 0; transform: translateY(20px); filter: blur(4px); }
              100% { opacity: 1; transform: translateY(0); filter: blur(0); }
            }
            @keyframes lineProgress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            .animate-kenburns {
              animation: kenburns 16s ease-in-out infinite;
            }
            .animate-spread {
              animation: fadeInSpread 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .animate-fadeup {
              animation: fadeUp 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}</style>

          {/* Cinematic Background Image */}
          <div className="absolute inset-0 overflow-hidden z-0 bg-[#0a0a0c]">
            <img 
              className="w-full h-full object-cover opacity-40 select-none pointer-events-none scale-105 animate-kenburns"
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070"
              alt="LuxeStay Cinematic Resort"
            />
            {/* Dark Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-[#0a0a0c]" />
          </div>

          {/* Top Bar */}
          <div className="w-full flex justify-between items-center relative z-10 max-w-7xl mx-auto">
            <span className="text-[10px] tracking-[0.3em] font-mono text-white/40 uppercase">
              Est. 2024
            </span>
            <button 
              onClick={handleEnter}
              className="text-[10px] tracking-[0.2em] font-mono text-white/50 hover:text-white transition-colors uppercase border border-white/10 hover:border-white/30 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm"
            >
              Skip Intro
            </button>
          </div>

          {/* Center Branding Content */}
          <div className="relative z-10 text-center space-y-8 max-w-3xl px-4 my-auto">
            <div className="space-y-4">
              <span className="text-[9px] tracking-[0.4em] font-bold text-primary/80 uppercase block animate-fadeup [animation-delay:0.3s]">
                The Architecture of Stays
              </span>
              <h1 className="font-display font-extrabold text-white text-4xl md:text-7xl uppercase select-none tracking-[0.5em] animate-spread">
                LuxeStay
              </h1>
              <p className="text-white/60 text-xs md:text-sm tracking-[0.25em] leading-relaxed font-light font-headline uppercase animate-fadeup [animation-delay:0.8s]">
                Architectural Icons • Ocean Sanctuaries • Curated Residences
              </p>
            </div>

            {/* Glowing CTA Button */}
            <div className="animate-fadeup [animation-delay:1.3s] opacity-0 flex justify-center [animation-fill-mode:forwards]">
              <button 
                onClick={handleEnter}
                className="group relative px-10 py-4 bg-white text-[#0a0a0c] hover:bg-[#0a0a0c] hover:text-white rounded-full font-headline font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 border border-white"
              >
                Enter the Collection
              </button>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full max-w-lg relative z-10 space-y-3">
            <div className="flex justify-between items-center text-[9px] tracking-[0.2em] font-mono text-white/30 uppercase">
              <span>Establishing secure connection...</span>
              <span>LXS v2.0</span>
            </div>
            <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/60 rounded-full"
                style={{
                  animation: 'lineProgress 7s linear forwards'
                }}
              />
            </div>
          </div>
        </div>
      )}

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
