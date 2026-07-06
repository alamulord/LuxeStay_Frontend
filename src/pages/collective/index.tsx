import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, DollarSign, Award, Users, ArrowRight, Check } from 'lucide-react';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function Collective() {
  const [estLocation, setEstLocation] = useState('Paris');
  const [estRooms, setEstRooms] = useState(2);
  
  const calculateRevenue = () => {
    const ratePerNight = estLocation === 'Paris' ? 450 : estLocation === 'Santorini' ? 550 : estLocation === 'Bali' ? 350 : 250;
    const occupancyRate = 0.72; // 72% average occupancy
    const monthlyRev = Math.round(ratePerNight * 30 * occupancyRate * estRooms);
    return monthlyRev.toLocaleString();
  };

  return (
    <div className='min-h-screen bg-[#080909] text-[#f4f3ef] flex flex-col justify-between overflow-x-hidden font-body'>
      <Navbar />

      <main className='pt-[72px] flex-grow'>
        {/* Cinematic Header */}
        <section className='relative min-h-[85vh] flex items-center px-6 lg:px-16 py-20 overflow-hidden'>
          {/* Subtle Ambient Mesh Gradient */}
          <div className='absolute inset-0 bg-gradient-to-tr from-[#ba0036]/10 via-transparent to-[#c5a880]/10 pointer-events-none' />
          
          <div className='container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10'>
            <div className='lg:col-span-6 space-y-8'>
              <span className='inline-block px-4 py-1.5 rounded-full bg-[#c5a880]/15 text-[#c5a880] text-xs font-bold uppercase tracking-widest border border-[#c5a880]/20'>
                The LuxeStay Collective
              </span>
              <h1 className='font-display font-extrabold text-5xl md:text-8xl leading-[1.05] tracking-tight text-[#f4f3ef]'>
                Turn your <br />
                <span className='italic text-[#c5a880]'>architecture</span> <br />
                into art.
              </h1>
              <p className='text-lg text-[#cfc9bc] max-w-xl leading-relaxed'>
                Join an elite global registry of property owners who define the future of high-end, curated hospitality. Share your architectural masterpiece with the world’s most discerning travelers.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                <a href="#apply" className='bg-primary text-white px-8 py-4 rounded-xl font-bold text-center hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-primary/20'>
                  Apply for Invitation
                </a>
                <a href="#calculator" className='border border-[#c5a880]/30 text-[#c5a880] px-8 py-4 rounded-xl font-bold text-center hover:bg-[#c5a880]/5 transition-colors'>
                  Estimate Earnings
                </a>
              </div>
            </div>
            
            <div className='lg:col-span-6 relative'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-4 pt-12'>
                  <div className='rounded-2xl overflow-hidden h-80 shadow-2xl border border-white/5'>
                    <img
                      className='w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700'
                      src='https://lh3.googleusercontent.com/aida-public/AB6AXuBxONadlg2SBo8slDCW7djaD8nFWSv4ypXSbEueozMVlnHLlwJUVJ3sRc0dXiSwOLnSL5W41YUNAn2fRm0WawDKUHHgP0xOyxo8VrwbT-o2I5bRaGVrh8-C-YGIjFlXZ9mTyufaO6WCdPYBTUwdwk6aaTow9QQLC9fW1WjE2T0rtplYWD_O2Uchv7dEapp2nX-_HYxAas-tAFm9eQprRLuey2ov1dCzqWKorZkMPpjhW6E-bYsY7aIh7KoM8xzg1Say2Z0rvWvrGOjo'
                      alt='Brutalist villa forest'
                    />
                  </div>
                  <div className='rounded-2xl overflow-hidden h-60 shadow-2xl border border-white/5'>
                    <img
                      className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
                      src='https://lh3.googleusercontent.com/aida-public/AB6AXuD5u9_jts9OLzZwjoDejAUu1Epc24xybjmJTQtYKtLzXELzLImd5midBNtvil378bIAXfDlTQ8IoZIoPXrDeh9xAB1Kq0GkIqmU4miiMwsgGlaVfmkOnLa-RIwXWRbOpO3eihau-cFNuc7cPiPrTaantMMptrK9vFSD0Q_U1tSlDgoMxsISI8cZo7Q8FIbjwlTBuDRBLP3rXo_N-qIsG-W70waQjxQ62oFKipupw9fQNvAKlxh-vetz6b21IRdoI8-uknygO0or0JxP'
                      alt='Premium bedding layout'
                    />
                  </div>
                </div>
                <div className='space-y-4'>
                  <div className='rounded-2xl overflow-hidden h-64 shadow-2xl border border-white/5'>
                    <img
                      className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
                      src='https://lh3.googleusercontent.com/aida-public/AB6AXuDrj5JcKkE6Xhm0OgYdhD_fdEKvJCDiVxERL1bbbsTQPmX0sdB28eX0tV-0LyKcIsM28s8pV5g5qHyIQDzVIYXBjYe5q1S8YOsO2dGiBhOSI7PfY6ly5A_I8Rg9NLgdehQ9Ww98IK169CjPMVGpq1JJnWy3bXhDUu7NccK02UiWelKOF9N9H1xcNDtuWN7-RZU3BFG_-hP9AJ3V0Gqehd_12HC42RXdcgM35w3PfHbODdFpJdHnPu4th7OKzOGpMN_OMLT8F8me8jzq'
                      alt='Mediterranean sunset pool'
                    />
                  </div>
                  <div className='rounded-2xl overflow-hidden h-80 shadow-2xl border border-white/5'>
                    <img
                      className='w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700'
                      src='https://lh3.googleusercontent.com/aida-public/AB6AXuCP1L7Rll_a6_smQk_-DpUzSGg0CY_CZybNrRtrgU8lpJtdH7xBo-H_wxjk9nj0-OOla7Q-_kUqGuw9MQulZ1fN5N294EmcGg0KHBKJPvYt91yJnhl44-oMEfy-7OdnWnORHggemMMyY3KQsyRw4V0s-WVQXqDQ_y5qq6dzhv_td6eqyqJkREmnXad_9mPbTp6f9BB_V5QAEwcphwNaHw9FvC8l3d8swxIy65uQyeLAIMFg6f6GbyENDY7mPQo8l-TaatOL5SiqxuWI'
                      alt='Penthouse penthouse views'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Curation Standard Section */}
        <section className='py-32 px-6 bg-[#0c0d0d] border-y border-white/5'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center max-w-2xl mx-auto mb-20 space-y-4'>
              <span className='text-primary font-bold text-xs uppercase tracking-widest'>The Standard</span>
              <h2 className='font-display text-4xl md:text-5xl font-bold'>The Curation Standard</h2>
              <p className='text-[#cfc9bc] text-sm leading-relaxed'>
                We select only the top 3% of applicants. Our curation framework values architectural storytelling, structural integrity, and concierge-level hospitality.
              </p>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='bg-[#121313] p-8 rounded-2xl border border-white/5 hover:border-[#c5a880]/30 transition-all duration-300'>
                <Compass className='w-10 h-10 text-[#c5a880] mb-6' />
                <h3 className='font-headline font-bold text-xl mb-3'>Architectural Soul</h3>
                <p className='text-xs text-[#cfc9bc] leading-relaxed'>
                  Properties must possess architectural intent. We prioritize spaces that highlight local materials, historic restoration, or visionary modern design.
                </p>
              </div>
              <div className='bg-[#121313] p-8 rounded-2xl border border-white/5 hover:border-[#c5a880]/30 transition-all duration-300'>
                <ShieldCheck className='w-10 h-10 text-[#c5a880] mb-6' />
                <h3 className='font-headline font-bold text-xl mb-3'>Verified Integrity</h3>
                <p className='text-xs text-[#cfc9bc] leading-relaxed'>
                  Every property undergoes a 150-point safety and structural assessment, ensuring soundproofing, privacy, and museum-grade maintenance.
                </p>
              </div>
              <div className='bg-[#121313] p-8 rounded-2xl border border-white/5 hover:border-[#c5a880]/30 transition-all duration-300'>
                <Award className='w-10 h-10 text-[#c5a880] mb-6' />
                <h3 className='font-headline font-bold text-xl mb-3'>Celestial Concierge</h3>
                <p className='text-xs text-[#cfc9bc] leading-relaxed'>
                  Hosts must agree to provide LuxeStay-standard welcome rituals, organic luxury toiletries, and 24/7 guest communication response.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Revenue Calculator (Phase 6 Unique Component) */}
        <section className='py-32 px-6' id='calculator'>
          <div className='max-w-4xl mx-auto bg-[#121313] rounded-3xl p-8 lg:p-12 border border-white/5 shadow-2xl relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-80 h-80 bg-[#c5a880]/5 rounded-full blur-[100px] pointer-events-none' />
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6'>
                <span className='text-[#c5a880] font-bold text-xs uppercase tracking-widest block'>Estimate Your Earning Potential</span>
                <h2 className='font-display text-3xl lg:text-4xl font-extrabold'>What could your home earn on LuxeStay?</h2>
                <p className='text-[#cfc9bc] text-xs leading-relaxed'>
                  Our dynamic pricing algorithms leverage luxury occupancy indexes to maximize your returns compared to standard rentals.
                </p>
                
                <div className='space-y-4 pt-2'>
                  <div>
                    <label className='block text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc] mb-2'>Location</label>
                    <select
                      value={estLocation}
                      onChange={(e) => setEstLocation(e.target.value)}
                      className='w-full bg-[#1c1d1d] border-0 rounded-xl py-3 px-4 text-[#f4f3ef] focus:ring-1 focus:ring-[#c5a880] focus:outline-none'
                    >
                      <option value="Paris">Paris, France</option>
                      <option value="Santorini">Santorini, Greece</option>
                      <option value="Bali">Bali, Indonesia</option>
                      <option value="Oregon">Bend, Oregon</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc] mb-2'>Bedrooms</label>
                    <div className='flex gap-2'>
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type='button'
                          onClick={() => setEstRooms(num)}
                          className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
                            estRooms === num 
                              ? 'bg-primary text-white' 
                              : 'bg-[#1c1d1d] text-[#cfc9bc] hover:bg-[#252727]'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-[#1c1d1d] rounded-2xl p-8 border border-white/5 text-center flex flex-col justify-between min-h-[300px]'>
                <div className='space-y-2'>
                  <DollarSign className='w-12 h-12 text-[#c5a880] mx-auto' />
                  <span className='text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc] block'>Estimated Monthly Earnings</span>
                  <span className='font-display text-5xl lg:text-6xl font-black text-[#f4f3ef] tracking-tight block'>
                    ${calculateRevenue()}
                  </span>
                  <span className='text-[9px] text-[#cfc9bc]/50 block'>Based on 72% occupancy index. Commission excluded.</span>
                </div>
                
                <a href="#apply" className='w-full bg-primary text-white py-3.5 rounded-xl font-bold mt-6 hover:scale-[1.02] active:scale-[0.98] transition-transform inline-block text-center shadow-lg shadow-primary/10'>
                  Begin Host Application
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Steps to Join */}
        <section className='py-32 px-6 bg-[#0c0d0d] border-t border-white/5' id='apply'>
          <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16'>
            <div className='lg:col-span-5 space-y-6'>
              <span className='text-primary font-bold text-xs uppercase tracking-widest block'>The Journey</span>
              <h2 className='font-display text-4xl font-extrabold'>How to join the LuxeStay Collective</h2>
              <p className='text-[#cfc9bc] text-xs leading-relaxed'>
                We onboard hosts carefully to guarantee that every guest check-in is an uncompromised experience of luxury.
              </p>
              <div className='border-l border-white/10 pl-6 space-y-6 pt-6'>
                <div className='relative'>
                  <div className='absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-primary' />
                  <h4 className='font-headline font-bold text-sm text-[#f4f3ef]'>1. Online Submission</h4>
                  <p className='text-xs text-[#cfc9bc] mt-1'>Provide property photos, architectural plans, and verification credentials.</p>
                </div>
                <div className='relative'>
                  <div className='absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-[#1c1d1d]' />
                  <h4 className='font-headline font-bold text-sm text-[#f4f3ef]/80'>2. In-Person Curation Audit</h4>
                  <p className='text-xs text-[#cfc9bc]/80 mt-1'>A local LuxeStay representative inspects safety, comfort, soundproofing, and aesthetic details.</p>
                </div>
                <div className='relative'>
                  <div className='absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-[#1c1d1d]' />
                  <h4 className='font-headline font-bold text-sm text-[#f4f3ef]/80'>3. Professional Media Curation</h4>
                  <p className='text-xs text-[#cfc9bc]/80 mt-1'>We schedule a complementary high-fidelity interior photoshoot and generate a 3D virtual tour.</p>
                </div>
              </div>
            </div>

            <div className='lg:col-span-7 bg-[#121313] rounded-3xl p-8 border border-white/5 shadow-2xl'>
              <h3 className='font-headline font-bold text-xl mb-6'>Apply for Host Membership</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('Application submitted successfully.'); }} className='space-y-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc] mb-2'>Full Name</label>
                    <input type='text' required className='w-full bg-[#1c1d1d] border-0 rounded-xl py-3.5 px-4 text-[#f4f3ef] focus:ring-1 focus:ring-primary focus:outline-none' placeholder='Elena Rossi' />
                  </div>
                  <div>
                    <label className='block text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc] mb-2'>Email Address</label>
                    <input type='email' required className='w-full bg-[#1c1d1d] border-0 rounded-xl py-3.5 px-4 text-[#f4f3ef] focus:ring-1 focus:ring-primary focus:outline-none' placeholder='elena@domain.com' />
                  </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc] mb-2'>Property Location</label>
                    <input type='text' required className='w-full bg-[#1c1d1d] border-0 rounded-xl py-3.5 px-4 text-[#f4f3ef] focus:ring-1 focus:ring-primary focus:outline-none' placeholder='Provence, France' />
                  </div>
                  <div>
                    <label className='block text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc] mb-2'>Property Type</label>
                    <select className='w-full bg-[#1c1d1d] border-0 rounded-xl py-3.5 px-4 text-[#f4f3ef] focus:ring-1 focus:ring-primary focus:outline-none'>
                      <option>Beachfront Villa</option>
                      <option>Urban Penthouse</option>
                      <option>Alpine Chalet</option>
                      <option>Historical Manor</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className='block text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc] mb-2'>Describe your architectural / design story</label>
                  <textarea rows={4} required className='w-full bg-[#1c1d1d] border-0 rounded-xl py-3.5 px-4 text-[#f4f3ef] focus:ring-1 focus:ring-primary focus:outline-none' placeholder='Tell us about the inspiration behind your space, materials used, and historical restoration efforts...'></textarea>
                </div>
                <button type='submit' className='w-full bg-primary text-white py-4 rounded-xl font-bold hover:scale-[1.01] active:scale-[0.99] transition-transform shadow-lg shadow-primary/10'>
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
