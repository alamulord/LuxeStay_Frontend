import React from 'react';
import { ArrowLeft, Shield, Compass, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function CuratedPortfolio() {
  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body'>
      <Navbar />

      <main className='pt-[72px] flex-grow'>
        {/* Curated Portfolio Hero */}
        <section className='relative py-24 px-6 lg:px-16 overflow-hidden bg-surface-container-low border-b border-outline-variant/15'>
          <div className='max-w-4xl mx-auto text-center space-y-6 relative z-10'>
            <Link
              to='/'
              className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline mb-4'
            >
              <ArrowLeft className='w-3.5 h-3.5' /> Back to Home
            </Link>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest border border-primary/10'>
              <Shield className='w-3 h-3' /> The Portfolio Mandate
            </div>
            <h1 className='font-display font-extrabold text-4xl md:text-6xl text-on-surface leading-tight tracking-tight'>
              The Curated Portfolio
            </h1>
            <p className='text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed'>
              Every residence in our collection undergoes a rigorous 150-point inspection before it is ever listed. We measure the thread count, acoustics, and response times to guarantee perfection.
            </p>
          </div>
        </section>

        {/* Curation Audits */}
        <section className='py-24 px-6 max-w-6xl mx-auto'>
          <div className='bg-surface-container-lowest rounded-3xl p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 shadow-ambient border border-outline-variant/10'>
            <div className='md:w-1/2 space-y-8'>
              <h2 className='font-display text-3xl md:text-4xl font-bold leading-tight'>
                The LuxeSelect Mandate
              </h2>
              <p className='text-sm text-on-surface-variant leading-relaxed'>
                We inspect every single corner of our properties to ensure that you experience uncompromised luxury.
              </p>
              
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <CheckCircle className='w-5 h-5 text-primary mt-1 shrink-0' />
                  <div>
                    <h4 className='font-headline font-bold text-base'>Structural & Safety Audit</h4>
                    <p className='text-xs text-on-surface-variant mt-1'>We check security, water pressure, backup electricity, and fire preparedness.</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <CheckCircle className='w-5 h-5 text-primary mt-1 shrink-0' />
                  <div>
                    <h4 className='font-headline font-bold text-base'>Atmospheric Balance</h4>
                    <p className='text-xs text-on-surface-variant mt-1'>We audit room lighting, ambient scent profiles, and soundproofing thresholds.</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <CheckCircle className='w-5 h-5 text-primary mt-1 shrink-0' />
                  <div>
                    <h4 className='font-headline font-bold text-base'>Five-Star Amenities</h4>
                    <p className='text-xs text-on-surface-variant mt-1'>From premium bed linens to automated climate controls and high-speed symmetric WiFi.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='md:w-1/2 relative'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='pt-12'>
                  <div className='aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-outline-variant/10'>
                    <img className='w-full h-full object-cover' src='https://lh3.googleusercontent.com/aida-public/AB6AXuCCmxzcLUCm20_V8I3Hgeo2XPVLxRyfBXr1rieTTD3i8DQB36CkVxHlPD1FoSZEZJksKTu1LcV3C_45QAbgZzasW5d7v8PmmVFf0Z7cqBz10EuxJYUuvXn_7A9WjyT9F0HVA1fASQikkjZ2wruMSt3cPsxXmUgrLW3U0HLcbwSh_O9mCRr9YGhYZOquLo0B3KSvoAcYgqjIQ3u_7WVa_tnp8JUcd6qah865vsaT55gNUicmZF12mQK3mbwOtCYicNewlaINyFSGDogP' alt='Organic linens' />
                  </div>
                </div>
                <div>
                  <div className='aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-outline-variant/10'>
                    <img className='w-full h-full object-cover' src='https://lh3.googleusercontent.com/aida-public/AB6AXuBytuKmmEcGek0nXt7tDRYY4ysvPb0NtiJK0z3xA0Xrev_gr1TOJ9amVg7XenckVW30ydHRzeouk1I_9PI1v1d0_V9nlWd0cotwPlOuubPpy0r9b7JuEEiHWO2FoNRtA6_-zSF-GwE6bk69RPJcejzpkds2r3K8tQL1DwIt3fYimdHu7hTqCzZBax8-y4NfPvj3Coi2mygVRQygAkuZ4qwx6-fUZ7MdcO9ji8ljv-cdbdhjHB_N76mCkXq3H73AQF-GwHdKhtgJp7bV' alt='Concierge services' />
                  </div>
                </div>
              </div>
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-8 rounded-full shadow-2xl flex flex-col items-center justify-center text-center border border-outline-variant/10 min-w-[140px]'>
                <span className='font-display text-4xl font-extrabold text-primary'>150</span>
                <span className='text-[9px] font-bold uppercase tracking-wider text-on-surface-variant mt-1'>Audit Points</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
