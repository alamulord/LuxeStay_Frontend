import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  Users, 
  ArrowRight, 
  Compass, 
  Shield, 
  Play, 
  Camera, 
  Quote 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';
import { PremiumButton } from '../../components/ui/PremiumButton';

interface Experience {
  title: string;
  category: string;
  cost: string;
  duration: string;
  capacity: string;
  desc: string;
  image: string;
}

export function ImmersiveExperiences() {
  const [activeCategory, setActiveCategory] = useState<string>('All Discoveries');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);

  const categories = ['All Discoveries', 'Gastronomy', 'Wellness', 'Adventure', 'Art & Culture'];

  const experiences: Experience[] = [
    { 
      title: 'Tuscan Truffle Hunting', 
      category: 'Gastronomy', 
      cost: '$450', 
      duration: '4 Hours', 
      capacity: '4 Guests', 
      desc: 'Join a local expert and their seasoned lagotto romagnolo dogs through the private woods of San Miniato.', 
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Private Sunset Sail', 
      category: 'Adventure', 
      cost: '$1,200', 
      duration: '3 Hours', 
      capacity: 'VIP Access', 
      desc: 'Navigate the coastline on a bespoke 50ft yacht with vintage Bollinger champagne and personal elite crew.', 
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Midnight Gallery Tour', 
      category: 'Art & Culture', 
      cost: '$600', 
      duration: '2 Hours', 
      capacity: 'Curated Group', 
      desc: 'A private, after-hours viewing of the city’s most exclusive contemporary art space led by the principal curator.', 
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Blue Horizon Caldera', 
      category: 'Wellness', 
      cost: '$1,800', 
      duration: '6 Hours', 
      capacity: '2 Guests', 
      desc: 'A private cliffside dinner overlooking the Santorini sunset, accompanied by live acoustic violin and a personal sommelier.', 
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80' 
    }
  ];

  const guestStories = [
    {
      name: 'Elena Moretti',
      location: 'Milan, Italy',
      quote: 'The private vineyard dinner was like stepping into a movie. LuxeStay found a spot we would never have discovered on our own. Pure magic.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
    },
    {
      name: 'James Lowery',
      location: 'London, UK',
      quote: 'The sailing excursion wasn’t just a boat ride; it was a masterclass in hospitality. The crew knew exactly when to provide service and when to leave us in peace.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
    },
    {
      name: 'Sarah Williams',
      location: 'NYC, USA',
      quote: 'LuxeStay’s attention to our children’s curiosity during the museum tour made it their favorite part of the trip. Incredible pedagogical luxury.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80'
    }
  ];

  const filteredExperiences = activeCategory === 'All Discoveries' 
    ? experiences 
    : experiences.filter(exp => exp.category === activeCategory);

  const handleReserve = (title: string) => {
    setSelectedExperience(title);
    setShowBookingSuccess(true);
    setTimeout(() => setShowBookingSuccess(false), 4000);
  };

  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body select-none'>
      <Navbar />

      <main className='pt-[72px] flex-grow'>
        {/* ── HERO SECTION ── */}
        <section className='relative h-[80vh] flex items-center overflow-hidden px-6 lg:px-16'>
          <div className='absolute inset-0 z-0'>
            <motion.img
              initial={{ scale: 1.08, opacity: 0.95 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: 15, ease: 'easeOut' }}
              alt='Terrace dinner'
              className='w-full h-full object-cover'
              src='https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop&q=80'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent' />
          </div>
          <div className='relative z-10 max-w-4xl space-y-6 text-white'>
            <span className='inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest border border-white/20 backdrop-blur-sm'>
              The Editorial Collection
            </span>
            <h1 className='font-headline text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] text-white'>
              Bespoke <br />Narratives
            </h1>
            <p className='text-lg md:text-xl text-white/80 max-w-lg leading-relaxed font-light'>
              Luxury is more than a destination. It’s the collection of unscripted moments that define your journey.
            </p>
            <div className='pt-4'>
              <button 
                onClick={() => setShowVideoModal(true)}
                className='group flex items-center space-x-4 text-white font-semibold text-base hover:text-primary transition-colors'
              >
                <span className='w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-xl bg-black/20 backdrop-blur-sm'>
                  <Play className='w-5 h-5 fill-current ml-0.5' />
                </span>
                <span className='tracking-wide uppercase text-xs font-headline font-bold'>Watch The Film</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── STICKY FILTER BAR ── */}
        <section className='bg-surface-container-lowest sticky top-[72px] z-40 border-b border-outline-variant/10 shadow-sm'>
          <div className='max-w-page mx-auto px-6 lg:px-10 py-5 flex items-center justify-between flex-wrap gap-4'>
            <div className='flex items-center space-x-2 overflow-x-auto no-scrollbar py-1'>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-ambient-sm'
                      : 'hover:bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className='flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-on-surface hover:text-primary transition-colors'>
              <span className='material-symbols-outlined text-base'>tune</span>
              <span>Refine Selection</span>
            </button>
          </div>
        </section>

        {/* ── EXPERIENCE LIST ── */}
        <section className='py-20 px-6 max-w-page mx-auto'>
          <div className='mb-12 text-left'>
            <span className='text-xs font-bold uppercase tracking-widest text-primary'>Curated Excursions</span>
            <h2 className='font-headline text-3xl md:text-4xl font-extrabold mt-2'>Discover the Exceptional</h2>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            <AnimatePresence mode='popLayout'>
              {filteredExperiences.map((exp, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  key={exp.title} 
                  className='group bg-surface-container-lowest border border-outline-variant/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-ambient transition-all duration-500 flex flex-col justify-between'
                >
                  <div className='aspect-[4/3] w-full overflow-hidden relative'>
                    <img 
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out' 
                      src={exp.image} 
                      alt={exp.title} 
                      loading='lazy'
                    />
                    <div className='absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[9px] font-bold uppercase tracking-wider text-on-surface shadow-sm'>
                      {exp.category}
                    </div>
                  </div>
                  <div className='p-6 flex-grow flex flex-col justify-between space-y-6'>
                    <div className='space-y-3'>
                      <div className='flex justify-between items-baseline'>
                        <h3 className='font-headline font-bold text-xl text-on-surface group-hover:text-primary transition-colors duration-300'>
                          {exp.title}
                        </h3>
                        <span className='text-primary font-black text-lg'>{exp.cost}</span>
                      </div>
                      <p className='text-on-surface-variant text-xs leading-relaxed font-body font-light'>
                        {exp.desc}
                      </p>
                      <div className='flex items-center space-x-6 pt-2 border-t border-outline-variant/10'>
                        <div className='flex items-center space-x-1.5 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider'>
                          <Clock className='w-3.5 h-3.5 text-primary' />
                          <span>{exp.duration}</span>
                        </div>
                        <div className='flex items-center space-x-1.5 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider'>
                          <Users className='w-3.5 h-3.5 text-primary' />
                          <span>{exp.capacity}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleReserve(exp.title)}
                      className='w-full py-3.5 bg-on-surface text-surface hover:bg-primary hover:text-white rounded-xl font-headline font-bold text-[10px] uppercase tracking-wider transition-all duration-300 shadow-sm'
                    >
                      Reserve Experience
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ── SPOTLIGHT FEATURE ── */}
        <section className='max-w-page mx-auto px-6 lg:px-10 py-24 overflow-hidden border-t border-outline-variant/10'>
          <div className='flex flex-col lg:flex-row items-center gap-16'>
            <div className='w-full lg:w-3/5 relative group'>
              <div className='aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:-translate-y-1.5'>
                <img 
                  alt='Santorini pool view' 
                  className='w-full h-full object-cover' 
                  src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80' 
                />
              </div>
              <div className='absolute -bottom-6 -left-6 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0' />
            </div>
            <div className='w-full lg:w-2/5 space-y-8'>
              <span className='text-primary font-bold tracking-[0.3em] uppercase text-[10px] block'>
                The Mediterranean Ethos
              </span>
              <h2 className='font-headline text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-on-surface'>
                The Blue Horizon Immersion
              </h2>
              <p className='text-on-surface-variant text-base font-light leading-relaxed font-body'>
                Experience the silent majesty of the Caldera. This isn’t just a stay; it’s a curated meditation on light, water, and timeless Cycladic architecture. Our hosts ensure total seclusion.
              </p>
              <button 
                onClick={() => handleReserve('The Blue Horizon Immersion')}
                className='px-8 py-4 bg-on-surface hover:bg-primary text-surface hover:text-white rounded-2xl font-headline font-bold text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center space-x-3 group shadow-md'
              >
                <span>Reserve This Experience</span>
                <ArrowRight className='w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300' />
              </button>
            </div>
          </div>
        </section>

        {/* ── CONCIERGE MOMENTS ── */}
        <section className='bg-surface-container-low py-24 border-t border-b border-outline-variant/10'>
          <div className='max-w-page mx-auto px-6 lg:px-10'>
            <div className='flex flex-col lg:flex-row-reverse items-center gap-16'>
              <div className='w-full lg:w-1/2'>
                <div className='relative'>
                  <img 
                    alt='Bespoke concierge' 
                    className='rounded-3xl shadow-xl w-full aspect-square object-cover' 
                    src='https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80' 
                  />
                  <div className='absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden lg:block max-w-[220px] transform rotate-3 border border-outline-variant/10 select-none'>
                    <Quote className='w-6 h-6 text-primary mb-2 opacity-30' />
                    <p className='text-primary font-headline font-bold italic text-base mb-1'>
                      "Beyond expectation."
                    </p>
                    <p className='text-[10px] text-on-surface-variant leading-relaxed font-body'>
                      Every detail, from dietary preferences to private access, is hand-sealed for your arrival.
                    </p>
                  </div>
                </div>
              </div>
              <div className='w-full lg:w-1/2 space-y-8'>
                <span className='text-secondary font-bold tracking-[0.3em] uppercase text-[10px] block'>
                  Human Touch
                </span>
                <h2 className='font-headline text-4xl md:text-5xl font-extrabold text-on-surface'>
                  Concierge Moments
                </h2>
                <p className='text-on-surface-variant text-base font-light leading-relaxed font-body'>
                  Our Concierge desk doesn’t just book tickets; they craft legacies. Whether it’s a surprise proposal in a hidden vineyard or a private flight to a remote island, your dedicated host handles the alchemy of the extraordinary.
                </p>
                <div className='flex flex-col space-y-4 pt-4 border-t border-outline-variant/10'>
                  <div className='flex items-start space-x-4'>
                    <Compass className='w-5 h-5 text-primary mt-1' />
                    <div>
                      <h4 className='font-headline font-bold text-on-surface text-sm'>Bespoke Curation</h4>
                      <p className='text-xs text-on-surface-variant font-body mt-0.5'>Tailored itineraries that reflect your unique narrative.</p>
                    </div>
                  </div>
                  <div className='flex items-start space-x-4'>
                    <Shield className='w-5 h-5 text-primary mt-1' />
                    <div>
                      <h4 className='font-headline font-bold text-on-surface text-sm'>Exclusive Access</h4>
                      <p className='text-xs text-on-surface-variant font-body mt-0.5'>Entry to private estates and closed collections.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VERIFIED GUEST STORIES ── */}
        <section className='py-24 px-6 bg-surface overflow-hidden'>
          <div className='max-w-page mx-auto'>
            <div className='mb-16'>
              <span className='text-primary font-bold tracking-[0.3em] uppercase text-[10px] block'>
                Guest Stories
              </span>
              <h2 className='font-headline text-4xl font-extrabold text-on-surface mt-2'>
                Verified Moments
              </h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
              {guestStories.map((story, index) => (
                <div key={index} className='space-y-6 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/5 shadow-sm hover:shadow-ambient-sm transition-all duration-300'>
                  <div className='aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-high relative group'>
                    <img 
                      alt={story.name} 
                      className='w-full h-full object-cover group-hover:scale-103 transition-transform duration-700' 
                      src={story.image} 
                    />
                    <div className='absolute bottom-3 left-3 flex items-center space-x-1.5 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/30'>
                      <Camera className='w-3 h-3 text-on-surface' />
                      <span className='text-[8px] text-on-surface font-bold tracking-widest uppercase'>
                        By {story.name.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                  <blockquote className='text-sm text-on-surface-variant font-body font-light leading-relaxed italic'>
                    "{story.quote}"
                  </blockquote>
                  <div className='flex items-center space-x-3 pt-3 border-t border-outline-variant/10'>
                    <div>
                      <p className='text-xs font-bold text-on-surface font-headline'>{story.name}</p>
                      <p className='text-[9px] uppercase tracking-wider text-on-surface-variant font-body'>{story.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className='py-28 bg-on-surface text-surface relative overflow-hidden select-none'>
          <div className='absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none'>
            <svg className='w-full h-full' viewBox='0 0 400 400'>
              <path d='M0,400 Q200,0 400,400' fill='none' stroke='white' strokeWidth='2'></path>
            </svg>
          </div>
          <div className='max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10'>
            <h2 className='font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-white'>
              Enrich Your Narrative
            </h2>
            <p className='text-base md:text-lg text-white/70 font-light leading-relaxed max-w-xl mx-auto font-body'>
              Your next great story begins with a single conversation. Connect with our editorial concierge team to begin curating your journey.
            </p>
            <div className='pt-6 flex flex-col sm:flex-row justify-center items-center gap-4'>
              <button 
                onClick={() => handleReserve('Bespoke Journey Curation')}
                className='w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-primary-container text-white font-headline font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-102 transition-all duration-300'
              >
                Book via Concierge
              </button>
              <button 
                onClick={() => handleReserve('Editorial Excursion Portfolio')}
                className='w-full sm:w-auto px-8 py-4 rounded-xl border border-white/25 hover:border-white/50 text-white font-headline font-bold text-xs uppercase tracking-wider hover:bg-white/5 transition-all duration-300'
              >
                Request Portfolio
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── VIDEO FILM MODAL ── */}
      {showVideoModal && (
        <div className='fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6'>
          <div className='relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10'>
            <button 
              onClick={() => setShowVideoModal(false)}
              className='absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition-colors'
            >
              ×
            </button>
            <iframe 
              className='w-full h-full' 
              src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1' 
              title='LuxeStay Film' 
              frameBorder='0' 
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' 
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ── BOOKING CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {showBookingSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className='fixed bottom-6 left-6 z-50 max-w-sm bg-surface-container-lowest border border-outline-variant/15 p-5 rounded-2xl shadow-2xl flex items-start gap-4'
          >
            <div className='w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0'>
              <Sparkles className='w-5 h-5' />
            </div>
            <div className='space-y-1.5'>
              <h4 className='font-headline font-bold text-xs uppercase tracking-wider text-on-surface'>
                Inquiry Transmitted
              </h4>
              <p className='text-xs text-on-surface-variant leading-relaxed font-light font-body'>
                Your reservation request for <strong>{selectedExperience}</strong> has been logged. Our elite concierge team will contact you within 15 minutes.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
