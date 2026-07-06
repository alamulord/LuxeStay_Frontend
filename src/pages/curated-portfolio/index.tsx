import React from 'react';
import { ArrowLeft, Shield, Compass, CheckCircle, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function CuratedPortfolio() {
  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body select-none'>
      <Navbar />

      <main className='pt-[72px] flex-grow text-left'>
        {/* ── HERO SECTION ── */}
        <section className='relative h-[85vh] flex items-center overflow-hidden px-6 lg:px-16'>
          <div className='absolute inset-0 z-0'>
            <div 
              className='w-full h-full bg-cover bg-center transition-transform duration-[20s] ease-linear transform hover:scale-100 scale-105'
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLGGxQceI3ZfsgoqBNsV5ep6tiSIHSpgIf0XwVhd8dTD1fEGPRO5sBMda9gBYETB1CkP0Ocq15UsEMCmp9P2Di0_ZVB_sxKIgs2MTCwnQN8IQ5VUmPqXh_5zMR3TQmjoFVvFKxHI-ybcySyUbFPEvk_PHGQTyZrcC27El2gJ9if29RWIhZoFmqKqDBM42I6dMObY83raJnyp9zjgo95tFF2FW-zrB-M7nc_69kJND2Zu1Yb5RObJ5VRqlV_Tt_1_7Wiv9DauAcSUt-')` }}
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent' />
          </div>
          
          <div className='relative z-10 max-w-4xl space-y-6 text-white'>
            <Link
              to='/'
              className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ffb2b6] hover:underline mb-4'
            >
              <ArrowLeft className='w-3.5 h-3.5' /> Back to Home
            </Link>
            
            <div className='space-y-4'>
              <span className='inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-fixed-dim font-headline text-[10px] font-bold uppercase tracking-widest border border-primary/25 backdrop-blur-sm'>
                The Collection 2024
              </span>
              <h1 className='font-display text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] text-white'>
                Architectural <br />
                Autographs.
              </h1>
              <p className='text-lg md:text-xl text-white/95 max-w-xl leading-relaxed font-light'>
                A curated anthology of private residences that define contemporary luxury. From brutalist coastal retreats to mid-century mountain sanctuaries.
              </p>
            </div>
            
            <div className='flex gap-4 pt-4'>
              <Link 
                to='/search'
                className='bg-white text-on-surface px-8 py-4 rounded-full font-headline font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 shadow-xl'
              >
                Explore Collection
              </Link>
              <Link 
                to='/search'
                className='bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-headline font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all duration-300'
              >
                View Map
              </Link>
            </div>
          </div>
        </section>

        {/* ── CURATED ARCHETYPES (EDITORIAL LAYOUT) ── */}
        <section className='py-32 bg-surface'>
          <div className='max-w-page mx-auto px-6 lg:px-10'>
            <div className='flex flex-col md:flex-row justify-between items-end mb-20 gap-8'>
              <div className='max-w-xl'>
                <span className='text-xs font-bold uppercase tracking-widest text-primary'>Design Categories</span>
                <h2 className='font-headline text-3xl md:text-4xl font-extrabold tracking-tight mt-2'>Curated Archetypes</h2>
                <p className='text-on-surface-variant leading-relaxed text-sm mt-4 italic font-light'>
                  "Luxury is not just an amenity; it is the dialogue between architecture and its environment."
                </p>
              </div>
              <div className='hidden md:block h-px flex-grow mx-12 bg-outline-variant/30'></div>
              <span className='text-xs font-bold tracking-[0.2em] uppercase text-primary shrink-0'>01 / 03</span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-12 gap-y-20 gap-x-8'>
              {/* Category 1: Urban Retreats */}
              <div className='md:col-span-7 space-y-6'>
                <div className='relative overflow-hidden rounded-2xl aspect-[16/9] group border border-outline-variant/10 shadow-sm'>
                  <div 
                    className='w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-103'
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOseA5QxZOzIoSgV6YFoKGt1DWfsjjazcSG_tCMpMrpcnxC3Yf07LsmoExGH8Yb0pkxMYJt-vNSMJPr8ScOTWoGoP4cvMHfZaxkD_49NkNdb4txF2VhwLGtAS_oPP22b1Bny7gEY5wU-DQHSNdG_nqwnx1BIxm4-CRyvc-P4k19h42G5RxD_aDkfKV5N82y6GqNvj1yrxG2my-l4oo3oZstoQjo97KjVwIm4Nm0aA34Ecy-dRnIoay1GbPsq-9iQg97SplEGx5AzA0')` }}
                  />
                  <div className='absolute bottom-4 left-4 flex gap-2'>
                    <span className='bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-on-surface border border-outline-variant/10'>Tokyo</span>
                    <span className='bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-on-surface border border-outline-variant/10'>New York</span>
                  </div>
                </div>
                <div className='max-w-lg space-y-4'>
                  <h3 className='font-headline text-2xl md:text-3xl font-bold'>Urban Retreats</h3>
                  <p className='text-on-surface-variant leading-relaxed text-sm font-light'>
                    Penthouses and lofts that serve as silent sanctuaries amidst the pulse of the world's most vibrant metropolises. High-altitude living with bespoke interior narratives.
                  </p>
                  <Link className='inline-flex items-center gap-2 font-headline font-bold text-xs uppercase tracking-wider text-primary group hover:text-on-surface transition-colors duration-300' to="/search">
                    Browse Urban Collection
                    <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1.5' />
                  </Link>
                </div>
              </div>

              {/* Category 2: Coastal Sanctuaries */}
              <div className='md:col-span-5 md:mt-24 space-y-6'>
                <div className='relative overflow-hidden rounded-2xl aspect-[4/5] group border border-outline-variant/10 shadow-2xl'>
                  <div 
                    className='w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-103'
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_17xsZEPj4tKd2cuPA7TvfvZ3BtsoKJAvO2mv_KyeUUINEvTNH7S68bblqviOES-iuQul-hZn3ZlLf46jXcI1A_pHnnhTTYnu0vXHHgyO0loJK4x6MKYodNtnrsvyO2PMuGHHbODR2Ub9hlULvlPyUFQha-k8mxoFnsC1MWZIFsF-tYaiU_Gri5ibnCAw5EE4mmT8fuZXIGyiQ4aSI7kweXjBD8sDMuNFfIt08EbIR-H_El5ebG65-P7zxrNnxT1Bgxz_NI-XP2cI')` }}
                  />
                </div>
                <div className='space-y-4'>
                  <h3 className='font-headline text-2xl md:text-3xl font-bold'>Coastal Sanctuaries</h3>
                  <p className='text-on-surface-variant leading-relaxed text-sm font-light'>
                    Architectural glass houses on the edge of the horizon. Where the tide dictates the pace of the day and every window is a masterpiece.
                  </p>
                  <Link className='inline-flex items-center gap-2 font-headline font-bold text-xs uppercase tracking-wider text-primary group hover:text-on-surface transition-colors duration-300' to="/search">
                    Explore Shorelines
                    <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1.5' />
                  </Link>
                </div>
              </div>

              {/* Category 3: Mountain Escapes */}
              <div className='md:col-span-8 md:col-start-3 space-y-6 pt-12'>
                <div className='relative overflow-hidden rounded-2xl aspect-[21/9] group border border-outline-variant/10 shadow-sm'>
                  <div 
                    className='w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-103'
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9pPBzna_3UAd_L3PVkkmoXCw3E9V8mZyotZ_OVGC_FaSgmDlrFi3rwGE4c808_Xz54gcDG2BTEy1Om2x-4pelxJDIT5E1519nS_ZhFHYLpEO0YB7uCDE5KwAruVH4_Ky8DB4--gj7G9DfD7KsGrQvdP0ka5bWeS7jMq5kB6HXeBeSAjpLdw99yz3QEO9Pdj3Uz5XCne3_vdSJW2lq0APiOITGtpDiSzjeGRPCjhFqCIe8cZmPgrPUBkcgROECvJqM3cREnUjbCsFC')` }}
                  />
                </div>
                <div className='flex flex-col md:flex-row justify-between items-start gap-8'>
                  <div className='max-w-md space-y-4'>
                    <h3 className='font-headline text-2xl md:text-3xl font-bold'>Mountain Escapes</h3>
                    <p className='text-on-surface-variant leading-relaxed text-sm font-light'>
                      Elevated living in the literal sense. Cabins and lodges crafted from stone and timber, designed for contemplation and connection with the wild.
                    </p>
                  </div>
                  <Link to="/search" className='bg-secondary text-white px-8 py-4 rounded-xl font-headline font-bold text-xs uppercase tracking-wider hover:bg-primary transition-colors duration-300 text-center inline-block shadow-md'>
                    View All Mountain Homes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE LUXESELECT MANDATE (150-POINT INSPECTION) ── */}
        <section className='py-32 bg-surface-container-low overflow-hidden border-t border-b border-outline-variant/10'>
          <div className='max-w-page mx-auto px-6 lg:px-10'>
            <div className='bg-white rounded-3xl p-8 md:p-20 flex flex-col lg:flex-row items-center gap-16 shadow-ambient border border-outline-variant/10 relative'>
              
              <div className='lg:w-1/2 space-y-8'>
                <div className='inline-flex p-4 bg-[#ba0036]/5 rounded-2xl border border-[#ba0036]/10 text-primary'>
                  <Award className='w-10 h-10' />
                </div>
                <h2 className='font-headline text-3xl md:text-5xl font-bold tracking-tight leading-tight'>
                  The LuxeSelect <br />
                  Mandate.
                </h2>
                <p className='text-sm text-on-surface-variant leading-relaxed font-light'>
                  Every residence in our collection undergoes a rigorous 150-point inspection before it is ever listed. We measure the thread count of the linens, the acoustics of the living spaces, and the responsiveness of the concierge team.
                </p>
                
                <div className='space-y-6 pt-2'>
                  <div className='flex items-start gap-4'>
                    <CheckCircle className='w-5 h-5 text-primary mt-1 shrink-0' />
                    <div>
                      <h4 className='font-headline font-bold text-sm text-on-surface'>Structural Integrity</h4>
                      <p className='text-xs text-on-surface-variant font-light mt-1'>Architecture must meet our strict standards for aesthetic and functional design.</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <CheckCircle className='w-5 h-5 text-primary mt-1 shrink-0' />
                    <div>
                      <h4 className='font-headline font-bold text-sm text-on-surface'>Atmospheric Audit</h4>
                      <p className='text-xs text-on-surface-variant font-light mt-1'>We assess lighting, scent, and soundscapes to ensure a sensory-perfect stay.</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <CheckCircle className='w-5 h-5 text-primary mt-1 shrink-0' />
                    <div>
                      <h4 className='font-headline font-bold text-sm text-on-surface'>Concierge Readiness</h4>
                      <p className='text-xs text-on-surface-variant font-light mt-1'>The local team is vetted for 5-star hospitality and local expertise.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='lg:w-1/2 relative w-full'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='pt-12'>
                    <div 
                      className='aspect-[3/4] rounded-2xl bg-cover bg-center mb-4 border border-outline-variant/10 shadow-sm' 
                      style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQFoHvZk3-lAi4rfAo_RAf3Q_7QX87e_eXs_5e2EiKVo3ZsCGcaHzUnhge9psTlVEbo4DvDAfvT8BHHGIdbyxqpKaU2p-hdkMkh3BEUtRYjs32AXQMnuPNCF4fv5Z9xJRNVOHmCAtYkRMWrDOj81lew9Rcm10lebZsWyFKnt1iK7gczqxI6671jtQ96ekCJQDdkfPx3bM23UnOw2L7X2TC9BT_zJdEheIc_JTRbsWei6aTpYVRf5447ciJ0ujTuVEBFJNO6xI-_WMc')` }}
                    />
                  </div>
                  <div>
                    <div 
                      className='aspect-[3/4] rounded-2xl bg-cover bg-center border border-outline-variant/10 shadow-sm' 
                      style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9gEh1VTjzfAmICGUOW8YSDjxkPFTlw87gmLeLISMRT-5H6oVrGVYsOovT2Mm0RQU7DxloTT3N9J_GJLDTdXE6coS2Nw8n9CiOguL_phWQlO8kZ8fLe1EKlop6hkaiIc0ec6EU7qcRVhqex0-rJQOsXoLleQv38ptzPX673X4EdGK3NF2rALoA-mXR9AZQeFlS6bSRNzVpvGV0a945pg8knKdMIfj-9iBkx3_ive-fRzr-l10-gBsz41Pu5aFBKFfTdcaIXuEM2LPO')` }}
                    />
                  </div>
                </div>
                {/* Floating Badge */}
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-full shadow-2xl flex flex-col items-center justify-center text-center border border-outline-variant/10 min-w-[130px]'>
                  <span className='font-display text-4xl font-extrabold text-primary'>150</span>
                  <span className='text-[8px] font-bold uppercase tracking-widest text-on-surface-variant mt-1'>Audit Points</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS / PROOF POINTS ── */}
        <section className='py-20 border-b border-outline-variant/10 bg-white'>
          <div className='max-w-page mx-auto px-6 lg:px-10'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-12 text-center'>
              <div className='space-y-2'>
                <div className='font-display text-4xl md:text-5xl font-extrabold text-on-surface'>420+</div>
                <div className='text-[10px] font-bold uppercase tracking-widest text-on-surface-variant'>Global Estates</div>
              </div>
              <div className='space-y-2 border-l border-outline-variant/20'>
                <div className='font-display text-4xl md:text-5xl font-extrabold text-on-surface'>12</div>
                <div className='text-[10px] font-bold uppercase tracking-widest text-on-surface-variant'>Countries</div>
              </div>
              <div className='space-y-2 border-l border-outline-variant/20'>
                <div className='font-display text-4xl md:text-5xl font-extrabold text-on-surface'>98%</div>
                <div className='text-[10px] font-bold uppercase tracking-widest text-on-surface-variant'>Guest Rating</div>
              </div>
              <div className='space-y-2 border-l border-outline-variant/20'>
                <div className='font-display text-4xl md:text-5xl font-extrabold text-on-surface'>24/7</div>
                <div className='text-[10px] font-bold uppercase tracking-widest text-on-surface-variant'>Concierge</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
