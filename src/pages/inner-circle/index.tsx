import React, { useState } from 'react';
import { ArrowLeft, Key, Star, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function InnerCircle() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body'>
      <Navbar />

      <main className='pt-[72px] flex-grow'>
        {/* Inner Circle Hero */}
        <section className='relative h-[85vh] flex items-center overflow-hidden px-6 lg:px-16'>
          <div className='absolute inset-0 z-0'>
            <img
              alt='Penthouse pool sunset'
              className='w-full h-full object-cover'
              src='https://lh3.googleusercontent.com/aida-public/AB6AXuAnepRwCnSh0jUdI32DW2ilvAZGvcMxkjxFiJ5jWzm_toAUUmcljpqCHl96Dl_tNeclc6iBScfXAQxLrs7K8jUnWhGRFUWxK2-Wm44wxeWRTXOD4weirZOK4oMRpP8YUS8KHq_aB8sXS0xk-YpzZBsTEcS19TIlJ_w_igQrcENkCo1Wl-cBGy4rnTtZidaU7yiskgMs8KmBIxijPqwxUmcd1VZkLkJuc3twdGwIQ-Bhub5I7IPG0hc6BvVovWdeKt0Ix87vv4XHQ7S0'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-black/30' />
          </div>
          <div className='relative z-10 max-w-4xl space-y-6 text-white'>
            <Link
              to='/'
              className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-fixed-dim hover:underline mb-4 text-white'
            >
              <ArrowLeft className='w-3.5 h-3.5' /> Back to Home
            </Link>
            <span className='inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest border border-white/20 backdrop-blur-sm'>
              The Sovereign Experience
            </span>
            <h1 className='font-display text-5xl md:text-8xl font-black tracking-tight leading-none'>
              Welcome to the <br />
              <span className='text-primary-fixed-dim'>Inner Circle.</span>
            </h1>
            <p className='text-lg text-white/80 max-w-xl leading-relaxed'>
              A limited invitation to a world of heightened hospitality. Beyond the reservation, we curate the extraordinary for our most discerning guests.
            </p>
            <div className='flex gap-4 pt-4'>
              <a href="#apply" className='bg-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20'>
                Request Invitation
              </a>
              <a href="#benefits" className='bg-white/10 text-white border border-white/20 backdrop-blur-sm px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all'>
                Explore Benefits
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className='py-24 px-6 max-w-6xl mx-auto' id='benefits'>
          <div className='text-center max-w-2xl mx-auto mb-16 space-y-4'>
            <h2 className='font-display text-3xl md:text-4xl font-bold'>The Privilege of Access</h2>
            <p className='text-on-surface-variant text-sm leading-relaxed'>
              Membership is more than a status; it is a key to a global network of silent luxury, bespoke services, and moments designed specifically for your preference profile.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 shadow-sm flex items-start gap-4'>
              <Key className='w-8 h-8 text-primary shrink-0' />
              <div>
                <h4 className='font-headline font-bold text-lg mb-2'>Member-Only Rates</h4>
                <p className='text-on-surface-variant text-xs leading-relaxed'>
                  Exclusive pricing across our entire global collection, including early access to seasonal suites and private villa launches.
                </p>
              </div>
            </div>
            <div className='bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 shadow-sm flex items-start gap-4'>
              <Star className='w-8 h-8 text-primary shrink-0' />
              <div>
                <h4 className='font-headline font-bold text-lg mb-2'>Bespoke Concierge</h4>
                <p className='text-on-surface-variant text-xs leading-relaxed'>
                  Your personal travel curator. From securing a table at a fully booked Michelin-starred restaurant to organizing private jet transfers.
                </p>
              </div>
            </div>
            <div className='bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 shadow-sm flex items-start gap-4'>
              <Users className='w-8 h-8 text-primary shrink-0' />
              <div>
                <h4 className='font-headline font-bold text-lg mb-2'>Private Events</h4>
                <p className='text-on-surface-variant text-xs leading-relaxed'>
                  Invitations to gallery openings, vineyard harvests, and intimate rooftop galas exclusive to our circle.
                </p>
              </div>
            </div>
            <div className='bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 shadow-sm flex items-start gap-4'>
              <CheckCircle className='w-8 h-8 text-primary shrink-0' />
              <div>
                <h4 className='font-headline font-bold text-lg mb-2'>Universal Recognition</h4>
                <p className='text-on-surface-variant text-xs leading-relaxed'>
                  Wherever you land, you are known. Late check-outs, room upgrades, and personalized welcome amenities are our standard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className='py-24 px-6 bg-surface-container-low border-t border-outline-variant/15' id='apply'>
          <div className='max-w-4xl mx-auto bg-surface-container-lowest rounded-3xl p-8 lg:p-12 border border-outline-variant/10 shadow-2xl flex flex-col md:flex-row gap-12'>
            <div className='md:w-1/2 flex flex-col justify-center space-y-6'>
              <h2 className='font-display text-3xl md:text-5xl font-bold'>Apply for <br /><span className='text-primary'>Membership</span></h2>
              <p className='text-on-surface-variant text-xs leading-relaxed'>
                The Inner Circle is currently by invitation or application. Please provide your details below, and our membership concierge will contact you within 48 hours to discuss your preferences.
              </p>
              <div className='flex items-center gap-2 text-xs font-semibold text-on-surface-variant'>
                <strong className='text-primary'>4,000+</strong> members worldwide
              </div>
            </div>
            
            <div className='md:w-1/2'>
              {formSubmitted ? (
                <div className='bg-primary/5 p-8 rounded-2xl text-center space-y-4 border border-primary/20'>
                  <CheckCircle className='w-12 h-12 text-primary mx-auto' />
                  <h4 className='font-headline font-bold text-xl'>Application Received</h4>
                  <p className='text-xs text-on-surface-variant leading-relaxed'>
                    Thank you for applying. Our membership concierge will review your travel history and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div>
                    <label className='block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2'>Full Name</label>
                    <input type='text' required className='w-full bg-surface-container-low border-0 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all' placeholder='Alex Sterling' />
                  </div>
                  <div>
                    <label className='block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2'>Email Address</label>
                    <input type='email' required className='w-full bg-surface-container-low border-0 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all' placeholder='alex@sterling.com' />
                  </div>
                  <div>
                    <label className='block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2'>Primary Travel Interest</label>
                    <select className='w-full bg-surface-container-low border-0 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all'>
                      <option>Urban Retreats & Culture</option>
                      <option>Private Islands & Serenity</option>
                      <option>Alpine Adventures</option>
                      <option>Corporate Concierge</option>
                    </select>
                  </div>
                  <button type='submit' className='w-full bg-primary text-white py-4 rounded-xl font-bold hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md shadow-primary/10'>
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
