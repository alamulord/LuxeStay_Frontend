import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';
import { motion } from 'framer-motion';
import { Shield, Compass, UserCheck, Star, Heart } from 'lucide-react';
import { fadeIn } from '../../lib/animations';
import api from '../../lib/api';

export function About() {
  const navigate = useNavigate();
  const [cmsContent, setCmsContent] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    const fetchCms = async () => {
      try {
        const response = await api.get<{ title: string; content: string; isActive: boolean }>('/cms/slug/about');
        if (response.data && response.data.content && response.data.isActive) {
          setCmsContent(response.data);
        }
      } catch (e) {
        // fallback
      }
    };
    fetchCms();
  }, []);

  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface'>
      <Navbar />

      <main className='pt-[72px] flex-grow overflow-x-hidden'>
        {/* Hero Section */}
        <section className='relative min-h-[640px] flex items-center px-8 md:px-16 py-20 overflow-hidden bg-surface-container-lowest'>
          <div className='container mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center'>
            <div className='md:col-span-6 z-10 space-y-8'>
              <span className='inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest'>
                About LuxeStay
              </span>
              <h1 className='font-display font-extrabold text-5xl md:text-7xl leading-[1.1] tracking-tight text-on-surface'>
                The Art of <br />
                <span className='bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent'>
                  Hospitality,
                </span>{' '}
                <br />
                Reimagined.
              </h1>
              <p className='text-lg text-on-surface-variant max-w-xl leading-relaxed'>
                {cmsContent ? cmsContent.content : (
                  <>
                    In an era of mass-market accommodation, LuxeStay exists as a
                    curated sanctuary. We reject the "grid of thousands" in favor of
                    the "hand-picked dozen," prioritizing individual soul and
                    architectural integrity over algorithmic volume.
                  </>
                )}
              </p>
            </div>
            <div className='md:col-span-6 relative'>
              <div className='aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-700'>
                <img
                  className='w-full h-full object-cover'
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuBVpHarVpuEnBeFml3W9GK2UNGg3X-5R_BHAsMFVsnOMw49W5TpDSWycytCOfMrjcorRhvz_P6awEUnqQuTBKrR-ScZtRjOssxpyQTv3i7AYr0kd8cMo-ZTqnCeDFbKgHP0gB3qNjAjwolcWem8JLhWKIt3PaM7W4Cs5hweXP_BGZz7wWpNRAEXqzkX5i6eBizqbTnQhGIBKWmjlNlObTBHUG_Q6z7tAz10GGhobRtHbXSkds9Ik-TdtQi_GBaEpsvFvSMbiuaeHw7g'
                  alt='Minimalist luxury Mediterranean villa'
                />
              </div>
              <div className='absolute -bottom-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10'></div>
            </div>
          </div>
        </section>

        {/* Philosophy: The Digital Concierge */}
        <section className='py-32 bg-surface-container-lowest'>
          <div className='container mx-auto px-8 md:px-16'>
            <div className='flex flex-col md:flex-row gap-16 items-center'>
              <div className='w-full md:w-1/2'>
                <div className='relative grid grid-cols-2 gap-4'>
                  <div className='space-y-4'>
                    <div className='h-80 rounded-2xl overflow-hidden transform translate-y-12 transition-all duration-500 hover:scale-[1.02]'>
                      <img
                        className='w-full h-full object-cover'
                        src='https://lh3.googleusercontent.com/aida-public/AB6AXuC6jaXM06v8MyvDhp-mZPV4VoA6Vsw0oZ7ZXlatlkST1TFkajqjnYY41uT124citrNgD4a99OL450jd2id7OWRpzJfNIc-0_w6zuHuVpvr43MJdOOKHFwfkVk4gs1gcIkInHJt4h7BcG5kErhOfVxgUaMALgQrUP9kRTwZ6KxBK22IDCJTcyJDxB7uYZkm2HW9IdmTcWZsLT8Nm1j6YyHm2zhV-naX3wiHW8xgtnULhOLdsCFELPZRuzNjRXnTWmaF407G4m4c-G0wU'
                        alt='Bespoke luxury concierge app'
                      />
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <div className='h-64 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]'>
                      <img
                        className='w-full h-full object-cover'
                        src='https://lh3.googleusercontent.com/aida-public/AB6AXuAnepRwCnSh0jUdI32DW2ilvAZGvcMxkjxFiJ5jWzm_toAUUmcljpqCHl96Dl_tNeclc6iBScfXAQxLrs7K8jUnWhGRFUWxK2-Wm44wxeWRTXOD4weirZOK4oMRpP8YUS8KHq_aB8sXS0xk-YpzZBsTEcS19TIlJ_w_igQrcENkCo1Wl-cBGy4rnTtZidaU7yiskgMs8KmBIxijPqwxUmcd1VZkLkJuc3twdGwIQ-Bhub5I7IPG0hc6BvVovWdeKt0Ix87vv4XHQ7S0'
                        alt='LuxeStay lounge interior'
                      />
                    </div>
                    <div className='h-48 rounded-2xl overflow-hidden bg-primary/5 flex items-center justify-center p-8 text-center border border-primary/10'>
                      <p className='font-headline font-bold text-primary text-base leading-snug'>
                        Tech that empowers, never replaces.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full md:w-1/2 space-y-8'>
                <h2 className='font-display font-bold text-4xl md:text-5xl text-on-surface leading-tight'>
                  The Digital Concierge
                </h2>
                <p className='text-lg text-on-surface-variant leading-relaxed'>
                  Our philosophy bridges the gap between high-touch human
                  service and invisible technology. We believe true luxury isn't
                  a robot delivering towels; it's an app that knows you prefer
                  your espresso at 7:15 AM and a host who has already stocked
                  your favorite vintage.
                </p>
                <div className='space-y-6'>
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center shrink-0 border border-outline-variant/10'>
                      <Compass className='w-5 h-5 text-primary' />
                    </div>
                    <div>
                      <h4 className='font-headline font-bold text-on-surface text-sm'>
                        Invisible Efficiency
                      </h4>
                      <p className='text-on-surface-variant text-xs mt-1'>
                        Check-in, climate control, and requests handled through
                        a singular, elegant interface.
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center shrink-0 border border-outline-variant/10'>
                      <UserCheck className='w-5 h-5 text-primary' />
                    </div>
                    <div>
                      <h4 className='font-headline font-bold text-on-surface text-sm'>
                        Local Alchemists
                      </h4>
                      <p className='text-on-surface-variant text-xs mt-1'>
                        Our on-site hosts are curators of their cities,
                        providing access to experiences not found on any map.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Vetting Standard (Bento-style) */}
        <section className='py-32 px-8 md:px-16 bg-surface-container-low'>
          <div className='container mx-auto max-w-6xl space-y-16'>
            <div className='text-center space-y-4'>
              <h2 className='font-display font-bold text-4xl md:text-5xl text-on-surface'>
                The Vetting Standard
              </h2>
              <p className='text-on-surface-variant text-lg max-w-2xl mx-auto'>
                Each LuxeStay home survives a 150-point inspection. We select
                only 3% of applicants to ensure absolute excellence.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Integrity */}
              <div className='md:col-span-2 bg-surface-container-lowest hover:bg-surface-container-high rounded-3xl p-10 flex flex-col justify-between transition-colors group border border-outline-variant/10'>
                <div className='space-y-4'>
                  <Shield className='w-10 h-10 text-primary' />
                  <h3 className='font-headline font-bold text-3xl text-on-surface'>
                    Integrity
                  </h3>
                  <p className='text-on-surface-variant text-base max-w-md'>
                    Structural perfection and ethical sourcing. We ensure every
                    property is safe, sustainable, and maintained to museum
                    standards.
                  </p>
                </div>
                <div className='mt-8 flex gap-2'>
                  <span className='px-4 py-2 bg-surface-container rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm text-on-surface'>
                    Soundproofing
                  </span>
                  <span className='px-4 py-2 bg-surface-container rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm text-on-surface'>
                    Safety Systems
                  </span>
                </div>
              </div>

              {/* Design */}
              <div className='bg-primary hover:bg-primary/90 text-white rounded-3xl p-10 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300'>
                <div className='space-y-4'>
                  <Compass className='w-10 h-10 text-white' />
                  <h3 className='font-headline font-bold text-3xl'>Design</h3>
                  <p className='opacity-90 text-sm leading-relaxed'>
                    Visual harmony and functional beauty. We look for homes that
                    tell a story through architecture.
                  </p>
                </div>
                <div className='mt-8'>
                  <Star className='w-12 h-12 opacity-20' />
                </div>
              </div>

              {/* Service */}
              <div className='bg-[#375ca8] hover:bg-[#28498f] text-white rounded-3xl p-10 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300'>
                <div className='space-y-4'>
                  <UserCheck className='w-10 h-10 text-white' />
                  <h3 className='font-headline font-bold text-3xl'>Service</h3>
                  <p className='opacity-90 text-sm leading-relaxed'>
                    From linens to lighting, every touchpoint is choreographed
                    for comfort and delight.
                  </p>
                </div>
                <div className='mt-8 h-24 overflow-hidden rounded-xl'>
                  <img
                    className='w-full h-full object-cover grayscale brightness-125'
                    src='https://lh3.googleusercontent.com/aida-public/AB6AXuCCmxzcLUCm20_V8I3Hgeo2XPVLxRyfBXr1rieTTD3i8DQB36CkVxHlPD1FoSZEZJksKTu1LcV3C_45QAbgZzasW5d7v8PmmVFf0Z7cqBz10EuxJYUuvXn_7A9WjyT9F0HVA1fASQikkjZ2wruMSt3cPsxXmUgrLW3U0HLcbwSh_O9mCRr9YGhYZOquLo0B3KSvoAcYgqjIQ3u_7WVa_tnp8JUcd6qah865vsaT55gNUicmZF12mQK3mbwOtCYicNewlaINyFSGDogP'
                    alt='Luxury Egyptian linen detail'
                  />
                </div>
              </div>

              {/* Soul */}
              <div className='md:col-span-2 bg-surface-container-lowest hover:bg-surface-container-high rounded-3xl p-10 flex flex-col md:flex-row gap-10 items-center transition-colors border border-outline-variant/10'>
                <div className='w-full md:w-1/2 space-y-4'>
                  <Heart className='w-10 h-10 text-primary' />
                  <h3 className='font-headline font-bold text-3xl text-on-surface'>
                    Soul
                  </h3>
                  <p className='text-on-surface-variant text-sm leading-relaxed'>
                    The indefinable 'Je ne sais quoi'. A home must have a unique
                    personality and a connection to its surroundings.
                  </p>
                </div>
                <div className='w-full md:w-1/2 h-full min-h-[200px] rounded-2xl overflow-hidden'>
                  <img
                    className='w-full h-full object-cover'
                    src='https://lh3.googleusercontent.com/aida-public/AB6AXuAudI5S5AFleiF6sUPEXuNIE3FD2Gt0BYCAoGdcdSLwsLSJhDDKzmFdRFewWgoj0fbwiN-iQJx7d45M1rDHHTdZp6ZzhJwHvPArLdWmc22qMwqVqUspuhP5krcP6yN47O1LHItuJ4fh4BEVB7G_6xQJWTbDST5fId7X5nGEjlIJh2hR6kY-XHfV7oy8Xl6F3Ryg25CQ-1uYDrK8FY5wQjxcEsAHFWD_pGnykUrnizyUd5e8EcugprCmBzv1x824KEPEaxw0EDmRYjL3'
                    alt='Curated living room space'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Visionaries */}
        <section className='py-32 bg-surface-container-lowest'>
          <div className='container mx-auto px-8 md:px-16'>
            <div className='max-w-4xl mx-auto text-center space-y-8 mb-20'>
              <h2 className='font-display font-bold text-4xl md:text-5xl text-on-surface tracking-tight'>
                The Visionaries
              </h2>
              <p className='text-xl text-on-surface-variant italic'>
                "We aren't just selling a place to sleep; we are architecting
                memories that linger long after the suitcase is unpacked."
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto'>
              <div className='flex flex-col items-center md:items-start text-center md:text-left space-y-6'>
                <div className='w-full aspect-square rounded-3xl overflow-hidden shadow-lg'>
                  <img
                    className='w-full h-full object-cover'
                    src='https://lh3.googleusercontent.com/aida-public/AB6AXuBytuKmmEcGek0nXt7tDRYY4ysvPb0NtiJK0z3xA0Xrev_gr1TOJ9amVg7XenckVW30ydHRzeouk1I_9PI1v1d0_V9nlWd0cotwPlOuubPpy0r9b7JuEEiHWO2FoNRtA6_-zSF-GwE6bk69RPJcejzpkds2r3K8tQL1DwIt3fYimdHu7hTqCzZBax8-y4NfPvj3Coi2mygVRQygAkuZ4qwx6-fUZ7MdcO9ji8ljv-cdbdhjHB_N76mCkXq3H73AQF-GwHdKhtgJp7bV'
                    alt='Elena Vance CEO'
                  />
                </div>
                <h4 className='font-headline font-bold text-2xl text-on-surface'>
                  Elena Vance
                </h4>
                <p className='text-primary font-bold tracking-widest uppercase text-xs'>
                  CEO & Creative Director
                </p>
                <p className='text-on-surface-variant text-sm leading-relaxed'>
                  A former architectural critic with a passion for heritage
                  restoration, Elena founded LuxeStay to champion properties
                  that possess a distinct sense of place.
                </p>
              </div>

              <div className='flex flex-col items-center md:items-start text-center md:text-left space-y-6'>
                <div className='w-full aspect-square rounded-3xl overflow-hidden shadow-lg'>
                  <img
                    className='w-full h-full object-cover'
                    src='https://lh3.googleusercontent.com/aida-public/AB6AXuAwbcOtat3UMZx9-hYkKtag0Yst--6P-PZyf2H5ZZfFGozzLCN9A99h8Km6k3c7T899C32OAsQHy8qRTgYQQf8R3xTjgOf30NiuJMabyo9bEkavD3A9_kM8MI4FQMOUH1B1LaouQuUVtWmgFScYSvKvQxqxRvN0P79oC7pvRXzwXn3aYn1fDctQiVXpTDALZZ6OwkpJwXHJpLlkihv1GWq0j67pvuDj-urQ22k1YeNo7g7hQBAZ0qOfb49HX9LWS09VaUOlStFdHvSZ'
                    alt='Julian Thorne COO'
                  />
                </div>
                <h4 className='font-headline font-bold text-2xl text-on-surface'>
                  Julian Thorne
                </h4>
                <p className='text-primary font-bold tracking-widest uppercase text-xs'>
                  Chief Operations Officer
                </p>
                <p className='text-on-surface-variant text-sm leading-relaxed'>
                  With a decade in luxury hospitality operations, Julian ensures
                  the seamless execution of our Digital Concierge vision across
                  four continents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className='py-40 relative overflow-hidden bg-surface-container-low'>
          <div className='container mx-auto px-8 text-center relative z-10 space-y-12'>
            <h2 className='font-display font-extrabold text-5xl md:text-7xl text-on-surface leading-none'>
              Experience the <br />
              <span className='bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent'>
                Collection.
              </span>
            </h2>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <button
                onClick={() => navigate('/search')}
                className='w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-full font-headline font-bold text-base hover:scale-105 transition-transform duration-300 shadow-xl'
              >
                Search Destinations
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
