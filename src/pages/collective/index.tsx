import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Compass, DollarSign, Award, Users, ArrowRight, Check, CheckCircle, Verified, Calendar } from 'lucide-react';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function Collective() {
  const [estLocation, setEstLocation] = useState('Paris');
  const [estRooms, setEstRooms] = useState(2);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const calculateRevenue = () => {
    const ratePerNight = estLocation === 'Paris' ? 450 : estLocation === 'Santorini' ? 550 : estLocation === 'Bali' ? 350 : 250;
    const occupancyRate = 0.72; // 72% average occupancy
    const monthlyRev = Math.round(ratePerNight * 30 * occupancyRate * estRooms);
    return monthlyRev.toLocaleString();
  };

  return (
    <div className='min-h-screen bg-[#080909] text-[#f4f3ef] flex flex-col justify-between overflow-x-hidden font-body select-none'>
      <Navbar />

      <main className='pt-[72px] flex-grow'>
        {/* ── CINEMATIC HERO HEADER ── */}
        <section className='relative min-h-[85vh] flex items-center px-6 lg:px-16 py-20 overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-tr from-[#ba0036]/10 via-transparent to-[#c5a880]/10 pointer-events-none' />
          
          <div className='container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10'>
            <div className='lg:col-span-6 space-y-8 text-left'>
              <span className='inline-block px-4 py-1.5 rounded-full bg-[#c5a880]/15 text-[#c5a880] text-xs font-bold uppercase tracking-widest border border-[#c5a880]/20'>
                The LuxeStay Collective
              </span>
              <h1 className='font-display font-extrabold text-5xl md:text-8xl leading-[1.05] tracking-tight text-[#f4f3ef]'>
                Turn your <br />
                <span className='italic text-[#c5a880] font-light'>architecture</span> <br />
                into art.
              </h1>
              <p className='text-lg text-[#cfc9bc] max-w-xl leading-relaxed font-light'>
                Join an elite global registry of property owners who define the future of high-end, curated hospitality. Share your architectural masterpiece with the world’s most discerning travelers.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                <a href="#apply" className='bg-primary text-white px-8 py-4 rounded-xl font-bold text-center hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-primary/20 btn-primary-gradient uppercase text-xs tracking-wider font-headline'>
                  Apply for Invitation
                </a>
                <a href="#calculator" className='border border-[#c5a880]/30 text-[#c5a880] px-8 py-4 rounded-xl font-bold text-center hover:bg-[#c5a880]/5 transition-colors uppercase text-xs tracking-wider font-headline'>
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
                      alt='Penthouse views'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CURATED ARCHETYPES (EDITORIAL LAYOUT) ── */}
        <section className='py-32 bg-[#0c0d0d] border-t border-b border-white/5'>
          <div className='max-w-page mx-auto px-6 lg:px-10'>
            <div className='flex flex-col md:flex-row justify-between items-end mb-20 gap-8'>
              <div className='max-w-xl text-left'>
                <span className='text-xs font-bold uppercase tracking-widest text-[#c5a880]'>Design Categories</span>
                <h2 className='font-headline text-3xl md:text-5xl font-extrabold tracking-tight mt-2'>Curated Archetypes</h2>
                <p className='text-[#cfc9bc] leading-relaxed text-sm mt-4 italic font-light'>
                  "Luxury is not just an amenity; it is the dialogue between architecture and its environment."
                </p>
              </div>
              <div className='hidden md:block h-px flex-grow mx-12 bg-white/10'></div>
              <span className='text-xs font-bold tracking-[0.2em] uppercase text-primary shrink-0'>01 / 03</span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-12 gap-y-20 gap-x-8'>
              {/* Category 1: Urban Retreats */}
              <div className='md:col-span-7 text-left space-y-6'>
                <div className='relative overflow-hidden rounded-2xl aspect-[16/9] group border border-white/5'>
                  <div 
                    className='w-full h-full bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-103'
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOseA5QxZOzIoSgV6YFoKGt1DWfsjjazcSG_tCMpMrpcnxC3Yf07LsmoExGH8Yb0pkxMYJt-vNSMJPr8ScOTWoGoP4cvMHfZaxkD_49NkNdb4txF2VhwLGtAS_oPP22b1Bny7gEY5wU-DQHSNdG_nqwnx1BIxm4-CRyvc-P4k19h42G5RxD_aDkfKV5N82y6GqNvj1yrxG2my-l4oo3oZstoQjo97KjVwIm4Nm0aA34Ecy-dRnIoay1GbPsq-9iQg97SplEGx5AzA0')` }}
                  />
                  <div className='absolute bottom-4 left-4 flex gap-2'>
                    <span className='bg-black/75 text-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border border-white/10'>Tokyo</span>
                    <span className='bg-black/75 text-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border border-white/10'>New York</span>
                  </div>
                </div>
                <div className='max-w-lg space-y-4'>
                  <h3 className='font-headline text-2xl md:text-3xl font-bold'>Urban Retreats</h3>
                  <p className='text-[#cfc9bc] leading-relaxed text-sm font-light'>
                    Penthouses and lofts that serve as silent sanctuaries amidst the pulse of the world's most vibrant metropolises. High-altitude living with bespoke interior narratives.
                  </p>
                  <a className='inline-flex items-center gap-2 font-headline font-bold text-xs uppercase tracking-wider text-primary group hover:text-white transition-colors duration-300' href="#">
                    Browse Urban Collection
                    <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1.5' />
                  </a>
                </div>
              </div>

              {/* Category 2: Coastal Sanctuaries */}
              <div className='md:col-span-5 md:mt-24 text-left space-y-6'>
                <div className='relative overflow-hidden rounded-2xl aspect-[4/5] group border border-white/5 shadow-2xl'>
                  <div 
                    className='w-full h-full bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-103'
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_17xsZEPj4tKd2cuPA7TvfvZ3BtsoKJAvO2mv_KyeUUINEvTNH7S68bblqviOES-iuQul-hZn3ZlLf46jXcI1A_pHnnhTTYnu0vXHHgyO0loJK4x6MKYodNtnrsvyO2PMuGHHbODR2Ub9hlULvlPyUFQha-k8mxoFnsC1MWZIFsF-tYaiU_Gri5ibnCAw5EE4mmT8fuZXIGyiQ4aSI7kweXjBD8sDMuNFfIt08EbIR-H_El5ebG65-P7zxrNnxT1Bgxz_NI-XP2cI')` }}
                  />
                </div>
                <div className='space-y-4'>
                  <h3 className='font-headline text-2xl md:text-3xl font-bold'>Coastal Sanctuaries</h3>
                  <p className='text-[#cfc9bc] leading-relaxed text-sm font-light'>
                    Architectural glass houses on the edge of the horizon. Where the tide dictates the pace of the day and every window is a masterpiece.
                  </p>
                  <a className='inline-flex items-center gap-2 font-headline font-bold text-xs uppercase tracking-wider text-primary group hover:text-white transition-colors duration-300' href="#">
                    Explore Shorelines
                    <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1.5' />
                  </a>
                </div>
              </div>

              {/* Category 3: Mountain Escapes */}
              <div className='md:col-span-8 md:col-start-3 text-left space-y-6 pt-12'>
                <div className='relative overflow-hidden rounded-2xl aspect-[21/9] group border border-white/5'>
                  <div 
                    className='w-full h-full bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-103'
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9pPBzna_3UAd_L3PVkkmoXCw3E9V8mZyotZ_OVGC_FaSgmDlrFi3rwGE4c808_Xz54gcDG2BTEy1Om2x-4pelxJDIT5E1519nS_ZhFHYLpEO0YB7uCDE5KwAruVH4_Ky8DB4--gj7G9DfD7KsGrQvdP0ka5bWeS7jMq5kB6HXeBeSAjpLdw99yz3QEO9Pdj3Uz5XCne3_vdSJW2lq0APiOITGtpDiSzjeGRPCjhFqCIe8cZmPgrPUBkcgROECvJqM3cREnUjbCsFC')` }}
                  />
                </div>
                <div className='flex flex-col md:flex-row justify-between items-start gap-8'>
                  <div className='max-w-md space-y-4'>
                    <h3 className='font-headline text-2xl md:text-3xl font-bold'>Mountain Escapes</h3>
                    <p className='text-[#cfc9bc] leading-relaxed text-sm font-light'>
                      Elevated living in the literal sense. Cabins and lodges crafted from stone and timber, designed for contemplation and connection with the wild.
                    </p>
                  </div>
                  <button className='bg-primary text-white px-8 py-4 rounded-xl font-headline font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300 btn-primary-gradient'>
                    View Mountain Homes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE LUXESELECT MANDATE (150-POINT INSPECTION) ── */}
        <section className='py-32 bg-[#080909] overflow-hidden'>
          <div className='max-w-page mx-auto px-6 lg:px-10'>
            <div className='bg-[#0c0d0d] rounded-3xl p-8 md:p-20 flex flex-col lg:flex-row items-center gap-16 shadow-2xl border border-white/5 relative'>
              
              <div className='lg:w-1/2 text-left space-y-8 z-10'>
                <div className='inline-flex p-4 bg-primary/10 rounded-2xl border border-primary/20 text-primary'>
                  <Award className='w-10 h-10' />
                </div>
                <h2 className='font-headline text-3xl md:text-5xl font-extrabold tracking-tight leading-tight'>
                  The LuxeSelect <br />
                  Mandate.
                </h2>
                <p className='text-sm text-[#cfc9bc] leading-relaxed font-light'>
                  Every residence in our collection undergoes a rigorous 150-point inspection before it is ever listed. We measure the thread count of the linens, the acoustics of the living spaces, and the responsiveness of the concierge team.
                </p>
                
                <div className='space-y-6 pt-2'>
                  <div className='flex items-start gap-4'>
                    <CheckCircle className='w-5 h-5 text-primary mt-1 shrink-0' />
                    <div>
                      <h4 className='font-headline font-bold text-sm text-white'>Structural Integrity</h4>
                      <p className='text-xs text-[#cfc9bc] font-light mt-1'>Architecture must meet our strict standards for aesthetic and functional design.</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <CheckCircle className='w-5 h-5 text-primary mt-1 shrink-0' />
                    <div>
                      <h4 className='font-headline font-bold text-sm text-white'>Atmospheric Audit</h4>
                      <p className='text-xs text-[#cfc9bc] font-light mt-1'>We assess lighting, scent, and soundscapes to ensure a sensory-perfect stay.</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <CheckCircle className='w-5 h-5 text-primary mt-1 shrink-0' />
                    <div>
                      <h4 className='font-headline font-bold text-sm text-white'>Concierge Readiness</h4>
                      <p className='text-xs text-[#cfc9bc] font-light mt-1'>The local team is vetted for 5-star hospitality and local expertise.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='lg:w-1/2 relative z-10 w-full'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='pt-12'>
                    <div 
                      className='aspect-[3/4] rounded-2xl bg-cover bg-center mb-4 border border-white/5' 
                      style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQFoHvZk3-lAi4rfAo_RAf3Q_7QX87e_eXs_5e2EiKVo3ZsCGcaHzUnhge9psTlVEbo4DvDAfvT8BHHGIdbyxqpKaU2p-hdkMkh3BEUtRYjs32AXQMnuPNCF4fv5Z9xJRNVOHmCAtYkRMWrDOj81lew9Rcm10lebZsWyFKnt1iK7gczqxI6671jtQ96ekCJQDdkfPx3bM23UnOw2L7X2TC9BT_zJdEheIc_JTRbsWei6aTpYVRf5447ciJ0ujTuVEBFJNO6xI-_WMc')` }}
                    />
                  </div>
                  <div>
                    <div 
                      className='aspect-[3/4] rounded-2xl bg-cover bg-center border border-white/5' 
                      style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9gEh1VTjzfAmICGUOW8YSDjxkPFTlw87gmLeLISMRT-5H6oVrGVYsOovT2Mm0RQU7DxloTT3N9J_GJLDTdXE6coS2Nw8n9CiOguL_phWQlO8kZ8fLe1EKlop6hkaiIc0ec6EU7qcRVhqex0-rJQOsXoLleQv38ptzPX673X4EdGK3NF2rALoA-mXR9AZQeFlS6bSRNzVpvGV0a945pg8knKdMIfj-9iBkx3_ive-fRzr-l10-gBsz41Pu5aFBKFfTdcaIXuEM2LPO')` }}
                    />
                  </div>
                </div>
                {/* Floating Badge */}
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0c0d0d] p-6 rounded-full shadow-2xl flex flex-col items-center justify-center text-center border border-white/10 min-w-[130px]'>
                  <span className='font-display text-4xl font-extrabold text-primary'>150</span>
                  <span className='text-[8px] font-bold uppercase tracking-widest text-[#cfc9bc] mt-1'>Audit Points</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS / PROOF POINTS ── */}
        <section className='py-20 border-y border-white/5 bg-[#0c0d0d]'>
          <div className='max-w-page mx-auto px-6 lg:px-10'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-12 text-center'>
              <div className='space-y-2'>
                <div className='font-display text-4xl md:text-5xl font-extrabold text-[#f4f3ef]'>420+</div>
                <div className='text-[10px] font-bold uppercase tracking-widest text-[#cfc9bc]'>Global Estates</div>
              </div>
              <div className='space-y-2 border-l border-white/5'>
                <div className='font-display text-4xl md:text-5xl font-extrabold text-[#f4f3ef]'>12</div>
                <div className='text-[10px] font-bold uppercase tracking-widest text-[#cfc9bc]'>Countries</div>
              </div>
              <div className='space-y-2 border-l border-white/5'>
                <div className='font-display text-4xl md:text-5xl font-extrabold text-[#f4f3ef]'>98%</div>
                <div className='text-[10px] font-bold uppercase tracking-widest text-[#cfc9bc]'>Guest Rating</div>
              </div>
              <div className='space-y-2 border-l border-white/5'>
                <div className='font-display text-4xl md:text-5xl font-extrabold text-[#f4f3ef]'>24/7</div>
                <div className='text-[10px] font-bold uppercase tracking-widest text-[#cfc9bc]'>Concierge</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE REVENUE CALCULATOR ── */}
        <section className='py-32 px-6 bg-[#080909]' id='calculator'>
          <div className='max-w-4xl mx-auto bg-[#0c0d0d] rounded-3xl p-8 lg:p-12 border border-white/5 shadow-2xl relative overflow-hidden text-left'>
            <div className='absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none' />
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6'>
                <span className='text-[#c5a880] font-bold text-xs uppercase tracking-widest block'>Estimate Your Earning Potential</span>
                <h2 className='font-display text-3xl lg:text-4xl font-extrabold'>What could your home earn on LuxeStay?</h2>
                <p className='text-[#cfc9bc] text-xs leading-relaxed font-light'>
                  Our dynamic pricing algorithms leverage luxury occupancy indexes to maximize your returns compared to standard rentals.
                </p>
                
                <div className='space-y-4 pt-2'>
                  <div>
                    <label className='block text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc] mb-2'>Location</label>
                    <select
                      value={estLocation}
                      onChange={(e) => setEstLocation(e.target.value)}
                      className='w-full bg-[#1c1d1d] border-0 rounded-xl py-3.5 px-4 text-[#f4f3ef] focus:ring-1 focus:ring-[#c5a880] focus:outline-none text-sm'
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
                          className={`flex-1 py-2.5 rounded-lg font-bold text-xs transition-all ${
                            estRooms === num 
                              ? 'bg-primary text-white btn-primary-gradient' 
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

              <div className='bg-[#141515] rounded-2xl p-8 border border-white/5 text-center flex flex-col justify-between min-h-[300px]'>
                <div className='space-y-2'>
                  <DollarSign className='w-12 h-12 text-[#c5a880] mx-auto mb-2' />
                  <span className='text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc] block'>Estimated Monthly Earnings</span>
                  <span className='font-display text-5xl lg:text-6xl font-black text-[#f4f3ef] tracking-tight block'>
                    £{calculateRevenue()}
                  </span>
                  <span className='text-[9px] text-[#cfc9bc]/50 block'>Based on 72% occupancy index. Commission excluded.</span>
                </div>
                
                <a href="#apply" className='w-full bg-primary text-white py-4 rounded-xl font-bold mt-6 hover:scale-[1.02] active:scale-[0.98] transition-transform inline-block text-center shadow-lg shadow-primary/10 btn-primary-gradient text-xs uppercase tracking-wider font-headline'>
                  Begin Host Application
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── STEPS TO JOIN ── */}
        <section className='py-32 px-6 bg-[#0c0d0d] border-t border-white/5' id='apply'>
          <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16'>
            <div className='lg:col-span-5 space-y-6 text-left'>
              <span className='text-primary font-bold text-xs uppercase tracking-widest block'>The Journey</span>
              <h2 className='font-display text-4xl font-extrabold'>How to join the LuxeStay Collective</h2>
              <p className='text-[#cfc9bc] text-xs leading-relaxed font-light'>
                We onboard hosts carefully to guarantee that every guest check-in is an uncompromised experience of luxury.
              </p>
              
              <div className='border-l border-white/10 pl-6 space-y-8 pt-6 relative'>
                <div className='relative'>
                  <div className='absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary' />
                  <h4 className='font-headline font-bold text-sm text-[#f4f3ef]'>1. Online Submission</h4>
                  <p className='text-xs text-[#cfc9bc] mt-1 font-light'>Provide property photos, architectural plans, and verification credentials.</p>
                </div>
                <div className='relative'>
                  <div className='absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1c1d1d] border border-white/20' />
                  <h4 className='font-headline font-bold text-sm text-[#f4f3ef]/80'>2. Curation Audit</h4>
                  <p className='text-xs text-[#cfc9bc]/80 mt-1 font-light'>A local LuxeStay representative inspects safety, comfort, soundproofing, and aesthetic details.</p>
                </div>
                <div className='relative'>
                  <div className='absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1c1d1d] border border-white/20' />
                  <h4 className='font-headline font-bold text-sm text-[#f4f3ef]/80'>3. Media Curation</h4>
                  <p className='text-xs text-[#cfc9bc]/80 mt-1 font-light'>We schedule a complementary high-fidelity interior photoshoot and generate a 3D virtual tour.</p>
                </div>
              </div>
            </div>

            {/* APPLICATION FORM */}
            <div className='lg:col-span-7 bg-[#121313] rounded-3xl p-8 border border-white/5 shadow-2xl text-left'>
              <h3 className='font-headline font-bold text-xl mb-6'>Apply for Host Membership</h3>
              
              <AnimatePresence mode='wait'>
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className='bg-primary/5 p-8 rounded-2xl text-center space-y-4 border border-primary/20 py-12'
                  >
                    <CheckCircle className='w-12 h-12 text-primary mx-auto' />
                    <h4 className='font-headline font-bold text-xl'>Application Submitted</h4>
                    <p className='text-xs text-[#cfc9bc] leading-relaxed font-light'>
                      Thank you for applying. A curation manager will review your submission and contact you within 48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className='space-y-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <label className='block text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc]'>Full Name</label>
                        <input type='text' required className='w-full bg-[#1c1d1d] border-0 rounded-xl py-3.5 px-4 text-[#f4f3ef] focus:ring-1 focus:ring-primary focus:outline-none text-sm' placeholder='Elena Rossi' />
                      </div>
                      <div className='space-y-2'>
                        <label className='block text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc]'>Email Address</label>
                        <input type='email' required className='w-full bg-[#1c1d1d] border-0 rounded-xl py-3.5 px-4 text-[#f4f3ef] focus:ring-1 focus:ring-primary focus:outline-none text-sm' placeholder='elena@domain.com' />
                      </div>
                    </div>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <label className='block text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc]'>Property Location</label>
                        <input type='text' required className='w-full bg-[#1c1d1d] border-0 rounded-xl py-3.5 px-4 text-[#f4f3ef] focus:ring-1 focus:ring-primary focus:outline-none text-sm' placeholder='Provence, France' />
                      </div>
                      <div className='space-y-2'>
                        <label className='block text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc]'>Property Type</label>
                        <select className='w-full bg-[#1c1d1d] border-0 rounded-xl py-3.5 px-4 text-[#f4f3ef] focus:ring-1 focus:ring-primary focus:outline-none text-sm'>
                          <option>Beachfront Villa</option>
                          <option>Urban Penthouse</option>
                          <option>Alpine Chalet</option>
                          <option>Historical Manor</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className='space-y-2'>
                      <label className='block text-[10px] font-bold uppercase tracking-wider text-[#cfc9bc]'>Describe your architectural / design story</label>
                      <textarea rows={4} required className='w-full bg-[#1c1d1d] border-0 rounded-xl py-3.5 px-4 text-[#f4f3ef] focus:ring-1 focus:ring-primary focus:outline-none text-sm' placeholder='Tell us about the inspiration behind your space, materials used, and historical restoration efforts...'></textarea>
                    </div>
                    
                    <button type='submit' className='w-full bg-primary text-white py-4 rounded-xl font-headline font-bold text-xs uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99] transition-transform shadow-lg shadow-primary/10 btn-primary-gradient'>
                      Submit Application
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
