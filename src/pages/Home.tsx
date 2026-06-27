import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, Heart, Home as HomeIcon, Trees, Waves, Castle, Droplets, Shield, Sparkles, Box, Headphones, Mail, ChevronDown, Bell, Eye } from 'lucide-react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { PropertyCard } from '../components/search/PropertyCard';
import { useFeaturedRooms } from '../hooks/useRooms';
import { fadeIn, staggerContainer, transitionDefault } from '../lib/animations';

const categories = [
  { id: 'all', label: 'All', icon: HomeIcon },
  { id: 'cabins', label: 'Cabins', icon: Trees },
  { id: 'beachfront', label: 'Beachfront', icon: Waves },
  { id: 'mansions', label: 'Mansions', icon: Castle },
  { id: 'pools', label: 'Amazing Pools', icon: Droplets },
];

const destinations = [
  {
    name: 'Paris',
    subtitle: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop',
  },
  {
    name: 'Bali',
    subtitle: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=800&fit=crop',
  },
  {
    name: 'Maldives',
    subtitle: 'South Asia',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=800&fit=crop',
  },
  {
    name: 'Tuscany',
    subtitle: 'Italy',
    image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=600&h=800&fit=crop',
  },
];

export function Home() {
  const { rooms: featuredRooms, isLoading } = useFeaturedRooms();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchLocation, setSearchLocation] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-[72px]">
        {/* ══════ HERO SECTION ══════ */}
        <section className="relative mx-4 lg:mx-8 mt-2 rounded-2xl overflow-hidden">
          <div className="relative h-[480px] lg:h-[520px]">
            <img
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&h=900&fit=crop"
              alt="Luxury villa with infinity pool"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transitionDefault}
                className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 italic"
                style={{ fontStyle: 'italic' }}
              >
                Find Your Perfect Luxury Stay
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transitionDefault, delay: 0.1 }}
                className="text-white/80 text-base md:text-lg max-w-xl mb-8"
              >
                Discover exclusive villas, mansions, and beachfront retreats worldwide.
              </motion.p>

              {/* Floating Search Pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transitionDefault, delay: 0.2 }}
                className="w-full max-w-2xl"
              >
                <div className="bg-white rounded-full p-1.5 flex items-center shadow-ambient-lg">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-x divide-surface-container">
                    <div className="px-5 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1c1c]">Location</p>
                      <input
                        type="text"
                        placeholder="Where are you going?"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="text-sm text-[#5c3f41] placeholder:text-[#5c3f41]/50 outline-none w-full bg-transparent mt-0.5"
                      />
                    </div>
                    <div className="px-5 py-3 hidden md:block">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1c1c]">Dates</p>
                      <p className="text-sm text-[#5c3f41]/50 mt-0.5">Add dates</p>
                    </div>
                    <div className="px-5 py-3 hidden md:block">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1c1c]">Guests</p>
                      <p className="text-sm text-[#5c3f41]/50 mt-0.5">Add guests</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/search${searchLocation ? `?location=${searchLocation}` : ''}`)}
                    className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary-container transition-colors flex-shrink-0 btn-hover"
                  >
                    <Search className="w-5 h-5 text-white" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════ CATEGORY TABS ══════ */}
        <section className="max-w-page mx-auto px-6 lg:px-10 pt-10 pb-4">
          <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center gap-1.5 pb-2 border-b-2 transition-colors flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-[#5c3f41] hover:text-[#1a1c1c] hover:border-surface-container-high'
                }`}
              >
                <cat.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ══════ POPULAR DESTINATIONS ══════ */}
        <section className="max-w-page mx-auto px-6 lg:px-10 py-12">
          <h2 className="font-headline text-2xl font-bold text-[#1a1c1c] mb-2">Popular Destinations</h2>
          <p className="text-sm text-[#5c3f41] mb-8">
            Explore the most sought-after locations for your next escape.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                to={`/search?location=${dest.name}`}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden img-hover-zoom"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-headline text-xl font-bold text-white">{dest.name}</h3>
                  <p className="text-white/70 text-sm">{dest.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ══════ TRENDING STAYS ══════ */}
        <section className="max-w-page mx-auto px-6 lg:px-10 py-12">
          <h2 className="font-headline text-2xl font-bold text-[#1a1c1c] mb-8">Trending Stays</h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-outline-variant/10 shadow-ambient animate-pulse flex flex-col h-[340px]">
                  <div className="w-full h-44 bg-slate-200"></div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                      <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                      <div className="h-5 bg-slate-200 rounded w-1/4"></div>
                      <div className="h-8 bg-slate-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredRooms.slice(0, 6).map((room) => (
                <motion.div key={room.id} variants={fadeIn}>
                  <PropertyCard room={room} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="flex justify-center mt-10">
            <Link
              to="/search"
              className="px-8 py-3 rounded-full border border-[#1a1c1c] text-sm font-semibold text-[#1a1c1c] hover:bg-[#1a1c1c] hover:text-white transition-all duration-300"
            >
              Show more stays
            </Link>
          </div>
        </section>

        {/* ══════ THE LUXESTAY DIFFERENCE ══════ */}
        <section className="bg-surface-container-low py-20 mb-20">
          <div className="max-w-page mx-auto px-6 lg:px-10">
            <div className="text-center mb-16">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4 block">
                The Distinction
              </span>
              <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface">
                The LuxeStay Difference
              </h2>
              <p className="text-on-surface-variant mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
                Elevating hospitality beyond the standard rental experience through curation and concierge excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-ambient flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="font-headline text-lg font-bold text-on-surface mb-3">Curated vs Crowdsourced</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
                  Every property in our collection is hand-picked and personally inspected. We prioritize quality over quantity, ensuring only the top 1% of luxury homes make the cut.
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-ambient flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Bell className="w-8 h-8" />
                </div>
                <h3 className="font-headline text-lg font-bold text-on-surface mb-3">Concierge-Led vs Self-Service</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
                  Skip the automated bots. Our dedicated local concierges handle everything from private chefs to custom itineraries, providing a truly high-touch human experience.
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-ambient flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Box className="w-8 h-8" />
                </div>
                <h3 className="font-headline text-lg font-bold text-on-surface mb-3">Immersive 3D vs Static Photos</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
                  No surprises on arrival. Every listing features immersive 3D walkthroughs and spatial photography, so you can feel the layout before you even book.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ BEYOND BOOKING ══════ */}
        <section className="max-w-page mx-auto px-6 lg:px-10 mb-20 overflow-hidden">
          <div className="bg-[#1a1c1c] rounded-[2rem] p-10 md:p-16 text-white relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="text-center mb-16">
                <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
                  The Digital Concierge
                </span>
                <h2 className="font-headline text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
                  Beyond Just Booking.
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed">
                  Experience the future of hospitality where cutting-edge technology meets high-touch human curation.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Large Feature: AI Virtual Tours */}
                <div className="lg:col-span-8 group cursor-pointer">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <img 
                      alt="AI Virtual Tour Room" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70" 
                      src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1c] via-transparent to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-8 md:p-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="p-3 bg-primary/20 rounded-xl text-primary block">
                          <Eye className="w-8 h-8" />
                        </span>
                        <h3 className="font-headline text-2xl font-bold text-white">AI-Driven Virtual Tours</h3>
                      </div>
                      <p className="text-white/80 text-sm md:text-base max-w-xl leading-relaxed">
                        Step inside before you arrive. Our high-fidelity digital twins allow for complete spatial immersion in every property.
                      </p>
                    </div>
                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white">
                      Live Preview Available
                    </div>
                  </div>
                </div>

                {/* Side Grid for other features */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  {/* Feature 2 */}
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-primary/25 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                      <Headphones className="w-6 h-6" />
                    </div>
                    <h4 className="font-headline text-lg font-bold text-white mb-2">24/7 Digital Concierge</h4>
                    <p className="text-white/60 text-xs leading-relaxed">
                      Instant assistance for everything from dinner reservations to private jet transfers, accessible directly through our app.
                    </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-primary/25 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h4 className="font-headline text-lg font-bold text-white mb-2">Private Member Events</h4>
                    <p className="text-white/60 text-xs leading-relaxed">
                      Exclusive access to yacht parties, art gallery previews, and secret supper clubs in your destination city.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ COMMON INQUIRIES (FAQs) ══════ */}
        <section className="max-w-[800px] mx-auto px-6 lg:px-10 mb-20">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-extrabold text-on-surface">Common Inquiries</h2>
            <p className="text-on-surface-variant mt-3 text-sm">Everything you need to know about the LuxeStay experience.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How do you select your properties?",
                a: "Our 'LuxeSelect' process involves a 150-point inspection covering architectural integrity, interior design quality, and host reliability. We only approve properties that offer a distinct sense of place and superior luxury."
              },
              {
                q: "What is the Celestial Concierge?",
                a: "The Celestial Concierge is our proprietary hybrid AI and human service. It uses data to predict your needs while ensuring a local human expert oversees every physical arrangement for absolute perfection."
              },
              {
                q: "Can I book private experiences only?",
                a: "While our experiences are primarily designed for our staying guests, members of the 'Inner Circle' can access our curated experience catalog independently."
              }
            ].map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="border border-outline-variant/30 rounded-xl overflow-hidden transition-all duration-300 bg-white shadow-ambient">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-surface-container-low transition-colors text-left focus:outline-none"
                  >
                    <span className="font-headline font-bold text-[#1a1c1c] text-base md:text-lg">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-40 border-t border-outline-variant/10' : 'max-h-0'
                    }`}
                  >
                    <p className="px-6 py-4 text-on-surface-variant text-sm leading-relaxed bg-surface-container-lowest">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════ JOIN THE INNER CIRCLE (CTA) ══════ */}
        <section className="max-w-page mx-auto px-6 lg:px-10 mb-24">
          <div className="btn-primary-gradient relative overflow-hidden rounded-[2rem] py-16 px-8 md:px-16 text-center text-white shadow-xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
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