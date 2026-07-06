import React from 'react';
import { ArrowLeft, Newspaper, Download, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function Press() {
  const articles = [
    { title: 'LuxeStay Announces AI-Powered Concierge Ecosystem Powered by NVIDIA NIM', date: 'June 18, 2026', category: 'Technology' },
    { title: 'LuxeStay Collective Expands to Coastal Estates in Southern Europe', date: 'May 04, 2026', category: 'Expansion' },
    { title: 'LuxeStay Awarded "Best Luxury Lodging Platform" at 2025 Hospitality Awards', date: 'Dec 12, 2025', category: 'Awards' },
  ];

  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body'>
      <Navbar />

      <main className='pt-[72px] flex-grow'>
        {/* Press Header */}
        <section className='relative py-16 px-6 lg:px-16 overflow-hidden bg-surface-container-low border-b border-outline-variant/15'>
          <div className='max-w-4xl mx-auto text-center space-y-6 relative z-10'>
            <Link
              to='/'
              className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline mb-4'
            >
              <ArrowLeft className='w-3.5 h-3.5' /> Back to Home
            </Link>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest border border-primary/10'>
              <Newspaper className='w-3 h-3' /> Press & Newsroom
            </div>
            <h1 className='font-display font-extrabold text-4xl md:text-6xl text-on-surface leading-tight tracking-tight'>
              Newsroom & Corporate
            </h1>
            <p className='text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed'>
              Latest updates, announcements, and media kits from the LuxeStay team.
            </p>
          </div>
        </section>

        {/* Press Body */}
        <section className='py-24 px-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12'>
          {/* Main news column */}
          <div className='lg:col-span-8 space-y-12'>
            <h3 className='font-headline text-2xl font-bold border-b border-outline-variant/10 pb-4'>Recent Announcements</h3>
            
            <div className='space-y-8'>
              {articles.map((art, idx) => (
                <article key={idx} className='space-y-3 group cursor-pointer'>
                  <div className='flex gap-4 items-center text-xs font-bold uppercase tracking-wider text-primary'>
                    <span>{art.category}</span>
                    <span className='w-1.5 h-1.5 rounded-full bg-outline-variant/50' />
                    <span className='flex items-center gap-1 font-medium text-on-surface-variant lowercase'><Calendar className='w-3.5 h-3.5' /> {art.date}</span>
                  </div>
                  <h4 className='font-headline font-bold text-xl group-hover:text-primary transition-colors leading-snug'>{art.title}</h4>
                  <p className='text-sm text-on-surface-variant leading-relaxed'>
                    LuxeStay continues to redefine the boundaries of luxury hospitality. Our latest initiative showcases our dedication to combining high-touch service with cutting-edge tech.
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Media Kit Sidebar */}
          <div className='lg:col-span-4 bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 shadow-sm space-y-6 h-fit'>
            <h4 className='font-headline font-bold text-lg border-b border-outline-variant/10 pb-3'>Media Resources</h4>
            <p className='text-xs text-on-surface-variant leading-relaxed'>
              Download official brand assets, logos, and executive bios.
            </p>
            <div className='space-y-3 pt-2'>
              <button className='w-full flex items-center justify-between p-4 bg-surface-container-lowest hover:bg-surface-container rounded-xl border border-outline-variant/10 transition-colors text-xs font-semibold text-on-surface'>
                <span>LuxeStay Brand Kit (ZIP)</span>
                <Download className='w-4 h-4 text-primary' />
              </button>
              <button className='w-full flex items-center justify-between p-4 bg-surface-container-lowest hover:bg-surface-container rounded-xl border border-outline-variant/10 transition-colors text-xs font-semibold text-on-surface'>
                <span>Press Release Archives (PDF)</span>
                <Download className='w-4 h-4 text-primary' />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
