import React from 'react';
import { ArrowLeft, Briefcase, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function Careers() {
  const positions = [
    { title: 'Staff Software Engineer - AI Search', team: 'Engineering', location: 'Remote (US/EU)', type: 'Full-time' },
    { title: 'Senior Hospitality Curator', team: 'Design & Curation', location: 'London, UK', type: 'Full-time' },
    { title: 'Lead Digital Concierge Specialist', team: 'Operations', location: 'Paris, France', type: 'Full-time' },
    { title: 'Brand Partnerships Manager', team: 'Growth', location: 'New York, NY', type: 'Full-time' },
  ];

  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body'>
      <Navbar />

      <main className='pt-[72px] flex-grow'>
        {/* Careers Hero */}
        <section className='relative px-6 lg:px-16 pt-20 pb-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center'>
          <div className='lg:col-span-7 space-y-8'>
            <Link
              to='/'
              className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline mb-4'
            >
              <ArrowLeft className='w-3.5 h-3.5' /> Back to Home
            </Link>
            <span className='inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase border border-primary/10'>
              Join the Collective
            </span>
            <h1 className='font-display text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface leading-tight'>
              The Art of <br />
              <span className='text-primary italic'>Digital Hospitality.</span>
            </h1>
            <p className='text-xl text-on-surface-variant font-light max-w-xl leading-relaxed'>
              We aren't just building a booking platform. We are curating a world-class digital atelier where technology meets timeless service.
            </p>
            <div className='flex gap-4 pt-4'>
              <a href="#positions" className='bg-primary text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 shadow-md shadow-primary/15'>
                View Openings
              </a>
              <a href="#culture" className='bg-surface-container text-on-surface px-8 py-4 rounded-xl font-semibold hover:bg-surface-container-high transition-colors'>
                Our Culture
              </a>
            </div>
          </div>
          <div className='lg:col-span-5 relative'>
            <div className='aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/10'>
              <img
                className='w-full h-full object-cover'
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuAlGmJPmFwrt18884LMlcCQMTGBR_GddRdRoAzE0-A-IPqmEZvxglze9ZqoTPMV5PPUaWk8SguE7CIN25ByNDkeweAV3vfW6RG8L5E6eXUXQDgKe-K-39EnHslm480QLV-T7o3MvvPUhJz7XMKL8_TbiMmJ1RRERtCZNwS2_rYxQkNN_sV-aG6xXRO2_fQW0Dzy86SR1PRONsIY-igt9P6kjCcQndwdvwvk6x8eJq4vh_n-oRs6U5DDYHGf7ed4JIxbiQYiJ6QtpC7w'
                alt='LuxeStay office collaboration'
              />
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className='bg-surface-container-low py-32 px-6 border-y border-outline-variant/15' id='culture'>
          <div className='max-w-6xl mx-auto space-y-16'>
            <div className='text-center max-w-2xl mx-auto space-y-4'>
              <h2 className='font-display text-4xl font-bold tracking-tight'>Built by Digital Architects</h2>
              <p className='text-on-surface-variant leading-relaxed text-sm'>
                We combine the precision of high-end software engineering with the soul of a five-star concierge. We don't just ship code; we deliver memories.
              </p>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm'>
                <Star className='w-8 h-8 text-primary mb-4' />
                <h4 className='font-headline font-bold text-lg mb-2'>Precise Engineering</h4>
                <p className='text-on-surface-variant text-xs leading-relaxed'>
                  Our developers write code with the same meticulous craftsmanship as a designer framing an ocean-view window.
                </p>
              </div>
              <div className='bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm'>
                <Star className='w-8 h-8 text-primary mb-4' />
                <h4 className='font-headline font-bold text-lg mb-2'>Conscious Curation</h4>
                <p className='text-on-surface-variant text-xs leading-relaxed'>
                  We design digital interfaces that flow seamlessly and respect your time, avoiding dark patterns and spammy alerts.
                </p>
              </div>
              <div className='bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm'>
                <Star className='w-8 h-8 text-primary mb-4' />
                <h4 className='font-headline font-bold text-lg mb-2'>Radical Belonging</h4>
                <p className='text-on-surface-variant text-xs leading-relaxed'>
                  We hold our team and partners to strict standards of inclusivity, ensuring every traveler is celebrated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className='py-32 px-6 max-w-4xl mx-auto' id='positions'>
          <h2 className='font-display text-3xl font-bold text-center mb-16'>Open Positions</h2>
          
          <div className='space-y-4'>
            {positions.map((pos, idx) => (
              <div key={idx} className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10 shadow-sm hover:border-primary/30 transition-all cursor-pointer group'>
                <div>
                  <h4 className='font-headline font-bold text-lg group-hover:text-primary transition-colors'>{pos.title}</h4>
                  <div className='flex gap-4 items-center text-xs text-on-surface-variant mt-2 font-medium'>
                    <span>{pos.team}</span>
                    <span className='w-1.5 h-1.5 rounded-full bg-outline-variant/50' />
                    <span className='flex items-center gap-1'><MapPin className='w-3.5 h-3.5' /> {pos.location}</span>
                  </div>
                </div>
                <div className='mt-4 sm:mt-0 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary group-hover:underline'>
                  Apply Now
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
