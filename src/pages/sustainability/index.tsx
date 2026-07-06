import React from 'react';
import { ArrowLeft, Leaf, Globe, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function Sustainability() {
  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body'>
      <Navbar />

      <main className='pt-[72px] flex-grow'>
        {/* Sustainability Hero */}
        <section className='relative py-20 px-6 lg:px-16 overflow-hidden bg-surface-container-low border-b border-outline-variant/15'>
          <div className='max-w-7xl mx-auto w-full grid md:grid-cols-2 items-center gap-16 relative z-10'>
            <div className='space-y-8'>
              <Link
                to='/'
                className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline mb-4'
              >
                <ArrowLeft className='w-3.5 h-3.5' /> Back to Home
              </Link>
              <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest border border-primary/10'>
                <Leaf className='w-3 h-3' /> Conscious Curation
              </div>
              <h1 className='font-display text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-on-surface'>
                Conscious <br />
                Hospitality
              </h1>
              <p className='text-xl text-on-surface-variant max-w-lg font-light leading-relaxed'>
                Luxury is no longer defined by excess, but by the intention
                behind every detail. Explore our commitment to a future of
                travel that gives back.
              </p>
            </div>
            <div className='relative h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/10'>
              <img
                className='w-full h-full object-cover'
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuCkT0QC6eeF8UF1YgzOZ3rFWzXxUX3ccSdWSoAG7dj3maGHSQUnq0NR40P2lpKufaODsy6i3SWLeAxzguGCaXgeua85JccU7PhiwHGPqJjYjJ65BlAzN-_1xaJI8yW-Elgdr8s2AMzKdUgHYzI5NjwMACM83LQ0uCXn65fWhwmn6W59klG5dPAA2jJnI8hS3KmhPupn_6WZTSnDPmn0Vl5Wpnd9hqMww6jutd9yHeidj2joMf_MeIk5DB2c2YstxjwkimCIZuza0hDh'
                alt='Eco luxury villa'
              />
            </div>
          </div>
        </section>

        {/* Statement Section */}
        <section className='py-24 px-6 text-center max-w-4xl mx-auto space-y-8'>
          <h2 className='font-display text-3xl md:text-5xl font-semibold tracking-tight text-on-surface'>
            “Sustainability is the ultimate luxury.”
          </h2>
          <div className='w-20 h-0.5 bg-primary mx-auto opacity-30'></div>
          <p className='text-lg text-on-surface-variant leading-relaxed'>
            At LuxeStay, we believe the preservation of our world’s most
            beautiful destinations is our highest calling. Our Conscious
            Hospitality framework ensures that every stay contributes to
            environmental restoration and cultural preservation, without ever
            compromising the refined experience our guests expect.
          </p>
        </section>

        {/* Pillars of Commitment */}
        <section className='py-20 px-6 bg-surface-container-low border-y border-outline-variant/15'>
          <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm'>
              <Globe className='w-8 h-8 text-primary mb-4' />
              <h4 className='font-headline font-bold text-lg mb-2'>
                Carbon-Neutral Stays
              </h4>
              <p className='text-on-surface-variant text-xs leading-relaxed'>
                From renewable energy sourcing to verified reforestation, we
                offset the carbon footprint of every guest journey, including
                flights.
              </p>
            </div>
            <div className='bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm'>
              <Leaf className='w-8 h-8 text-primary mb-4' />
              <h4 className='font-headline font-bold text-lg mb-2'>
                Ethical Sourcing
              </h4>
              <p className='text-on-surface-variant text-xs leading-relaxed'>
                Our supply chain is ly transparent. From organic linens to
                plastic-free toiletries, we partner exclusively with B-Corp
                certified vendors.
              </p>
            </div>
            <div className='bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm'>
              <Award className='w-8 h-8 text-primary mb-4' />
              <h4 className='font-headline font-bold text-lg mb-2'>
                Supporting Local
              </h4>
              <p className='text-on-surface-variant text-xs leading-relaxed'>
                We curate bespoke interiors using regional craft makers,
                ensuring tourism revenue directly empowers local creators.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className='py-20 px-6 max-w-5xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            <div className='space-y-2'>
              <span className='block font-display text-5xl font-black text-primary'>
                98%
              </span>
              <span className='text-[10px] font-bold uppercase tracking-widest text-[#cfc9bc]'>
                Plastic Free Listings
              </span>
            </div>
            <div className='space-y-2 border-y md:border-y-0 md:border-x border-outline-variant/20 py-8 md:py-0'>
              <span className='block font-display text-5xl font-black text-primary'>
                1.2M
              </span>
              <span className='text-[10px] font-bold uppercase tracking-widest text-[#cfc9bc]'>
                Trees Planted Worldwide
              </span>
            </div>
            <div className='space-y-2'>
              <span className='block font-display text-5xl font-black text-primary'>
                100%
              </span>
              <span className='text-[10px] font-bold uppercase tracking-widest text-[#cfc9bc]'>
                Renewable Electricity
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
