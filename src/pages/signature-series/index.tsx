import React from 'react';
import { ArrowLeft, Sparkles, Compass, Hexagon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function SignatureSeries() {
  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body'>
      <Navbar />

      <main className='pt-[72px] flex-grow'>
        {/* Editorial Hero */}
        <section className='relative py-24 px-6 lg:px-16 overflow-hidden bg-surface-container-low border-b border-outline-variant/15'>
          <div className='max-w-4xl mx-auto text-center space-y-6 relative z-10'>
            <Link
              to='/'
              className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline mb-4'
            >
              <ArrowLeft className='w-3.5 h-3.5' /> Back to Home
            </Link>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest border border-primary/10'>
              <Sparkles className='w-3 h-3' /> Signature Showcase
            </div>
            <h1 className='font-display font-extrabold text-4xl md:text-7xl text-on-surface leading-tight tracking-tight'>
              The Signature <br />
              <span className='italic text-primary'>Design Series</span>
            </h1>
            <p className='text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed'>
              Our flagship architectural stay products. We contrast charred timber hulls with soft rose quartz marble interiors to craft the ultimate sensory balance.
            </p>
          </div>
          {/* Subtle Ambient light */}
          <div className='absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none' />
        </section>

        {/* The Showcase List - Editorial Grid */}
        <section className='py-24 px-6 max-w-6xl mx-auto space-y-24'>
          {/* Item 1: Obsidian Cabin */}
          <div className='flex flex-col lg:flex-row items-center gap-12'>
            <div className='w-full lg:w-1/2 rounded-2xl overflow-hidden aspect-[4/3] shadow-xl border border-outline-variant/10'>
              <img
                className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
                src='https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
                alt='Obsidian Cabin'
              />
            </div>
            <div className='w-full lg:w-1/2 space-y-6'>
              <div className='flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest'>
                <Hexagon className='w-4 h-4 text-primary fill-current' /> Oregon, USA
              </div>
              <h3 className='font-display text-3xl md:text-4xl font-extrabold text-on-surface'>
                Obsidian Cabin
              </h3>
              <p className='text-on-surface-variant text-sm leading-relaxed'>
                Built from Shou Sugi Ban charred cedar wood, this structure sinks into the dense pine forest. Floor-to-ceiling glass panel walls make the towering pines part of the bedroom interior, contrasting with the soft, minimal layout inside.
              </p>
              <div className='pt-2'>
                <Link to="/search?location=Oregon" className='inline-flex items-center gap-2 px-6 py-3 bg-on-surface text-surface rounded-xl font-bold text-xs hover:bg-primary hover:text-white transition-colors uppercase tracking-wider'>
                  Explore Stays <Compass className='w-4 h-4' />
                </Link>
              </div>
            </div>
          </div>

          {/* Item 2: Rose Quartz Penthouse (Reversed) */}
          <div className='flex flex-col lg:flex-row-reverse items-center gap-12'>
            <div className='w-full lg:w-1/2 rounded-2xl overflow-hidden aspect-[4/3] shadow-xl border border-outline-variant/10'>
              <img
                className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
                src='https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'
                alt='Rose Quartz Penthouse'
              />
            </div>
            <div className='w-full lg:w-1/2 space-y-6'>
              <div className='flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest'>
                <Hexagon className='w-4 h-4 text-primary fill-current' /> New York City, USA
              </div>
              <h3 className='font-display text-3xl md:text-4xl font-extrabold text-on-surface'>
                Rose Quartz Penthouse
              </h3>
              <p className='text-on-surface-variant text-sm leading-relaxed'>
                Perched on Fifth Avenue, this suite utilizes premium rose pink onyx slabs and brushed brass details to frame cinematic skyline sunsets. Features floating glass panels, private terrace infinity tubs, and custom-designed velvet lounges.
              </p>
              <div className='pt-2'>
                <Link to="/search?location=Paris" className='inline-flex items-center gap-2 px-6 py-3 bg-on-surface text-surface rounded-xl font-bold text-xs hover:bg-primary hover:text-white transition-colors uppercase tracking-wider'>
                  Explore Stays <Compass className='w-4 h-4' />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
