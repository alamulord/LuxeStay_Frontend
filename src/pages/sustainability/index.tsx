import React, { useState } from 'react';
import { ArrowLeft, Leaf, Globe, Award, Sparkles, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function Sustainability() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubsubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubsubscribed(true);
  };

  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body select-none'>
      <Navbar />

      <main className='pt-[72px] flex-grow'>
        {/* ── HERO SECTION ── */}
        <section className='relative h-[85vh] flex items-center px-6 lg:px-16 overflow-hidden bg-surface-container-low text-left'>
          <div className='max-w-7xl mx-auto w-full grid md:grid-cols-2 items-center gap-16 relative z-10'>
            <div className='space-y-8'>
              <div className='space-y-4'>
                <span className='inline-block px-4 py-1.5 rounded-full bg-tertiary-container/10 text-tertiary font-headline text-[10px] font-bold tracking-widest uppercase'>
                  The Digital Concierge Presents
                </span>
                <h1 className='font-display text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-on-surface'>
                  Conscious <br />
                  Hospitality
                </h1>
                <p className='text-lg md:text-xl text-on-surface-variant max-w-lg font-light leading-relaxed'>
                  Luxury is no longer defined by excess, but by the intention behind every detail. Explore our commitment to a future of travel that gives back.
                </p>
              </div>
              
              <div className='flex gap-4'>
                <button className='bg-primary text-white px-8 py-4 rounded-xl font-headline font-bold text-xs uppercase tracking-wider hover:scale-[1.02] transition-transform btn-primary-gradient flex items-center gap-2'>
                  Read the 2024 Report
                  <span className='material-symbols-outlined text-sm'>arrow_downward</span>
                </button>
              </div>
            </div>
            
            <div className='relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/10 transform rotate-1 hover:rotate-0 transition-transform duration-700'>
              <img 
                className='w-full h-full object-cover' 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkT0QC6eeF8UF1YgzOZ3rFWzXxUX3ccSdWSoAG7dj3maGHSQUnq0NR40P2lpKufaODsy6i3SWLeAxzguGCaXgeua85JccU7PhiwHGPqJjYjJ65BlAzN-_1xaJI8yW-Elgdr8s2AMzKdUgHYzI5NjwMACM83LQ0uCXn65fWhwmn6W59klG5dPAA2jJnI8hS3KmhPupn_6WZTSnDPmn0Vl5Wpnd9hqMww6jutd9yHeidj2joMf_MeIk5DB2c2YstxjwkimCIZuza0hDh"
                alt="Modern eco villa Mediterranean forest"
              />
            </div>
          </div>
          <div className='absolute right-0 top-0 w-1/3 h-full bg-surface-container-high/40 -z-0 pointer-events-none' />
        </section>

        {/* ── STATEMENT SECTION ── */}
        <section className='py-32 px-6 bg-surface'>
          <div className='max-w-4xl mx-auto text-center space-y-10'>
            <h2 className='font-display text-3xl md:text-5xl font-semibold tracking-tight text-on-surface'>
              “Sustainability is the ultimate luxury.”
            </h2>
            <div className='w-20 h-0.5 bg-primary mx-auto opacity-35'></div>
            <p className='text-base md:text-lg text-on-surface-variant leading-relaxed font-light max-w-3xl mx-auto'>
              At LuxeStay, we believe the preservation of our world’s most beautiful destinations is our highest calling. Our <strong>Conscious Hospitality</strong> framework ensures that every stay contributes to environmental restoration and cultural preservation, without ever compromising the refined experience our guests expect.
            </p>
          </div>
        </section>

        {/* ── BENTO COMMITMENT PILLARS ── */}
        <section className='py-24 px-6 bg-surface-container-lowest border-t border-b border-outline-variant/10'>
          <div className='max-w-page mx-auto mb-60'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[800px]'>
              {/* Carbon Neutral (Pillar 1) */}
              <div className='md:col-span-8 group relative overflow-hidden rounded-2xl bg-surface-container-low p-10 flex flex-col justify-end border border-outline-variant/5 shadow-sm text-left'>
                <div className='absolute inset-0 z-0'>
                  <img 
                    className='w-full h-full object-cover opacity-80 group-hover:scale-103 transition-transform duration-[1.5s]' 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH81wIsC8zGpBBlaLA4xeRPvKOB_GrdQ5TzS4hfQZ2CQ15lhXZxSOi_z49N3w84seuH4etzfg_zXjYPNbPj6jgWqScErvURy8mr430-pMYvvxWUuk3wD46W0hSmxU6uMHKsEyrFd487zHCwygkYmSd9_iq3G3EP0UELYirF6SBeCuHHFWOwDvWRPNeagMRvQ6xpWJ7Jc51DQoWLxK5x86ltj_2p8Fle9jPnHnvB31iHwVl5cWJSfZMquOmbyHwJX-RNzNRq5rmZMZg"
                    alt="Aerial view misty emerald forest"
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-0' />
                </div>
                
                <div className='relative z-10 text-white space-y-4'>
                  <span className='font-headline text-[9px] font-bold tracking-widest uppercase block text-primary-fixed-dim'>
                    Pillar One
                  </span>
                  <h3 className='font-headline text-3xl md:text-4xl font-bold tracking-tight'>
                    Carbon-Neutral Stays
                  </h3>
                  <p className='max-w-xl text-sm opacity-90 leading-relaxed font-light'>
                    From 100% renewable energy sourcing to verified reforestation projects, we offset the carbon footprint of every guest journey, including transportation.
                  </p>
                  <a className='inline-flex items-center gap-1.5 font-headline font-bold text-xs uppercase tracking-wider text-primary-fixed-dim hover:text-white transition-colors' href="#">
                    Explore Our Methodology 
                    <ArrowRight className='w-4 h-4' />
                  </a>
                </div>
              </div>

              {/* Ethical Sourcing */}
              <div className='md:col-span-4 bg-surface-container-low p-8 rounded-2xl flex flex-col justify-between border border-outline-variant/10 group text-left shadow-sm'>
                <div className='space-y-4'>
                  <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/10 text-primary'>
                    <Leaf className='w-5 h-5' />
                  </div>
                  <h3 className='font-headline text-2xl font-bold tracking-tight text-on-surface'>Ethical Sourcing</h3>
                  <p className='text-xs text-on-surface-variant leading-relaxed font-light'>
                    Our supply chain is 100% transparent. From organic linens to plastic-free amenities, we partner exclusively with B-Corp certified vendors.
                  </p>
                </div>
                <div className='mt-6 overflow-hidden rounded-xl aspect-video md:aspect-square border border-outline-variant/5'>
                  <img 
                    className='w-full h-full object-cover group-hover:scale-103 transition-transform duration-700' 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNNqQZALdnow9s8jRyOTMG2yXdbdvbhIAzh1I-0LF53DgJBCvw4qxO5byz6bJoH5P_BfwT2ebT0q4Wd2MJd_RkVonb83dpVSG_Wm022GGnGzltoUZGMpqprClGbvHH-7Ir5hAhU2ZBU4d6m-G2I4MePuYAMcPewyLoyxOpe65VnAav-DeUPlQLh_4JSb9tpvICRk99N5A_zEIhdhpSh0qpNSQ16T1rT51mCIudTCJZICBmjme-nzhf5YzLKXDM6IOllgyrWttKCaVE"
                    alt="Raw organic linen fabric weave close-up"
                  />
                </div>
              </div>

              {/* Supporting Local Artisans */}
              <div className='md:col-span-4 bg-secondary text-white p-8 rounded-2xl flex flex-col justify-between group text-left shadow-sm'>
                <div className='space-y-4'>
                  <div className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10'>
                    <Sparkles className='w-5 h-5 text-white' />
                  </div>
                  <h3 className='font-headline text-2xl font-bold tracking-tight'>Supporting Local</h3>
                  <p className='text-xs text-white/80 leading-relaxed font-light'>
                    We curate bespoke interiors using local craftsmanship, ensuring that tourism revenue flows directly into the hands of regional creators.
                  </p>
                </div>
                
                <div className='mt-8 flex items-center gap-3'>
                  <div className='flex -space-x-3'>
                    <div 
                      className='w-12 h-12 rounded-full border-2 border-secondary overflow-hidden bg-cover bg-center'
                      style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBpiyikPLYDatQG-ybMrmRF-uAhznspqeytpKWxixDx_uGJdMpiIfx75x5GEKz1_JoO7BB8wig-aLz64BA_f02DTXs2NoAb9FVgBr6PG-y7CqFwVY20taMo14FpHVVDz3UvbpVmV0c_fsQzL1-FqS0NkwXiSBH7m8mf7Z-TLYQqgqcj2GRAuMsj02bSF6ji_d7dnddTN8ii-ZAE83kPo5CVbS0HFvLwbA5MyZyuC2qk1J_t5Bv5AQMAV6bjDCPLzVO9M5cblH5czNl2')` }}
                    />
                    <div 
                      className='w-12 h-12 rounded-full border-2 border-secondary overflow-hidden bg-cover bg-center'
                      style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAm60xo1IyDYcKgIo6jvHKuNuF_oipqZcQt0KJ_YfdowRHq0yX5BdYTaC-RQdSntTAluqWmYw9i_LZU7kwAasP357tSRRbup1T1H0bQUAUHNe1_jBE-pFItU4D-XNZebC_qizOHhyFZCch9hIxiFgyXKuJ9xF0DJPLCMhnj3dkK9nymYC2hjn346OA-sML_lCmzVLGWt6gNQjBbtkBJQMwZQbeYkZkz7VsLvQxm6mT3S3Va6Q92BnIiZw1Iq04qdMdygfzDrVUoon5D')` }}
                    />
                  </div>
                  <span className='text-[10px] font-bold uppercase tracking-wider text-white/90'>
                    +12 Studios
                  </span>
                </div>
              </div>

              {/* Data Points */}
              <div className='md:col-span-8 bg-surface-container-low border border-outline-variant/10 rounded-2xl p-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center shadow-sm'>
                <div className='text-center space-y-2'>
                  <span className='block font-display text-5xl font-extrabold text-primary'>98%</span>
                  <span className='font-headline text-[9px] tracking-widest uppercase text-on-surface-variant font-bold'>Plastic Free</span>
                </div>
                <div className='text-center space-y-2 border-y md:border-y-0 md:border-x border-outline-variant/20 py-6 md:py-0'>
                  <span className='block font-display text-5xl font-extrabold text-secondary'>1.2M</span>
                  <span className='font-headline text-[9px] tracking-widest uppercase text-on-surface-variant font-bold'>Trees Planted</span>
                </div>
                <div className='text-center space-y-2'>
                  <span className='block font-display text-5xl font-extrabold text-[#008558]'>100%</span>
                  <span className='font-headline text-[9px] tracking-widest uppercase text-on-surface-variant font-bold'>Renewable Energy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CSO QUOTE SECTION ── */}
        <section className='py-32 px-6 bg-surface mt-32'>
          <div className='max-w-page mx-auto flex flex-col lg:flex-row items-center gap-16'>
            <div className='flex-1 text-left space-y-8'>
              <h2 className='font-display text-4xl md:text-5xl font-bold leading-tight'>
                Authenticity over Excess.
              </h2>
              <p className='text-base md:text-lg text-on-surface-variant leading-relaxed font-light'>
                Our journey toward sustainability is an open book. We recognize that true luxury requires vulnerability and a constant drive for improvement. Every property in the LuxeStay collection is audited quarterly for environmental impact and social governance.
              </p>
              
              <div className='flex items-center gap-4 pt-2'>
                <img 
                  className='w-14 h-14 rounded-full object-cover border border-outline-variant/25' 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGBlDhYAqQ4Daa9xRFrje2smdAH8oLg4CJpDVMNxo5C7Q3HK4arLv_uLpuECV5zfVklprcQfx6RZJ-3DqqNlWePhrZyPH3jfnXlbXtdSfctkXh6GmzclVm9_t_YLgMbWv45UgTZ1gdIRLZUTFnKXhv6fSUeU7kTrkkdjX12N_Xg3x6huC-mSKbo05_UT6pJG9yRbohoyVsVL2a7PnA28phv267rczQGK-Dah-AQWw2hKbryUrIKGg7dZTJPH6ZAhjJVitaDXW5lp0C"
                  alt="Elena Vance Chief Sustainability Officer"
                />
                <div>
                  <p className='font-bold text-sm'>Elena Vance</p>
                  <p className='text-[10px] text-on-surface-variant uppercase tracking-widest font-headline font-bold'>
                    Chief Sustainability Officer
                  </p>
                </div>
              </div>
            </div>
            
            <div className='flex-1 w-full'>
              <div className='relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl border border-outline-variant/10'>
                <img 
                  className='w-full h-full object-cover' 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRll-cX1jJ5xjB6dCgtZ6T9MEU6fzRJJ-VWG84t3W5Mu2vv_o-OV6a-VuoAAdyFWNp2yiG5Mg98OOqSbCD9WjT24DeVVA7j2_BvLn39ovElT-4tV7vQ221FIb6soUF-dN6rEncbt0SR9kTdxuiZKkmL--R7YsBvUSsrLHkn_QzLvgLo_fKYpsz9YbQu08SVt6-jFduJK5Q9e7XLz13f3ciyRpj8QgLk9GqlcuHcqQ8pdF4qfjeilHOvHBIEqEPa5GS6ZyaWPAggswN"
                  alt="Resort infinity pool ocean sunset view"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER SUBSCRIPTION SECTION ── */}
        <section className='py-24 px-6 bg-surface-container-lowest border-t border-outline-variant/10'>
          <div className='max-w-5xl mx-auto bg-surface-container-low rounded-[2rem] p-12 md:p-20 text-center space-y-8 shadow-sm overflow-hidden relative border border-outline-variant/10'>
            <div className='absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none' />
            
            <h2 className='font-headline text-3xl md:text-4xl font-extrabold relative z-10 text-on-surface'>
              Join the Collective
            </h2>
            <p className='text-sm text-on-surface-variant max-w-xl mx-auto relative z-10 leading-relaxed font-light'>
              Receive our monthly editorial, "The Conscious Collector," featuring deep dives into eco-tourism and artisanal discoveries.
            </p>
            
            <div className='max-w-md mx-auto relative z-10 pt-2'>
              <AnimatePresence mode='wait'>
                {subscribed ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className='bg-primary/5 px-6 py-4 rounded-xl border border-primary/20 text-primary font-bold text-xs uppercase tracking-wider'
                  >
                    Successfully Subscribed!
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className='flex flex-col sm:flex-row gap-3'>
                    <input 
                      type='email' 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='flex-1 px-5 py-3.5 rounded-xl bg-white border border-outline-variant/25 focus:ring-2 focus:ring-primary/45 focus:outline-none outline-none transition-all placeholder:text-on-surface-variant/40 text-sm font-body' 
                      placeholder='Your email address' 
                    />
                    <button 
                      type='submit' 
                      className='bg-primary text-white px-8 py-3.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all btn-primary-gradient shadow-md'
                    >
                      Subscribe
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
