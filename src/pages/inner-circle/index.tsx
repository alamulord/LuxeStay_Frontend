import React from 'react';
import { ArrowLeft, Key, Star, Users, CheckCircle, Compass, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';
import { InnerCircleSection } from '../../components/sections/home/InnerCircleSection';

export function InnerCircle() {
  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body select-none'>
      <Navbar />

      <main className='pt-[72px] flex-grow'>
        {/* ── HERO SECTION ── */}
        <section className='relative h-[85vh] flex items-center overflow-hidden px-6 lg:px-16'>
          <div className='absolute inset-0 z-0'>
            <motion.div 
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 12, ease: 'easeOut' }}
              className='w-full h-full bg-cover bg-center'
              style={{ 
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPgmYV5AZYrMKyZiG4UuxYTze7-7aWDxLe0R0WPwQ2UbxIOBCU2Uzv4EQkdNuPDdOJ5Y3ja9G2s1B2kgrcR4uPsmXMvBQFGXsvuIxTL3nOOxXdRPsF9VaXcW-hPqGfIMYfXxdLEvGOK2bkFz6G_xJpxUy4kDapSq8bLMufQKTQ7KtIV3x2mGTUzayxjrJrWBn98thVtRgbi4auLBqu6cUoJsRiWUv5sPOQjiaJlaaexVRgnxMD2N9l6nJkdI8o4BugFrIZd6401lVt')` 
              }}
            />
            <div className='absolute inset-0 bg-gradient-to-r from-surface via-surface/65 to-transparent' />
          </div>
          
          <div className='relative z-10 max-w-4xl space-y-6'>
            <div className='space-y-4'>
              <span className='inline-block py-1 px-4 rounded-full bg-secondary-fixed text-on-secondary-fixed font-headline text-[10px] font-bold tracking-widest uppercase'>
                The Sovereign Experience
              </span>
              
              <h1 className='font-display text-5xl md:text-7xl font-extrabold text-on-surface leading-[0.9] tracking-tighter'>
                Welcome to the <br />
                <span className='text-primary'>Inner Circle.</span>
              </h1>
              
              <p className='font-body text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed font-light'>
                A limited invitation to a world of heightened hospitality. Beyond the reservation, we curate the extraordinary for our most discerning guests.
              </p>
            </div>
            
            <div className='flex flex-wrap gap-4 pt-4'>
              <a 
                href="#join" 
                className='px-8 py-4 rounded-xl bg-primary text-white font-headline font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-103 active:scale-95 transition-all duration-300 btn-primary-gradient'
              >
                Request Invitation
              </a>
              <a 
                href="#benefits" 
                className='px-8 py-4 rounded-xl bg-surface-container-lowest text-on-surface border border-outline-variant/15 font-headline font-bold text-xs uppercase tracking-wider hover:bg-surface-container-high transition-all duration-300'
              >
                Explore Benefits
              </a>
            </div>
          </div>
        </section>

        {/* ── BENTO BENEFITS SECTION ── */}
        <section className='py-24 max-w-page mx-auto px-6 lg:px-10 border-t border-outline-variant/10' id='benefits'>
          <div className='flex flex-col md:flex-row justify-between items-end mb-16 gap-8'>
            <div className='max-w-2xl text-left'>
              <span className='text-xs font-bold uppercase tracking-widest text-primary'>Privileged Access</span>
              <h2 className='font-headline text-3xl md:text-4xl font-extrabold mt-2'>The Privilege of Access</h2>
              <p className='font-body text-sm text-on-surface-variant mt-4 leading-relaxed font-light'>
                Membership is more than a status; it is a key to a global network of silent luxury, bespoke services, and moments designed specifically for your preference profile.
              </p>
            </div>
            <div className='flex items-center gap-4 border-b border-primary/20 pb-2 shrink-0 font-headline font-bold text-xs tracking-widest text-primary'>
              <span>01 / 03</span>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
            {/* Member-Only Rates */}
            <div className='md:col-span-8 group relative overflow-hidden rounded-2xl bg-surface-container-low min-h-[350px] md:min-h-auto shadow-sm border border-outline-variant/5 flex flex-col justify-end p-8'>
              <div 
                className='absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-103'
                style={{ 
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWKr28Y7xK-YIiiRcVv5s6BkaFEAVElpJsPkk8w_iF80IfS2lTx2VoMKbgjUl0ZuhJLJcKVYmBSwAmK1l7YPd_F14o5CNLg-d4n9UdjxuelK7Nk-p4wy1NciMi2UjpTaQ0LfF-Fcxs37YiCU7jEx7-mN2L9JONKu4RjdhwM1BCNldsGM0BrncPDdxGm549vYWMeHFBYB03m7hjWrbt-xaJNrKsiEsnspOTlieHYHn4whguuqYjzSztNK5kPZzWOposZvaEUxVxAu0h')` 
                }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-colors z-0' />
              
              <div className='relative z-10 text-white space-y-2 max-w-md text-left'>
                <h3 className='font-headline text-2xl font-bold tracking-tight'>Member-Only Rates</h3>
                <p className='text-xs text-white/80 leading-relaxed font-body font-light'>
                  Exclusive pricing across our entire global collection, including early access to seasonal suites and private villa launches.
                </p>
              </div>
            </div>

            {/* Bespoke Concierge */}
            <div className='md:col-span-4 group relative overflow-hidden rounded-2xl bg-secondary text-white p-8 flex flex-col justify-between min-h-[350px] shadow-sm border border-outline-variant/5 text-left'>
              <div className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10'>
                <Key className='w-5 h-5 text-white' />
              </div>
              <div className='space-y-3'>
                <h3 className='font-headline text-2xl font-bold tracking-tight'>Bespoke Concierge</h3>
                <p className='text-xs text-white/80 leading-relaxed font-body font-light'>
                  Your personal architectural and travel curator. From securing a table at a fully booked Michelin-starred restaurant to organizing private jet transfers.
                </p>
              </div>
            </div>

            {/* Private Events */}
            <div className='md:col-span-4 group relative overflow-hidden rounded-2xl bg-surface-container-low p-8 flex flex-col justify-between min-h-[350px] shadow-sm border border-outline-variant/5 text-left'>
              <div className='space-y-3'>
                <span className='font-headline text-primary text-[9px] font-bold tracking-widest uppercase block'>
                  Seasonal Gatherings
                </span>
                <h3 className='font-headline text-2xl font-bold tracking-tight text-on-surface'>Private Events</h3>
                <p className='text-xs text-on-surface-variant leading-relaxed font-body font-light'>
                  Invitations to gallery openings, vineyard harvests, and intimate rooftop galas exclusive to our circle.
                </p>
              </div>
              <div className='mt-6'>
                <div 
                  className='w-full h-32 rounded-xl bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700'
                  style={{ 
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFmbAy9poT2ES8djFVB6nj1G8mO9U29cmEnaRbcDmx4lkRTy9tHZUzGxyja3QeXtWaqmTQb0t5HdaQCCenU13-slRfRifBrUIa6eingYfv4uNllFIOPuLWgsH8zeGRwEQqqyuKCWqQ83sNrsQAQ0C9FnFqCG1CsmQGHHau9LxzECGp0VIOtwKQf61n3Yc9kULNVHsS6WLU7n7abDTYSChU2jykDiBdrg4EeZJcuk-xNTzUSMDB_2RD6rIvEKUceqwb_SFiP9gioNxc')` 
                  }}
                />
              </div>
            </div>

            {/* Global Recognition */}
            <div className='md:col-span-8 group relative overflow-hidden rounded-2xl bg-surface-container-low shadow-sm border border-outline-variant/5'>
              <div className='flex flex-col md:flex-row h-full min-h-[350px] md:min-h-auto'>
                <div className='md:w-1/2 p-8 flex flex-col justify-center text-left space-y-4'>
                  <h3 className='font-headline text-2xl font-bold tracking-tight text-on-surface'>Universal Recognition</h3>
                  <p className='text-xs text-on-surface-variant leading-relaxed font-body font-light'>
                    Wherever you land, you are known. Late check-outs, room upgrades, and personalized welcome amenities are our standard for members.
                  </p>
                  <a className='inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:gap-2 transition-all duration-300' href='#'>
                    <span>Learn more about tiers</span>
                    <ArrowRight className='w-3.5 h-3.5' />
                  </a>
                </div>
                <div 
                  className='md:w-1/2 h-48 md:h-auto bg-cover bg-center'
                  style={{ 
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBiS0GxWUMhJ-gxiyny2CjnnQTyuo8gC7YnKK-PSiAJjkuazH_sWtS3dyFvNIloN5XCvLJCBD-3MSqJq_70kCqfzsiqlxCYp_LmDPPXOPO8BtiVmDPBCMI3kN5PMGhEFvJ814uTcwtsIRHlDd4PClrBslW0Cl3XNMaXH9fZOkugFA0e2Jta3xIghrM91MaLZpG2Kvya3pnqs_iRi8NVMQMr-JUtRG3DeDSTjNpu3JrDwJ7EKaPUTOhyretiyUwWUutd-P1QEQ5Wpiac')` 
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── QUOTE / ATMOSPHERE ── */}
        <section className='py-28 bg-surface-container-lowest overflow-hidden border-t border-b border-outline-variant/10 relative'>
          <div className='absolute -top-16 left-6 text-[18rem] font-display font-black text-on-surface/5 select-none leading-none pointer-events-none'>
            “
          </div>
          <div className='relative z-10 flex flex-col items-center text-center px-6'>
            <blockquote className='font-display text-2xl md:text-4xl font-light italic text-on-surface max-w-4xl leading-snug mb-8'>
              "LuxeStay doesn't just provide a room; they provide a sense of belonging in the most beautiful corners of the world."
            </blockquote>
            <cite className='font-headline text-[10px] font-bold tracking-widest uppercase text-primary not-italic'>
              — Julianna V., Platinum Member since 2019
            </cite>
          </div>
        </section>

        {/* ── LEAD CAPTURE FORM ── */}
        <div id="join">
          <InnerCircleSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
