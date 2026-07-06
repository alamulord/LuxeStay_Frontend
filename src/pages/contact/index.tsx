import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      'Thank you for reaching out! A LuxeStay support representative will contact you shortly.',
    );
  };

  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface'>
      <Navbar />

      <main className='pt-16 flex-grow'>
        {/* Page Header */}
        <div className='bg-surface-container-low py-16 border-b border-outline-variant/10 mb-8'>
          <div className='max-w-4xl mx-auto px-6 text-center'>
            <div className='inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4 shadow-sm'>
              <Mail className='w-8 h-8' />
            </div>
            <h1 className='font-headline text-3xl md:text-5xl font-extrabold mb-3 text-on-surface tracking-tight'>
              Contact LuxeStay Help Center
            </h1>
            <p className='text-on-surface-variant max-w-lg mx-auto text-sm leading-relaxed'>
              Have questions or need assistance with your booking? We are here for you 24/7.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className='max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-12'>
          <div className='space-y-8 md:col-span-1'>
            <div className='flex gap-4 items-start'>
              <div className='p-2 bg-surface-container rounded-lg border border-outline-variant/15 text-primary'>
                <Mail className='w-5 h-5' />
              </div>
              <div>
                <h3 className='font-headline font-bold text-base text-on-surface'>Email Us</h3>
                <p className='text-sm text-on-surface-variant mt-1'>
                  support@luxestay.com
                </p>
              </div>
            </div>
            <div className='flex gap-4 items-start'>
              <div className='p-2 bg-surface-container rounded-lg border border-outline-variant/15 text-primary'>
                <Phone className='w-5 h-5' />
              </div>
              <div>
                <h3 className='font-headline font-bold text-base text-on-surface'>Call Anytime</h3>
                <p className='text-sm text-on-surface-variant mt-1'>
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
            <div className='flex gap-4 items-start'>
              <div className='p-2 bg-surface-container rounded-lg border border-outline-variant/15 text-primary'>
                <MapPin className='w-5 h-5' />
              </div>
              <div>
                <h3 className='font-headline font-bold text-base text-on-surface'>Headquarters</h3>
                <p className='text-sm text-on-surface-variant mt-1 leading-relaxed'>
                  123 Luxury Lane, Beverly Hills, CA
                </p>
              </div>
            </div>
          </div>

          <div className='md:col-span-2 bg-surface-container-lowest p-8 rounded-2xl shadow-ambient border border-outline-variant/10'>
            <h3 className='font-headline font-bold text-xl mb-6 text-on-surface'>
              Send us a message
            </h3>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-xs font-bold uppercase tracking-wider mb-2 text-on-surface-variant'>
                    Name
                  </label>
                  <input
                    type='text'
                    required
                    className='w-full rounded-xl py-3.5 px-4 bg-surface-container-low text-on-surface border-0 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all'
                    placeholder='Your Name'
                  />
                </div>
                <div>
                  <label className='block text-xs font-bold uppercase tracking-wider mb-2 text-on-surface-variant'>
                    Email
                  </label>
                  <input
                    type='email'
                    required
                    className='w-full rounded-xl py-3.5 px-4 bg-surface-container-low text-on-surface border-0 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all'
                    placeholder='your@email.com'
                  />
                </div>
              </div>
              <div>
                <label className='block text-xs font-bold uppercase tracking-wider mb-2 text-on-surface-variant'>
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  className='w-full rounded-xl py-3.5 px-4 bg-surface-container-low text-on-surface border-0 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all'
                  placeholder='How can our concierge assist you?'
                ></textarea>
              </div>
              <button type='submit' className='btn-primary w-full sm:w-auto shadow-md'>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
