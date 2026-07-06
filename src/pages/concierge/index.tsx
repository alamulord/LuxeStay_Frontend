import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function Concierge() {
  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body select-none'>
      <Navbar />

      <main className='pt-[72px] flex-grow text-left'>
        {/* ── HERO SECTION ── */}
        <section className='relative px-8 py-20 lg:py-32 overflow-hidden bg-white'>
          <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center'>
            <div className='lg:col-span-6 z-10'>
              <span className='inline-block py-1 px-4 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold tracking-widest mb-6 font-headline'>
                HOSTING AT LUXESTAY
              </span>
              <h1 className='font-display font-extrabold text-5xl lg:text-7xl leading-[1.1] text-on-surface mb-8 tracking-tighter'>
                Turn your architecture into <span className='text-primary italic font-light'>art.</span>
              </h1>
              <p className='text-lg text-on-surface-variant max-w-lg mb-10 leading-relaxed font-light'>
                Join an elite collection of property owners who define the future of high-end hospitality. Share your curated space with the world's most discerning travelers.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link to='/collective' className='px-8 py-4 bg-[#ba0036] hover:bg-[#9c002c] text-white rounded-full font-bold text-center transition-all duration-300 shadow-xl btn-primary-gradient uppercase text-xs tracking-wider font-headline'>
                  LuxeStay Your Home
                </Link>
                <button className='px-8 py-4 border border-outline-variant text-on-surface hover:bg-surface-container-low rounded-full font-bold transition-all duration-300 uppercase text-xs tracking-wider font-headline'>
                  Watch the Story
                </button>
              </div>
            </div>
            
            <div className='lg:col-span-6 relative'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-4 pt-12'>
                  <div className='rounded-2xl overflow-hidden h-80 border border-outline-variant/10 shadow-sm'>
                    <img 
                      className='w-full h-full object-cover hover:scale-103 transition-transform duration-700' 
                      src='https://lh3.googleusercontent.com/aida-public/AB6AXuBxONadlg2SBo8slDCW7djaD8nFWSv4ypXSbEueozMVlnHLlwJUVJ3sRc0dXiSwOLnSL5W41YUNAn2fRm0WawDKUHHgP0xOyxo8VrwbT-o2I5bRaGVrh8-C-YGIjFlXZ9mTyufaO6WCdPYBTUwdwk6aaTow9QQLC9fW1WjE2T0rtplYWD_O2Uchv7dEapp2nX-_HYxAas-tAFm9eQprRLuey2ov1dCzqWKorZkMPpjhW6E-bYsY7aIh7KoM8xzg1Say2Z0rvWvrGOjo' 
                      alt='Modern concrete villa golden hour' 
                    />
                  </div>
                  <div className='rounded-2xl overflow-hidden h-64 border border-outline-variant/10 shadow-sm'>
                    <img 
                      className='w-full h-full object-cover hover:scale-103 transition-transform duration-700' 
                      src='https://lh3.googleusercontent.com/aida-public/AB6AXuD5u9_jts9OLzZwjoDejAUu1Epc24xybjmJTQtYKtLzXELzLImd5midBNtvil378bIAXfDlTQ8IoZIoPXrDeh9xAB1Kq0GkIqmU4miiMwsgGlaVfmkOnLa-RIwXWRbOpO3eihau-cFNuc7cPiPrTaantMMptrK9vFSD0Q_U1tSlDgoMxsISI8cZo7Q8FIbjwlTBuDRBLP3rXo_N-qIsG-W70waQjxQ62oFKipupw9fQNvAKlxh-vetz6b21IRdoI8-uknygO0or0JxP' 
                      alt='Luxury bed detail morning light' 
                    />
                  </div>
                </div>
                <div className='space-y-4'>
                  <div className='rounded-2xl overflow-hidden h-64 border border-outline-variant/10 shadow-sm'>
                    <img 
                      className='w-full h-full object-cover hover:scale-103 transition-transform duration-700' 
                      src='https://lh3.googleusercontent.com/aida-public/AB6AXuDrj5JcKkE6Xhm0OgYdhD_fdEKvJCDiVxERL1bbbsTQPmX0sdB28eX0tV-0LyKcIsM28s8pV5g5qHyIQDzVIYXBjYe5q1S8YOsO2dGiBhOSI7PfY6ly5A_I8Rg9NLgdehQ9Ww98IK169CjPMVGpq1JJnWy3bXhDUu7NccK02UiWelKOF9N9H1xcNDtuWN7-RZU3BFG_-hP9AJ3V0Gqehd_12HC42RXdcgM35w3PfHbODdFpJdHnPu4th7OKzOGpMN_OMLT8F8me8jzq' 
                      alt='Infinity edge pool Mediterranean sunset' 
                    />
                  </div>
                  <div className='rounded-2xl overflow-hidden h-80 border border-outline-variant/10 shadow-sm'>
                    <img 
                      className='w-full h-full object-cover hover:scale-103 transition-transform duration-700' 
                      src='https://lh3.googleusercontent.com/aida-public/AB6AXuCP1L7Rll_a6_smQk_-DpUzSGg0CY_CZybNrRtrgU8lpJtdH7xBo-H_wxjk9nj0-OOla7Q-_kUqGuw9MQulZ1fN5N294EmcGg0KHBKJPvYt91yJnhl44-oMEfy-7OdnWnORHggemMMyY3KQsyRw4V0s-WVQXqDQ_y5qq6dzhv_td6eqyqJkREmnXad_9mPbTp6f9BB_V5QAEwcphwNaHw9FvC8l3d8swxIy65uQyeLAIMFg6f6GbyENDY7mPQo8l-TaatOL5SiqxuWI' 
                      alt='Penthouse velvet sofa city night view' 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE HOST TOOLKIT (BENTO GRID) ── */}
        <section className='bg-surface-container-low py-24 px-8 border-t border-b border-outline-variant/10'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6'>
              <div className='max-w-2xl'>
                <h2 className='font-headline font-bold text-4xl text-on-surface mb-4'>The Host Toolkit</h2>
                <p className='text-on-surface-variant text-lg font-light leading-relaxed'>
                  Every tool you need to master the art of the Digital Concierge, from pricing algorithms to interior curation guides.
                </p>
              </div>
              <button className='text-primary font-bold flex items-center gap-2 group shrink-0'>
                <span>View All Resources</span>
                <span className='material-symbols-outlined group-hover:translate-x-1 transition-transform'>arrow_forward</span>
              </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
              {/* Pricing Guide */}
              <div className='md:col-span-8 bg-white rounded-3xl p-10 flex flex-col justify-between group border border-outline-variant/10 shadow-sm hover:shadow-md transition-all duration-300 text-left'>
                <div className='space-y-4'>
                  <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary'>
                    <span className='material-symbols-outlined text-[24px]'>insights</span>
                  </div>
                  <h3 className='font-headline font-bold text-2xl'>Smart Pricing Insights</h3>
                  <p className='text-on-surface-variant text-sm max-w-md font-light leading-relaxed'>
                    Our proprietary dynamic pricing engine helps you maximize revenue by analyzing real-time luxury travel trends and local events.
                  </p>
                </div>
                <div className='pt-8'>
                  <button className='px-6 py-3 bg-on-background text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider hover:bg-primary transition-colors'>
                    Explore Tools
                  </button>
                </div>
              </div>

              {/* Visual Curation */}
              <div className='md:col-span-4 bg-secondary text-white rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative shadow-sm text-left'>
                <div className='z-10 space-y-4'>
                  <div className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center'>
                    <span className='material-symbols-outlined text-[24px] text-white'>photo_camera</span>
                  </div>
                  <h3 className='font-headline font-bold text-2xl'>Visual Curation</h3>
                  <p className='text-white/80 text-sm font-light leading-relaxed'>
                    Complimentary professional photography sessions for properties that meet our Platinum standards.
                  </p>
                </div>
                <div className='mt-8 z-10 pt-4'>
                  <button className='text-white font-headline font-bold text-xs uppercase tracking-wider underline decoration-2 underline-offset-4 hover:text-[#d9e2ff] transition-colors'>
                    Schedule Session
                  </button>
                </div>
                <div className='absolute -right-10 -bottom-10 opacity-10 scale-150 rotate-12 pointer-events-none'>
                  <span className='material-symbols-outlined text-[12rem] text-white'>photo_camera</span>
                </div>
              </div>

              {/* The Welcome Ritual */}
              <div className='md:col-span-4 bg-white border border-outline-variant/10 rounded-3xl p-10 hover:bg-surface-container-high transition-colors shadow-sm text-left'>
                <div className='w-12 h-12 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary mb-6'>
                  <span className='material-symbols-outlined text-[24px]'>auto_awesome</span>
                </div>
                <h3 className='font-headline font-bold text-xl mb-4'>The Welcome Ritual</h3>
                <p className='text-on-surface-variant text-sm leading-relaxed mb-6 font-light'>
                  Download our guide on crafting the perfect check-in experience, including local gift sourcing and digital welcome kits.
                </p>
                <a className='text-on-surface hover:text-primary font-headline font-bold text-xs uppercase tracking-wider' href='#'>
                  Download PDF →
                </a>
              </div>

              {/* Global Compliance */}
              <div className='md:col-span-4 bg-white border border-outline-variant/10 rounded-3xl p-10 hover:bg-surface-container-high transition-colors shadow-sm text-left'>
                <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6'>
                  <span className='material-symbols-outlined text-[24px]'>gavel</span>
                </div>
                <h3 className='font-headline font-bold text-xl mb-4'>Global Compliance</h3>
                <p className='text-on-surface-variant text-sm leading-relaxed mb-6 font-light'>
                  Stay ahead of local regulations and tax requirements with our simplified host compliance dashboard.
                </p>
                <a className='text-on-surface hover:text-primary font-headline font-bold text-xs uppercase tracking-wider' href='#'>
                  Review Laws →
                </a>
              </div>

              {/* 24/7 Host Priority */}
              <div className='md:col-span-4 bg-white border border-outline-variant/10 rounded-3xl p-10 hover:bg-surface-container-high transition-colors shadow-sm text-left'>
                <div className='w-12 h-12 rounded-full bg-[#375ca8]/10 flex items-center justify-center text-[#375ca8] mb-6'>
                  <span className='material-symbols-outlined text-[24px]'>support_agent</span>
                </div>
                <h3 className='font-headline font-bold text-xl mb-4'>24/7 Host Priority</h3>
                <p className='text-on-surface-variant text-sm leading-relaxed mb-6 font-light'>
                  A dedicated line for hosts to resolve guest issues, maintenance emergencies, or platform questions instantly.
                </p>
                <a className='text-on-surface hover:text-primary font-headline font-bold text-xs uppercase tracking-wider' href='#'>
                  Contact Support →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES: RESPONSIBILITY & STANDARDS ── */}
        <section className='py-24 px-8 max-w-7xl mx-auto'>
          <div className='text-center mb-20 space-y-4'>
            <h2 className='font-display font-bold text-4xl'>Host Responsibility</h2>
            <p className='text-on-surface-variant text-lg max-w-2xl mx-auto font-light leading-relaxed'>
              Luxury is built on trust, ethics, and radical inclusion. We hold ourselves and our hosts to the highest standards of hospitality.
            </p>
          </div>

          {/* Combating Discrimination */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center border-b border-outline-variant/15 pb-20 mb-20 text-left'>
            <div className='rounded-[2rem] overflow-hidden h-[500px] border border-outline-variant/10 shadow-sm'>
              <img 
                className='w-full h-full object-cover hover:scale-103 transition-transform duration-700' 
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuDDQyfjKnhzOQgjT749ddS0FtXaDDqn7BvPBu0q6LwXewfmBE-z6mNUpnzlJHT4w0DzbJrTI0h31DkCRWqC7OH2epPwMoo8S80ObS1Tfl3gAZmn73TfyOeDEUpPBRdCVB16_AD9Wm7ZJkCy3yIqC_e2e71PL3xMyT-ZgDBgeEqKKqohdOHF7d_w0raC7h34UBo0ayBGpeXTzlKhbE5kSc94nLcAkaAbqfDOUC5Y7B_BbKzUi7aoZg9VgOYSmyIAw4YQ8FJVH2slZSL0' 
                alt='Diverse group laughing together modern space' 
              />
            </div>
            <div className='space-y-6'>
              <h3 className='font-headline font-bold text-3xl'>Combating Discrimination</h3>
              <p className='text-on-surface-variant text-lg leading-relaxed font-light'>
                LuxeStay is a community built on the principle of universal belonging. Our zero-tolerance policy against discrimination ensures that every guest, regardless of background, feels not just welcome, but celebrated.
              </p>
              <ul className='space-y-4 pt-2'>
                <li className='flex items-start gap-3'>
                  <CheckCircle className='w-5 h-5 text-primary shrink-0 mt-0.5' />
                  <span className='text-on-surface-variant font-medium text-sm'>Mandatory Bias Awareness Training for Superhosts</span>
                </li>
                <li className='flex items-start gap-3'>
                  <CheckCircle className='w-5 h-5 text-primary shrink-0 mt-0.5' />
                  <span className='text-on-surface-variant font-medium text-sm'>Transparent Booking Integrity Audits</span>
                </li>
                <li className='flex items-start gap-3'>
                  <CheckCircle className='w-5 h-5 text-primary shrink-0 mt-0.5' />
                  <span className='text-on-surface-variant font-medium text-sm'>Direct reporting and rapid mediation support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Supporting All Abilities */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-left'>
            <div className='order-2 md:order-1 space-y-6'>
              <h3 className='font-headline font-bold text-3xl'>Supporting All Abilities</h3>
              <p className='text-on-surface-variant text-lg leading-relaxed font-light'>
                Exceptional design should be accessible to everyone. We work with hosts to certify 'Barrier-Free Luxury' properties, ensuring that physical disabilities never compromise a premium experience.
              </p>
              <div className='bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10'>
                <p className='text-on-surface italic font-medium mb-4 text-sm'>
                  "LuxeStay's accessibility guidelines helped me renovate my estate while maintaining its historic charm, opening my home to a whole new world of travelers."
                </p>
                <div className='flex items-center gap-4'>
                  <div className='w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase tracking-wider font-headline'>JV</div>
                  <span className='font-bold text-xs text-on-surface'>— Julian V., Platinum Host in Tuscany</span>
                </div>
              </div>
            </div>
            
            <div className='rounded-[2rem] overflow-hidden h-[500px] order-1 md:order-2 border border-outline-variant/10 shadow-sm'>
              <img 
                className='w-full h-full object-cover hover:scale-103 transition-transform duration-700' 
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuCj0zm3sSzwuZ-gzWp5iVFPvR8hFApwXeKJT2kAv1mynVJ7AUVRG1bE6jvdcmRD0t2It_plaQz87_98k6n6W_7fOaHoAcwPdVr2gI4ZOJIFDGng1eFkZpnZvyx-UEumG8xJiohju9XOdD_WJhDqbIePnYwk4s_3_qfM2MFEzqs6d2gwi9UZhb8gFd_c7Kyajxmv3PIwgPrM8-vqzhbmEFyRGBsG6Dk3uq6489m_p2u8nO5oD4NmyWTnB971sVstkfnotC9hW8VKM7Rm' 
                alt='Barrier free luxury bathroom design marble walls' 
              />
            </div>
          </div>
        </section>

        {/* ── COMMUNITY FORUM TEASER ── */}
        <section className='bg-[#0c0d0d] text-[#f4f3ef] py-24 px-8 overflow-hidden relative border-t border-white/5'>
          <div className='max-w-7xl mx-auto relative z-10'>
            <div className='flex flex-col lg:flex-row items-center gap-16'>
              <div className='lg:w-1/2 text-left space-y-6'>
                <h2 className='font-headline font-bold text-4xl mb-6'>The Inner Circle</h2>
                <p className='text-[#cfc9bc] text-lg font-light leading-relaxed mb-10 max-w-xl'>
                  Join the private LuxeStay Host Forum to swap advice with top-tier hosts, discuss market trends, and participate in exclusive Q&A sessions with the LuxeStay design team.
                </p>
                <button className='px-10 py-4 bg-primary text-white rounded-full font-headline font-bold text-xs uppercase tracking-wider btn-primary-gradient hover:scale-102 transition-transform shadow-md'>
                  Enter the Forum
                </button>
              </div>

              <div className='lg:w-1/2 grid grid-cols-1 gap-4 w-full'>
                {/* Forum Snippet 1 */}
                <div className='bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer text-left'>
                  <p className='text-primary text-xs font-bold mb-2 uppercase tracking-widest font-headline'>Trending Topic</p>
                  <h4 className='font-bold mb-2 text-lg text-white'>Sustainable Linen Sourcing: Top 5 Recommendations</h4>
                  <div className='flex items-center gap-3 pt-2 text-xs text-[#cfc9bc]/70'>
                    <div className='w-8 h-8 rounded-full bg-[#1c1d1d] flex items-center justify-center text-primary font-bold text-[10px]'>SL</div>
                    <span>124 replies • Last active 5m ago</span>
                  </div>
                </div>

                {/* Forum Snippet 2 */}
                <div className='bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer text-left md:translate-x-4'>
                  <p className='text-primary text-xs font-bold mb-2 uppercase tracking-widest font-headline'>Host Meetup</p>
                  <h4 className='font-bold mb-2 text-lg text-white'>London Design Week: LuxeStay Host Mixer</h4>
                  <div className='flex items-center gap-3 pt-2 text-xs text-[#cfc9bc]/70'>
                    <div className='w-8 h-8 rounded-full bg-[#1c1d1d] flex items-center justify-center text-primary font-bold text-[10px]'>LD</div>
                    <span>45 attending • Sep 22, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative atmospheric element */}
          <div className='absolute -right-32 top-0 w-96 h-96 bg-primary opacity-20 blur-[120px] rounded-full pointer-events-none' />
        </section>
      </main>

      <Footer />
    </div>
  );
}
